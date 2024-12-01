import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useBudgetStore } from "@/store/budgetStore";
import { useNavigate } from "react-router-dom";

export const CategoryManager = () => {
  const navigate = useNavigate();
  const { categories, addCategory, removeCategory } = useBudgetStore();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryBudget, setNewCategoryBudget] = useState("");

  const handleAddCategory = () => {
    if (!newCategoryName.trim() || !newCategoryBudget) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    const budget = Number(newCategoryBudget);
    if (isNaN(budget) || budget <= 0) {
      toast.error("Le budget doit être un nombre positif");
      return;
    }

    addCategory({
      name: newCategoryName,
      budget: budget,
    });

    setNewCategoryName("");
    setNewCategoryBudget("");
    toast.success(`${newCategoryName} ajoutée avec un budget de ${budget.toLocaleString()} FCFA`);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Gestion des Catégories</h3>
      
      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Nom de la catégorie
          </label>
          <Input
            placeholder="Ex: Loyer, Courses..."
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Budget mensuel
          </label>
          <Input
            type="number"
            placeholder="Montant en FCFA"
            value={newCategoryBudget}
            onChange={(e) => setNewCategoryBudget(e.target.value)}
          />
        </div>
        <Button onClick={handleAddCategory} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter la catégorie
        </Button>
      </div>

      <AnimatePresence>
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 mb-2 p-2 bg-muted rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => navigate(`/category/${category.id}`)}
          >
            <div className="flex-1">
              <p className="font-medium">{category.name}</p>
              <p className="text-sm text-muted-foreground">
                Budget restant: {(category.budget - category.spent).toLocaleString()} FCFA
                <span className="block">
                  ({category.spent.toLocaleString()} FCFA dépensés sur {category.budget.toLocaleString()} FCFA)
                </span>
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/category/${category.id}`);
              }}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                removeCategory(category.id);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>

      {categories.length === 0 && (
        <p className="text-center text-muted-foreground py-4">
          Aucune catégorie ajoutée. Commencez par créer vos catégories de dépenses.
        </p>
      )}
    </Card>
  );
};