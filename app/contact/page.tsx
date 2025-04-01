"use client";

import Navbar from '@/components/layout/navbar';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MessageCircle, Phone } from 'lucide-react';

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0E232E] via-[#0E232E] to-[#134e5c]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-[600px] mx-auto"
        >
          <h1 className="text-[var(--font-size-habibi-h1)] font-heading text-center mb-8">Contact</h1>
          
          <div className="space-y-8 mb-12">
            <div className="flex items-center gap-4 bg-[#132D3B] p-6 rounded-[20px]">
              <Mail className="text-[#D4A676]" />
              <div>
                <h3 className="font-heading text-lg mb-2">Email</h3>
                <p className="text-foreground/80">contact@lacamehouse.fr</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#132D3B] p-6 rounded-[20px]">
              <MessageCircle className="text-[#D4A676]" />
              <div>
                <h3 className="font-heading text-lg mb-2">Chat</h3>
                <p className="text-foreground/80">Disponible 24/7 via notre application</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#132D3B] p-6 rounded-[20px]">
              <Phone className="text-[#D4A676]" />
              <div>
                <h3 className="font-heading text-lg mb-2">Téléphone</h3>
                <p className="text-foreground/80">01 23 45 67 89</p>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nom</label>
              <input type="text" className="w-full bg-[#132D3B] rounded-lg p-3 border border-white/20" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" className="w-full bg-[#132D3B] rounded-lg p-3 border border-white/20" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea rows={5} className="w-full bg-[#132D3B] rounded-lg p-3 border border-white/20"></textarea>
            </div>
            <button type="submit" className="btn-cta w-full">
              <span>Envoyer</span>
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}