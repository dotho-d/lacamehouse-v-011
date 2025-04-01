"use client";

import Navbar from '@/components/layout/navbar';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Legal() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0E232E] via-[#0E232E] to-[#134e5c]">
      {/* Background Effects */}
      <div className="light-rays-container">
        <div className="light-ray light-ray-1"></div>
        <div className="light-ray light-ray-2"></div>
        <div className="light-ray light-ray-3"></div>
      </div>

      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="prose prose-invert max-w-none"
        >
          <h1 className="text-[var(--font-size-habibi-h1)] font-heading text-center mb-8">
            Mentions Légales
          </h1>
          
          <div className="bg-[#132D3B] rounded-[30px] p-8">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <p className="text-foreground/80">En vigueur au 01/01/2025</p>
                </div>

                <section className="space-y-4">
                  <p className="text-foreground/80">
                    Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la Confiance en
                    l'économie numérique, il est porté à la connaissance des utilisateurs du site
                    lacamehouse.org, les présentes mentions légales.
                  </p>

                  <p className="text-foreground/80">
                    La connexion et la navigation sur le site par l'utilisateur implique acceptation intégrale et
                    sans réserve des présentes mentions légales. Ces dernières sont accessibles sur le site à la
                    rubrique "Mentions légales".
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">I. ÉDITION DU SITE</h2>
                  <p className="text-foreground/80">
                    L'édition et la direction de la publication du site est assurée par Monsieur Ludovic THIOLICA,
                    domicilié quelque part en France, dont l'adresse e-mail est dotho.d@lacamehouse.org.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">II. HÉBERGEUR</h2>
                  <p className="text-foreground/80">
                    L'hébergeur du Site est la société Framer, dont le siège social est situé au Rozengracht,
                    Amsterdam, North Holland NL.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">III. ACCÈS AU SITE</h2>
                  <p className="text-foreground/80">
                    Le site est normalement accessible, à tout moment pour l'utilisateur.
                  </p>
                  <p className="text-foreground/80">
                    Toutefois, l'éditeur pourra, à tout moment, suspendre, limiter ou interrompre le site afin
                    de procéder, notamment, à des mises à jour ou des modifications de son contenu.
                  </p>
                  <p className="text-foreground/80">
                    L'éditeur ne pourra en aucun cas être tenu responsable des conséquences éventuelles de
                    cette indisponibilité sur les activités de l'utilisateur.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">IV. COLLECTE DES DONNÉES</h2>
                  <p className="text-foreground/80">
                    Le site assure à l'utilisateur une collecte et un traitement des données personnelles dans le
                    respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à
                    l'informatique, aux fichiers et aux libertés.
                  </p>
                  <p className="text-foreground/80">
                    En vertu de la réglementation applicable en matière de protection des données à caractère
                    personnel, l'utilisateur dispose d'un droit d'accès, de rectification, de suppression et
                    d'opposition de ses données personnelles. L'utilisateur peut exercer ce droit :
                  </p>
                  <ul className="list-disc pl-24 text-foreground/80 space-y-2">
                    <li>depuis son espace personnel ;</li>
                    <li>depuis le formulaire de contact ;</li>
                    <li>par mail à l'adresse email suivante : dotho.d@lacamehouse.org ;</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">V. INFORMATIONS COMPLÉMENTAIRES</h2>
                  <p className="text-foreground/80">
                    Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou
                    partie du site, sans autorisation expresse de l'éditeur est prohibée et pourra entraîner des
                    actions et poursuites judiciaires telles que prévues par la réglementation en vigueur.
                  </p>
                  <p className="text-foreground/80">
                    Pour plus d'informations sur les conditions d'utilisation du site, se reporter aux CGU du
                    site lacamehouse.org, accessibles depuis la rubrique "CGU".
                  </p>
                  <p className="text-foreground/80">
                    Pour plus d'informations en matière de protection des données à caractère personnel, se
                    reporter à la Charte en matière de protection des données à caractère personnel du site
                    lacamehouse.org, accessible depuis la rubrique "Données personnelles".
                  </p>
                  <p className="text-foreground/80">
                    Pour plus d'informations en matière de cookies, se reporter à la Charte en matière de cookies du
                    site lacamehouse.org, accessible à la rubrique "Cookies"
                  </p>
                </section>
              </div>
            </ScrollArea>
          </div>
        </motion.div>
      </div>
    </main>
  );
}