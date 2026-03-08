"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wheat,
  Droplets,
  Package,
  Coffee,
  Search,
  ArrowRight,
  SlidersHorizontal,
  X,
  ChevronDown,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { productsData } from "@/data";

const categoryIcons: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  beverages: Coffee,
  canned: Package,
  condiments: Droplets,
  grains: Wheat,
};

export default function ProductsClient() {
  const t = useTranslations();
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeBrand, setActiveBrand] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  const getBrandName = (brandId: string) => {
    const brand = productsData.brands.find((b) => b.id === brandId);
    return brand ? brand.name : "";
  };

  const filteredProducts = useMemo(() => {
    return productsData.products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const matchesBrand =
        activeBrand === "all" || product.brandId === activeBrand;
      const matchesSearch = product.name[locale as "fr" | "en"]
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesBrand && matchesSearch;
    });
  }, [activeCategory, activeBrand, searchQuery, locale]);

  const hasActiveFilters =
    activeCategory !== "all" || activeBrand !== "all" || searchQuery !== "";

  const clearFilters = () => {
    setActiveCategory("all");
    setActiveBrand("all");
    setSearchQuery("");
  };

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Page Header — Minimal & Clean */}
      <section className="pt-16 pb-8">
        <div className="container-custom mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-text font-heading tracking-tight">
              {t("products.title")}
            </h1>
            <p className="text-text-muted text-lg mt-3 max-w-xl">
              {t("products.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar — Sticky, unified */}
      <section className="sticky top-20 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container-custom mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-dimmed"
              />
              <input
                type="text"
                placeholder={
                  locale === "fr" ? "Rechercher un produit..." : "Search products..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface border border-border text-text text-sm placeholder:text-text-dimmed focus:outline-none focus:border-orange/60 focus:ring-1 focus:ring-orange/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dimmed hover:text-text cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-border" />

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-orange text-white"
                    : "text-text-muted hover:text-text hover:bg-surface-light"
                }`}
              >
                {locale === "fr" ? "Tous" : "All"}
              </button>
              {productsData.categories.map((category) => {
                const Icon = categoryIcons[category.id] || Package;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      activeCategory === category.id
                        ? "bg-orange text-white"
                        : "text-text-muted hover:text-text hover:bg-surface-light"
                    }`}
                  >
                    <Icon size={15} />
                    {t(`products.categories.${category.id}`)}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-border" />

            {/* Brand Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowBrandDropdown(!showBrandDropdown)}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border cursor-pointer ${
                  activeBrand !== "all"
                    ? "bg-orange/10 border-orange/30 text-orange"
                    : "border-border text-text-muted hover:text-text hover:bg-surface-light"
                }`}
              >
                <SlidersHorizontal size={15} />
                {activeBrand !== "all"
                  ? getBrandName(activeBrand)
                  : locale === "fr"
                  ? "Marque"
                  : "Brand"}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    showBrandDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {showBrandDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-xl shadow-black/10 overflow-hidden z-50"
                  >
                    <button
                      onClick={() => {
                        setActiveBrand("all");
                        setShowBrandDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                        activeBrand === "all"
                          ? "bg-orange/10 text-orange"
                          : "text-text-muted hover:bg-surface-light hover:text-text"
                      }`}
                    >
                      {t("products.allBrands")}
                    </button>
                    {productsData.brands.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => {
                          setActiveBrand(brand.id);
                          setShowBrandDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                          activeBrand === brand.id
                            ? "bg-orange/10 text-orange"
                            : "text-text-muted hover:bg-surface-light hover:text-text"
                        }`}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Clear filters */}
            <AnimatePresence>
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-text-muted hover:text-text transition-colors cursor-pointer"
                >
                  <X size={14} />
                  {locale === "fr" ? "Effacer" : "Clear"}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container-custom mx-auto px-4">
          {/* Result count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-text-dimmed">
              {filteredProducts.length}{" "}
              {locale === "fr" ? "produit(s)" : "product(s)"}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <Link
                    href={{
                      pathname: "/produits/[slug]" as const,
                      params: {
                        slug: product.slug[locale as "fr" | "en"],
                      },
                    }}
                    className="group block cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="aspect-square bg-surface rounded-2xl overflow-hidden border border-border group-hover:border-orange/30 transition-all duration-300 relative">
                      <Image
                        width={500}
                        height={500}
                        src={product.images[0]}
                        alt={product.name[locale as "fr" | "en"]}
                        className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-green/70 via-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="inline-flex items-center gap-1.5 text-white text-sm font-medium">
                          {t("products.details")}
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="pt-4 pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-orange">
                          {t(`products.categories.${product.category}`)}
                        </span>
                        <span className="text-text-dimmed text-xs">&middot;</span>
                        <span className="text-xs text-text-dimmed">
                          {getBrandName(product.brandId)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-text group-hover:text-orange transition-colors duration-200 text-sm md:text-base leading-snug">
                        {product.name[locale as "fr" | "en"]}
                      </h3>
                      <p className="text-text-muted text-xs md:text-sm mt-1.5 line-clamp-2 hidden md:block">
                        {product.shortDescription[locale as "fr" | "en"]}
                      </p>
                      <div className="flex gap-1.5 mt-3">
                        {product.packaging.slice(0, 3).map((size) => (
                          <span
                            key={size}
                            className="px-2 py-0.5 rounded text-[11px] text-text-dimmed bg-surface border border-border"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mx-auto mb-4">
                <Package size={28} className="text-text-dimmed" />
              </div>
              <p className="text-text-muted mb-1">
                {locale === "fr"
                  ? "Aucun produit trouv\u00e9"
                  : "No products found"}
              </p>
              <button
                onClick={clearFilters}
                className="text-orange text-sm hover:underline cursor-pointer mt-2"
              >
                {locale === "fr" ? "Effacer les filtres" : "Clear filters"}
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
