"use client";

import Navbar from '@/components/layout/navbar';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Heart } from 'lucide-react';
import BeerIcon from '@/assets/icones/beer-white.svg';
import CannabisIcon from '@/assets/icones/cannabis-white.svg';
import ClopeIcon from '@/assets/icones/clope-white.svg';
import VideoGamesIcon from '@/assets/icones/video-games-white.svg';

const iconConfigs = {
  videoGames: { viewBox: "0 0 125 125" },
};

const tests = [
  {
    category: "Tests de consommation",
    items: [
      {
        title: "AUDIT",
        description: "Test de dépendance à l'alcool",
        icon: <BeerIcon className="w-12 h-12" viewBox="0 0 105 105" preserveAspectRatio="xMidYMid meet" />,
        duration: "5-10 min"
      },
      {
        title: "Fagerström",
        description: "Test de dépendance au tabac",
        icon: <ClopeIcon className="w-12 h-12" viewBox="0 0 105 105" preserveAspectRatio="xMidYMid meet" />,
        duration: "5 min"
      },
      {
        title: "CAST",
        description: "Test de dépendance au cannabis",
        icon: <CannabisIcon className="w-12 h-12" viewBox="0 0 105 105" preserveAspectRatio="xMidYMid meet" />,
        duration: "5-10 min"
      },
      {
        title: "IGD-20",
        description: "Test d'addiction aux jeux vidéo",
        icon: <VideoGamesIcon className="w-12 h-12" viewBox={iconConfigs.videoGames.viewBox} preserveAspectRatio="xMidYMid meet" />,
        duration: "10-15 min"
      }
    ]
  },
  {
    category: "Tests de personnalité",
    items: [
      {
        title: "Big Five",
        description: "Test de personnalité complet",
        icon: <Brain className="w-8 h-8" />,
        duration: "15-20 min"
      },
      {
        title: "Test d'attachement",
        description: "Évaluez votre style d'attachement",
        icon: <Heart className="w-8 h-8" />,
        duration: "10-15 min"
      }
    ]
  }
];

export default function Tests() {
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
        >
          <h1 className="text-[var(--font-size-habibi-h1)] font-heading text-center mb-16">Tests d'évaluation</h1>

          {tests.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-16">
              <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-8">{section.category}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.items.map((test, testIndex) => (
                  <motion.div
                    key={testIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: testIndex * 0.1 }}
                    className="bg-[#132D3B] rounded-[20px] p-6 hover:scale-105 transition-transform cursor-pointer"
                  >
                    <div className="text-[#D4A676] mb-4">{test.icon}</div>
                    <h3 className="font-heading text-xl mb-2">{test.title}</h3>
                    <p className="text-foreground/80 text-sm mb-4">{test.description}</p>
                    <div className="text-sm text-foreground/60">Durée : {test.duration}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center mt-12">
            <p className="text-foreground/80 max-w-[600px] mx-auto">
              Ces tests sont des outils d'évaluation standardisés utilisés par les professionnels. 
              Ils vous donnent une indication mais ne remplacent pas un diagnostic médical.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}