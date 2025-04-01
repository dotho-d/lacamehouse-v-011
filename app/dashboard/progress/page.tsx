"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TopNav from '@/components/layout/dashboard/top-nav';
import LeftNav from '@/components/layout/dashboard/left-nav';
import RightNav from '@/components/layout/dashboard/right-nav';
import { Progress } from "@/components/ui/progress";
import { Users, Trophy, Coins } from 'lucide-react';

export default function ProgressPage() {
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
              Progression
            </h2>
            <div className="max-w-[640px] mx-auto mb-12 text-center leading-[1.2] text-foreground/80">
              <p className="mb-4">C'est sur cette page que tu peux visualiser ton évolution.</p>
              <p className="mb-4">Visualise le chemin parcouru et le chemin qu'il te reste à parcourir pour atteindre tes objectifs.</p>
              <p>L'idée, c'est de pouvoir être fier de soi en regardant le passé, tout en restant motivé à avancer.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Progression */}
              <div className="flex flex-col justify-between h-[205px] bg-[rgba(20,20,20,0.8)] rounded-[15px] p-8">
                <div>
                  <h3 className="font-heading text-xl mb-4">Progression</h3>
                  <div className="space-y-4">
                    <Progress value={33} className="h-2" />
                    <div className="flex justify-between text-sm text-foreground/60">
                      <span>Départ</span>
                      <span>33%</span>
                      <span>Objectif</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visualisation */}
              <div className="flex flex-col justify-between h-[205px] bg-[rgba(20,20,20,0.8)] rounded-[15px] p-8">
                <div>
                  <h3 className="font-heading text-xl mb-2">Visualiser toute la démarche de soin</h3>
                  <button className="text-[#D4A676] hover:text-[#D4A676]/80 transition-colors mt-4">
                    Voir le détail →
                  </button>
                </div>
              </div>

              {/* Prochaine récompense */}
              <div className="flex flex-col justify-between h-[205px] bg-[rgba(20,20,20,0.8)] rounded-[15px] p-8">
                <div>
                  <h3 className="font-heading text-xl mb-2">Prochaine récompense</h3>
                  <div className="flex items-center mt-4">
                    <Trophy className="w-6 h-6 text-[#D4A676] mr-2" />
                    <span className="text-foreground/60">Débloquée à 50% de progression</span>
                  </div>
                </div>
              </div>

              {/* Argent en jeu */}
              <div className="flex flex-col justify-between h-[205px] bg-[rgba(20,20,20,0.8)] rounded-[15px] p-8">
                <div>
                  <h3 className="font-heading text-xl mb-2">Argent en jeu</h3>
                  <div className="flex items-center mt-4">
                    <Coins className="w-6 h-6 text-[#D4A676] mr-2" />
                    <span className="text-2xl font-semibold">00,00 €</span>
                  </div>
                </div>
              </div>

              {/* Statistiques communauté */}
              <div className="col-span-2 flex flex-col justify-between h-[205px] bg-[rgba(20,20,20,0.8)] rounded-[15px] p-8">
                <div>
                  <h3 className="font-heading text-xl mb-4">Statistiques communauté</h3>
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center">
                      <Users className="w-6 h-6 text-[#D4A676] mr-2" />
                      <span className="text-foreground/60"># personnes ont le même objectif que toi</span>
                    </div>
                    <div className="flex items-center">
                      <Trophy className="w-6 h-6 text-[#D4A676] mr-2" />
                      <span className="text-foreground/60"># personnes ont atteint leur objectif</span>
                    </div>
                  </div>
                  <p className="text-foreground/60 mt-4">
                    Si tu éprouves des difficultés, les onglets sur ta droite peuvent t'aider à les surmonter !
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}