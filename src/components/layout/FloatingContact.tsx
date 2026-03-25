"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowRight, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("floatingContact");

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-72 rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/10 p-5 mb-2"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs text-emerald-600 font-medium">
                {t("available")}
              </span>
            </div>

            <h3 className="text-base font-semibold text-gray-900 mb-1">
              {t("title")}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {t("subtitle")}
            </p>

            <div className="space-y-2">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between w-full rounded-xl bg-green hover:bg-green-light px-4 py-2.5 text-sm font-medium text-white transition-colors group"
              >
                <span>{t("cta")}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <a
                href="mailto:contact@ekko-distribution.com"
                className="flex items-center gap-2.5 w-full rounded-xl border border-gray-200 hover:border-green/50 px-4 py-2.5 text-sm text-gray-500 hover:text-gray-900 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>contact@ekko-distribution.com</span>
              </a>

              <a
                href="tel:+33123456789"
                className="flex items-center gap-2.5 w-full rounded-xl border border-gray-200 hover:border-green/50 px-4 py-2.5 text-sm text-gray-500 hover:text-gray-900 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>{t("call")}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-orange hover:bg-orange/90 text-white shadow-lg shadow-orange/25 transition-all hover:shadow-orange/40 hover:scale-105"
        aria-label={isOpen ? "Close" : "Contact"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
