import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { SalarySummary } from "@/components/dashboard/SalarySummary";
import { ExpenseSummary } from "@/components/dashboard/ExpenseSummary";
import { SavingsGoal } from "@/components/dashboard/SavingsGoal";

// Données temporaires pour la démonstration
const mockData = {
  salary: {
    gross: 500000,
    deductions: 100000,
    net: 400000
  },
  expenses: {
    categories: [
      { name: "Logement", amount: 150000, budget: 200000, color: "bg-blue-500" },
      { name: "Transport", amount: 50000, budget: 60000, color: "bg-green-500" },
      { name: "Alimentation", amount: 80000, budget: 100000, color: "bg-yellow-500" },
      { name: "Loisirs", amount: 30000, budget: 40000, color: "bg-purple-500" }
    ],
    totalBudget: 400000,
    totalSpent: 310000
  },
  savings: {
    current: 1500000,
    target: 5000000,
    monthlyContribution: 50000
  }
};

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

      <SalarySummary 
        grossSalary={mockData.salary.gross}
        deductions={mockData.salary.deductions}
        netSalary={mockData.salary.net}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <ExpenseSummary 
          categories={mockData.expenses.categories}
          totalBudget={mockData.expenses.totalBudget}
          totalSpent={mockData.expenses.totalSpent}
        />

        <SavingsGoal 
          current={mockData.savings.current}
          target={mockData.savings.target}
          monthlyContribution={mockData.savings.monthlyContribution}
        />
      </div>
    </div>
  );
};

export default Dashboard;