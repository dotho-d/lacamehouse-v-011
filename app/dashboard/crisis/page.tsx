"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TopNav from '@/components/layout/dashboard/top-nav';
import LeftNav from '@/components/layout/dashboard/left-nav';
import RightNav from '@/components/layout/dashboard/right-nav';
import { Lock } from 'lucide-react';

export default function Crisis() {
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
            <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4 text-center">
              Situations de crise assistées par intelligence artificielle
            </h2>
            <div className="text-foreground/80 text-center mb-12 max-w-[800px] mx-auto">
              <p className="mb-4">
                L'équipe de la Camé House a choisi de se concentrer la création de chatbots, avec un objectif en tête :
              </p>
              <p className="mb-4">
                Faire en sorte que ces intelligences artificielles soient en mesure de t'aider à faire face aux principales difficultés que tu pourrais rencontrer dans le cadre de ton changement.
              </p>
              <p>
                Celles-ci peuvent avoir accès à l'ensemble de tes informations et adapter leurs conseils à ta situation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                "L'expert en organisation personnelle",
                "Le poto soirée solo",
                "Le poto soirée festive",
              ].map((title, index) => (
                <div
                  key={index}
                  className="
                    bg-[rgba(20,20,20,0.8)] rounded-[15px] p-8
                    flex items-center justify-center gap-3
                    cursor-pointer transform transition-all duration-300
                    hover:scale-[1.02] group opacity-50
                  "
                >
                  <Lock className="w-5 h-5 text-foreground/60" />
                  <h3 className="
                    font-heading text-xl text-center text-foreground/60
                    transform transition-all duration-300
                    group-hover:rotate-[2deg] group-hover:scale-[1.02]
                  ">
                    {title}
                  </h3>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}