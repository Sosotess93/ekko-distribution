"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Package,
  Quote,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { productsData, getProductsByBrand } from "@/data";

const getProductCount = (brandId: string) => {
  return getProductsByBrand(brandId).length;
};

const getBrandProducts = (brandId: string) => {
  return getProductsByBrand(brandId).slice(0, 3);
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BrandsClient() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="pt-20 bg-background min-h-screen">
      {/* ═══════════════════════════════════════════════════
          PAGE HEADER — Minimal, no hero banner
      ═══════════════════════════════════════════════════ */}
      <section className="pt-16 pb-8">
        <div className="container-custom mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-10 bg-orange rounded-full" />
              <p className="text-sm font-semibold text-orange uppercase tracking-wider">
                {locale === "fr" ? "Nos partenaires" : "Our partners"}
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text font-heading tracking-tight">
              {t("brands.title")}
            </h1>
            <p className="text-text-muted text-lg mt-3 max-w-xl">
              {t("brands.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          BENTO GRID — Per brand
      ═══════════════════════════════════════════════════ */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom mx-auto px-4">
          {productsData.brands.map((brand, brandIndex) => {
            const products = getBrandProducts(brand.id);
            const productCount = getProductCount(brand.id);

            return (
              <motion.div
                key={brand.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={stagger}
                className={`${brandIndex > 0 ? "mt-16 pt-16 border-t border-border" : "mt-8"}`}
              >
                {/* Bento Grid — 4 columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

                  {/* ── Bloc Principal : Logo + Nom + Description (2x2) ── */}
                  <motion.div variants={fadeUp} className="col-span-2 row-span-2">
                    <Link
                      href={{
                        pathname: "/marques/[slug]" as const,
                        params: { slug: brand.id },
                      }}
                      className="group relative bg-green rounded-3xl p-7 md:p-8 flex flex-col justify-between overflow-hidden h-full min-h-[320px] cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-green/20 hover:-translate-y-1"
                    >
                      {/* Decorative circles */}
                      <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal/15 rounded-full" />
                      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-orange/10 rounded-full" />

                      <div className="relative z-10">
                        <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-5 border border-white/10">
                          <span className="text-xl font-bold text-white font-heading">
                            {brand.name.charAt(0)}
                          </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-3">
                          {brand.name}
                        </h2>
                        <p className="text-white/65 text-sm leading-relaxed line-clamp-3 max-w-sm">
                          {brand.description[locale as "fr" | "en"]}
                        </p>
                      </div>

                      <div className="relative z-10 flex items-center gap-2 text-white/50 group-hover:text-orange transition-colors mt-6">
                        <span className="text-sm font-medium">
                          {locale === "fr" ? "Découvrir la marque" : "Discover brand"}
                        </span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>

                  {/* ── Bloc Pays ── */}
                  <motion.div variants={fadeUp} className="col-span-1">
                    <div className="bg-white rounded-3xl p-5 border border-border flex flex-col justify-between h-full min-h-[150px] hover:border-orange/30 transition-colors">
                      <MapPin size={20} className="text-orange" />
                      <div>
                        <p className="text-xl md:text-2xl font-bold text-text font-heading">{brand.country}</p>
                        <p className="text-text-muted text-xs mt-0.5">
                          {locale === "fr" ? `Depuis ${brand.founded}` : `Since ${brand.founded}`}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* ── Bloc Compteur Produits ── */}
                  <motion.div variants={fadeUp} className="col-span-1">
                    <Link
                      href={{
                        pathname: "/marques/[slug]" as const,
                        params: { slug: brand.id },
                      }}
                      className="group bg-orange/5 rounded-3xl p-5 border border-orange/15 flex flex-col justify-between h-full min-h-[150px] hover:bg-orange/10 transition-colors cursor-pointer"
                    >
                      <Package size={20} className="text-orange" />
                      <div>
                        <p className="text-3xl md:text-4xl font-bold text-orange font-heading">{productCount}</p>
                        <p className="text-text-muted text-xs mt-0.5">
                          {locale === "fr" ? "Produits disponibles" : "Products available"}
                        </p>
                      </div>
                    </Link>
                  </motion.div>

                  {/* ── Bloc Slogan ── */}
                  <motion.div variants={fadeUp} className="col-span-1">
                    <div className="bg-surface-alt rounded-3xl p-5 border border-border flex flex-col justify-between h-full min-h-[150px]">
                      <Quote size={16} className="text-teal/40" />
                      <p className="text-sm md:text-base font-semibold text-green italic leading-snug font-heading">
                        &ldquo;{brand.slogan}&rdquo;
                      </p>
                    </div>
                  </motion.div>

                  {/* ── Bloc CTA Devis ── */}
                  <motion.div variants={fadeUp} className="col-span-1">
                    <Link
                      href="/contact"
                      className="group bg-orange rounded-3xl p-5 flex flex-col justify-between h-full min-h-[150px] cursor-pointer hover:shadow-xl hover:shadow-orange/20 hover:-translate-y-1 transition-all"
                    >
                      <Sparkles size={20} className="text-white/60" />
                      <div>
                        <p className="text-white font-bold text-sm leading-tight">
                          {locale === "fr" ? "Demander\nun devis" : "Request\na quote"}
                        </p>
                        <ArrowRight size={16} className="text-white/60 mt-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>

                  {/* ── Bloc Produits Preview (spans 2 cols) ── */}
                  <motion.div variants={fadeUp} className="col-span-2">
                    <div className="bg-white rounded-3xl p-5 md:p-6 border border-border h-full min-h-[180px] flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-xs font-bold text-green uppercase tracking-wider">
                          {locale === "fr" ? "Aperçu produits" : "Products preview"}
                        </p>
                        <Link
                          href={{
                            pathname: "/marques/[slug]" as const,
                            params: { slug: brand.id },
                          }}
                          className="text-xs text-orange font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          {locale === "fr" ? "Tout voir" : "See all"}
                          <ExternalLink size={10} />
                        </Link>
                      </div>
                      <div className="flex items-center gap-3 flex-1">
                        {products.map((product) => (
                          <Link
                            key={product.id}
                            href={{
                              pathname: "/produits/[slug]" as const,
                              params: { slug: product.slug[locale as "fr" | "en"] },
                            }}
                            className="group/item flex-1 aspect-square max-h-[120px] bg-surface-alt rounded-2xl border border-border hover:border-orange/30 hover:shadow-md transition-all overflow-hidden cursor-pointer"
                          >
                            <Image
                              width={200}
                              height={200}
                              src={product.images[0]}
                              alt={product.name[locale as "fr" | "en"]}
                              className="w-full h-full object-contain p-3 group-hover/item:scale-110 transition-transform duration-300"
                            />
                          </Link>
                        ))}
                        {products.length === 0 && (
                          <div className="flex-1 flex items-center justify-center text-text-dimmed text-sm">
                            {locale === "fr" ? "Bientôt disponible" : "Coming soon"}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA SECTION — "Vous êtes une marque ?"
      ═══════════════════════════════════════════════════ */}
      <section className="bg-green relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange/5 rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="container-custom mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white font-heading mb-5">
              {locale === "fr"
                ? "Vous êtes une marque ?"
                : "Are you a brand?"}
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              {locale === "fr"
                ? "Rejoignez notre réseau de distribution et accédez aux marchés africains."
                : "Join our distribution network and access African markets."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-orange text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:bg-orange-hover hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                {t("cta.button")}
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/processus"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:bg-white/20 border border-white/15 cursor-pointer"
              >
                {locale === "fr" ? "Notre processus" : "Our process"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
