import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ScientificKeypadProps {
  onNumberClick: (value: string) => void;
  onOperatorClick: (operator: string) => void;
  onFunctionClick: (func: string) => void;
  onClear: () => void;
  onUndo: () => void;
  onCalculate: () => void;
}

export const ScientificKeypad = ({
  onNumberClick,
  onOperatorClick,
  onFunctionClick,
  onClear,
  onUndo,
  onCalculate,
}: ScientificKeypadProps) => {
  const scientificFunctions = [
    "sin", "cos", "tan",
    "log", "ln", "√",
    "x²", "x³", "xⁿ",
    "π", "e", "(",
    ")", "!", "mod"
  ];

  const numbers = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];

  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-3 gap-2 mb-2">
        <Button
          onClick={onClear}
          variant="destructive"
          className="col-span-2"
        >
          Clear
        </Button>
        <Button
          onClick={onUndo}
          variant="secondary"
        >
          Undo
        </Button>
      </div>
      
      <div className="grid grid-cols-5 gap-2 mb-4">
        {scientificFunctions.map((func) => (
          <motion.div
            key={func}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => onFunctionClick(func)}
              variant="secondary"
              className="w-full text-sm"
            >
              {func}
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {numbers.map((btn) => (
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
              className="w-full h-12 text-lg"
            >
              {btn}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};