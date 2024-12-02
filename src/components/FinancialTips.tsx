import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
  const [showTip, setShowTip] = useState(true);
  const [currentTip] = useState(() => tips[Math.floor(Math.random() * tips.length)]);

  if (!showTip) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-6"
      >
        <Card className="relative p-4 bg-primary/10">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => setShowTip(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <p className="text-sm text-primary pr-8">{currentTip}</p>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};