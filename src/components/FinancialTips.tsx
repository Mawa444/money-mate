import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tips = [
  "Établissez un budget mensuel détaillé et suivez-le rigoureusement.",
  "Épargnez au moins 20% de vos revenus mensuels.",
  "Investissez dans votre éducation financière régulièrement.",
  "Évitez les dettes de consommation non essentielles.",
  "Constituez un fonds d'urgence équivalent à 3-6 mois de dépenses.",
  "Diversifiez vos investissements pour réduire les risques.",
  "Automatisez vos paiements et votre épargne.",
  "Comparez les prix avant tout achat important.",
  "Privilégiez les achats réfléchis aux achats impulsifs.",
  "Gardez une trace de toutes vos dépenses.",
  "Négociez vos factures régulières (téléphone, internet, etc.).",
  "Investissez tôt pour profiter des intérêts composés."
];

const animations = [
  {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
  },
  {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  },
  {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 }
  },
  {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 180 }
  },
  {
    initial: { opacity: 0, skewX: -30 },
    animate: { opacity: 1, skewX: 0 },
    exit: { opacity: 0, skewX: 30 }
  },
  {
    initial: { opacity: 0, y: -100, scale: 0.3 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 100, scale: 0.3 }
  },
  {
    initial: { opacity: 0, x: 100, rotate: 90 },
    animate: { opacity: 1, x: 0, rotate: 0 },
    exit: { opacity: 0, x: -100, rotate: -90 }
  },
  {
    initial: { opacity: 0, scale: 2 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 }
  },
  {
    initial: { opacity: 0, y: 50, x: 50 },
    animate: { opacity: 1, y: 0, x: 0 },
    exit: { opacity: 0, y: -50, x: -50 }
  },
  {
    initial: { opacity: 0, scale: 0.5, rotate: 45 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.5, rotate: -45 }
  }
];

const FinancialTips = () => {
  const [currentTip, setCurrentTip] = useState(tips[0]);
  const [currentAnimation, setCurrentAnimation] = useState(0);

  const getRandomTip = () => {
    const currentIndex = tips.indexOf(currentTip);
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * tips.length);
    } while (newIndex === currentIndex);
    return tips[newIndex];
  };

  const getRandomAnimation = () => {
    const newIndex = Math.floor(Math.random() * animations.length);
    setCurrentAnimation(newIndex);
    return animations[newIndex];
  };

  const handleClick = () => {
    setCurrentTip(getRandomTip());
    getRandomAnimation();
  };

  return (
    <div 
      onClick={handleClick}
      className="w-full bg-primary cursor-pointer transition-colors duration-300 hover:bg-primary/90"
    >
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold text-primary-foreground mb-4">
          Conseils Financiers
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTip}
            initial={animations[currentAnimation].initial}
            animate={animations[currentAnimation].animate}
            exit={animations[currentAnimation].exit}
            transition={{ duration: 0.5 }}
            className="text-primary-foreground"
          >
            {currentTip}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FinancialTips;