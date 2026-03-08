import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BrandsClient from "@/components/brands/BrandsClient";

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
        ? "Nos Marques Partenaires | Ekko Distribution"
        : "Our Partner Brands | Ekko Distribution",
    description: t("brands.subtitle"),
    alternates: {
      canonical: `/${locale}/marques`,
      languages: {
        fr: "/fr/marques",
        en: "/en/brands",
      },
    },
  };
}

export default function BrandsPage() {
  return <BrandsClient />;
}
