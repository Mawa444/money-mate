import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Receipt, Plus, Search, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const Transactions = () => {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleAddExpense = (expense: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...expense,
      id: Math.random().toString(36).substring(7),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const filteredTransactions = transactions
    .filter(t => 
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="space-y-6 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Gérez vos transactions</p>
        </div>
        <Button onClick={() => setIsAddExpenseOpen(true)} className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle transaction
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
                className="w-full md:w-auto"
              >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Trier par date
              </Button>
            </div>

            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-primary/20 rounded-full"
                    >
                      <Receipt className="h-4 w-4 text-primary" />
                    </motion.div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold">
                      {transaction.amount.toFixed(2)} FCFA
                    </span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </motion.div>
              ))}

              {filteredTransactions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Aucune transaction trouvée
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      <AddExpenseDialog
        open={isAddExpenseOpen}
        onOpenChange={setIsAddExpenseOpen}
        onAddExpense={handleAddExpense}
      />
    </div>
  );
};

export default Transactions;