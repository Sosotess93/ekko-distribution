import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar, Package } from "lucide-react";
import productsData from "../data/products.json";

const Brands = () => {
  const { t, i18n } = useTranslation();

  // Count products per brand
  const getProductCount = (brandId) => {
    return productsData.products.filter((p) => p.brandId === brandId).length;
  };

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
              {t("brands.title")}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              {t("brands.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="section-padding bg-beige/30">
        <div className="container-custom mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {productsData.brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/brands/${brand.id}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="grid md:grid-cols-3">
                    {/* Brand Logo Area */}
                    <div className="bg-gradient-to-br from-dark-green to-teal p-8 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">
                          {brand.name.charAt(0)}
                        </span>
                      </div>
                    </div>

                    {/* Brand Info */}
                    <div className="md:col-span-2 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-2xl font-bold text-dark-green group-hover:text-orange transition-colors">
                          {brand.name}
                        </h2>
                        <ArrowRight
                          size={24}
                          className="text-dark-green/30 group-hover:text-orange group-hover:translate-x-1 transition-all"
                        />
                      </div>

                      <p className="text-dark-green/70 mb-6 line-clamp-2">
                        {brand.description[i18n.language]}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-dark-green/60">
                          <MapPin size={16} className="text-orange" />
                          {brand.country}
                        </div>
                        <div className="flex items-center gap-2 text-dark-green/60">
                          <Calendar size={16} className="text-orange" />
                          {i18n.language === "fr"
                            ? `Depuis ${brand.founded}`
                            : `Since ${brand.founded}`}
                        </div>
                        <div className="flex items-center gap-2 text-dark-green/60">
                          <Package size={16} className="text-orange" />
                          {getProductCount(brand.id)}{" "}
                          {i18n.language === "fr" ? "produits" : "products"}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
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
              {i18n.language === "fr"
                ? "Vous êtes une marque ?"
                : "Are you a brand?"}
            </h2>
            <p className="text-white/80 text-lg mb-8">
              {i18n.language === "fr"
                ? "Rejoignez notre réseau de distribution et accédez aux marchés africains."
                : "Join our distribution network and access African markets."}
            </p>
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

export default Brands;
