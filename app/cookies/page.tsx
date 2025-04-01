"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Cookies() {
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
      <h1 className="text-[var(--font-size-habibi-h1)] font-heading text-center mb-12">Politique des Cookies</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">1. Qu'est-ce qu'un Cookie ?</h2>
          <p className="text-foreground/80 mb-4">
            Un cookie est un petit fichier texte stocké sur votre appareil...
          </p>
        </section>

        <section>
          <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">2. Notre Utilisation des Cookies</h2>
          <p className="text-foreground/80 mb-4">
            Nous utilisons des cookies pour améliorer votre expérience...
          </p>
        </section>

        {/* Ajoutez d'autres sections selon les besoins */}
      </div>
    </motion.div>
  );
}