import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Package,
  MapPin,
  Clock,
  Award,
  ShoppingBag,
  Info,
  Wheat,
  Droplets,
  Coffee,
} from "lucide-react";
import productsData from "../data/products.json";

const ProductDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  const product = productsData.products.find((p) => p.id === id);
  const brand = product
    ? productsData.brands.find((b) => b.id === product.brandId)
    : null;

  const categoryIcons = {
    beverages: Coffee,
    canned: Package,
    condiments: Droplets,
    grains: Wheat,
  };

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-beige/30">
        <div className="text-center">
          <Package size={64} className="mx-auto text-dark-green/30 mb-4" />
          <h1 className="text-2xl font-bold text-dark-green mb-4">
            {i18n.language === "fr"
              ? "Produit non trouvé"
              : "Product not found"}
          </h1>
          <Link to="/products" className="btn-primary">
            {i18n.language === "fr"
              ? "Retour aux produits"
              : "Back to products"}
          </Link>
        </div>
      </div>
    );
  }

  const CategoryIcon = categoryIcons[product.category] || Package;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const tabs = [
    {
      id: "description",
      label: i18n.language === "fr" ? "Description" : "Description",
    },
    {
      id: "ingredients",
      label: i18n.language === "fr" ? "Ingrédients" : "Ingredients",
    },
    {
      id: "nutrition",
      label: i18n.language === "fr" ? "Nutrition" : "Nutrition",
    },
  ];

  // Related products (same category, different product)
  const relatedProducts = productsData.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

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
              to="/products"
              className="text-dark-green/60 hover:text-orange transition-colors"
            >
              {t("nav.products")}
            </Link>
            <span className="text-dark-green/40">/</span>
            <span className="text-dark-green font-medium">
              {product.name[i18n.language]}
            </span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="section-padding">
        <div className="container-custom mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-dark-green/70 hover:text-orange transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            {i18n.language === "fr" ? "Retour" : "Back"}
          </button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm mb-4 aspect-square">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={product.images[currentImageIndex]}
                    alt={product.name[i18n.language]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full object-contain bg-white p-4"
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-orange hover:text-white transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-orange hover:text-white transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-dark-green/80 text-white text-sm">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? "border-orange shadow-lg"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name[i18n.language]} ${index + 1}`}
                      className="w-full h-full object-contain bg-white p-1"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Brand & Category */}
              <div className="flex items-center gap-4">
                {brand && (
                  <Link
                    to={`/brands/${brand.id}`}
                    className="px-4 py-2 rounded-full bg-dark-green/10 text-dark-green font-medium hover:bg-dark-green hover:text-white transition-colors"
                  >
                    {brand.name}
                  </Link>
                )}
                <span className="px-3 py-1 rounded-full bg-orange/10 text-orange text-sm font-medium">
                  {t(`products.categories.${product.category}`)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-dark-green">
                {product.name[i18n.language]}
              </h1>

              {/* Short Description */}
              <p className="text-lg text-dark-green/70">
                {product.shortDescription[i18n.language]}
              </p>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                  <MapPin size={24} className="text-orange" />
                  <div>
                    <p className="text-xs text-dark-green/60">
                      {i18n.language === "fr" ? "Origine" : "Origin"}
                    </p>
                    <p className="font-semibold text-dark-green">
                      {product.origin}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                  <Clock size={24} className="text-orange" />
                  <div>
                    <p className="text-xs text-dark-green/60">
                      {i18n.language === "fr" ? "Conservation" : "Shelf Life"}
                    </p>
                    <p className="font-semibold text-dark-green">
                      {product.shelfLife}
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              {product.certification && (
                <div className="flex flex-wrap gap-2">
                  {product.certification.map((cert) => (
                    <span
                      key={cert}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal/10 text-teal text-sm"
                    >
                      <Award size={14} />
                      {cert}
                    </span>
                  ))}
                </div>
              )}

              {/* Packaging Options */}
              <div>
                <h3 className="font-semibold text-dark-green mb-3 flex items-center gap-2">
                  <ShoppingBag size={18} />
                  {i18n.language === "fr"
                    ? "Conditionnements disponibles"
                    : "Available packaging"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.packaging.map((size) => (
                    <span
                      key={size}
                      className="px-4 py-2 rounded-lg bg-white border border-beige font-medium text-dark-green hover:border-orange hover:bg-orange/5 transition-colors cursor-pointer"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-4 pt-4">
                <Link to="/contact" className="btn-primary flex-1 text-center">
                  {i18n.language === "fr"
                    ? "Demander un devis"
                    : "Request a quote"}
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16">
            {/* Tab Headers */}
            <div className="flex gap-2 border-b border-beige mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-semibold transition-colors relative ${
                    activeTab === tab.id
                      ? "text-orange"
                      : "text-dark-green/60 hover:text-dark-green"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl p-8">
              {activeTab === "description" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-dark-green/80 leading-relaxed text-lg">
                    {product.description[i18n.language]}
                  </p>
                </motion.div>
              )}

              {activeTab === "ingredients" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start gap-4">
                    <Info size={24} className="text-orange shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-dark-green mb-2">
                        {i18n.language === "fr"
                          ? "Liste des ingrédients"
                          : "Ingredients list"}
                      </h4>
                      <p className="text-dark-green/80">
                        {product.ingredients[i18n.language]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "nutrition" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4 className="font-semibold text-dark-green mb-4">
                    {i18n.language === "fr"
                      ? "Valeurs nutritionnelles pour 100g"
                      : "Nutritional values per 100g"}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="p-4 bg-beige/50 rounded-xl text-center">
                      <p className="text-2xl font-bold text-dark-green">
                        {product.nutritionalInfo.energy}
                      </p>
                      <p className="text-sm text-dark-green/60">
                        {i18n.language === "fr" ? "Énergie" : "Energy"}
                      </p>
                    </div>
                    <div className="p-4 bg-beige/50 rounded-xl text-center">
                      <p className="text-2xl font-bold text-dark-green">
                        {product.nutritionalInfo.proteins}
                      </p>
                      <p className="text-sm text-dark-green/60">
                        {i18n.language === "fr" ? "Protéines" : "Proteins"}
                      </p>
                    </div>
                    <div className="p-4 bg-beige/50 rounded-xl text-center">
                      <p className="text-2xl font-bold text-dark-green">
                        {product.nutritionalInfo.carbs}
                      </p>
                      <p className="text-sm text-dark-green/60">
                        {i18n.language === "fr" ? "Glucides" : "Carbs"}
                      </p>
                    </div>
                    <div className="p-4 bg-beige/50 rounded-xl text-center">
                      <p className="text-2xl font-bold text-dark-green">
                        {product.nutritionalInfo.fats}
                      </p>
                      <p className="text-sm text-dark-green/60">
                        {i18n.language === "fr" ? "Lipides" : "Fats"}
                      </p>
                    </div>
                    <div className="p-4 bg-beige/50 rounded-xl text-center">
                      <p className="text-2xl font-bold text-dark-green">
                        {product.nutritionalInfo.fiber}
                      </p>
                      <p className="text-sm text-dark-green/60">
                        {i18n.language === "fr" ? "Fibres" : "Fiber"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-dark-green mb-8">
                {i18n.language === "fr"
                  ? "Produits similaires"
                  : "Related products"}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => {
                  return (
                    <Link
                      key={relatedProduct.id}
                      to={`/products/${relatedProduct.id}`}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
                    >
                      <div className="h-48 bg-white flex items-center justify-center overflow-hidden">
                        <img
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name[i18n.language]}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-dark-green group-hover:text-orange transition-colors">
                          {relatedProduct.name[i18n.language]}
                        </h3>
                        <p className="text-sm text-dark-green/60 mt-2">
                          {relatedProduct.shortDescription[i18n.language]}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
