"use client";

import Navbar from '@/components/layout/navbar';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Note: Cette page sera connectée à un CMS plus tard
export default function Blog() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const placeholderPosts = [
    {
      title: "Comment gérer les envies pressantes ?",
      excerpt: "Découvrez des techniques efficaces pour gérer les craving et maintenir votre objectif...",
      date: "2024-03-20",
      category: "Conseils"
    },
    {
      title: "Les bienfaits de la méditation",
      excerpt: "La méditation peut être un outil puissant dans la gestion des addictions...",
      date: "2024-03-18",
      category: "Bien-être"
    },
    // Ajoutez d'autres articles placeholder ici
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0E232E] via-[#0E232E] to-[#134e5c]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[var(--font-size-habibi-h1)] font-heading text-center mb-16">Blog</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderPosts.map((post, index) => (
              <article key={index} className="bg-[#132D3B] rounded-[20px] overflow-hidden">
                <div className="aspect-video bg-[#0E232E]"></div>
                <div className="p-6">
                  <div className="text-[#D4A676] text-sm mb-2">{post.category}</div>
                  <h2 className="font-heading text-xl mb-4">{post.title}</h2>
                  <p className="text-foreground/80 mb-4">{post.excerpt}</p>
                  <div className="text-sm text-foreground/60">{post.date}</div>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}