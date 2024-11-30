import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { PiggyBank, Plus, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Budget = () => {
  const [budget, setBudget] = useState("");
  const [threshold, setThreshold] = useState("");
  const [currency, setCurrency] = useState("FCFA");

  const handleSetBudget = () => {
    if (!budget || !threshold) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Budget défini",
      description: `Budget de ${budget} ${currency} avec alerte à ${threshold}%`,
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Budget</h1>
          <p className="text-muted-foreground">Gérez votre budget mensuel</p>
        </div>
        <Button onClick={handleSetBudget} className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Définir le budget
        </Button>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-primary/20 rounded-full"
                >
                  <PiggyBank className="h-6 w-6 text-primary" />
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Budget total
                  </p>
                  <h2 className="text-2xl font-bold">{budget || "0"} {currency}</h2>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Montant du budget</label>
                  <Input
                    type="number"
                    placeholder="Entrez le montant"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Seuil d'alerte (%)</label>
                  <Input
                    type="number"
                    placeholder="Ex: 80"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Devise</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full mt-1 p-2 rounded-md border border-input bg-background"
                  >
                    <option value="FCFA">FCFA</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-red-500/20 rounded-full"
              >
                <AlertCircle className="h-6 w-6 text-red-500" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Alertes
                </p>
                <h2 className="text-2xl font-bold">
                  Seuil: {threshold || "0"}%
                </h2>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Vous recevrez une alerte lorsque vos dépenses atteindront {threshold || "0"}% de votre budget.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Budget;