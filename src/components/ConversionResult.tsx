import { motion } from "framer-motion";

interface ConversionResultProps {
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
}

export const ConversionResult = ({ fromAmount, fromCurrency, toAmount, toCurrency }: ConversionResultProps) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="p-6 rounded-xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-lg border shadow-lg"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="text-4xl font-bold">
          {toAmount} {toCurrency}
        </div>
        <div className="text-sm text-muted-foreground">
          {fromAmount} {fromCurrency}
        </div>
      </div>
    </motion.div>
  );
};