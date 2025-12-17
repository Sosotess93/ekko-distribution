import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setStatus("success");
    setTimeout(() => {
      setStatus(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        message: "",
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t("contact.info.address"),
      content: "123 Avenue du Commerce\n75001 Paris, France",
    },
    {
      icon: Phone,
      title: t("contact.info.phone"),
      content: "+33 1 23 45 67 89",
      href: "tel:+33123456789",
    },
    {
      icon: Mail,
      title: t("contact.info.email"),
      content: "contact@ekko-distribution.com",
      href: "mailto:contact@ekko-distribution.com",
    },
    {
      icon: Clock,
      title: t("contact.info.hours"),
      content: t("contact.info.hoursValue"),
    },
  ];

  const countries =
    i18n.language === "fr"
      ? [
          "Sénégal",
          "Côte d'Ivoire",
          "Mali",
          "Cameroun",
          "Guinée",
          "Burkina Faso",
          "Niger",
          "Bénin",
          "Togo",
          "Ghana",
          "Nigeria",
          "Autre",
        ]
      : [
          "Senegal",
          "Ivory Coast",
          "Mali",
          "Cameroon",
          "Guinea",
          "Burkina Faso",
          "Niger",
          "Benin",
          "Togo",
          "Ghana",
          "Nigeria",
          "Other",
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
              {t("contact.title")}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-beige/30">
        <div className="container-custom mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-6"
            >
              <div className="bg-dark-green rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-8">
                  {t("contact.info.title")}
                </h2>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <info.icon size={22} className="text-orange" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white/80 text-sm mb-1">
                          {info.title}
                        </h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-white hover:text-orange transition-colors whitespace-pre-line"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-white whitespace-pre-line">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm h-64">
                <div className="w-full h-full bg-gradient-to-br from-beige to-teal/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin
                      size={48}
                      className="mx-auto text-dark-green/30 mb-2"
                    />
                    <p className="text-dark-green/50 text-sm">
                      {i18n.language === "fr"
                        ? "Carte interactive"
                        : "Interactive Map"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-dark-green mb-2">
                      {t("contact.form.name")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-beige bg-beige/30 focus:outline-none focus:border-orange transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-dark-green mb-2">
                      {t("contact.form.email")} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-beige bg-beige/30 focus:outline-none focus:border-orange transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-dark-green mb-2">
                      {t("contact.form.phone")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-beige bg-beige/30 focus:outline-none focus:border-orange transition-colors"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-semibold text-dark-green mb-2">
                      {t("contact.form.company")}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-beige bg-beige/30 focus:outline-none focus:border-orange transition-colors"
                    />
                  </div>

                  {/* Country */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-dark-green mb-2">
                      {t("contact.form.country")} *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-beige bg-beige/30 focus:outline-none focus:border-orange transition-colors"
                    >
                      <option value="">
                        {i18n.language === "fr"
                          ? "Sélectionnez un pays"
                          : "Select a country"}
                      </option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-dark-green mb-2">
                      {t("contact.form.message")} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-beige bg-beige/30 focus:outline-none focus:border-orange transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Status Messages */}
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
                      status === "success"
                        ? "bg-teal/10 text-teal"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {status === "success" ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span className="font-medium">
                      {t(`contact.form.${status}`)}
                    </span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    className="btn-primary w-full md:w-auto inline-flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    {t("contact.form.submit")}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
