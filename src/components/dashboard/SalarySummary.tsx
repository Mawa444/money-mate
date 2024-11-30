import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DollarSign, TrendingDown, Wallet } from "lucide-react";

interface SalarySummaryProps {
  grossSalary: number;
  deductions: number;
  netSalary: number;
}

export const SalarySummary = ({ grossSalary, deductions, netSalary }: SalarySummaryProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/20 rounded-full">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Salaire Brut</p>
              <h3 className="text-2xl font-bold">{grossSalary.toLocaleString()} FCFA</h3>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-destructive/20 rounded-full">
              <TrendingDown className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Déductions</p>
              <h3 className="text-2xl font-bold">{deductions.toLocaleString()} FCFA</h3>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/20 rounded-full">
              <Wallet className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Salaire Net</p>
              <h3 className="text-2xl font-bold">{netSalary.toLocaleString()} FCFA</h3>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};