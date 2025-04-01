"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TopNav from '@/components/layout/dashboard/top-nav';
import LeftNav from '@/components/layout/dashboard/left-nav';
import RightNav from '@/components/layout/dashboard/right-nav';
import { useState } from 'react';
import { Check } from 'lucide-react';

type Period = 'weekly' | 'monthly' | 'quarterly';

export default function Subscriptions() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [period, setPeriod] = useState<Period>('monthly');

  const getPremiumPrice = () => {
    switch (period) {
      case 'weekly':
        return "12,50";
      case 'monthly':
        return "45,00";
      case 'quarterly':
        return "120,00";
      default:
        return "45,00";
    }
  };

  const getPeriodLabel = () => {
    switch (period) {
      case 'weekly':
        return "semaine";
      case 'monthly':
        return "mois";
      case 'quarterly':
        return "trimestre";
      default:
        return "mois";
    }
  };

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
            <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-12 text-center">
              Tarification
            </h2>

            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-6 bg-[rgba(20,20,20,0.8)] p-2 rounded-xl">
                {['weekly', 'monthly', 'quarterly'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p as Period)}
                    className={`
                      px-6 py-2 rounded-lg text-lg transition-all
                      ${period === p 
                        ? 'bg-[#D4A676] text-[#0E232E] font-medium' 
                        : 'text-foreground/60 hover:text-foreground/80'
                      }
                    `}
                  >
                    {p === 'weekly' ? 'Semaine' : p === 'monthly' ? 'Mensuel' : 'Trimestriel'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-8">
              {/* Plan Basique */}
              <div className="flex-1 max-w-[400px] bg-[rgba(20,20,20,0.8)] rounded-[20px] p-8 border border-white/10">
                <h3 className="font-heading text-2xl mb-4 text-center">Basique</h3>
                <div className="text-3xl font-semibold mb-8 text-center">Gratuit</div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-[#D4A676] mr-2 flex-shrink-0" />
                    <span>Suivi d'une problématique à la fois</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-[#D4A676] mr-2 flex-shrink-0" />
                    <span>Évaluation basique</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-[#D4A676] mr-2 flex-shrink-0" />
                    <span>Accès limité à 2 modèles d'IA au choix</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-[#D4A676] mr-2 flex-shrink-0" />
                    <span>40 requêtes / mois</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-[#D4A676] mr-2 flex-shrink-0" />
                    <span>Accès à la communauté (website)</span>
                  </li>
                </ul>
                <button className="w-full py-3 px-4 bg-transparent border border-[#D4A676] text-[#D4A676] rounded-xl hover:bg-[#D4A676]/10 transition-all hover:scale-[1.02] font-medium">
                  Plan actuel
                </button>
              </div>

              {/* Plan Premium */}
              <div className="flex-1 max-w-[400px] bg-[#153342] rounded-[20px] p-8 border border-white/10">
                <h3 className="font-heading text-2xl mb-4 text-center">Premium</h3>
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-semibold">{getPremiumPrice()}</span>
                    <span className="text-lg ml-1">€</span>
                    <span className="text-sm text-foreground/60 ml-2">
                      par {getPeriodLabel()}
                    </span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-[#D4A676] mr-2 flex-shrink-0" />
                    <span>Fonctionnalités du plan basique</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-[#D4A676] mr-2 flex-shrink-0" />
                    <span>Suivi de 3 comportements à la fois</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-[#D4A676] mr-2 flex-shrink-0" />
                    <span>Évaluations et analyses poussées</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-[#D4A676] mr-2 flex-shrink-0" />
                    <span>Accès à tous les modèles d'IA</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-[#D4A676] mr-2 flex-shrink-0" />
                    <span>50 requêtes / semaine</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-[#D4A676] mr-2 flex-shrink-0" />
                    <span>Accès au Discord privé</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-[#D4A676] mr-2 flex-shrink-0" />
                    <span>Lesson "Gestion du stress"</span>
                  </li>
                </ul>
                <button className="w-full py-3 px-4 bg-[#D4A676] text-[#0E232E] rounded-xl hover:bg-[#D4A676]/90 transition-all hover:scale-[1.02] font-medium">
                  Choisir ce plan
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}