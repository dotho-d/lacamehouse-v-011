"use client";

import Navbar from '@/components/layout/navbar';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Note: Cette page sera connectée à un CMS e-commerce plus tard
export default function Shop() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const placeholderProducts = [
    {
      name: "Programme Premium",
      description: "Accès complet à tous nos outils et fonctionnalités",
      price: "29.99€",
      category: "Abonnement"
    },
    {
      name: "Session Coaching",
      description: "1h de coaching personnalisé avec un expert",
      price: "49.99€",
      category: "Service"
    },
    // Ajoutez d'autres produits placeholder ici
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0E232E] via-[#0E232E] to-[#134e5c]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[var(--font-size-habibi-h1)] font-heading text-center mb-16">Boutique</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderProducts.map((product, index) => (
              <div key={index} className="bg-[#132D3B] rounded-[20px] p-6">
                <div className="text-[#D4A676] text-sm mb-2">{product.category}</div>
                <h2 className="font-heading text-xl mb-4">{product.name}</h2>
                <p className="text-foreground/80 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">{product.price}</span>
                  <button className="btn-cta">
                    <span>Acheter</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}