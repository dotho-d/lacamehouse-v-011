"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TopNav from '@/components/layout/dashboard/top-nav';
import LeftNav from '@/components/layout/dashboard/left-nav';
import RightNav from '@/components/layout/dashboard/right-nav';
import { User, Lock, Bell, Shield, CreditCard, Accessibility } from 'lucide-react';
import { AvatarEditorMain } from '@/components/avatar-editors';

type SettingsSection = 'account' | 'password' | 'notifications' | 'security' | 'payment' | 'accessibility';

const settingsSections = [
  { id: 'account', label: 'Mon compte', icon: User },
  { id: 'password', label: 'Mot de passe', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Sécurité', icon: Shield },
  { id: 'payment', label: 'Moyens de paiement', icon: CreditCard },
  { id: 'accessibility', label: 'Accessibilité', icon: Accessibility },
] as const;

export default function Settings() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeSection, setActiveSection] = useState<SettingsSection>('account');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [avatarStyle, setAvatarStyle] = useState<string>('');

  const handleAvatarSave = (url: string, style: string) => {
    setAvatarUrl(url);
    setAvatarStyle(style);
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
              Paramètres
            </h2>

            <div className="flex gap-12">
              {/* Menu de navigation des paramètres */}
              <div className="w-[229px] bg-[rgba(20,20,20,0.8)] rounded-xl border border-white/20">
                <nav className="p-2">
                  {settingsSections.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveSection(id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                        ${activeSection === id 
                          ? 'bg-[#153342] text-[#D4A676]' 
                          : 'text-foreground/60 hover:bg-[#153342]/50 hover:text-foreground/80'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-left">{label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Contenu des paramètres */}
              <div className="flex-1 bg-[rgba(20,20,20,0.8)] rounded-xl border border-white/20 p-6">
                <div className="space-y-6">
                  {activeSection === 'account' && (
                    <div>
                      <h3 className="font-heading text-xl mb-6">Personnalisation de l'avatar</h3>
                      <AvatarEditorMain onSave={handleAvatarSave} />
                    </div>
                  )}

                  {activeSection === 'password' && (
                    <div>
                      <h3 className="font-heading text-xl mb-4">Mot de passe</h3>
                      <p className="text-foreground/60">Modifiez votre mot de passe</p>
                    </div>
                  )}

                  {activeSection === 'notifications' && (
                    <div>
                      <h3 className="font-heading text-xl mb-4">Notifications</h3>
                      <p className="text-foreground/60">Gérez vos préférences de notifications</p>
                    </div>
                  )}

                  {activeSection === 'security' && (
                    <div>
                      <h3 className="font-heading text-xl mb-4">Sécurité</h3>
                      <p className="text-foreground/60">Configurez vos paramètres de sécurité</p>
                    </div>
                  )}

                  {activeSection === 'payment' && (
                    <div>
                      <h3 className="font-heading text-xl mb-4">Moyens de paiement</h3>
                      <p className="text-foreground/60">Gérez vos moyens de paiement</p>
                    </div>
                  )}

                  {activeSection === 'accessibility' && (
                    <div>
                      <h3 className="font-heading text-xl mb-4">Accessibilité</h3>
                      <p className="text-foreground/60">Personnalisez votre expérience</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}