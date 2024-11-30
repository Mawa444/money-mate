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

  const addCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie ne peut pas être vide",
        variant: "destructive",
      });
      return;
    }

    const newCategory: Category = {
      id: Math.random().toString(36).substring(7),
      name: newCategoryName,
      budget: 0,
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    toast({
      title: "Succès",
      description: "Catégorie ajoutée avec succès",
    });
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
    toast({
      title: "Succès",
      description: "Catégorie supprimée avec succès",
    });
  };

  const updateBudget = (id: string, budget: number) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, budget } : cat
    ));
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Gestion des Catégories</h3>
      
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Nouvelle catégorie"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="flex-1"
        />
        <Button onClick={addCategory}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>

      <AnimatePresence>
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 mb-2"
          >
            <span className="flex-1">{category.name}</span>
            <Input
              type="number"
              placeholder="Budget"
              value={category.budget || ""}
              onChange={(e) => updateBudget(category.id, Number(e.target.value))}
              className="w-32"
            />
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
    </Card>
  );
};