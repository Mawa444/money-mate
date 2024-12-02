import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  const [popoverOpen, setPopoverOpen] = useState(false);

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

    addTransaction({
      amount: transactionAmount,
      description,
      category,
      date: new Date().toISOString(),
    });

    if (onAddExpense) {
      onAddExpense({
        amount: transactionAmount,
        description,
        category,
        date: new Date().toISOString(),
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
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {category || "Sélectionnez une catégorie"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <div className="grid gap-1 p-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant="ghost"
                      className="w-full justify-start font-normal"
                      onClick={() => {
                        setCategory(cat.name);
                        setPopoverOpen(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          category === cat.name ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {cat.name} ({(cat.budget - cat.spent).toLocaleString()} FCFA restants)
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
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