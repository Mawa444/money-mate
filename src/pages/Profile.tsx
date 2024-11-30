import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { UserCircle, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currency: "FCFA",
    monthlyIncome: "",
    savingsGoal: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès",
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Profil</h1>
          <p className="text-muted-foreground">Gérez vos informations personnelles</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-primary/20 rounded-full"
              >
                <UserCircle className="h-6 w-6 text-primary" />
              </motion.div>
              <div>
                <h2 className="text-xl font-semibold">Informations personnelles</h2>
                <p className="text-sm text-muted-foreground">
                  Mettez à jour vos informations
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom complet</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Devise préférée</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-input bg-background"
                >
                  <option value="FCFA">FCFA</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Revenu mensuel</label>
                <Input
                  name="monthlyIncome"
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  placeholder="Votre revenu mensuel"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Objectif d'épargne (%)</label>
                <Input
                  name="savingsGoal"
                  type="number"
                  value={formData.savingsGoal}
                  onChange={handleChange}
                  placeholder="Ex: 30"
                />
                <p className="text-sm text-muted-foreground">
                  Pourcentage de votre revenu que vous souhaitez épargner
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full md:w-auto">
              <Save className="mr-2 h-4 w-4" />
              Enregistrer les modifications
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;