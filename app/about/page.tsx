"use client";

import Navbar from '@/components/layout/navbar';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Users, Brain, Sparkles } from 'lucide-react';

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0E232E] via-[#0E232E] to-[#134e5c]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          <section className="text-center">
            <h1 className="text-[var(--font-size-habibi-h1)] font-heading mb-8">Notre Mission</h1>
            <p className="text-foreground/80 max-w-[64%] mx-auto">
              La Camé House est née d'une conviction profonde : chacun mérite d'avoir accès à des outils efficaces pour gérer ses addictions, 
              peu importe sa situation ou ses moyens.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="w-12 h-12 text-[#D4A676]" />,
                title: "Bienveillance",
                description: "Un accompagnement sans jugement, adapté à chacun"
              },
              {
                icon: <Users className="w-12 h-12 text-[#D4A676]" />,
                title: "Communauté",
                description: "Une communauté solidaire pour avancer ensemble"
              },
              {
                icon: <Brain className="w-12 h-12 text-[#D4A676]" />,
                title: "Innovation",
                description: "Des méthodes modernes basées sur la science"
              },
              {
                icon: <Sparkles className="w-12 h-12 text-[#D4A676]" />,
                title: "Accessibilité",
                description: "Des solutions adaptées à tous les budgets"
              }
            ].map((value, index) => (
              <div key={index} className="bg-[#132D3B] p-8 rounded-[20px] text-center">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="font-heading text-xl mb-4">{value.title}</h3>
                <p className="text-foreground/80">{value.description}</p>
              </div>
            ))}
          </section>

          <section className="text-center">
            <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-8">Notre Histoire</h2>
            <div className="max-w-[64%] mx-auto space-y-6 text-left">
              <p className="text-foreground/80">
                La Camé House est née de l'expérience terrain en addictologie et d'une volonté de rendre 
                les soins plus accessibles et adaptés aux besoins de chacun.
              </p>
              <p className="text-foreground/80">
                Notre approche unique combine les meilleures pratiques en addictologie avec les dernières 
                innovations technologiques pour offrir un accompagnement personnalisé et efficace.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}