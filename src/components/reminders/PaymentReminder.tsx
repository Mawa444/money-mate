import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { useBudgetStore } from "@/store/budgetStore";

export const PaymentReminder = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { addReminder, reminders } = useBudgetStore();

  const handleAddReminder = () => {
    if (!description || !amount || !dueDate) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    addReminder({
      id: Math.random().toString(36).substr(2, 9),
      description,
      amount: parseFloat(amount),
      dueDate: new Date(dueDate).toISOString(),
      completed: false,
    });

    toast.success("Rappel de paiement ajouté");
    setDescription("");
    setAmount("");
    setDueDate("");
  };

  return (
    <Card className="p-6 bg-background">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-muted rounded-full">
          <Bell className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Rappels de Paiement</h3>
          <p className="text-sm text-muted-foreground">
            Configurez vos rappels de paiement récurrents
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Loyer, Électricité..."
          />
        </div>

        <div>
          <label className="text-sm font-medium">Montant</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Montant en FCFA"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Date d'échéance</label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full"
          />
        </div>

        <Button onClick={handleAddReminder} className="w-full">
          Ajouter le rappel
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        <h4 className="font-medium">Rappels actifs</h4>
        {reminders?.map((reminder) => (
          <div
            key={reminder.id}
            className="flex items-center justify-between p-4 bg-muted rounded-lg"
          >
            <div>
              <p className="font-medium">{reminder.description}</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(reminder.dueDate), "PPP", { locale: fr })}
              </p>
            </div>
            <p className="font-medium">{reminder.amount.toLocaleString()} FCFA</p>
          </div>
        ))}
      </div>
    </Card>
  );
};