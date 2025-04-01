"use client";

import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/navbar';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useScrollFade } from '@/hooks/use-scroll-fade';

// Imports dynamiques avec loading fallbacks
const Process = dynamic(() => import('@/components/sections/process'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading Process...</div>,
  ssr: true
});

const ProductsBehaviors = dynamic(() => import('@/components/sections/products-behaviors'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading Products...</div>,
  ssr: false // Désactive le SSR pour ce composant lourd
});

const Pros = dynamic(() => import('@/components/sections/pros'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading Pros...</div>,
  ssr: true
});

const FreeAccessFeatures = dynamic(() => import('@/components/sections/free-access-features'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading Features...</div>,
  ssr: true
});

const FAQ = dynamic(() => import('@/components/sections/faq'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading FAQ...</div>,
  ssr: false
});

const CallToAction = dynamic(() => import('@/components/sections/call-to-action'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading CTA...</div>,
  ssr: true
});


export default function Home() {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const raysOpacity = useScrollFade(600);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-[#0E232E] via-[#0E232E] to-[#134e5c]">
        <div className="light-rays-container" style={{ opacity: raysOpacity }}>
          <div className="light-ray light-ray-1"></div>
          <div className="light-ray light-ray-2"></div>
          <div className="light-ray light-ray-3"></div>
        </div>
        
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-3.5rem)] flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              ref={headerRef} 
              className="hero-content w-full flex flex-col gap-[45px] items-start pl-[45%] lg:pl-[52%] xl:pl-[55%] -mt-14 pt-[20vh]"
            >
              <div className="w-full max-w-[min(1200px,100%)] pl-[5%]">
                <h1 className={`text-[var(--font-size-habibi-h1)] font-heading text-beige animate-fade-up ${headerInView ? 'in-view' : ''} mb-8 text-center lg:text-center max-w-full whitespace-nowrap`}>
                  Reprends enfin le contrôle<br />
                  sur tes addictions !
                </h1>
                <div className={`body-text text-sm md:text-md text-foreground/80 animate-fade-up ${headerInView ? 'in-view' : ''} mb-12 space-y-4 text-left`}>
                  <p>Évalues ta situation et définis un objectif qui te correspond.</p>
                  <p>Accèdes aux meilleures des méthodes utilisées en addictologie.</p>
                  <p>Boostes tes chances de réussite avec l'IA et le numérique.</p>
                  <p className="text-md md:text-lg font-medium mt-6">Transformes ton projet en véritable jeu immersif !</p>
                </div>
                <div className={`flex flex-col sm:flex-row gap-12 justify-center animate-fade-up ${headerInView ? 'in-view' : ''}`}>
                  <a href="#process" className="btn-accent">
                    <span>Découvrir</span>
                  </a>
                  <a href="/auth" className="btn-cta">
                    <span>Commencer</span>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <Process />

        {/* Products & Behaviors Section */}
        <ProductsBehaviors />

        {/* Pros Section */}
        <Pros />

        {/* Free Access Features Section */}
        <FreeAccessFeatures />
        
        {/* FAQ Section */}
        <FAQ />

        {/* Call to Action Section */}
        <CallToAction />
      </main>

      <footer className="bg-[#132D3B] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="footer-logo mb-4">La Camé House</h3>
              <p className="footer-text mb-6">
                Le cauchemar pour tes démons. Tes addictions en PLS !
              </p>
              <p className="footer-text">
                © 2024 La Camé House. Tous droits réservés.
              </p>
            </div>
            
            <div>
              <h4 className="footer-title">Liens utiles</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="footer-link">À propos</a></li>
                <li><a href="/blog" className="footer-link">Blog</a></li>
                <li><a href="/shop" className="footer-link">Shop</a></li>
                <li><a href="/contact" className="footer-link">Contacts</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Légal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="footer-link">Politique de confidentialité</a></li>
                <li><a href="/terms" className="footer-link">Conditions d'utilisation</a></li>
                <li><a href="/legal" className="footer-link">Mentions légales</a></li>
                <li><a href="/cookies" className="footer-link">Politique des cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}