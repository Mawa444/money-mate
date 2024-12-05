import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { useBudgetStore } from "@/store/budgetStore";

export const SavingsGoal = () => {
  const { monthlySalary, savingsGoal } = useBudgetStore();
  const targetAmount = (monthlySalary * savingsGoal) / 100;
  const currentSavings = monthlySalary * 0.1; // À adapter selon votre logique de calcul des économies réelles
  const progress = (currentSavings / targetAmount) * 100;

  return (
    <Card className="p-6 glass-panel">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-primary/20 rounded-full">
          <Target className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Objectif d'Épargne</h3>
          <p className="text-sm text-muted-foreground">
            Suivez votre progression vers votre objectif d'épargne
          </p>
        </div>
      </div>
      <Progress value={progress} className="h-4" />
      <div className="mt-4 flex justify-between">
        <span className="text-foreground">{currentSavings.toLocaleString()} FCFA</span>
        <span className="text-foreground">{targetAmount.toLocaleString()} FCFA</span>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Objectif mensuel: {savingsGoal}% de votre revenu
      </p>
    </Card>
  );
};