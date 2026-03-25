"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Send } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: "/" as const, label: t("nav.home") },
    { path: "/produits" as const, label: t("nav.products") },
    { path: "/processus" as const, label: t("nav.process") },
    { path: "/contact" as const, label: t("nav.contact") },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-green text-white">
      <div className="container-custom mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/logo-ekko.png"
                alt="Ekko Distribution"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold font-heading leading-tight">Ekko</span>
                <span className="text-xs font-medium text-white/60 leading-tight tracking-wider uppercase">Distribution</span>
              </div>
            </Link>
            <p className="text-white/70 leading-relaxed">{t("footer.description")}</p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label} className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-orange hover:text-white text-white/70 transition-all duration-300 cursor-pointer">
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold font-heading mb-6 uppercase tracking-wider">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-white/70 hover:text-orange transition-colors duration-300">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold font-heading mb-6 uppercase tracking-wider">{t("footer.contact")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-orange shrink-0 mt-1" />
                <span className="text-white/70">9 Avenue de l'Europe<br />140 Tour Europa<br />94320 Thiais, France</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-orange shrink-0" />
                <a href="tel:+33649506249" className="text-white/70 hover:text-orange transition-colors">+33 6 49 50 62 49</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-orange shrink-0" />
                <a href="mailto:contact@ekko-distribution.com" className="text-white/70 hover:text-orange transition-colors">contact@ekko-distribution.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold font-heading mb-6 uppercase tracking-wider">{t("footer.newsletter.title")}</h4>
            <form className="space-y-4">
              <div className="relative">
                <input type="email" placeholder={t("footer.newsletter.placeholder")} className="w-full px-4 py-3 pr-12 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange/20 transition-all" />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-orange flex items-center justify-center hover:bg-orange-hover text-white transition-colors cursor-pointer">
                  <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">&copy; {currentYear} Ekko Distribution. {t("footer.rights")}</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/40 hover:text-orange transition-colors">{t("footer.privacy")}</a>
              <a href="#" className="text-white/40 hover:text-orange transition-colors">{t("footer.terms")}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
