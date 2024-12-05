import React from "react";

const FinancialTips = () => {
  return (
    <div className="w-full bg-primary/10 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold text-foreground">Conseils Financiers</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Établissez un budget et tenez-vous-y.</li>
          <li>Économisez au moins 20% de vos revenus.</li>
          <li>Investissez dans votre éducation financière.</li>
          <li>Évitez les dettes inutiles.</li>
          <li>Utilisez des applications de gestion de budget.</li>
        </ul>
      </div>
    </div>
  );
};

export default FinancialTips;
