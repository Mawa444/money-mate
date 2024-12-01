import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { SalarySummary } from "@/components/dashboard/SalarySummary";
import { ExpenseSummary } from "@/components/dashboard/ExpenseSummary";
import { CategoryManager } from "@/components/dashboard/CategoryManager";
import { SavingsGoal } from "@/components/dashboard/SavingsGoal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [salary, setSalary] = useState<number>(0);
  const [showSalaryInput, setShowSalaryInput] = useState(true);

  const handleSalarySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSalaryInput(false);
    toast({
      title: "Salaire enregistré",
      description: `Votre salaire de ${salary.toLocaleString()} FCFA a été enregistré.`
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">Gérez votre budget mensuel</p>
        </div>
      </motion.div>

      {showSalaryInput ? (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Commencez par renseigner votre salaire</h2>
          <form onSubmit={handleSalarySubmit} className="space-y-4">
            <div>
              <label htmlFor="salary" className="block text-sm font-medium mb-2">
                Votre salaire mensuel
              </label>
              <Input
                id="salary"
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                placeholder="Entrez votre salaire"
                className="w-full"
                required
              />
            </div>
            <Button type="submit">Enregistrer le salaire</Button>
          </form>
        </Card>
      ) : (
        <>
          <SalarySummary salary={salary} />
          <div className="grid gap-6 md:grid-cols-2">
            <CategoryManager />
            <ExpenseSummary 
              categories={[]}
              totalBudget={salary}
              totalSpent={0}
            />
          </div>
          <SavingsGoal 
            current={0}
            target={0}
            monthlyContribution={0}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;