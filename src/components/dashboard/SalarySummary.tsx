import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { useBudgetStore } from "@/store/budgetStore";

export const SalarySummary = () => {
  const { transactions, monthlySalary } = useBudgetStore();
  const totalSpent = transactions.reduce((acc, t) => acc + t.amount, 0);
  const remaining = monthlySalary - totalSpent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/20 rounded-full">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Salaire mensuel</p>
            <h3 className="text-2xl font-bold">{monthlySalary.toLocaleString()} FCFA</h3>
            <p className="text-sm mt-1">
              <span className={`font-medium ${remaining < 0 ? 'text-destructive' : 'text-green-500'}`}>
                Restant: {remaining.toLocaleString()} FCFA
              </span>
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};