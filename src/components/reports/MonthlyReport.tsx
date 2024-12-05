import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { useBudgetStore } from "@/store/budgetStore";
import { format, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const COLORS = ["#A3A3A3", "#858585", "#666666", "#474747", "#292929"];

export const MonthlyReport = () => {
  const { transactions, categories, monthlySalary } = useBudgetStore();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Générer les 12 derniers mois pour le sélecteur
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return {
      value: date.toISOString(),
      label: format(date, 'MMMM yyyy', { locale: fr }),
    };
  });

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);

  const monthlyTransactions = transactions.filter(
    (t) => new Date(t.date) >= monthStart && new Date(t.date) <= monthEnd
  );

  const totalSpent = monthlyTransactions.reduce((acc, t) => acc + t.amount, 0);
  const savings = monthlySalary - totalSpent;

  const categorySpending = categories.map((cat) => ({
    name: cat.name,
    value: monthlyTransactions
      .filter((t) => t.category === cat.name)
      .reduce((acc, t) => acc + t.amount, 0),
  }));

  const handleDownloadReport = () => {
    toast.success(`Téléchargement du rapport pour ${format(selectedDate, 'MMMM yyyy', { locale: fr })}...`);
  };

  return (
    <Card className="p-6 bg-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-muted rounded-full">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Rapport Mensuel</h3>
            <p className="text-sm text-muted-foreground">
              Aperçu de vos finances du mois
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={selectedDate.toISOString()}
            onValueChange={(value) => setSelectedDate(new Date(value))}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sélectionner un mois" />
            </SelectTrigger>
            <SelectContent>
              {last12Months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleDownloadReport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="font-medium mb-4">Résumé Financier</h4>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Revenu Mensuel</p>
              <p className="text-2xl font-bold">
                {monthlySalary.toLocaleString()} FCFA
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Dépenses Totales</p>
              <p className="text-2xl font-bold">{totalSpent.toLocaleString()} FCFA</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Économies</p>
              <p className="text-2xl font-bold">{savings.toLocaleString()} FCFA</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-4">Répartition des Dépenses</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySpending}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categorySpending.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) =>
                    `${value.toLocaleString()} FCFA`
                  }
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-medium mb-4">Historique des Transactions</h4>
        <div className="space-y-2">
          {monthlyTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-muted rounded-lg"
            >
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(transaction.date), "PPP", { locale: fr })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {transaction.amount.toLocaleString()} FCFA
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
