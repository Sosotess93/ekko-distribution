import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBrands, getBrandById } from "@/data";
import { routing } from "@/i18n/routing";
import BrandDetailClient from "@/components/brands/BrandDetailClient";

export function generateStaticParams() {
  const brands = getAllBrands();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const brand of brands) {
      params.push({ locale, slug: brand.id });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const brand = getBrandById(slug);

  if (!brand) return {};

  const loc = locale as "fr" | "en";

  return {
    title: `${brand.name} | Ekko Distribution`,
    description: brand.description[loc],
    alternates: {
      canonical: `/${locale}/marques/${brand.id}`,
      languages: {
        fr: `/fr/marques/${brand.id}`,
        en: `/en/brands/${brand.id}`,
      },
    },
  };
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrandById(slug);

  if (!brand) notFound();

  return <BrandDetailClient brandId={brand.id} />;
}
