import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { useBudgetStore } from "@/store/budgetStore";

export const PaymentReminder = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date>();
  const { addReminder, reminders } = useBudgetStore();

  const handleAddReminder = () => {
    if (!description || !amount || !date) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    addReminder({
      id: Math.random().toString(36).substr(2, 9),
      description,
      amount: parseFloat(amount),
      dueDate: date.toISOString(),
      completed: false,
    });

    toast.success("Rappel de paiement ajouté");
    setDescription("");
    setAmount("");
    setDate(undefined);
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: fr }) : "Sélectionner une date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
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