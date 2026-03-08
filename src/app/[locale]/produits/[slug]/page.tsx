import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug, getBrandById } from "@/data";
import { routing } from "@/i18n/routing";
import ProductDetailClient from "@/components/products/ProductDetailClient";
import { ProductJsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  const products = getAllProducts();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const product of products) {
      params.push({
        locale,
        slug: product.slug[locale],
      });
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
  const product = getProductBySlug(slug, locale);

  if (!product) return {};

  const brand = getBrandById(product.brandId);
  const loc = locale as "fr" | "en";

  return {
    title: `${product.name[loc]} | ${brand?.name} | Ekko Distribution`,
    description: product.shortDescription[loc],
    openGraph: {
      title: product.name[loc],
      description: product.shortDescription[loc],
      images: [{ url: product.images[0] }],
      type: "website",
    },
    alternates: {
      canonical: `/${locale}/produits/${product.slug[loc]}`,
      languages: {
        fr: `/fr/produits/${product.slug.fr}`,
        en: `/en/products/${product.slug.en}`,
      },
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug, locale);

  if (!product) notFound();

  const loc = locale as "fr" | "en";
  return (
    <>
      <ProductJsonLd
        name={product.name[loc]}
        description={product.shortDescription[loc]}
        image={product.images[0]}
        brand={getBrandById(product.brandId)?.name || ""}
      />
      <ProductDetailClient productId={product.id} />
    </>
  );
}
