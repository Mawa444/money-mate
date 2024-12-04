import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useBudgetStore } from "@/store/budgetStore";
import { toast } from "sonner";

export const SpendingLimitManager = () => {
  const { spendingLimit, setSpendingLimit } = useBudgetStore();
  const [newLimit, setNewLimit] = useState(spendingLimit.toString());

  const handleSetLimit = () => {
    const limit = Number(newLimit);
    if (isNaN(limit) || limit <= 0) {
      toast.error("Veuillez entrer un montant valide");
      return;
    }
    setSpendingLimit(limit);
    toast.success(`Limite de dépenses fixée à ${limit.toLocaleString()} FCFA`);
  };

  return (
    <Card className="p-6 glass-panel">
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-primary/20 rounded-full">
          <AlertCircle className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Limite de Dépenses</h3>
          <p className="text-sm text-muted-foreground">
            Définissez une limite pour vos dépenses mensuelles
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">Montant limite</label>
          <Input
            type="number"
            value={newLimit}
            onChange={(e) => setNewLimit(e.target.value)}
            placeholder="Entrez le montant limite"
            className="mt-1"
          />
        </div>
        <Button onClick={handleSetLimit} className="w-full">
          Définir la limite
        </Button>
      </div>

      {spendingLimit > 0 && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm text-foreground">
            Limite actuelle : {spendingLimit.toLocaleString()} FCFA
          </p>
        </div>
      )}
    </Card>
  );
};