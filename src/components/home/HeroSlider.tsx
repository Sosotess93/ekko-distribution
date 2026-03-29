"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const SLIDE_IMAGES = [
  "/images/hero/slide-1.jpeg",
  "/images/hero/slide-2.jpeg",
  "/images/hero/slide-3.jpeg",
  "/images/hero/slide-4.jpeg",
  "/images/hero/slide-5.jpeg",
  "/images/hero/slide-6.jpeg",
  "/images/hero/slide-7.jpeg",
];

const SLIDE_ALT = [
  "Belle Vie farine de blé - Ekko Distribution export alimentaire Afrique",
  "Huile de tournesol pure Belle Vie - qualité premium",
  "Produits alimentaires Belle Vie - poulet huile œufs farine",
  "Poulet entier certifié Halal Belle Vie - surgelé qualité",
  "Produits certifiés ISO 22000 BRC - Ekko Distribution",
  "Chaîne du froid maîtrisée - surgelés Belle Vie",
  "Œufs frais Belle Vie - sélection rigoureuse qualité",
];

const SLIDE_DURATION = 5000;

export default function HeroSlider() {
  const t = useTranslations("hero");
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideCount = SLIDE_IMAGES.length;

  const goTo = useCallback(
    (index: number) => setCurrent((index + slideCount) % slideCount),
    [slideCount]
  );
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <section
      className="relative h-[65vh] md:h-[75vh] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" as const }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <Image src={SLIDE_IMAGES[current]} alt={SLIDE_ALT[current]} fill sizes="100vw" className="object-cover object-center" priority={current === 0} quality={85} />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="container-custom mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15 } },
                  exit: { opacity: 0, transition: { duration: 0.3 } },
                }}
                className="space-y-5 flex flex-col items-center"
              >
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white"
                >
                  <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                  <span className="text-sm font-medium tracking-wide">Ekko Distribution</span>
                </motion.div>

                <motion.h1
                  variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } } }}
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] font-heading"
                >
                  {t(`slides.${current}.title`)}
                </motion.h1>

                <motion.p
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } }}
                  className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed"
                >
                  {t(`slides.${current}.subtitle`)}
                </motion.p>

                <motion.div
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } }}
                  className="flex flex-wrap justify-center gap-4 pt-2"
                >
                  <Link
                    href="/produits"
                    className="inline-flex items-center gap-2 bg-orange text-white px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:bg-orange-hover hover:shadow-lg hover:shadow-orange/25 hover:-translate-y-0.5"
                  >
                    {t("cta")}
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold text-base border border-white/30 transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
                  >
                    {t("cta_secondary")}
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute inset-y-0 left-0 z-30 items-center pl-4">
        <button onClick={prev} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:bg-white/20 hover:scale-110 cursor-pointer" aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="hidden md:flex absolute inset-y-0 right-0 z-30 items-center pr-4">
        <button onClick={next} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:bg-white/20 hover:scale-110 cursor-pointer" aria-label="Next slide">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {SLIDE_IMAGES.map((_, index) => (
          <button key={index} onClick={() => goTo(index)} aria-label={`Go to slide ${index + 1}`} className="group relative cursor-pointer">
            <div className={`h-1.5 rounded-full transition-all duration-500 ${index === current ? "w-10 bg-orange" : "w-3 bg-white/40 group-hover:bg-white/60"}`} />
            {index === current && !isPaused && (
              <motion.div className="absolute inset-0 h-1.5 rounded-full bg-white/20 origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }} key={`progress-${current}`} />
            )}
          </button>
        ))}
      </div>

      <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 hidden md:block" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
