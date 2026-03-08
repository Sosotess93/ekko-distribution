import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProcessClient from "@/components/process/ProcessClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title:
      locale === "fr"
        ? "Processus d'Export | Ekko Distribution"
        : "Export Process | Ekko Distribution",
    description: t("process.subtitle"),
    alternates: {
      canonical: `/${locale}/processus`,
      languages: {
        fr: "/fr/processus",
        en: "/en/process",
      },
    },
  };
}

export default function ProcessPage() {
  return <ProcessClient />;
}
