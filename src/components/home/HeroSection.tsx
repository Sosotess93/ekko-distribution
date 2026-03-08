"use client";

import { motion } from "framer-motion";
import { Globe2, ArrowRight, Wheat, Droplets, Package, Coffee } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HeroSection() {
  const t = useTranslations();

  return (
    <section className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-beige via-beige to-orange/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-dark-green blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-orange blur-3xl" />
      </div>

      <div className="container-custom mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-green/10 text-dark-green">
              <Globe2 size={18} />
              <span className="text-sm font-medium">
                Africa Food Export Partner
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-green leading-tight">
              {t("hero.title")}
            </h1>

            <p className="text-lg text-dark-green/70 max-w-xl">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/produits"
                className="btn-primary inline-flex items-center gap-2"
              >
                {t("hero.cta")}
                <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="btn-outline">
                {t("hero.cta_secondary")}
              </Link>
            </div>
          </motion.div>

          {/* Hero Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-dark-green/20 animate-spin-slow" />
              <div className="absolute inset-8 rounded-full border-2 border-orange/30" />

              {/* Center content */}
              <div className="absolute inset-16 rounded-full bg-white shadow-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-dark-green rounded-full flex items-center justify-center">
                    <svg
                      viewBox="0 0 60 60"
                      className="w-16 h-16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30 6C22 6 17 12 14 18C11 24 8 30 11 36C14 42 20 48 27 51C30 52 33 52 36 51C42 48 48 42 51 36C54 30 51 21 45 15C39 9 34 6 30 6Z"
                        fill="#F5E6C8"
                      />
                      <path
                        d="M30 20V40M25 26L30 20L35 26M23 32L30 26L37 32"
                        stroke="#F1C40F"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-dark-green">Ekko</h3>
                  <p className="text-teal font-medium">Distribution</p>
                </div>
              </div>

              {/* Floating product icons */}
              {[Wheat, Droplets, Package, Coffee].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="absolute w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center"
                  style={{
                    top: `${20 + index * 20}%`,
                    left: index % 2 === 0 ? "-5%" : "85%",
                  }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  <Icon size={24} className="text-orange" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-dark-green/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-dark-green/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
