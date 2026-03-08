"use client";

import { motion } from "framer-motion";
import { Award, Truck, Handshake, Globe2 } from "lucide-react";
import { useTranslations } from "next-intl";

const features = [
  { icon: Award, key: "quality" },
  { icon: Truck, key: "logistics" },
  { icon: Handshake, key: "partnership" },
  { icon: Globe2, key: "expertise" },
];

export default function WhyUsSection() {
  const t = useTranslations();

  return (
    <section className="section-padding bg-surface-alt">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-green mb-4">
            {t("whyUs.title")}
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            {t("whyUs.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-8 border border-border hover:border-orange/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg hover:shadow-orange/5"
            >
              <div className="w-14 h-14 bg-green/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange/10 transition-colors duration-300">
                <feature.icon size={28} className="text-green group-hover:text-orange transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">
                {t(`whyUs.${feature.key}.title`)}
              </h3>
              <p className="text-text-muted leading-relaxed">
                {t(`whyUs.${feature.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
