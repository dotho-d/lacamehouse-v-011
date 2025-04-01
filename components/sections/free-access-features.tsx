"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calculator, ClipboardCheck } from "lucide-react";
import Image from "next/image";

const slideVariants = {
  offscreen: { opacity: 0, x: -50 },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const slideRightVariants = {
  offscreen: { opacity: 0, x: 50 },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

export default function FreeAccessFeatures() {
  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} id="free_access_features" className="section relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Des outils gratuits et faciles à prendre en main</h2>
        <p className="text-center text-foreground/80 mb-16 max-w-[64%] mx-auto">
          Utilise nos outils pour analyser tes consommations de façon objective.
        </p>

        {/* Main Container */}
        <div className="flex flex-col justify-center items-center gap-24 w-full relative">
          {/* First Row Container */}
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 md:gap-12 w-full pr-0 md:pr-[45px] relative">
            {/* Image Container */}
            <motion.div
              variants={slideVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              className="w-[390px] h-[260px] flex flex-col justify-center items-center overflow-hidden rounded-[20px] bg-[#132D3B] relative order-1"
            >
              <Image
                src="/images/calculaconsos.webp"
                alt="CalculaConsos"
                width={390}
                height={260}
                loading="lazy"
                quality={80}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                sizes="(max-width: 768px) 100vw, 390px"
                className="w-full h-auto object-cover transition-opacity duration-300"
                onLoadingComplete={(img) => img.classList.remove('opacity-0')}
              />
            </motion.div>

            {/* Text Container */}
            <motion.div
              variants={slideRightVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              className="flex flex-col justify-center items-start gap-5 order-2"
            >
              <h3 className="font-heading text-2xl">CalculaConsos</h3>
              <p className="font-body text-foreground/80 max-w-[390px]">
                Pour estimer combien te coûtent réellement tes consommations, revoir ton budget, faire des économies, etc.
              </p>
              <a href="/tools/calculator" className="btn-cta">
                <span>Utiliser une calculatrice</span>
              </a>
            </motion.div>
          </div>

          {/* Second Row Container */}
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 md:gap-12 w-full pl-0 md:pl-[45px] relative">
            {/* Image Container - Moved above text for mobile */}
            <motion.div
              variants={slideRightVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              className="w-[390px] h-[260px] flex flex-col justify-center items-center overflow-hidden rounded-[20px] bg-[#132D3B] relative order-1 md:order-2"
            >
              <Image
                src="/images/tests-rapides.webp"
                alt="Tests rapides"
                width={390}
                height={260}
                loading="lazy"
                quality={80}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                sizes="(max-width: 768px) 100vw, 390px"
                className="w-full h-auto object-cover transition-opacity duration-300"
                onLoadingComplete={(img) => img.classList.remove('opacity-0')}
              />
            </motion.div>

            {/* Text Container */}
            <motion.div
              variants={slideVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              className="flex flex-col justify-center items-end gap-5 text-right order-2 md:order-1"
            >
              <h3 className="font-heading text-2xl">Tests rapides</h3>
              <p className="font-body text-foreground/80 max-w-[390px]">
                Pour mieux évaluer tes consommations ou ta personnalité !
              </p>
              <a href="/tools/tests" className="btn-cta">
                <span>S'évaluer</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}