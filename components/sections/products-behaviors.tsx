"use client";

import React from 'react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AmphetIcon from '@/assets/icones/amphet-white.svg';
import BeerIcon from '@/assets/icones/beer-white.svg';
import CannabisIcon from '@/assets/icones/cannabis-white.svg';
import ClopeIcon from '@/assets/icones/clope-white.svg';
import DependanceAffectiveIcon from '@/assets/icones/dependance-affective-white.svg';
import GamblingIcon from '@/assets/icones/gambling-white.svg';
import InstaIcon from '@/assets/icones/insta-white.svg';
import NpsIcon from '@/assets/icones/nps-white.svg';
import PsycheIcon from '@/assets/icones/psyche-white.svg';
import SexIcon from '@/assets/icones/sex-white.svg';
import SportsIcon from '@/assets/icones/sports-white.svg';
import TiktokIcon from '@/assets/icones/tiktok-white.svg';
import TravailIcon from '@/assets/icones/travail-white.svg';
import VideoGamesIcon from '@/assets/icones/video-games-white.svg';

const iconConfigs = {
  sports: { viewBox: "0 0 675 675" },
  travail: { viewBox: "0 0 675 675" },
  videoGames: { viewBox: "0 0 125 125" },
  gambling: { viewBox: "0 0 150 150" },
  dependanceAffective: { viewBox: "0 0 105 105" },
  nps: { viewBox: "0 0 135 135" },
  amphet: { viewBox: "0 0 105 105" },
};

const getRandomRotation = () => {
  const isPositive = Math.random() > 0.5;
  if (isPositive) {
    return (Math.random() * 4 + 4).toFixed(1);
  } else {
    return (Math.random() * -4 - 4).toFixed(1);
  }
};

const substances = [
  { icon: <BeerIcon className="w-12 h-12" viewBox="0 0 105 105" preserveAspectRatio="xMidYMid meet" />, name: "Alcool", rotate: getRandomRotation() },
  { icon: <CannabisIcon className="w-12 h-12" viewBox="0 0 105 105" preserveAspectRatio="xMidYMid meet" />, name: "Cannabis", rotate: getRandomRotation() },
  { icon: <ClopeIcon className="w-12 h-12" viewBox="0 0 105 105" preserveAspectRatio="xMidYMid meet" />, name: "Tabac", rotate: getRandomRotation() },
  { icon: <PsycheIcon className="w-12 h-12" viewBox="0 0 105 105" preserveAspectRatio="xMidYMid meet" />, name: "Pshychédéliques", rotate: getRandomRotation() },
  { icon: <NpsIcon className="w-14 h-14" viewBox={iconConfigs.nps.viewBox} preserveAspectRatio="xMidYMid meet" />, name: "NPS", rotate: getRandomRotation() },
  { icon: <AmphetIcon className="w-12 h-12" viewBox={iconConfigs.amphet.viewBox} preserveAspectRatio="xMidYMid meet" />, name: "Amphétamines", rotate: getRandomRotation() },
];

const behaviors = [
  { icon: <VideoGamesIcon className="w-12 h-12" viewBox={iconConfigs.videoGames.viewBox} preserveAspectRatio="xMidYMid meet" />, name: "Jeux vidéo", rotate: getRandomRotation() },
  { icon: <InstaIcon className="w-12 h-12" viewBox="0 0 120 120" preserveAspectRatio="xMidYMid meet" />, name: "Instagram", rotate: getRandomRotation() },
  { icon: <TiktokIcon className="w-12 h-12" viewBox="0 0 120 120" preserveAspectRatio="xMidYMid meet" />, name: "TikTok", rotate: getRandomRotation() },
  { icon: <GamblingIcon className="w-14 h-14" viewBox={iconConfigs.gambling.viewBox} preserveAspectRatio="xMidYMid meet" />, name: "Jeux d'argent", rotate: getRandomRotation() },
  { icon: <DependanceAffectiveIcon className="w-12 h-12" viewBox={iconConfigs.dependanceAffective.viewBox} preserveAspectRatio="xMidYMid meet" />, name: "Dépendance affective", rotate: getRandomRotation() },
  { icon: <SexIcon className="w-12 h-12" viewBox="0 0 120 120" preserveAspectRatio="xMidYMid meet" />, name: "Sexe", rotate: getRandomRotation() },
  { icon: <SportsIcon className="w-12 h-12" viewBox={iconConfigs.sports.viewBox} preserveAspectRatio="xMidYMid meet" />, name: "Sport", rotate: getRandomRotation() },
  { icon: <TravailIcon className="w-12 h-12" viewBox={iconConfigs.travail.viewBox} preserveAspectRatio="xMidYMid meet" />, name: "Travail", rotate: getRandomRotation() },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const hoverProps = {
  whileHover: { 
    scale: 1.1,
    transition: {
      type: "tween",
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

interface TickerItemProps {
  item: {
    icon: React.ReactNode;
    name: string;
    rotate: string;
  };
  index: number;
}

const TickerItem = React.memo(({ item, index }: TickerItemProps) => (
  <motion.div
    key={`${item.name}-${index}`}
    className="ticker-item"
    style={{ "--rotation": `${item.rotate}deg` } as React.CSSProperties}
    variants={itemVariants}
    {...hoverProps}
  >
    <div className="w-20 h-20 flex items-center justify-center transition-transform duration-300">
      {item.icon}
    </div>
    <div className="text-foreground whitespace-nowrap font-medium">
      {item.name}
    </div>
  </motion.div>
));

TickerItem.displayName = 'TickerItem';

interface InfiniteTickerProps {
  items: Array<{
    icon: React.ReactNode;
    name: string;
    rotate: string;
  }>;
  direction?: 'left' | 'right';
}

const InfiniteTicker = React.memo(({ items, direction = 'left' }: InfiniteTickerProps) => {
  const itemsToRender = [...items, ...items, ...items];
  
  const renderGroup = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="ticker-group"
    >
      {itemsToRender.map((item, index) => (
        <TickerItem key={index} item={item} index={index} />
      ))}
    </motion.div>
  );

  return (
    <div className="ticker-container">
      <div className={`ticker-wrapper ${direction}`}>
        {renderGroup()}
        {renderGroup()}
      </div>
    </div>
  );
});

InfiniteTicker.displayName = 'InfiniteTicker';

const ProductsBehaviors = React.memo(() => {
  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
    <section ref={containerRef} className="section py-12" id="products_behaviors">
      <motion.div 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity }}
      >
        <h2 className="section-title mb-8">Produits et comportements concernés</h2>
        <p className="text-center text-foreground/80 mb-8 max-w-[64%] mx-auto">
          Cette liste sera complétée au fil des dépendances pour lesquelles la Camé House mettra en place des solutions.
        </p>

        <div className="mb-4 py-4 rounded-xl">
          <InfiniteTicker items={substances} direction="left" />
        </div>

        <div className="mb-8 py-4 rounded-xl">
          <InfiniteTicker items={behaviors} direction="right" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center space-y-4 mt-8"
        >
          <motion.p 
            variants={itemVariants}
            className="text-foreground/80 max-w-[64%] mx-auto"
          >
            Les dépendances sont souvent liées à d'autres troubles et maladies mentales, notamment l'anxiété chronique et / ou la dépression.
          </motion.p>
          <motion.p 
            variants={itemVariants}
            className="text-foreground font-semibold max-w-[64%] mx-auto"
          >
            Des solutions sont donc également proposées pour apprendre à mieux les gérer.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
});

ProductsBehaviors.displayName = 'ProductsBehaviors';

export default ProductsBehaviors;
