"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CTASection() {
  const t = useTranslations();

  return (
    <section className="py-20 md:py-28 px-4 md:px-8 bg-green">
      <div className="container-custom mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-white/80 text-lg mb-10">{t("cta.subtitle")}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-orange text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-orange-hover hover:shadow-xl hover:-translate-y-0.5"
          >
            {t("cta.button")}
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
