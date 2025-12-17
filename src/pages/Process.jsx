import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Search,
  CheckCircle,
  Truck,
  FileCheck,
  PackageCheck,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

const Process = () => {
  const { t } = useTranslation();

  const steps = [
    { key: "consultation", icon: MessageSquare, color: "bg-orange" },
    { key: "sourcing", icon: Search, color: "bg-teal" },
    { key: "quality", icon: CheckCircle, color: "bg-golden" },
    { key: "logistics", icon: Truck, color: "bg-dark-green" },
    { key: "customs", icon: FileCheck, color: "bg-orange" },
    { key: "delivery", icon: PackageCheck, color: "bg-teal" },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark-green to-teal py-20 md:py-28">
        <div className="container-custom mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("process.title")}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              {t("process.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-beige/30">
        <div className="container-custom mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Timeline Line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-orange via-teal to-dark-green rounded-full" />

            <div className="grid grid-cols-6 gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Step Number */}
                  <div
                    className={`w-12 h-12 mx-auto rounded-full ${step.color} text-white flex items-center justify-center font-bold text-lg shadow-lg relative z-10`}
                  >
                    {index + 1}
                  </div>

                  {/* Content Card */}
                  <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow text-center">
                    <div
                      className={`w-14 h-14 mx-auto mb-4 rounded-xl ${step.color}/10 flex items-center justify-center`}
                    >
                      <step.icon
                        size={28}
                        className={step.color.replace("bg-", "text-")}
                      />
                    </div>
                    <h3 className="font-bold text-dark-green mb-2">
                      {t(`process.steps.${step.key}.title`)}
                    </h3>
                    <p className="text-sm text-dark-green/70">
                      {t(`process.steps.${step.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Timeline */}
          <div className="lg:hidden space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full ${step.color} text-white flex items-center justify-center font-bold text-lg shadow-lg shrink-0`}
                    >
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 h-full bg-gradient-to-b from-dark-green/30 to-transparent my-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl ${step.color}/10 flex items-center justify-center shrink-0`}
                        >
                          <step.icon
                            size={24}
                            className={step.color.replace("bg-", "text-")}
                          />
                        </div>
                        <h3 className="font-bold text-lg text-dark-green">
                          {t(`process.steps.${step.key}.title`)}
                        </h3>
                      </div>
                      <p className="text-dark-green/70">
                        {t(`process.steps.${step.key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark-green mb-4">
              {t("whyUs.title")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {["quality", "logistics", "partnership", "expertise"].map(
              (key, index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-6 bg-beige/30 rounded-2xl"
                >
                  <div className="w-3 h-3 rounded-full bg-orange shrink-0 mt-2" />
                  <div>
                    <h3 className="font-bold text-dark-green mb-2">
                      {t(`whyUs.${key}.title`)}
                    </h3>
                    <p className="text-dark-green/70">
                      {t(`whyUs.${key}.description`)}
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-dark-green to-teal">
        <div className="container-custom mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-white/80 text-lg mb-8">{t("cta.subtitle")}</p>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              {t("cta.button")}
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Process;
