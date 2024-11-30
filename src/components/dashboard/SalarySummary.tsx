import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

interface SalarySummaryProps {
  salary: number;
}

export const SalarySummary = ({ salary }: SalarySummaryProps) => {
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
          <div>
            <p className="text-sm font-medium text-muted-foreground">Salaire</p>
            <h3 className="text-2xl font-bold">{salary.toLocaleString()} FCFA</h3>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};