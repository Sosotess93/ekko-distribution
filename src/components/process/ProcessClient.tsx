"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Search,
  CheckCircle,
  Truck,
  FileCheck,
  PackageCheck,
  ArrowRight,
  Zap,
  Shield,
  Handshake,
  Globe,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const steps = [
  { key: "consultation", icon: MessageSquare, accent: "orange" },
  { key: "sourcing", icon: Search, accent: "teal" },
  { key: "quality", icon: CheckCircle, accent: "orange" },
  { key: "logistics", icon: Truck, accent: "teal" },
  { key: "customs", icon: FileCheck, accent: "orange" },
  { key: "delivery", icon: PackageCheck, accent: "teal" },
] as const;

const benefits = [
  { key: "quality", icon: Shield },
  { key: "logistics", icon: Zap },
  { key: "partnership", icon: Handshake },
  { key: "expertise", icon: Globe },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ProcessClient() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="pt-20 bg-background min-h-screen">
      {/* ═══════════════════════════════════════════════════
          HEADER — Minimal, cohérent avec les autres pages
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
                {locale === "fr" ? "Comment ça marche" : "How it works"}
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text font-heading tracking-tight">
              {t("process.title")}
            </h1>
            <p className="text-text-muted text-lg mt-3 max-w-xl">
              {t("process.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TIMELINE — Alternating cards with giant numbers
      ═══════════════════════════════════════════════════ */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom mx-auto px-4">
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line — desktop only */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange via-teal to-green" />

            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              const Icon = step.icon;
              const isOrange = step.accent === "orange";

              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 30, x: isLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`relative flex items-start gap-6 md:gap-0 mb-8 md:mb-12 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* ── Center dot (desktop) ── */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 z-10">
                    <div
                      className={`w-4 h-4 rounded-full border-[3px] ${
                        isOrange
                          ? "border-orange bg-orange/20"
                          : "border-teal bg-teal/20"
                      }`}
                    />
                  </div>

                  {/* ── Mobile dot + line ── */}
                  <div className="flex md:hidden flex-col items-center shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        isOrange ? "bg-orange" : "bg-teal"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-px h-full min-h-[60px] bg-border mt-2" />
                    )}
                  </div>

                  {/* ── Card ── */}
                  <div
                    className={`flex-1 md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="group relative bg-white rounded-2xl p-6 md:p-7 border border-border hover:border-orange/30 hover:shadow-xl hover:shadow-orange/5 hover:-translate-y-1 transition-all duration-300">
                      {/* Giant number */}
                      <span
                        className={`absolute top-4 font-heading font-bold text-[80px] md:text-[100px] leading-none pointer-events-none select-none ${
                          isOrange ? "text-orange/[0.04]" : "text-teal/[0.06]"
                        } ${isLeft ? "right-4" : "right-4 md:left-4 md:right-auto"}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="relative z-10">
                        {/* Icon + Step number */}
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                              isOrange
                                ? "bg-orange/10 text-orange"
                                : "bg-teal/10 text-teal"
                            }`}
                          >
                            <Icon size={22} />
                          </div>
                          <span
                            className={`text-xs font-bold uppercase tracking-widest ${
                              isOrange ? "text-orange/60" : "text-teal/60"
                            }`}
                          >
                            {locale === "fr" ? "Étape" : "Step"} {index + 1}
                          </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-text font-heading mb-2">
                          {t(`process.steps.${step.key}.title`)}
                        </h3>
                        <p className="text-text-muted text-sm leading-relaxed">
                          {t(`process.steps.${step.key}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ── Spacer for the other side (desktop) ── */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          POURQUOI NOUS — Bento grid
      ═══════════════════════════════════════════════════ */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-8 bg-teal rounded-full" />
              <p className="text-sm font-semibold text-teal uppercase tracking-wider">
                {locale === "fr" ? "Nos atouts" : "Our strengths"}
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text font-heading tracking-tight">
              {t("whyUs.title")}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              const isWide = index === 0 || index === 3;

              return (
                <motion.div
                  key={benefit.key}
                  variants={fadeUp}
                  className={isWide ? "sm:col-span-2 md:col-span-1" : ""}
                >
                  <div className="group relative bg-white rounded-2xl p-6 md:p-7 border border-border hover:border-orange/30 hover:shadow-lg hover:shadow-orange/5 transition-all duration-300 h-full overflow-hidden">
                    {/* Decorative gradient */}
                    <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-orange/5 to-teal/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center mb-5">
                        <Icon size={24} className="text-green" />
                      </div>
                      <h3 className="text-lg font-bold text-text font-heading mb-2">
                        {t(`whyUs.${benefit.key}.title`)}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {t(`whyUs.${benefit.key}.description`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA — Cohérent avec les autres pages
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
              {t("cta.title")}
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-orange text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:bg-orange-hover hover:shadow-xl hover:-translate-y-0.5"
              >
                {t("cta.button")}
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/produits"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:bg-white/20 border border-white/15"
              >
                {locale === "fr" ? "Voir nos produits" : "View our products"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
