import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} — ${siteConfig.name}` : `${siteConfig.legalName}`;
  return {
    title: title ?? { absolute: `${siteConfig.legalName} — Digital solutions & technology commerce` },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.legalName,
      title: fullTitle,
      description,
      url: path,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
