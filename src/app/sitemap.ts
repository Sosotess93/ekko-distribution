import type { MetadataRoute } from "next";
import { getAllProducts, getAllBrands } from "@/data";

const BASE_URL = "https://ekko-distribution.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();
  const brands = getAllBrands();

  const staticPages = [
    { frPath: "", enPath: "", priority: 1.0 },
    { frPath: "/produits", enPath: "/products", priority: 0.9 },
    { frPath: "/marques", enPath: "/brands", priority: 0.8 },
    { frPath: "/processus", enPath: "/process", priority: 0.7 },
    { frPath: "/contact", enPath: "/contact", priority: 0.7 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    entries.push({
      url: `${BASE_URL}/fr${page.frPath}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: page.priority,
      alternates: {
        languages: {
          fr: `${BASE_URL}/fr${page.frPath}`,
          en: `${BASE_URL}/en${page.enPath}`,
        },
      },
    });
  }

  for (const product of products) {
    entries.push({
      url: `${BASE_URL}/fr/produits/${product.slug.fr}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${BASE_URL}/fr/produits/${product.slug.fr}`,
          en: `${BASE_URL}/en/products/${product.slug.en}`,
        },
      },
    });
  }

  for (const brand of brands) {
    entries.push({
      url: `${BASE_URL}/fr/marques/${brand.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${BASE_URL}/fr/marques/${brand.id}`,
          en: `${BASE_URL}/en/brands/${brand.id}`,
        },
      },
    });
  }

  return entries;
}
