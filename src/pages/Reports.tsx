import { PaymentReminder } from "@/components/reminders/PaymentReminder";
import { MonthlyReport } from "@/components/reports/MonthlyReport";

const Reports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rapports & Rappels</h1>
        <p className="text-muted-foreground">
          Gérez vos rappels de paiement et consultez vos rapports financiers
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <PaymentReminder />
        <MonthlyReport />
      </div>
    </div>
  );
};

export default Reports;