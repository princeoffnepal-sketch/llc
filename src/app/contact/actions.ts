"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import { sendInquiry } from "@/lib/contact/email";
import { checkRateLimit } from "@/lib/contact/rate-limit";
import { contactSchema, type ContactField, type ContactFormState } from "@/lib/contact/schema";

const MIN_FILL_MS = 3000;
const GENERIC_ERROR = "Something went wrong on our side and your message was not sent. Please try again shortly.";

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : undefined;
}

function clientIp(h: Headers) {
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || h.get("x-real-ip") || "unknown";
}

/** Next.js already rejects Server Action requests whose Origin and Host differ; this adds an explicit allowlist check. */
function isAllowedOrigin(h: Headers) {
  const origin = h.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  const allowed = new Set<string>();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (host) allowed.add(host);
  if (siteConfig.hasConfiguredUrl) allowed.add(new URL(siteConfig.url).host);
  return allowed.has(originHost);
}

export async function submitInquiry(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const h = await headers();

  if (!isAllowedOrigin(h)) {
    return { status: "error", message: "This request could not be verified. Please reload the page and try again." };
  }

  // Honeypot: real visitors never see or fill this field.
  if (field(formData, "website")) {
    return { status: "error", message: "Your message could not be sent. Please try again." };
  }

  // Timing check: the form records when it became interactive. Submissions
  // without JavaScript have no timestamp and rely on the other checks.
  const startedAt = Number(field(formData, "startedAt"));
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "error", message: "That was quick — please wait a moment and submit again." };
  }

  const parsed = contactSchema.safeParse({
    name: field(formData, "name") ?? "",
    email: field(formData, "email") ?? "",
    company: field(formData, "company") ?? "",
    inquiry: field(formData, "inquiry") ?? "",
    message: field(formData, "message") ?? "",
  });

  if (!parsed.success) {
    const flat = z.flattenError(parsed.error).fieldErrors;
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const [key, messages] of Object.entries(flat)) {
      if (messages?.[0]) fieldErrors[key as ContactField] = messages[0];
    }
    return { status: "error", message: "Please correct the highlighted fields.", fieldErrors };
  }

  const { allowed } = await checkRateLimit(clientIp(h));
  if (!allowed) {
    return {
      status: "error",
      message: "You’ve sent several messages in a short time. Please wait a few minutes before trying again.",
    };
  }

  const result = await sendInquiry(parsed.data);
  if (!result.ok) {
    if (result.reason === "not_configured") {
      console.warn("contact: email delivery is not configured (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL)");
      return {
        status: "error",
        message:
          "Our contact form isn’t accepting messages yet, so nothing was sent. Please check back soon.",
      };
    }
    return { status: "error", message: GENERIC_ERROR };
  }

  return { status: "success" };
}
