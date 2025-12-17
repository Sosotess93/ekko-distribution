import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Send,
} from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/products", label: t("nav.products") },
    { path: "/process", label: t("nav.process") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-dark-green text-white">
      {/* Main Footer */}
      <div className="container-custom mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-beige rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 40 40"
                  className="w-8 h-8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 4C15 4 12 8 10 12C8 16 6 20 8 24C10 28 14 32 18 34C20 35 22 35 24 34C28 32 32 28 34 24C36 20 34 14 30 10C26 6 23 4 20 4Z"
                    fill="#0A3D2F"
                  />
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
                <span className="text-xl font-bold font-heading leading-tight">
                  Ekko
                </span>
                <span className="text-sm font-semibold text-teal leading-tight">
                  Distribution
                </span>
              </div>
            </Link>
            <p className="text-white/80 leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold font-heading mb-6">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold font-heading mb-6">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-orange shrink-0 mt-1" />
                <span className="text-white/80">
                  123 Avenue du Commerce
                  <br />
                  75001 Paris, France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-orange shrink-0" />
                <a
                  href="tel:+33123456789"
                  className="text-white/80 hover:text-orange transition-colors"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-orange shrink-0" />
                <a
                  href="mailto:contact@ekko-distribution.com"
                  className="text-white/80 hover:text-orange transition-colors"
                >
                  contact@ekko-distribution.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold font-heading mb-6">
              {t("footer.newsletter.title")}
            </h4>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder={t("footer.newsletter.placeholder")}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-orange transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-orange flex items-center justify-center hover:bg-orange/80 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} Ekko Distribution. {t("footer.rights")}
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-white/60 hover:text-orange transition-colors"
              >
                {t("footer.privacy")}
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-orange transition-colors"
              >
                {t("footer.terms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
