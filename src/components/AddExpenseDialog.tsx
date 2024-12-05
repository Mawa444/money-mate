import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { motion } from "framer-motion";
import { useBudgetStore } from "@/store/budgetStore";
import { toast } from "sonner";
import { Check } from "lucide-react";

type AddExpenseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddExpense?: (expense: { amount: number; description: string; category: string; date: string }) => void;
};

export const AddExpenseDialog = ({
  open,
  onOpenChange,
  onAddExpense,
}: AddExpenseDialogProps) => {
  const { categories, addTransaction } = useBudgetStore();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !category) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    const selectedCategory = categories.find(cat => cat.name === category);
    if (!selectedCategory) {
      toast.error("Catégorie invalide");
      return;
    }

    const transactionAmount = parseFloat(amount);
    if (transactionAmount > (selectedCategory.budget - selectedCategory.spent)) {
      toast.error("Cette dépense dépasse le budget restant pour cette catégorie");
      return;
    }

    const now = new Date().toISOString();
    addTransaction({
      amount: transactionAmount,
      description,
      category,
      date: now,
      timestamp: now
    });

    if (onAddExpense) {
      onAddExpense({
        amount: transactionAmount,
        description,
        category,
        date: now,
      });
    }

    toast.success("Dépense ajoutée avec succès");
    setAmount("");
    setDescription("");
    setCategory("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-foreground">Nouvelle dépense</DialogTitle>
        </DialogHeader>
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-2">
            <Label htmlFor="amount">Montant</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="border-input focus:border-primary focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Entrez une description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border-input focus:border-primary focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label>Catégorie</Label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded-md border border-input bg-background text-foreground focus:border-primary focus:ring-primary"
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name} ({(cat.budget - cat.spent).toLocaleString()} FCFA restants)
                </option>
              ))}
            </select>
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Ajouter la dépense
            </Button>
          </motion.div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};