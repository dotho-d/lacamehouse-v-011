"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TopNav from '@/components/layout/dashboard/top-nav';
import LeftNav from '@/components/layout/dashboard/left-nav';
import RightNav from '@/components/layout/dashboard/right-nav';
import { ShoppingBag, Star } from 'lucide-react';

const products = [
  {
    name: "Vaporisateur Mighty+",
    description: "Le meilleur vaporisateur portable du marché avec -15% de réduction",
    price: "299,99 €",
    category: "Vaporisateurs",
    tag: "Promo"
  },
  {
    name: "Pack de démarrage Vaporisation",
    description: "Tout le nécessaire pour commencer la vaporisation sereinement",
    price: "49,99 €",
    category: "Kits",
    tag: "Nouveau"
  },
  {
    name: "Tests de dépistage THC",
    description: "Pack de 5 tests urinaires pour le THC",
    price: "19,99 €",
    category: "Tests",
    tag: "Best-seller"
  },
  {
    name: "Session d'hypnose",
    description: "1h de séance d'hypnose en visio avec un professionnel",
    price: "75,00 €",
    category: "Services",
    tag: "Populaire"
  },
  {
    name: "Guide complet RdR",
    description: "Ebook sur la réduction des risques en addiction",
    price: "9,99 €",
    category: "Ebooks",
    tag: "Digital"
  },
  {
    name: "Patchs nicotine 24h",
    description: "Pack de 7 patchs transdermiques 21mg/24h",
    price: "29,99 €",
    category: "Substituts",
    tag: "Médical"
  }
];

export default function Shop() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <main className="min-h-screen bg-[#111111]">
      {/* Background Effects */}
      <div className="light-rays-container">
        <div className="light-ray light-ray-1"></div>
        <div className="light-ray light-ray-2"></div>
        <div className="light-ray light-ray-3"></div>
      </div>

      {/* Main content */}
      <div className="relative min-h-screen">
        <TopNav />
        <LeftNav />
        <RightNav />
        
        <div className="pt-24 pl-28 pr-28">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="p-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShoppingBag className="w-8 h-8 text-[#D4A676]" />
              <h2 className="text-[var(--font-size-habibi-h2)] font-heading text-center">
                Boutique
              </h2>
            </div>
            <p className="text-foreground/80 text-center mb-12 max-w-[600px] mx-auto">
              Découvrez notre sélection de produits et services pour vous accompagner dans votre démarche
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[rgba(20,20,20,0.8)] rounded-[15px] p-6 hover:scale-[1.02] transition-transform"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[#D4A676] text-sm">{product.category}</span>
                    <span className="bg-[#153342] text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {product.tag}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl mb-2">{product.name}</h3>
                  <p className="text-foreground/60 text-sm mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">{product.price}</span>
                    <button className="bg-[#D4A676] text-[#0E232E] px-4 py-2 rounded-lg hover:bg-[#D4A676]/90 transition-colors font-medium">
                      Ajouter
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}