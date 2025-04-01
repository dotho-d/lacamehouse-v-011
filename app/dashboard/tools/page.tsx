"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TopNav from '@/components/layout/dashboard/top-nav';
import LeftNav from '@/components/layout/dashboard/left-nav';
import RightNav from '@/components/layout/dashboard/right-nav';
import { Lock } from 'lucide-react';

export default function Tools() {
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
              Les indispensables
            </h2>
            <p className="text-foreground/80 text-center mb-12 max-w-[600px] mx-auto">
              Tout projet de changement commence par une évaluation de la situation actuelle.
              <br /><br />
              Tu débloqueras les autres fonctionnalités de la Camé House au fil de ton avancée.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "L'évaluation", isLocked: false },
                { title: "Ton objectif", isLocked: true },
                { title: "La théorie", isLocked: true },
                { title: "La pratique", isLocked: true },
                { title: "AI coaching et Player Mode", isLocked: true },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`
                    bg-[rgba(20,20,20,0.8)] rounded-[15px] p-8
                    flex items-center justify-center gap-3
                    cursor-pointer transform transition-all duration-300
                    hover:scale-[1.02] group
                    ${item.isLocked ? 'opacity-50' : ''}
                  `}
                >
                  {item.isLocked && <Lock className="w-5 h-5 text-foreground/60" />}
                  <h3 
                    className={`
                      font-heading text-xl text-center
                      transform transition-all duration-300
                      group-hover:rotate-[2deg] group-hover:scale-[1.02]
                      ${item.isLocked ? 'text-foreground/60' : 'text-foreground'}
                    `}
                  >
                    {item.title}
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