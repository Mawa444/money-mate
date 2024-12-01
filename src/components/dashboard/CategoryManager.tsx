import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

interface Category {
  id: string;
  name: string;
  budget: number;
}

export const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryBudget, setNewCategoryBudget] = useState("");

  const addCategory = () => {
    if (!newCategoryName.trim() || !newCategoryBudget) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    const budget = Number(newCategoryBudget);
    if (isNaN(budget) || budget <= 0) {
      toast({
        title: "Erreur",
        description: "Le budget doit être un nombre positif",
        variant: "destructive",
      });
      return;
    }

    const newCategory: Category = {
      id: Math.random().toString(36).substring(7),
      name: newCategoryName,
      budget: budget,
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    setNewCategoryBudget("");
    toast({
      title: "Catégorie ajoutée",
      description: `${newCategoryName} ajoutée avec un budget de ${budget.toLocaleString()} FCFA`,
    });
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
    toast({
      title: "Catégorie supprimée",
      description: "La catégorie a été supprimée avec succès",
    });
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
        <Button onClick={addCategory} className="w-full">
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
            className="flex items-center gap-2 mb-2 p-2 bg-muted rounded-lg"
          >
            <div className="flex-1">
              <p className="font-medium">{category.name}</p>
              <p className="text-sm text-muted-foreground">
                Budget: {category.budget.toLocaleString()} FCFA
              </p>
            </div>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeCategory(category.id)}
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