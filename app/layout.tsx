import type { Metadata } from "next";
import { headers } from "next/headers";
import { IdleWebs } from "./components/IdleWebs";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: { default: "Anvi Karanjkar", template: "%s — Anvi Karanjkar" },
    description: "Projects, experience, education, contact details and games by Anvi Karanjkar.",
    authors: [{ name: "Anvi Karanjkar" }],
    openGraph: {
      title: "Anvi Karanjkar",
      description: "Projects, experience, education and games.",
      type: "website",
      url: origin,
      images: [{ url: `${origin}/og.png`, width: 1536, height: 1024, alt: "Anvi Karanjkar" }],
    },
    twitter: { card: "summary_large_image", title: "Anvi Karanjkar", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <IdleWebs />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
