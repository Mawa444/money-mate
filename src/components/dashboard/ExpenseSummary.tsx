import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface ExpenseCategory {
  name: string;
  amount: number;
  budget: number;
  color: string;
}

interface ExpenseSummaryProps {
  categories: ExpenseCategory[];
  totalBudget: number;
  totalSpent: number;
}

export const ExpenseSummary = ({ categories, totalBudget, totalSpent }: ExpenseSummaryProps) => {
  const percentageSpent = (totalSpent / totalBudget) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 bg-expense-summary/40 hover:bg-expense-summary/50 transition-colors">
        <h3 className="text-lg font-semibold mb-4">Dépenses par Catégorie</h3>
        <div className="space-y-4">
          {categories.map((category) => {
            const percentage = (category.amount / category.budget) * 100;
            return (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{category.name}</span>
                  <span>
                    {category.amount.toLocaleString()} / {category.budget.toLocaleString()} FCFA
                  </span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-2 bg-secondary"
                />
              </div>
            );
          })}
          
          <div className="pt-4 border-t border-border">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Total Dépenses</span>
              <span>
                {totalSpent.toLocaleString()} / {totalBudget.toLocaleString()} FCFA
              </span>
            </div>
            <Progress 
              value={percentageSpent} 
              className="h-3 bg-secondary"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};