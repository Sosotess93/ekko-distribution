import data from "./products.json";
import type { ProductsData, Product, Brand } from "./types";

const productsData = data as ProductsData;

export function getAllProducts(): Product[] {
  return productsData.products;
}

export function getProductBySlug(slug: string, locale: string): Product | undefined {
  return productsData.products.find((p) => p.slug[locale as "fr" | "en"] === slug);
}

export function getProductById(id: string): Product | undefined {
  return productsData.products.find((p) => p.id === id);
}

export function getAllBrands(): Brand[] {
  return productsData.brands;
}

export function getBrandById(id: string): Brand | undefined {
  return productsData.brands.find((b) => b.id === id);
}

export function getProductsByBrand(brandId: string): Product[] {
  return productsData.products.filter((p) => p.brandId === brandId);
}

export function getProductsByCategory(category: string): Product[] {
  return productsData.products.filter((p) => p.category === category);
}

export function getCategories() {
  return productsData.categories;
}

export { productsData };
