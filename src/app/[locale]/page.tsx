import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSlider from "@/components/home/HeroSlider";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import StatsSection from "@/components/home/StatsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import CTASection from "@/components/home/CTASection";

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
        ? "Ekko Distribution | Export Alimentaire Afrique"
        : "Ekko Distribution | Food Export to Africa",
    description: t("hero.slides.0.subtitle"),
    openGraph: {
      title: "Ekko Distribution",
      description: t("hero.slides.0.subtitle"),
      type: "website",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
      },
    },
  };
}

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <OrganizationJsonLd />
      <HeroSlider />
      <StatsSection />
      <CategoriesSection />
      <WhyUsSection />
      <CTASection />
    </div>
  );
}
