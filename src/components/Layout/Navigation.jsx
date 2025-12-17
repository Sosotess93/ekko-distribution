import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// Flag components
const FlagFR = () => (
  <svg className="w-5 h-4 rounded-sm overflow-hidden" viewBox="0 0 640 480">
    <g fillRule="evenodd" strokeWidth="1pt">
      <path fill="#fff" d="M0 0h640v480H0z" />
      <path fill="#00267f" d="M0 0h213.3v480H0z" />
      <path fill="#f31830" d="M426.7 0H640v480H426.7z" />
    </g>
  </svg>
);

const FlagEN = () => (
  <svg className="w-5 h-4 rounded-sm overflow-hidden" viewBox="0 0 640 480">
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path
      fill="#FFF"
      d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
    />
    <path
      fill="#C8102E"
      d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
    />
    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
  </svg>
);

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/products", label: t("nav.products") },
    { path: "/brands", label: t("nav.brands") },
    { path: "/process", label: t("nav.process") },
    { path: "/contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container-custom mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-dark-green rounded-full flex items-center justify-center">
              <svg
                viewBox="0 0 40 40"
                className="w-8 h-8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Africa silhouette simplified */}
                <path
                  d="M20 4C15 4 12 8 10 12C8 16 6 20 8 24C10 28 14 32 18 34C20 35 22 35 24 34C28 32 32 28 34 24C36 20 34 14 30 10C26 6 23 4 20 4Z"
                  fill="#F5E6C8"
                />
                {/* Wheat icon */}
                <path
                  d="M20 14V26M17 18L20 14L23 18M16 22L20 18L24 22"
                  stroke="#F1C40F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-dark-green font-heading leading-tight">
                Ekko
              </span>
              <span className="text-sm font-semibold text-teal leading-tight">
                Distribution
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium uppercase text-sm tracking-wide transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-orange"
                    : "text-dark-green hover:text-teal"
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange rounded-full"
                  />
                )}
              </Link>
            ))}

            {/* Language Toggle with Flags */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-green/10 hover:bg-dark-green/20 transition-colors"
            >
              {i18n.language === "fr" ? <FlagFR /> : <FlagEN />}
              <span className="text-sm font-medium text-dark-green uppercase">
                {i18n.language}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-dark-green"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-beige overflow-hidden"
          >
            <div className="container-custom mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-3 px-4 rounded-lg font-medium uppercase text-sm tracking-wide transition-colors ${
                    location.pathname === link.path
                      ? "bg-orange/10 text-orange"
                      : "text-dark-green hover:bg-dark-green/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-3 py-3 px-4 rounded-lg bg-dark-green/10"
              >
                {i18n.language === "fr" ? <FlagEN /> : <FlagFR />}
                <span className="text-sm font-medium text-dark-green">
                  {i18n.language === "fr" ? "English" : "Français"}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
