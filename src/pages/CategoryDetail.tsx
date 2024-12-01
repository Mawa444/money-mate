import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useBudgetStore } from "@/store/budgetStore";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const COLORS = ["#9b87f5", "#7E69AB", "#6E59A5", "#D6BCFA", "#E5DEFF"];

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const { categories, transactions } = useBudgetStore();

  const category = categories.find(cat => cat.id === categoryId);
  if (!category) return <div>Catégorie non trouvée</div>;

  const categoryTransactions = transactions
    .filter(t => t.category === category.name)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const remainingBudget = category.budget - category.spent;
  const percentageSpent = (category.spent / category.budget) * 100;

  // Données pour le graphique d'évolution des dépenses
  const spendingTrend = categoryTransactions.reduce((acc: any[], transaction) => {
    const date = new Date(transaction.date).toLocaleDateString();
    const existingEntry = acc.find(entry => entry.date === date);
    
    if (existingEntry) {
      existingEntry.amount += transaction.amount;
    } else {
      acc.push({ date, amount: transaction.amount });
    }
    
    return acc;
  }, []);

  // Statistiques
  const averageExpense = categoryTransactions.length > 0
    ? categoryTransactions.reduce((sum, t) => sum + t.amount, 0) / categoryTransactions.length
    : 0;

  const maxExpense = categoryTransactions.length > 0
    ? Math.max(...categoryTransactions.map(t => t.amount))
    : 0;

  return (
    <div className="space-y-6 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6"
      >
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Budget Total</p>
              <p className="text-2xl font-bold">{category.budget.toLocaleString()} FCFA</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Dépensé</p>
              <p className="text-2xl font-bold">{category.spent.toLocaleString()} FCFA</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Restant</p>
              <p className="text-2xl font-bold">{remainingBudget.toLocaleString()} FCFA</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression du budget</span>
              <span>{percentageSpent.toFixed(1)}%</span>
            </div>
            <Progress value={percentageSpent} className="h-2" />
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Statistiques</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Dépense moyenne</p>
                <p className="text-xl font-semibold">{averageExpense.toLocaleString()} FCFA</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Plus grande dépense</p>
                <p className="text-xl font-semibold">{maxExpense.toLocaleString()} FCFA</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nombre de transactions</p>
                <p className="text-xl font-semibold">{categoryTransactions.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Évolution des dépenses</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendingTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#9b87f5" 
                    name="Montant"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Historique des transactions</h3>
          <div className="space-y-4">
            {categoryTransactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(transaction.date), { 
                      addSuffix: true,
                      locale: fr 
                    })}
                  </p>
                </div>
                <p className="font-semibold">{transaction.amount.toLocaleString()} FCFA</p>
              </motion.div>
            ))}
            {categoryTransactions.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                Aucune transaction pour cette catégorie
              </p>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default CategoryDetail;