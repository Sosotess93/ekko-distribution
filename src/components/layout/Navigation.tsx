"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { getProductBySlug } from "@/data";

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
    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z" />
    <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z" />
    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
  </svg>
);

const Navigation = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = pathname === "/";

  const navLinks = [
    { path: "/" as const, label: t("nav.home") },
    { path: "/produits" as const, label: t("nav.products") },
    { path: "/marques" as const, label: t("nav.brands") },
    { path: "/processus" as const, label: t("nav.process") },
    { path: "/contact" as const, label: t("nav.contact") },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On non-home pages, always use the solid/scrolled style since there's no dark hero behind the navbar
  const showSolidNav = !isHomePage || scrolled;

  useEffect(() => setIsOpen(false), [pathname]);

  const toggleLanguage = () => {
    const newLocale = locale === "fr" ? "en" : "fr";
    if (pathname === "/produits/[slug]" && params.slug) {
      const currentSlug = params.slug as string;
      const product = getProductBySlug(currentSlug, locale);
      const newSlug = product ? product.slug[newLocale as "fr" | "en"] : currentSlug;
      router.replace({ pathname: "/produits/[slug]" as any, params: { slug: newSlug } }, { locale: newLocale });
      return;
    }
    if (pathname === "/marques/[slug]" && params.slug) {
      router.replace({ pathname: "/marques/[slug]" as any, params: { slug: params.slug as string } }, { locale: newLocale });
      return;
    }
    router.replace(pathname as any, { locale: newLocale });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolidNav
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-border"
          : "bg-white/20 backdrop-blur-sm"
      }`}
    >
      <div className="container-custom mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-green rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span className="text-white font-heading font-bold text-lg">E</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-bold font-heading leading-tight transition-colors ${showSolidNav ? "text-green" : "text-white"}`}>
                Ekko
              </span>
              <span className={`text-xs font-medium leading-tight tracking-wider uppercase transition-colors ${showSolidNav ? "text-text-muted" : "text-white/70"}`}>
                Distribution
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-2 rounded-lg font-medium text-sm tracking-wide transition-all duration-300 ${
                  pathname === link.path
                    ? "text-orange"
                    : showSolidNav
                    ? "text-text-muted hover:text-green hover:bg-green/5"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
                {pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-orange rounded-full"
                  />
                )}
              </Link>
            ))}

            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-3 py-2 ml-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                showSolidNav
                  ? "bg-surface-alt border-border hover:bg-green/5"
                  : "bg-white/10 border-white/20 hover:bg-white/20"
              }`}
            >
              {locale === "fr" ? <FlagFR /> : <FlagEN />}
              <span className={`text-sm font-medium uppercase ${showSolidNav ? "text-text-muted" : "text-white/80"}`}>
                {locale}
              </span>
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 ${showSolidNav ? "text-green" : "text-white"}`}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="container-custom mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`py-3 px-4 rounded-lg font-medium text-sm tracking-wide transition-all ${
                    pathname === link.path
                      ? "bg-orange/10 text-orange"
                      : "text-text-muted hover:bg-surface-alt hover:text-green"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-3 py-3 px-4 rounded-lg bg-surface-alt border border-border mt-2 cursor-pointer"
              >
                {locale === "fr" ? <FlagEN /> : <FlagFR />}
                <span className="text-sm font-medium text-text-muted">
                  {locale === "fr" ? "English" : "Fran\u00e7ais"}
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
