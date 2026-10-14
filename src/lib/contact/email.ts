import "server-only";
import { Resend } from "resend";
import { inquiryTypes, siteConfig } from "@/config/site";
import type { ContactInput } from "./schema";

type DeliveryResult = { ok: true } | { ok: false; reason: "not_configured" | "failed" };

function getDeliveryConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return null;
  return { apiKey, to: to.split(",").map((s) => s.trim()).filter(Boolean), from };
}

export function isDeliveryConfigured() {
  return getDeliveryConfig() !== null;
}

/**
 * Sends an inquiry as a plain-text email. Submitted values are never rendered
 * as HTML. Single-line fields are already validated to contain no line breaks,
 * so they cannot inject headers; Resend also receives them as JSON fields.
 */
export async function sendInquiry(input: ContactInput): Promise<DeliveryResult> {
  const config = getDeliveryConfig();
  if (!config) return { ok: false, reason: "not_configured" };

  const inquiryLabel = inquiryTypes.find((t) => t.value === input.inquiry)?.label ?? "General";
  const subject = `New inquiry: ${inquiryLabel} from ${input.name}`.slice(0, 180);

  const text = [
    `New ${inquiryLabel.toLowerCase()} inquiry via the ${siteConfig.name} website.`,
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Company: ${input.company ?? "Not provided"}`,
    `Inquiry type: ${inquiryLabel}`,
    "",
    "Message:",
    input.message,
    "",
    "—",
    "Reply to this email to respond directly to the sender.",
  ].join("\n");

  try {
    const resend = new Resend(config.apiKey);
    const { error } = await resend.emails.send({
      from: config.from,
      to: config.to,
      replyTo: input.email,
      subject,
      text,
    });
    if (error) {
      // Log the provider's error category only — never the submission.
      console.error("contact: email delivery failed", { name: error.name });
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch {
    console.error("contact: email delivery threw");
    return { ok: false, reason: "failed" };
  }
}
