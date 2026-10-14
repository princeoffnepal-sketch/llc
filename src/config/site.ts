/**
 * Company configuration — the single place for Lami Ventures LLC details.
 *
 * Anything set to `null` is treated as "not supplied yet" and is omitted from
 * the public site (header, footer, contact page, privacy page, structured
 * data). Fill these in before launch; see "Owner-supplied details" in the
 * README. Do not add details that are not accurate.
 */

export type SocialLink = { label: string; href: string };

type SiteConfig = {
  name: string;
  legalName: string;
  /** Public production URL, e.g. https://lamiventures.com — set NEXT_PUBLIC_SITE_URL. */
  url: string;
  /** True only when NEXT_PUBLIC_SITE_URL is set; gates canonical URLs in structured data. */
  hasConfiguredUrl: boolean;
  description: string;
  contact: {
    /** Public business email shown on the site. Not the same as CONTACT_TO_EMAIL. */
    email: string | null;
    phone: string | null;
    /** Full mailing address as display lines. */
    address: string[] | null;
  };
  social: SocialLink[];
  privacy: {
    /** ISO date (YYYY-MM-DD) the policy takes effect. `null` keeps the page marked as a draft. */
    effectiveDate: string | null;
    /** Address for privacy requests. Falls back to the contact form when null. */
    contactEmail: string | null;
    /** Hosting provider name, e.g. "Vercel". */
    hostingProvider: string | null;
    /** How long inquiry emails are kept, in plain language, e.g. "up to 24 months". */
    retentionPeriod: string | null;
    /** US state or country whose law governs the business, if you want it stated. */
    jurisdiction: string | null;
  };
};

// Prefer the explicit site URL; on Vercel, fall back to the project's production domain.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const configuredUrl = (process.env.NEXT_PUBLIC_SITE_URL || (vercelUrl ? `https://${vercelUrl}` : ""))
  .trim()
  .replace(/\/+$/, "");

export const siteConfig: SiteConfig = {
  name: "Lami Ventures",
  legalName: "Lami Ventures LLC",
  url: configuredUrl || "http://localhost:3000",
  hasConfiguredUrl: Boolean(configuredUrl),
  description:
    "Lami Ventures LLC builds websites, software products, and AI automations, and resells collectibles, smartphones, and computer hardware.",
  contact: {
    email: null,
    phone: null,
    address: null,
  },
  social: [],
  privacy: {
    effectiveDate: null,
    contactEmail: null,
    hostingProvider: null,
    retentionPeriod: null,
    jurisdiction: null,
  },
};

export const navigation = [
  { label: "Digital Solutions", href: "/digital-solutions" },
  { label: "Commerce & Partnerships", href: "/commerce" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Inquiry categories, shared by the contact form, server validation, and deep links. */
export const inquiryTypes = [
  { value: "digital", label: "Digital Project" },
  { value: "partnership", label: "Supplier or Wholesale Partnership" },
  { value: "resale", label: "Resale Opportunity" },
  { value: "general", label: "General" },
] as const;

export type InquiryType = (typeof inquiryTypes)[number]["value"];

export function contactHref(inquiry?: InquiryType) {
  return inquiry ? `/contact?inquiry=${inquiry}#inquiry-form` : "/contact";
}
