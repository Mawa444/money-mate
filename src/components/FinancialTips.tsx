import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const tips = [
  "Payez vos charges fixes d'abord : Assurez-vous que le loyer et les factures sont réglés avant de dépenser pour d'autres choses.",
  "Établissez un budget clair : Notez vos revenus et dépenses pour mieux contrôler vos finances.",
  "Épargnez systématiquement : Mettez de côté un pourcentage de votre salaire chaque mois, même si c'est peu.",
  "Réduisez les dépenses inutiles : Identifiez et éliminez les abonnements ou achats superflus.",
  "Planifiez les achats importants : Économisez à l'avance pour éviter de recourir à des crédits coûteux.",
  "Revoyez régulièrement votre budget : Ajustez-le selon vos changements de situation financière.",
  "Cherchez des revenus supplémentaires : Envisagez un emploi à temps partiel ou des investissements pour augmenter vos revenus.",
];

export const FinancialTips = () => {
  const [currentTip, setCurrentTip] = useState(() => tips[Math.floor(Math.random() * tips.length)]);

  const getNewTip = () => {
    let newTip;
    do {
      newTip = tips[Math.floor(Math.random() * tips.length)];
    } while (newTip === currentTip);
    setCurrentTip(newTip);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-6"
        onClick={getNewTip}
      >
        <Card className="relative p-4 bg-primary/10 cursor-pointer hover:bg-primary/20 transition-colors">
          <p className="text-sm text-primary">{currentTip}</p>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};