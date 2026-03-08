"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getAllProducts, getCategories } from "@/data";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function CategoriesSection() {
  const t = useTranslations();
  const locale = useLocale();
  const products = getAllProducts().slice(0, 6);
  const categories = getCategories();

  return (
    <section className="section-padding bg-background">
      <div className="container-custom mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-8 bg-orange rounded-full" />
              <p className="text-sm font-semibold text-orange uppercase tracking-wider">
                {locale === "fr" ? "Notre catalogue" : "Our catalog"}
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-green font-heading tracking-tight">
              {t("products.title")}
            </h2>
            <p className="text-text-muted text-lg mt-2 max-w-lg">
              {t("products.subtitle")}
            </p>
          </div>
          <Link
            href="/produits"
            className="group inline-flex items-center gap-2 bg-green text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-green-light hover:shadow-lg hover:-translate-y-0.5 shrink-0"
          >
            {t("products.viewAll")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href="/produits"
              className="px-4 py-2 rounded-full bg-white border border-border text-sm font-medium text-text hover:border-orange/40 hover:bg-orange/5 hover:text-orange transition-all"
            >
              {t(`products.categories.${category.id}`)}
            </Link>
          ))}
        </motion.div>

        {/* Product Grid — 2 large + 4 small */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {products.map((product, index) => {
            const isLarge = index < 2;
            return (
              <motion.div
                key={product.id}
                variants={fadeUp}
                className={isLarge ? "col-span-2 md:col-span-2" : "col-span-1"}
              >
                <Link
                  href={{
                    pathname: "/produits/[slug]" as const,
                    params: { slug: product.slug[locale as "fr" | "en"] },
                  }}
                  className={`group relative block bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-green/5 hover:-translate-y-1 hover:border-orange/30 ${
                    isLarge ? "aspect-[4/3]" : "aspect-square"
                  }`}
                >
                  {/* Product Image */}
                  <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
                    <Image
                      src={product.images[0]}
                      alt={product.name[locale as "fr" | "en"]}
                      width={400}
                      height={400}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-green/90 via-green/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-bold text-sm md:text-base font-heading leading-tight">
                      {product.name[locale as "fr" | "en"]}
                    </p>
                    <p className="text-white/60 text-xs mt-1 line-clamp-1">
                      {product.shortDescription[locale as "fr" | "en"]}
                    </p>
                  </div>

                  {/* Arrow icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <ArrowUpRight size={14} className="text-green" />
                  </div>

                  {/* Category tag — always visible */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-green uppercase tracking-wide border border-border/50">
                      {t(`products.categories.${product.category}`)}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA — mobile only */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center md:hidden"
        >
          <Link
            href="/produits"
            className="inline-flex items-center gap-2 text-orange font-semibold text-sm hover:underline"
          >
            {t("products.viewAll")}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
