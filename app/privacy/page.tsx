"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Privacy() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <h1 className="text-[var(--font-size-habibi-h1)] font-heading text-center mb-12">Politique de Confidentialité</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">1. Collecte des Données</h2>
          <p className="text-foreground/80 mb-4">
            Nous collectons uniquement les données nécessaires à votre accompagnement...
          </p>
        </section>

        <section>
          <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">2. Utilisation des Données</h2>
          <p className="text-foreground/80 mb-4">
            Vos données sont utilisées exclusivement pour améliorer votre expérience...
          </p>
        </section>

        {/* Ajoutez d'autres sections selon les besoins */}
      </div>
    </motion.div>
  );
}