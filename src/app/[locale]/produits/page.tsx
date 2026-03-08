import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProductsClient from "@/components/products/ProductsClient";

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
        ? "Nos Produits | Ekko Distribution"
        : "Our Products | Ekko Distribution",
    description: t("products.subtitle"),
    alternates: {
      canonical: `/${locale}/produits`,
      languages: {
        fr: "/fr/produits",
        en: "/en/products",
      },
    },
  };
}

export default function ProductsPage() {
  return <ProductsClient />;
}
