"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TopNav from '@/components/layout/dashboard/top-nav';
import LeftNav from '@/components/layout/dashboard/left-nav';
import RightNav from '@/components/layout/dashboard/right-nav';

export default function Objectives() {
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
              Objectifs
            </h2>
            <div className="max-w-[640px] mx-auto mb-12 text-center leading-[1.2] text-foreground/80">
              <p className="mb-4">C'est sur cette page qu'on transite des idées à la réalité.</p>
              <p className="mb-4">Définis un pourquoi, transforme tes objectifs en succession de tâches concrètes, personnalise les paramètres du système de notifications et de rappels, etc.</p>
              <p>L'idée, c'est de baliser le chemin qui te permettra d'atteindre tes objectifs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tips 1 */}
              <div className="flex flex-col justify-between h-[205px] bg-[rgba(20,20,20,0.8)] rounded-[15px] p-8">
                <div>
                  <h3 className="font-heading text-xl mb-2">Tips</h3>
                </div>
              </div>

              {/* Objectifs Addicto */}
              <div className="flex flex-col justify-between h-[205px] bg-[rgba(20,20,20,0.8)] rounded-[15px] p-8">
                <div>
                  <h3 className="font-heading text-xl mb-2">Objectif général addicto</h3>
                  <p className="text-foreground/60 mb-4">Objectif opérationnel actuel addicto</p>
                  <p className="text-foreground/60">Prochain objectif opérationnel addicto</p>
                </div>
              </div>

              {/* Pourquoi */}
              <div className="flex flex-col justify-between h-[205px] bg-[rgba(20,20,20,0.8)] rounded-[15px] p-8">
                <div>
                  <h3 className="font-heading text-xl mb-2">Pourquoi ?</h3>
                  <p className="text-foreground/60 mb-4">Objectifs op actuel pourquoi</p>
                  <p className="text-foreground/60">Prochain Objectifs op pourquoi</p>
                </div>
              </div>

              {/* Tips 2 */}
              <div className="flex flex-col justify-between h-[205px] bg-[rgba(20,20,20,0.8)] rounded-[15px] p-8">
                <div>
                  <h3 className="font-heading text-xl mb-2">Tips</h3>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}