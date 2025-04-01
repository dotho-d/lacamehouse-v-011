"use client";

import React from 'react';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem = React.memo(({ question, answer, index }: FAQItemProps) => (
  <motion.div variants={itemVariants}>
    <AccordionItem
      value={`item-${index}`}
      className="mb-4 overflow-hidden rounded-[30px] border border-white/50 bg-[#132D3B] transition-all duration-300 data-[state=open]:border-[#D4A676]"
    >
      <AccordionTrigger className="px-6 py-4 text-center hover:no-underline w-full">
        <span className="font-heading text-lg text-foreground w-full text-center">
          {question}
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-4">
        <div className="space-y-4 text-foreground/80">
          {answer.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="font-body">
              {paragraph}
            </p>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  </motion.div>
));

FAQItem.displayName = 'FAQItem';

const faqData = [
  {
    question: "Qui suis je ?",
    answer: `Ex-toxico pas totalement repenti, mais surtout, éduc-spé de formation, j'ai travaillé durant plus de 4 ans en addictologie.

J'ai finis par tomber amoureux des principaux courants de la psychologie qui l'animent.

Dans ce cadre, j'ai développé une croyance solide : N'IMPORTE QUI peut atteindre ses objectifs s'il rencontre les bonnes personnes et qu'il s'en donne les moyens.

Après 3 ans auprès d'un public en situation de grande précarité, des aventures palpitantes, de la fatigue, et des embrouilles avec la direction, je démissionne.

Durant le chômage, je me suis rendu compte d'un truc …

Ce que proposent les structures de soin classiques n'est pas forcément adapté à tout le monde !`,
  },
  {
    question: "Est ce que c'est GRATUIT ?",
    answer: `Une partie des services proposés sur ce site sont gratuits et le resteront !

Néanmoins si tu veux disposer de solutions innovantes dans ton cheminement, la Camé House propose également des services premium, adaptés à tous les budgets !`,
  },
  {
    question: "Pourquoi créer un compte à la Camé House ?",
    answer: `Tu peux déja utiliser quelques outils gratuitement.

Néanmoins, je te recommande fortement de t'inscrire pour bénéficier de tous les avantages du site, notamment si tu cherches à atteindre un objectif concret !

Une fois connecté, tu pourras enregistrer tes résultats, avoir une vue d'ensemble sur ton évolution, gamifier ton projet de soin, ou encore partager ton expérience !`,
  },
];

const FAQ = React.memo(() => {
  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} id="faq" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="section-title"
        >
          Questions fréquentes
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center items-center w-full"
        >
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-[600px] px-5"
          >
            {faqData.map((item, index) => (
              <FAQItem 
                key={index}
                question={item.question}
                answer={item.answer}
                index={index}
              />
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
});

FAQ.displayName = 'FAQ';

export default FAQ;