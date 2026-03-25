export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ekko Distribution",
    url: "https://ekko-distribution.com",
    description: "Exportation de produits alimentaires de qualité vers l'Afrique",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9 Avenue de l'Europe, 140 Tour Europa",
      addressLocality: "Thiais",
      postalCode: "94320",
      addressCountry: "FR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+33-6-49-50-62-49",
      email: "contact@ekko-distribution.com",
      contactType: "customer service",
    },
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
