import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  pathnames: {
    "/": "/",
    "/produits": {
      fr: "/produits",
      en: "/products",
    },
    "/produits/[slug]": {
      fr: "/produits/[slug]",
      en: "/products/[slug]",
    },
    "/marques": {
      fr: "/marques",
      en: "/brands",
    },
    "/marques/[slug]": {
      fr: "/marques/[slug]",
      en: "/brands/[slug]",
    },
    "/processus": {
      fr: "/processus",
      en: "/process",
    },
    "/contact": "/contact",
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
