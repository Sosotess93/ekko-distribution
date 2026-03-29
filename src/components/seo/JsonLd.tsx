export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ekko Distribution",
    alternateName: "Belle Vie",
    url: "https://ekko-distribution.com",
    logo: "https://ekko-distribution.com/images/logo-ekko.png",
    description: "Ekko Distribution exports quality food products to Africa under the Belle Vie brand: frozen poultry, sunflower oil, wheat flour, eggs. Halal certified, ISO 22000 & BRC compliant. Serving 15+ African countries.",
    foundingDate: "2020",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9 Avenue de l'Europe, 140 Tour Europa",
      addressLocality: "Thiais",
      postalCode: "94320",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+33-6-49-50-62-49",
      email: "contact@ekko-distribution.com",
      contactType: "customer service",
      availableLanguage: ["French", "English"],
    },
    sameAs: [
      "https://www.linkedin.com/company/ekko-distibution",
    ],
    areaServed: {
      "@type": "Continent",
      name: "Africa",
    },
    knowsAbout: [
      "Food export to Africa",
      "Frozen poultry distribution",
      "Halal food products",
      "Sunflower oil wholesale",
      "Wheat flour export",
      "Cold chain logistics",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ekko Distribution",
    alternateName: "Belle Vie - Ekko Distribution",
    url: "https://ekko-distribution.com",
    inLanguage: ["fr", "en"],
    publisher: {
      "@type": "Organization",
      name: "Ekko Distribution",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ProductJsonLd({
  name,
  description,
  image,
  brand,
}: {
  name: string;
  description: string;
  image: string;
  brand: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    manufacturer: {
      "@type": "Organization",
      name: "Ekko Distribution",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
