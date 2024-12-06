import React, { useState } from "react";
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

const FinancialTips = () => {
  const [currentTip, setCurrentTip] = useState(tips[0]);

  const getRandomTip = () => {
    const currentIndex = tips.indexOf(currentTip);
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * tips.length);
    } while (newIndex === currentIndex);
    return tips[newIndex];
  };

  const handleClick = () => {
    setCurrentTip(getRandomTip());
  };

  return (
    <div 
      onClick={handleClick}
      className="w-full bg-primary overflow-hidden cursor-pointer transition-colors duration-300 hover:bg-primary/90"
    >
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-xl font-bold text-primary-foreground mb-4">
          Nos Tips
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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