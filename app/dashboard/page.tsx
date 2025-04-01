"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TopNav from '@/components/layout/dashboard/top-nav';
import LeftNav from '@/components/layout/dashboard/left-nav';
import RightNav from '@/components/layout/dashboard/right-nav';

export default function Dashboard() {
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
              Accueil
            </h2>
            <p className="font-body text-foreground/80 mb-8 text-center max-w-[600px] mx-auto">
              Cette page te permet d'avoir une vision rapide sur tes résultats d'évaluations et tes objectifs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* État des lieux */}
              <div className="flex flex-col justify-between h-[205px] bg-[rgba(20,20,20,0.8)] rounded-[15px] p-8">
                <div>
                  <h3 className="font-heading text-xl mb-2">État des lieux - Diagnostique général</h3>
                  <p className="text-foreground/60">Non diagnostiqué</p>
                </div>
                <div className="flex items-center justify-between">
                  <button className="text-[#D4A676] hover:text-[#D4A676]/80 transition-colors text-left">
                    Commencer le diagnostique →
                  </button>
                </div>
              </div>

              {/* Objectifs */}
              <div className="flex flex-col justify-between h-[205px] bg-[rgba(20,20,20,0.8)] rounded-[15px] p-8">
                <div>
                  <h3 className="font-heading text-xl mb-2">Pas d'objectifs</h3>
                  <p className="text-foreground/60">Aucun objectif défini pour le moment</p>
                </div>
                <div className="flex items-center justify-between">
                  <button className="text-[#D4A676] hover:text-[#D4A676]/80 transition-colors text-left">
                    Définir tes objectifs →
                  </button>
                </div>
              </div>

              {/* Info atypique */}
              <div className="flex flex-col justify-center items-center h-[205px] bg-[rgba(20,20,20,0.8)] rounded-[15px] p-8 text-center">
                <p className="text-foreground/80">
                  Info atypique aléatoire intéressante sur l'utilisateur
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}