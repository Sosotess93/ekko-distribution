"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const stats = [
  { value: "15+", key: "countries" },
  { value: "10+", key: "products" },
  { value: "100%", key: "clients" },
  { value: "5+", key: "experience" },
];

export default function StatsSection() {
  const t = useTranslations();

  return (
    <section className="py-20 bg-green">
      <div className="container-custom mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-orange mb-2 font-heading">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm uppercase tracking-wider">
                {t(`stats.${stat.key}`)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
