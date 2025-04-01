"use client";

import React from 'react';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Users, Trophy } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const hoverProps = {
  whileHover: { 
    scale: 1.05,
    transition: {
      type: "tween",
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = React.memo(({ icon, title, description }: FeatureCardProps) => (
  <motion.div
    variants={itemVariants}
    {...hoverProps}
    className="flex-1 max-w-[34%] flex flex-col items-center p-8 bg-[#132D3B] rounded-2xl"
  >
    <motion.div 
      className="w-12 h-12 text-[#D4A676] mb-4"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      {icon}
    </motion.div>
    <h3 className="font-heading text-xl mb-2">{title}</h3>
    <p className="text-foreground/80 text-sm">{description}</p>
  </motion.div>
));

FeatureCard.displayName = 'FeatureCard';

const CallToAction = React.memo(() => {
  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features = [
    {
      icon: <Users />,
      title: "Entraide",
      description: "Partage ton expérience et inspire-toi des réussites des autres"
    },
    {
      icon: <Trophy />,
      title: "Des évènements live",
      description: "Contenu éducatif, actus, react, divertissement ; On refait le monde via le contenu qu'on propose. Abonnes toi pour ne rien rater."
    }
  ];

  return (
    <section ref={ref} id="pivot" className="section relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.h2 variants={itemVariants} className="section-title mb-6">
            Rejoins la communauté !
          </motion.h2>
          <motion.p variants={itemVariants} className="text-foreground/80 max-w-[600px] mx-auto mb-12">
            Ensemble, on est plus fort ! Rejoins une communauté de personnes qui, comme toi, 
            ont décidé de reprendre le contrôle sur leurs addictions.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="flex flex-col md:flex-row justify-center items-stretch gap-8 mb-12"
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="/auth"
              className="btn-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Rejoindre</span>
              <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#132D3B]/20 to-[#132D3B]/40" />
    </section>
  );
});

CallToAction.displayName = 'CallToAction';

export default CallToAction;