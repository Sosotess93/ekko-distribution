import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  Package,
  Wheat,
  Droplets,
  Coffee,
} from "lucide-react";
import productsData from "../data/products.json";

const BrandDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const brand = productsData.brands.find((b) => b.id === id);
  const brandProducts = productsData.products.filter((p) => p.brandId === id);

  const categoryIcons = {
    beverages: Coffee,
    canned: Package,
    condiments: Droplets,
    grains: Wheat,
  };

  if (!brand) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-beige/30">
        <div className="text-center">
          <Package size={64} className="mx-auto text-dark-green/30 mb-4" />
          <h1 className="text-2xl font-bold text-dark-green mb-4">
            {i18n.language === "fr" ? "Marque non trouvée" : "Brand not found"}
          </h1>
          <Link to="/brands" className="btn-primary">
            {i18n.language === "fr"
              ? "Voir toutes les marques"
              : "View all brands"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-beige/30 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-beige">
        <div className="container-custom mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-dark-green/60 hover:text-orange transition-colors"
            >
              {t("nav.home")}
            </Link>
            <span className="text-dark-green/40">/</span>
            <Link
              to="/brands"
              className="text-dark-green/60 hover:text-orange transition-colors"
            >
              {t("nav.brands")}
            </Link>
            <span className="text-dark-green/40">/</span>
            <span className="text-dark-green font-medium">{brand.name}</span>
          </div>
        </div>
      </div>

      {/* Brand Header */}
      <section className="bg-gradient-to-br from-dark-green to-teal py-16">
        <div className="container-custom mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            {i18n.language === "fr" ? "Retour" : "Back"}
          </button>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Brand Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center"
            >
              <div className="w-40 h-40 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-6xl font-bold text-white">
                  {brand.name.charAt(0)}
                </span>
              </div>
            </motion.div>

            {/* Brand Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:col-span-2 text-white"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {brand.name}
              </h1>
              <p className="text-white/80 text-lg mb-6">
                {brand.description[i18n.language]}
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-orange" />
                  <span>{brand.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-orange" />
                  <span>
                    {i18n.language === "fr"
                      ? `Fondée en ${brand.founded}`
                      : `Founded in ${brand.founded}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Package size={20} className="text-orange" />
                  <span>
                    {brandProducts.length}{" "}
                    {i18n.language === "fr" ? "produits" : "products"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding">
        <div className="container-custom mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-green mb-8">
            {i18n.language === "fr"
              ? `Produits ${brand.name}`
              : `${brand.name} Products`}
          </h2>

          {brandProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandProducts.map((product, index) => {
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/products/${product.id}`}
                      className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
                    >
                      {/* Product Image */}
                      <div className="h-48 bg-white flex items-center justify-center relative overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name[i18n.language]}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-dark-green/0 group-hover:bg-dark-green/5 transition-colors" />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full bg-orange/10 text-orange text-xs font-medium">
                            {t(`products.categories.${product.category}`)}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-dark-green mb-2 group-hover:text-orange transition-colors">
                          {product.name[i18n.language]}
                        </h3>
                        <p className="text-dark-green/70 mb-4 line-clamp-2">
                          {product.shortDescription[i18n.language]}
                        </p>
                        <div className="flex items-center gap-2 text-orange font-semibold">
                          {t("products.details")}
                          <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl">
              <Package size={64} className="mx-auto text-dark-green/20 mb-4" />
              <p className="text-dark-green/60">
                {i18n.language === "fr"
                  ? "Aucun produit disponible pour cette marque"
                  : "No products available for this brand"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Other Brands */}
      <section className="section-padding bg-white">
        <div className="container-custom mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-green mb-8">
            {i18n.language === "fr" ? "Autres marques" : "Other brands"}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {productsData.brands
              .filter((b) => b.id !== brand.id)
              .slice(0, 3)
              .map((otherBrand) => (
                <Link
                  key={otherBrand.id}
                  to={`/brands/${otherBrand.id}`}
                  className="block p-6 bg-beige/30 rounded-2xl hover:bg-beige transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-dark-green rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-xl font-bold text-white">
                        {otherBrand.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-dark-green group-hover:text-orange transition-colors">
                        {otherBrand.name}
                      </h3>
                      <p className="text-sm text-dark-green/60">
                        {otherBrand.country}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandDetail;
