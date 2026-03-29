import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ekko-distribution.com"),
  twitter: {
    card: "summary_large_image",
    site: "@ekko_distribution",
    creator: "@ekko_distribution",
  },
  openGraph: {
    type: "website",
    siteName: "Ekko Distribution - Belle Vie",
    locale: "fr_FR",
    alternateLocale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
