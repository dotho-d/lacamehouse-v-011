"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useCallback, useRef } from "react";

interface Step {
  id: number;
  title: string;
  description: string[];
  icon: JSX.Element;
}

const stepVariants = {
  inactive: { opacity: 0, y: 20 },
  active: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

const steps: Step[] = [
  {
    id: 1,
    title: "Crée un profil qui te ressemble",
    description: [
      "Créer ton profil te permettra de profiter au mieux des fonctionnalités offertes par la Camé House.",
      "Complète ton profil avec tes informations personnelles.",
      "Notre solution conserve tes informations personnelles en tout sécurité, garantit leur confidentialité, et te permet te rester anonyme."
    ],
    icon: <div className="w-12 h-12 rounded-full bg-[#D4A676] flex items-center justify-center text-2xl text-[#0E232E] font-semibold">1</div>
  },
  {
    id: 2,
    title: "Évalue ta situation",
    description: [
      "1. Identifie à quel point ton comportement impacte ton quotidien ;",
      "2. Identifie les facteurs qui ont pu t'amener à ce niveau d'usage ;",
      "Réponds aux questions en étant le plus honnête possible.",
      "Tu obtiendras alors un compte rendu de ton évaluation."
    ],
    icon: <div className="w-12 h-12 rounded-full bg-[#D4A676] flex items-center justify-center text-2xl text-[#0E232E] font-semibold">2</div>
  },
  {
    id: 3,
    title: "Définis un objectif",
    description: [
      "Définir un objectif, c'est choisir sa destination.",
      "Des propositions te seront faites, jusqu'à ce que tu te trouves une destination qui te convienne réellement.",
      "L'arrêt définitif n'est qu'une option ... Il en existe pleins d'autres !",
      "Laisses l'expérience des autres et les résultats de recherches scientifiques décider du meilleur pour toi, en fonction de ta situation.",
      "Tu obtiendras alors la synthèse de tes objectifs personnalisés."
    ],
    icon: <div className="w-12 h-12 rounded-full bg-[#D4A676] flex items-center justify-center text-2xl text-[#0E232E] font-semibold">3</div>
  },
  {
    id: 4,
    title: "Définis un plan d'action",
    description: [
      "Définir un plan d'action, c'est organiser les actions qui te permettront d'atteindre ta destination !",
      "Des propositions te seront faites, jusqu'à ce que tu trouves un plan d'action qui te convienne réellement.",
      "Laisses l'expérience des autres et les résultats de recherches scientifiques décider du meilleur pour toi, en fonction de ta situation et de tes objectifs.",
      "Tu obtiendras alors ton plan d'action personnalisé."
    ],
    icon: <div className="w-12 h-12 rounded-full bg-[#D4A676] flex items-center justify-center text-2xl text-[#0E232E] font-semibold">4</div>
  },
  {
    id: 5,
    title: "Gamifie ton évolution",
    description: [
      "De retour sur le tableau de bord, tu pourras constater du changement :",
      "C'est officiel, la partie vient de commencer, tu as rejoins l'aventure !",
      "Gagne de l'expérience en effectuant des quêtes, et mets en jeu ta discipline pour débloquer des récompenses.",
      "Et finis en une bonne fois pour toute avec tes addictions !"
    ],
    icon: <div className="w-12 h-12 rounded-full bg-[#D4A676] flex items-center justify-center text-2xl text-[#0E232E] font-semibold">5</div>
  }
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const stepRefs = useRef<Array<HTMLDivElement | null>>(Array(steps.length).fill(null));

  const handleScroll = useCallback(() => {
    if (!stepRefs.current) return;

    const checkVisibility = () => {
      stepRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
        
        if (isInView) {
          setActiveStep(index);
        }
      });
    };

    requestAnimationFrame(checkVisibility);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-24" id="process">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Comment ça marche ?</h2>
        
        <div className="relative">
          {/* Ligne verticale centrée */}
          <div className="absolute left-1/2 top-0 h-full w-px bg-[#234659] transform -translate-x-1/2" />
          
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={el => {
                stepRefs.current[index] = el;
              }}
              className="relative min-h-screen flex items-center"
            >
              <motion.div
                variants={stepVariants}
                initial="inactive"
                animate={activeStep === index ? "active" : "inactive"}
                layout
                className="w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 items-center relative">
                  {/* Numéro d'étape centré sur la ligne */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    {step.icon}
                  </div>

                  {index % 2 === 0 ? (
                    <>
                      {/* Contenu à gauche */}
                      <div className="flex justify-end pr-16">
                        <div className="max-w-[450px]">
                          <h3 className="text-[var(--font-size-habibi-h3)] font-heading mt-6 mb-4">{step.title}</h3>
                          <div className="space-y-4">
                            {step.description.map((text, i) => (
                              <p key={i} className="text-foreground/80">{text}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Illustration à droite */}
                      <div className="flex justify-start pl-16">
                        <div className="relative w-full max-w-[400px] h-[250px] md:h-[300px] bg-[#132D3B] rounded-2xl overflow-hidden shadow-lg">
                          <div className="absolute inset-0 flex items-center justify-center text-[#234659]">
                            Illustration à venir
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Illustration à gauche */}
                      <div className="flex justify-end pr-16">
                        <div className="relative w-full max-w-[400px] h-[250px] md:h-[300px] bg-[#132D3B] rounded-2xl overflow-hidden shadow-lg">
                          <div className="absolute inset-0 flex items-center justify-center text-[#234659]">
                            Illustration à venir
                          </div>
                        </div>
                      </div>
                      {/* Contenu à droite */}
                      <div className="flex justify-start pl-16">
                        <div className="max-w-[450px]">
                          <h3 className="text-[var(--font-size-habibi-h3)] font-heading mt-6 mb-4">{step.title}</h3>
                          <div className="space-y-4">
                            {step.description.map((text, i) => (
                              <p key={i} className="text-foreground/80">{text}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}