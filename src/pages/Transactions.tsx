import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Receipt } from "lucide-react";

const Transactions = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Historique de vos transactions</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-blue-500/20 rounded-full"
            >
              <Receipt className="h-6 w-6 text-blue-500" />
            </motion.div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total des transactions
              </p>
              <h2 className="text-2xl font-bold">0</h2>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Transactions;