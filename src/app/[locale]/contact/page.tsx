import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactClient from "@/components/contact/ContactClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title:
      locale === "fr"
        ? "Contactez-nous | Ekko Distribution"
        : "Contact Us | Ekko Distribution",
    description: t("contact.subtitle"),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        fr: "/fr/contact",
        en: "/en/contact",
      },
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
