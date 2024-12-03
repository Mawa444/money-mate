import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

// Stockage des derniers conseils affichés
const HISTORY_LENGTH = 40;
let displayHistory: number[] = [];

const tips = [
  "Payez vos charges fixes d'abord : Assurez-vous que le loyer et les factures sont réglés avant de dépenser pour d'autres choses.",
  "Établissez un budget clair : Notez vos revenus et dépenses pour mieux contrôler vos finances.",
  "Épargnez systématiquement : Mettez de côté un pourcentage de votre salaire chaque mois, même si c'est peu.",
  "Réduisez les dépenses inutiles : Identifiez et éliminez les abonnements ou achats superflus.",
  "Planifiez les achats importants : Économisez à l'avance pour éviter de recourir à des crédits coûteux.",
  "Revoyez régulièrement votre budget : Ajustez-le selon vos changements de situation financière.",
  "Cherchez des revenus supplémentaires : Envisagez un emploi à temps partiel ou des investissements pour augmenter vos revenus.",
  // Nouveaux conseils ajoutés
  "Le défi du placard de salle de bain : Avant d'acheter un nouveau produit de beauté, finissez ceux que vous avez.",
  "Le jeu de la lessive : Faites durer vos vêtements en apprenant à lire les étiquettes de lavage.",
  "Le compte à rebours des achats : Quand vous voyez un article en solde, comptez jusqu'à 100.",
  "Le défi des restes : Chaque dimanche, cuisinez avec les restes de la semaine.",
  "La méditation du panier virtuel : Remplissez votre panier en ligne, puis fermez l'onglet.",
  "Le concours de la boîte à gants : Cherchez des objets à vendre dans votre voiture.",
  "Le défi du DIY : Pour chaque objet que vous voulez acheter, demandez-vous si vous pouvez le fabriquer.",
  "La journée du troc : Échangez des biens avec vos amis sans dépenser.",
  "Le challenge du livre de cuisine : Cuisinez une recette au hasard de votre livre.",
  "Le jeu des chaussettes perdues : Retrouvez et réparez vos chaussettes seules.",
  "Le dance-off des factures : Célébrez chaque facture payée par une danse.",
  "Le défi du sac à main : Nettoyez votre sac, vous pourriez trouver des trésors oubliés.",
  "Le rituel du café maison : Transformez votre café en rituel matinal.",
  "Le tournoi des objets inutiles : Organisez un concours mensuel pour les objets les moins utilisés.",
  "Le safari des soldes : Traquez les bonnes affaires avec discernement.",
  "Le relooking de garde-robe : Créez de nouvelles tenues avec vos vêtements existants.",
  "Le défi de la boîte à déjeuner : Calculez vos économies en apportant votre repas.",
  "Le challenge du rangement : Vendez ce qui ne vous apporte plus de joie.",
  "Le défi des courses à l'ancienne : Utilisez un budget fixe en espèces.",
  "Le détecteur d'abonnements invisibles : Traquez les abonnements oubliés.",
  "Le challenge du dîner à la bougie : Économisez l'électricité une fois par mois.",
  "Le jeu des économies de chauffage : Mettez un pull plutôt que d'augmenter le chauffage.",
  "Le concours de la boîte à outils : Apprenez à faire des réparations vous-même.",
  "Le défi du cinéma maison : Créez une expérience cinéma chez vous.",
];

export const FinancialTips = () => {
  const [currentTip, setCurrentTip] = useState(() => {
    const initialIndex = Math.floor(Math.random() * tips.length);
    displayHistory.push(initialIndex);
    return tips[initialIndex];
  });

  const getNewTip = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * tips.length);
    } while (displayHistory.includes(newIndex));

    // Mettre à jour l'historique
    displayHistory.push(newIndex);
    if (displayHistory.length > HISTORY_LENGTH) {
      displayHistory.shift(); // Retire le plus ancien conseil
    }

    setCurrentTip(tips[newIndex]);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border p-4"
        style={{ maxWidth: "100%", margin: "0 auto" }}
      >
        <Card 
          className="relative p-4 bg-background border border-border cursor-pointer hover:bg-muted/50 transition-colors max-w-3xl mx-auto"
          onClick={getNewTip}
        >
          <p className="text-sm text-foreground">{currentTip}</p>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
