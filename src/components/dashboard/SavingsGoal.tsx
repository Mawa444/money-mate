import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PiggyBank } from "lucide-react";

interface SavingsGoalProps {
  current: number;
  target: number;
  monthlyContribution: number;
}

export const SavingsGoal = ({ current, target, monthlyContribution }: SavingsGoalProps) => {
  const progress = (current / target) * 100;

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-primary/20 rounded-full">
          <PiggyBank className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Objectif d'Épargne</h3>
          <p className="text-sm text-muted-foreground">Contribution mensuelle: {monthlyContribution.toLocaleString()} FCFA</p>
        </div>
      </div>

      <div className="space-y-4">
        <Progress value={progress} className="h-2" />
        
        <div className="flex justify-between text-sm">
          <span>{current.toLocaleString()} FCFA</span>
          <span className="text-muted-foreground">{target.toLocaleString()} FCFA</span>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {progress.toFixed(1)}% de votre objectif atteint
          </p>
        </div>
      </div>
    </Card>
  );
};