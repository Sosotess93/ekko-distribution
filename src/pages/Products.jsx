import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Wheat,
  Droplets,
  Package,
  Coffee,
  Filter,
  Search,
  ArrowRight,
  Tag,
} from "lucide-react";
import productsData from "../data/products.json";

const Products = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeBrand, setActiveBrand] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categoryIcons = {
    beverages: Coffee,
    canned: Package,
    condiments: Droplets,
    grains: Wheat,
  };

  // Get brand name by ID
  const getBrandName = (brandId) => {
    const brand = productsData.brands.find((b) => b.id === brandId);
    return brand ? brand.name : "";
  };

  const filteredProducts = productsData.products.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;
    const matchesBrand =
      activeBrand === "all" || product.brandId === activeBrand;
    const matchesSearch = product.name[i18n.language]
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBrand && matchesSearch;
  });

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
              {t("products.title")}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              {t("products.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-6 bg-white border-b border-beige sticky top-20 z-30">
        <div className="container-custom mx-auto px-4">
          <div className="flex flex-col gap-4">
            {/* Search & Brand Filter Row */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-green/40"
                />
                <input
                  type="text"
                  placeholder={
                    i18n.language === "fr" ? "Rechercher..." : "Search..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-beige bg-beige/30 focus:outline-none focus:border-orange transition-colors"
                />
              </div>

              {/* Brand Filter */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                <Tag size={18} className="text-dark-green/50 shrink-0" />
                <span className="text-sm text-dark-green/60 shrink-0">
                  {t("products.filterByBrand")}:
                </span>
                <select
                  value={activeBrand}
                  onChange={(e) => setActiveBrand(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-beige bg-beige/30 focus:outline-none focus:border-orange transition-colors text-dark-green"
                >
                  <option value="all">{t("products.allBrands")}</option>
                  {productsData.brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter size={18} className="text-dark-green/50 shrink-0" />
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === "all"
                    ? "bg-orange text-white"
                    : "bg-beige/50 text-dark-green hover:bg-beige"
                }`}
              >
                {i18n.language === "fr" ? "Tous" : "All"}
              </button>
              {productsData.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? "bg-orange text-white"
                      : "bg-beige/50 text-dark-green hover:bg-beige"
                  }`}
                >
                  {t(`products.categories.${category.id}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-padding bg-beige/30">
        <div className="container-custom mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-green mb-8">
            {i18n.language === "fr" ? "Catégories" : "Categories"}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {productsData.categories.map((category, index) => {
              const Icon = categoryIcons[category.id] || Package;
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`p-6 rounded-2xl text-center transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-orange text-white shadow-lg scale-105"
                      : "bg-white hover:shadow-md hover:-translate-y-1"
                  }`}
                >
                  <div
                    className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                      activeCategory === category.id
                        ? "bg-white/20"
                        : "bg-beige"
                    }`}
                  >
                    <Icon
                      size={28}
                      className={
                        activeCategory === category.id
                          ? "text-white"
                          : "text-dark-green"
                      }
                    />
                  </div>
                  <h3
                    className={`font-semibold text-sm ${
                      activeCategory === category.id
                        ? "text-white"
                        : "text-dark-green"
                    }`}
                  >
                    {t(`products.categories.${category.id}`)}
                  </h3>
                </motion.button>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-green">
              {i18n.language === "fr" ? "Nos Produits" : "Our Products"}
            </h2>
            <span className="text-dark-green/60">
              {filteredProducts.length}{" "}
              {i18n.language === "fr" ? "produit(s)" : "product(s)"}
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => {
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/products/${product.id}`}
                    className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
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
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-orange/10 text-orange text-xs font-medium">
                          {t(`products.categories.${product.category}`)}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-dark-green/10 text-dark-green text-xs font-medium">
                          {getBrandName(product.brandId)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-dark-green mb-2 group-hover:text-orange transition-colors">
                        {product.name[i18n.language]}
                      </h3>
                      <p className="text-dark-green/70 mb-4 line-clamp-2">
                        {product.shortDescription[i18n.language]}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {product.packaging.slice(0, 3).map((size) => (
                            <span
                              key={size}
                              className="px-2 py-1 rounded bg-beige/50 text-xs text-dark-green/70"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-orange font-semibold text-sm group-hover:gap-2 transition-all">
                          {t("products.details")}
                          <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Package size={64} className="mx-auto text-dark-green/20 mb-4" />
              <p className="text-dark-green/60">
                {i18n.language === "fr"
                  ? "Aucun produit trouvé"
                  : "No products found"}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
