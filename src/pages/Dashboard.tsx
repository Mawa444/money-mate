import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PiggyBank, TrendingUp, AlertCircle } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">Aperçu de vos finances</p>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
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
                className="p-3 bg-primary/20 rounded-full"
              >
                <PiggyBank className="h-6 w-6 text-primary" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Économies
                </p>
                <h2 className="text-2xl font-bold">30%</h2>
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
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-blue-500/20 rounded-full"
              >
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Dépenses
                </p>
                <h2 className="text-2xl font-bold">70%</h2>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-4">
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
                <h2 className="text-2xl font-bold">2</h2>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;