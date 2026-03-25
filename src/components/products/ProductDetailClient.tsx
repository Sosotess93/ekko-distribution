"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Package,
  MapPin,
  Clock,
  Drumstick,
  Droplets,
  Egg,
  Coffee,
  ArrowRight,
  Leaf,
  FileText,
  ShoppingBag,
  Shield,
  Weight,
  Box,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/navigation";
import { getProductById, getBrandById, productsData } from "@/data";

const categoryIcons: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  poultry: Drumstick,
  oils: Droplets,
  eggs: Egg,
  beverages: Coffee,
};

export default function ProductDetailClient({
  productId,
}: {
  productId: string;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = getProductById(productId);
  const brand = product ? getBrandById(product.brandId) : null;

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-6">
            <Package size={32} className="text-green/40" />
          </div>
          <h1 className="text-2xl font-bold text-text mb-3 font-heading">
            {locale === "fr" ? "Produit non trouvé" : "Product not found"}
          </h1>
          <p className="text-text-muted mb-6">
            {locale === "fr"
              ? "Ce produit n'existe pas ou a été retiré."
              : "This product doesn't exist or has been removed."}
          </p>
          <Link href="/produits" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            {locale === "fr" ? "Retour aux produits" : "Back to products"}
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const relatedProducts = productsData.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const CategoryIcon = categoryIcons[product.category] || Package;

  const nutritionItems = [
    {
      value: product.nutritionalInfo.energy,
      label: locale === "fr" ? "Énergie" : "Energy",
    },
    {
      value: product.nutritionalInfo.proteins,
      label: locale === "fr" ? "Protéines" : "Proteins",
    },
    {
      value: product.nutritionalInfo.carbs,
      label: locale === "fr" ? "Glucides" : "Carbs",
    },
    {
      value: product.nutritionalInfo.fats,
      label: locale === "fr" ? "Lipides" : "Fats",
    },
    {
      value: product.nutritionalInfo.fiber,
      label: locale === "fr" ? "Fibres" : "Fiber",
    },
  ];

  return (
    <div className="pt-20 bg-background min-h-screen">
      {/* ═══════════════════════════════════════════════════
          HERO BANNER — Green with product identity
      ═══════════════════════════════════════════════════ */}
      <section className="bg-green relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange/5 rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="container-custom mx-auto px-4 py-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <Link
              href="/produits"
              className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft size={14} />
              {t("nav.products")}
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/60">
              {t(`products.categories.${product.category}`)}
            </span>
            <span className="text-white/30">/</span>
            <span className="text-white/80 font-medium truncate">
              {product.name[locale as "fr" | "en"]}
            </span>
          </div>

          {/* Product header info */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <CategoryIcon size={20} className="text-orange" />
                </div>
                <div>
                  {brand && (
                    <Link
                      href={{
                        pathname: "/marques/[slug]" as const,
                        params: { slug: brand.id },
                      }}
                      className="text-sm font-medium text-white/70 hover:text-orange transition-colors cursor-pointer"
                    >
                      {brand.name}
                    </Link>
                  )}
                  <p className="text-xs text-white/50">
                    {t(`products.categories.${product.category}`)}
                  </p>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight">
                {product.name[locale as "fr" | "en"]}
              </h1>
            </motion.div>

            {/* Certifications in hero */}
            {product.certification && product.certification.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-2"
              >
                {product.certification.map((cert) => (
                  <div
                    key={cert}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10"
                  >
                    <Leaf size={14} className="text-orange shrink-0" />
                    <span className="text-sm text-white font-medium">
                      {cert}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PRODUCT CONTENT — Image + Info side by side
      ═══════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20">
        <div className="container-custom mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left: Large Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              {/* Main Image — Large & prominent */}
              <div className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden border border-border shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={product.images[currentImageIndex]}
                      alt={product.name[locale as "fr" | "en"]}
                      fill
                      sizes="(max-width: 768px) 100vw, 55vw"
                      className="object-contain p-10 md:p-16"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg border border-border flex items-center justify-center text-text-muted hover:text-green hover:border-green/30 transition-all cursor-pointer"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg border border-border flex items-center justify-center text-text-muted hover:text-green hover:border-green/30 transition-all cursor-pointer"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail dots / strip */}
              {product.images.length > 1 && (
                <div className="flex items-center justify-center gap-3 mt-6">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        currentImageIndex === index
                          ? "border-orange shadow-md w-16 h-16 md:w-20 md:h-20"
                          : "border-border opacity-60 hover:opacity-100 hover:border-text-dimmed w-14 h-14 md:w-16 md:h-16"
                      }`}
                    >
                      <Image
                        width={80}
                        height={80}
                        src={image}
                        alt=""
                        className="w-full h-full object-contain bg-white p-1.5"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right: Product Info — Sticky */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
            >
              <div className="space-y-8">
                {/* Short Description */}
                <p className="text-text-muted text-lg leading-relaxed">
                  {product.shortDescription[locale as "fr" | "en"]}
                </p>

                {/* Specifications Table */}
                <div className="bg-white rounded-2xl border border-border overflow-hidden">
                  <div className="px-5 py-3.5 bg-green/5 border-b border-border">
                    <h3 className="text-sm font-bold text-green uppercase tracking-wider">
                      {locale === "fr" ? "Fiche technique" : "Specifications"}
                    </h3>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <MapPin size={16} className="text-orange shrink-0" />
                        <span className="text-sm text-text-muted">
                          {locale === "fr" ? "Origine" : "Origin"}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-text">
                        {product.origin}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Clock size={16} className="text-orange shrink-0" />
                        <span className="text-sm text-text-muted">
                          {locale === "fr" ? "Conservation" : "Shelf life"}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-text">
                        {product.shelfLife}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <CategoryIcon size={16} className="text-orange shrink-0" />
                        <span className="text-sm text-text-muted">
                          {locale === "fr" ? "Catégorie" : "Category"}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-text">
                        {t(`products.categories.${product.category}`)}
                      </span>
                    </div>
                    {product.certification && product.certification.length > 0 && (
                      <div className="flex items-center justify-between px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <Shield size={16} className="text-teal shrink-0" />
                          <span className="text-sm text-text-muted">
                            {locale === "fr" ? "Certifications" : "Certifications"}
                          </span>
                        </div>
                        <div className="flex gap-1.5">
                          {product.certification.map((cert) => (
                            <span
                              key={cert}
                              className="px-2 py-0.5 rounded-md bg-teal/10 text-teal text-xs font-semibold"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Packaging Options */}
                <div>
                  <h3 className="text-sm font-bold text-green uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Box size={16} className="text-orange" />
                    {locale === "fr" ? "Conditionnements disponibles" : "Available packaging"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.packaging.map((size) => (
                      <span
                        key={size}
                        className="px-5 py-2.5 rounded-xl bg-white border border-border text-sm font-semibold text-text hover:border-orange/40 hover:bg-orange/5 transition-all cursor-pointer"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 pt-2">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-orange text-white px-6 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:bg-orange-hover hover:shadow-xl hover:shadow-orange/20 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <ShoppingBag size={18} />
                    {locale === "fr" ? "Demander un devis" : "Request a quote"}
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-green/5 text-green px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-green/10 border border-green/15 cursor-pointer"
                  >
                    <FileText size={16} />
                    {locale === "fr" ? "Télécharger la fiche produit" : "Download product sheet"}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          DETAILS SECTION — Description + Nutrition
      ═══════════════════════════════════════════════════ */}
      <section className="bg-surface-alt">
        <div className="container-custom mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Description + Ingredients */}
            <div className="lg:col-span-7 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-8 bg-orange rounded-full" />
                  <h2 className="text-xl font-bold text-text font-heading">
                    Description
                  </h2>
                </div>
                <p className="text-text-muted leading-relaxed text-base">
                  {product.description[locale as "fr" | "en"]}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-8 bg-teal rounded-full" />
                  <h2 className="text-xl font-bold text-text font-heading">
                    {locale === "fr" ? "Ingrédients" : "Ingredients"}
                  </h2>
                </div>
                <p className="text-text-muted leading-relaxed text-base">
                  {product.ingredients[locale as "fr" | "en"]}
                </p>
              </motion.div>
            </div>

            {/* Right: Nutrition Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm sticky top-28">
                <div className="px-6 py-4 bg-green text-white">
                  <h2 className="text-sm font-bold uppercase tracking-wider">
                    {locale === "fr"
                      ? "Valeurs nutritionnelles"
                      : "Nutritional values"}
                  </h2>
                  <p className="text-white/60 text-xs mt-0.5">
                    {locale === "fr" ? "Pour 100g" : "Per 100g"}
                  </p>
                </div>
                <div className="divide-y divide-border">
                  {nutritionItems.map((item, i) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between px-6 py-4 hover:bg-green/3 transition-colors"
                    >
                      <span className="text-sm text-text-muted">
                        {item.label}
                      </span>
                      <span className="text-sm font-bold text-text tabular-nums">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          RELATED PRODUCTS
      ═══════════════════════════════════════════════════ */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container-custom mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-text font-heading">
                  {locale === "fr" ? "Produits similaires" : "Related products"}
                </h2>
                <p className="text-text-muted text-sm mt-1">
                  {locale === "fr"
                    ? "Découvrez d'autres produits de la même catégorie"
                    : "Discover other products in the same category"}
                </p>
              </div>
              <Link
                href="/produits"
                className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-green hover:text-orange transition-colors cursor-pointer"
              >
                {locale === "fr" ? "Tout voir" : "View all"}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={{
                      pathname: "/produits/[slug]" as const,
                      params: {
                        slug: relatedProduct.slug[locale as "fr" | "en"],
                      },
                    }}
                    className="group block cursor-pointer"
                  >
                    <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-border group-hover:border-orange/30 group-hover:shadow-lg group-hover:shadow-orange/5 transition-all duration-300 relative">
                      <Image
                        width={300}
                        height={300}
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name[locale as "fr" | "en"]}
                        className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-green/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="inline-flex items-center gap-1.5 text-white text-xs font-semibold bg-orange px-3 py-1.5 rounded-full">
                          {t("products.details")}
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                    <div className="pt-4 pb-1">
                      <p className="text-xs text-orange font-medium mb-1">
                        {getBrandById(relatedProduct.brandId)?.name}
                      </p>
                      <h3 className="font-semibold text-sm text-text group-hover:text-orange transition-colors leading-snug">
                        {relatedProduct.name[locale as "fr" | "en"]}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile "View all" link */}
            <div className="md:hidden text-center mt-8">
              <Link
                href="/produits"
                className="btn-secondary inline-flex items-center gap-2 text-sm"
              >
                {locale === "fr" ? "Voir tous les produits" : "View all products"}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          BOTTOM CTA BANNER
      ═══════════════════════════════════════════════════ */}
      <section className="bg-green relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-teal/10 rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="container-custom mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-4xl font-bold text-white font-heading mb-4">
                {locale === "fr"
                  ? "Intéressé par ce produit ?"
                  : "Interested in this product?"}
              </h2>
              <p className="text-white/70 text-lg mb-8">
                {locale === "fr"
                  ? "Contactez notre équipe pour obtenir un devis personnalisé et des informations sur les conditions d'exportation."
                  : "Contact our team for a personalized quote and information about export conditions."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-orange text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:bg-orange-hover hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                >
                  {locale === "fr" ? "Demander un devis" : "Request a quote"}
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/produits"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:bg-white/20 border border-white/15 cursor-pointer"
                >
                  {locale === "fr" ? "Explorer le catalogue" : "Explore catalog"}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
