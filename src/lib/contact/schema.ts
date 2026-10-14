import { z } from "zod";
import { inquiryTypes, type InquiryType } from "@/config/site";

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  company: { max: 120 },
  message: { min: 20, max: 5000 },
} as const;

// Avoid Zod's eval-based fast path: it is blocked by the site's Content Security Policy.
z.config({ jitless: true });

const inquiryValues = inquiryTypes.map((t) => t.value) as [InquiryType, ...InquiryType[]];

// Line breaks and other control characters are never valid in single-line fields.
// Rejecting them (rather than stripping) prevents email-header injection outright.
const singleLine = /^[^\u0000-\u001f\u007f]*$/;
// The message may contain newlines and tabs but no other control characters.
const multiLine = /^[^\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]*$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(LIMITS.name.min, "Please enter your name.")
    .max(LIMITS.name.max, `Please keep your name under ${LIMITS.name.max} characters.`)
    .regex(singleLine, "Your name contains characters we can’t accept."),
  email: z
    .string()
    .trim()
    .max(LIMITS.email.max, "That email address is too long.")
    .regex(singleLine, "Please enter a valid email address.")
    .pipe(z.email("Please enter a valid email address.")),
  company: z
    .string()
    .trim()
    .max(LIMITS.company.max, `Please keep the company name under ${LIMITS.company.max} characters.`)
    .regex(singleLine, "The company name contains characters we can’t accept.")
    .optional()
    .transform((v) => (v ? v : undefined)),
  inquiry: z.enum(inquiryValues, "Please choose an inquiry type."),
  message: z
    .string()
    .trim()
    .min(LIMITS.message.min, `Please share a bit more detail (at least ${LIMITS.message.min} characters).`)
    .max(LIMITS.message.max, `Please keep your message under ${LIMITS.message.max} characters.`)
    .regex(multiLine, "Your message contains characters we can’t accept."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<ContactField, string>>;
    };

export function isInquiryType(value: unknown): value is InquiryType {
  return typeof value === "string" && (inquiryValues as string[]).includes(value);
}
