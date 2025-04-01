"use client";

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, GraduationCap, Target, Wallet, Shield } from "lucide-react";

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

const cardVariants = {
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

interface ProCardProps {
  icon: React.ReactNode;
  title: string;
  defaultText: string;
  hoverText: string;
}

const ProCard = React.memo(({ icon, title, defaultText, hoverText }: ProCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      {...hoverProps}
      className="w-[360px] h-min flex flex-col justify-center items-center p-8 rounded-[20px] border-[0.5px] border-white/20 shadow-xl bg-[#132D3B] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="text-[#D4A676] mb-6"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        {icon}
      </motion.div>
      <h3 className="font-heading text-xl mb-4 text-center whitespace-pre-line">{title}</h3>
      <p className="font-body text-center transition-opacity duration-300 whitespace-pre-line">
        {isHovered ? hoverText : defaultText}
      </p>
    </motion.div>
  );
});

ProCard.displayName = 'ProCard';

const prosData = [
  {
    icon: <Clock size={48} />,
    title: "Où tu veux, quand tu veux,\nà TON rythme !",
    defaultText: "Disponible 7 jours / 7, 24h / 24,\nsur PC, tablette, ou smartphone.",
    hoverText: "Concentre-toi sur des objectifs réalistes. Atteins tes objectifs en un temps record."
  },
  {
    icon: <GraduationCap size={48} />,
    title: "Des approches validées scientifiquement",
    defaultText: "Nous mettons tout en oeuvre pour que les informations qui te soient rapportées soient basés sur des supports validés scientifiquement.",
    hoverText: "Notre solution s'inspire de courants de la psychologie et va dans le sens des recommandations de bonnes pratiques."
  },
  {
    icon: <Target size={48} />,
    title: "Des actes concrêts\npour un changement réaliste",
    defaultText: "Pas d'informations inutiles ou incompréhensibles : apprends seulement ce que tu dois savoir pour atteindre ton objectif.",
    hoverText: "Visualises le chemin à parcourir pour atteindre tes objectifs. Mets en place des actes concrets pour le faire."
  },
  {
    icon: <Wallet size={48} />,
    title: "Une solution accessible",
    defaultText: "Nous existons pour rendre la santé mentale la plus accessible possible. C'est pour cela que ...",
    hoverText: "La Camé House propose une partie de ses services, GRATUITEMENT, À VIE !\nTu peux opter pour les offres premium si tu veux mettre toutes les chances de ton côté."
  },
  {
    icon: <Shield size={48} />,
    title: "Confidentialité et anonymat",
    defaultText: "Tes informations sont protégées par le secret professionnel et le RGPD.\nSaches que nous faisons tout ce qui est en notre pouvoir pour ne JAMAIS faillir à cette mission et garantir la sécurité de tes données.",
    hoverText: "Grâce à Internet, on t'offre également un niveau d'anonymat et de confidentialité qu'aucun centre de soin classique ne pourra t'offrir :\nplus besoin de montrer son visage pour être bien accompagné !"
  }
];

const Pros = React.memo(() => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, 
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );

  return (
    <section ref={containerRef} id="pros" className="section">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity }}
      >
        <h2 className="section-title">
          L'innovation technologique au service de ta santé mentale !
        </h2>
        
        <p className="text-center text-foreground/80 mb-12 max-w-[64%] mx-auto">
          Quelques raisons supplémentaires d'expérimenter le soin 2.0 avec la Camé House :
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {prosData.slice(0, 3).map((pro, index) => (
            <ProCard key={index} {...pro} />
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-0 place-items-center"
        >
          {prosData.slice(3).map((pro, index) => (
            <ProCard key={index} {...pro} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
});

Pros.displayName = 'Pros';

export default Pros;
