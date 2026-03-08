export interface LocalizedString {
  fr: string;
  en: string;
}

export interface Brand {
  id: string;
  name: string;
  slogan: string;
  logo: string;
  description: LocalizedString;
  country: string;
  founded: string;
}

export interface Category {
  id: string;
  icon: string;
}

export interface NutritionalInfo {
  energy: string;
  proteins: string;
  carbs: string;
  fats: string;
  fiber: string;
}

export interface Product {
  id: string;
  slug: LocalizedString;
  brandId: string;
  category: string;
  images: string[];
  name: LocalizedString;
  shortDescription: LocalizedString;
  description: LocalizedString;
  ingredients: LocalizedString;
  nutritionalInfo: NutritionalInfo;
  packaging: string[];
  origin: string;
  certification: string[];
  shelfLife: string;
  reference?: string;
  netWeight?: string;
  drainedWeight?: string;
}

export interface ProductsData {
  brands: Brand[];
  categories: Category[];
  products: Product[];
}
