import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Award,
  Truck,
  Handshake,
  Globe2,
  ArrowRight,
  Wheat,
  Droplets,
  Package,
  Coffee,
} from "lucide-react";
import productsData from "../data/products.json";

const Home = () => {
  const { t, i18n } = useTranslation();

  const features = [
    { icon: Award, key: "quality" },
    { icon: Truck, key: "logistics" },
    { icon: Handshake, key: "partnership" },
    { icon: Globe2, key: "expertise" },
  ];

  const stats = [
    { value: "25+", key: "countries" },
    { value: "500+", key: "products" },
    { value: "1000+", key: "clients" },
    { value: "15+", key: "experience" },
  ];

  const categoryIcons = {
    beverages: Coffee,
    canned: Package,
    condiments: Droplets,
    grains: Wheat,
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
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
                  to="/products"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  {t("hero.cta")}
                  <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn-outline">
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

      {/* Stats Section */}
      <section className="py-16 bg-dark-green">
        <div className="container-custom mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-orange mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80">{t(`stats.${stat.key}`)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark-green mb-4">
              {t("products.title")}
            </h2>
            <p className="text-dark-green/70 max-w-2xl mx-auto">
              {t("products.subtitle")}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
            {productsData.categories.map((category, index) => {
              const Icon = categoryIcons[category.id] || Package;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer w-[calc(50%-0.5rem)] sm:w-44"
                >
                  <div className="bg-beige/50 rounded-2xl p-6 text-center transition-all duration-300 group-hover:bg-orange/10 group-hover:shadow-lg group-hover:-translate-y-1 h-full">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:bg-orange/20 transition-colors">
                      <Icon
                        size={28}
                        className="text-dark-green group-hover:text-orange transition-colors"
                      />
                    </div>
                    <h3 className="font-semibold text-dark-green">
                      {t(`products.categories.${category.id}`)}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="btn-secondary inline-flex items-center gap-2"
            >
              {t("products.viewAll")}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-beige">
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
            <p className="text-dark-green/70 max-w-2xl mx-auto">
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
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange transition-colors">
                  <feature.icon
                    size={28}
                    className="text-orange group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="text-xl font-bold text-dark-green mb-3">
                  {t(`whyUs.${feature.key}.title`)}
                </h3>
                <p className="text-dark-green/70">
                  {t(`whyUs.${feature.key}.description`)}
                </p>
              </motion.div>
            ))}
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

export default Home;
