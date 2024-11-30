import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CalculatorKeypadProps {
  onNumberClick: (value: string) => void;
  onOperatorClick: (operator: string) => void;
  onCalculate: () => void;
}

export const CalculatorKeypad = ({
  onNumberClick,
  onOperatorClick,
  onCalculate,
}: CalculatorKeypadProps) => {
  const buttons = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];

  return (
    <div className="grid grid-cols-4 gap-2">
      {buttons.map((btn) => (
        <motion.div
          key={btn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => {
              if (btn === "=") onCalculate();
              else if (["+", "-", "*", "/"].includes(btn)) onOperatorClick(btn);
              else onNumberClick(btn);
            }}
            variant={btn === "=" ? "default" : "outline"}
            className="h-12 text-lg w-full shadow-sm hover:shadow-md transition-all"
          >
            {btn}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};