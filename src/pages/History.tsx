import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Calendar, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { useBudgetStore } from "@/store/budgetStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const History = () => {
  const { transactions } = useBudgetStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState<"date" | "amount" | "category">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredTransactions = transactions
    .filter(t => {
      const searchLower = searchTerm.toLowerCase();
      return (
        t.description.toLowerCase().includes(searchLower) ||
        t.category.toLowerCase().includes(searchLower) ||
        t.amount.toString().includes(searchLower) ||
        new Date(t.date).toLocaleDateString().includes(searchTerm)
      );
    })
    .filter(t => !startDate || new Date(t.date) >= new Date(startDate))
    .filter(t => !endDate || new Date(t.date) <= new Date(endDate))
    .sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      switch (sortField) {
        case "date":
          return (new Date(b.date).getTime() - new Date(a.date).getTime()) * multiplier;
        case "amount":
          return (a.amount - b.amount) * multiplier;
        case "category":
          return a.category.localeCompare(b.category) * multiplier;
        default:
          return 0;
      }
    });

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">Historique</h1>
          <p className="text-muted-foreground">Consultez l'historique complet de vos transactions</p>
        </div>
      </motion.div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par description, catégorie, montant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-4">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-40"
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-40"
              />
            </div>
          </div>

          <div className="mt-6">
            {filteredTransactions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button variant="ghost" onClick={() => toggleSort("date")} className="flex items-center">
                        Date <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => toggleSort("category")} className="flex items-center">
                        Catégorie <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">
                      <Button variant="ghost" onClick={() => toggleSort("amount")} className="flex items-center ml-auto">
                        Montant <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell className="text-right">
                        {transaction.amount.toLocaleString()} FCFA
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Aucune transaction trouvée
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default History;