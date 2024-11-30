import { motion } from "framer-motion";
import { ScrollArea } from "./ui/scroll-area";

export interface ConversionRecord {
  id: string;
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
  date: Date;
}

interface ConversionHistoryProps {
  history: ConversionRecord[];
}

export const ConversionHistory = ({ history }: ConversionHistoryProps) => {
  return (
    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
      <div className="space-y-2">
        {history.map((record) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-3 rounded-lg bg-background/50 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-2">
              <span className="font-medium">{record.fromAmount} {record.fromCurrency}</span>
              <span className="text-muted-foreground">→</span>
              <span className="font-medium">{record.toAmount} {record.toCurrency}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(record.date).toLocaleTimeString()}
            </span>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
};