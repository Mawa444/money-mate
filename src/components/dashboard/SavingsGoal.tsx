import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Target } from "lucide-react";

interface SavingsGoalProps {
  current: number;
  target: number;
  monthlyContribution: number;
}

export const SavingsGoal = ({ current, target, monthlyContribution }: SavingsGoalProps) => {
  const progress = (current / target) * 100;

  return (
    <Card className="p-6 bg-savings-goal/40 hover:bg-savings-goal/50 transition-colors">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-savings-goal rounded-full">
          <Target className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-purple-800">Objectif d'Épargne</h3>
          <p className="text-sm text-purple-700">
            Suivez votre progression vers votre objectif d'épargne
          </p>
        </div>
      </div>
      <Progress value={progress} className="h-4 bg-purple-200" />
      <div className="mt-4 flex justify-between">
        <span className="text-purple-800">{current.toLocaleString()} FCFA</span>
        <span className="text-purple-800">{target.toLocaleString()} FCFA</span>
      </div>
      <p className="text-sm text-purple-600 mt-2">
        Contribution mensuelle: {monthlyContribution.toLocaleString()} FCFA
      </p>
    </Card>
  );
};
