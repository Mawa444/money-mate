import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Calculator as CalculatorIcon, RefreshCcw, History } from "lucide-react";
import { ConversionHistory, ConversionRecord } from "@/components/ConversionHistory";
import { ScientificKeypad } from "@/components/calculator/ScientificKeypad";
import { CurrencyConverter } from "@/components/calculator/CurrencyConverter";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [conversionHistory, setConversionHistory] = useState<ConversionRecord[]>([]);

  const handleNumber = (num: string) => {
    setDisplay(prev => prev + num);
  };

  const handleOperator = (operator: string) => {
    setDisplay(prev => prev + " " + operator + " ");
  };

  const handleFunction = (func: string) => {
    setDisplay(prev => prev + func);
  };

  const handleCalculate = () => {
    try {
      const result = eval(display);
      setHistory(prev => [...prev, `${display} = ${result}`]);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  const handleClear = () => {
    setDisplay("");
  };

  const handleUndo = () => {
    setDisplay(prev => prev.slice(0, -1));
  };

  const handleNewConversion = (conversion: ConversionRecord) => {
    const newRecord: ConversionRecord = {
      id: Date.now().toString(),
      ...conversion,
      date: new Date(),
    };

    setConversionHistory(prev => [newRecord, ...prev].slice(0, 10));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Calculatrice & Convertisseur</h1>
          <p className="text-muted-foreground">Effectuez vos calculs et conversions</p>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 backdrop-blur-sm bg-background/95 shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-primary/20 rounded-full"
                >
                  <CalculatorIcon className="h-6 w-6 text-primary" />
                </motion.div>
                <h3 className="text-lg font-semibold">Calculatrice Scientifique</h3>
              </div>
              <Button
                variant="outline"
                onClick={clearHistory}
                className="text-sm"
              >
                Effacer l'historique
              </Button>
            </div>

            <Input
              value={display}
              readOnly
              className="text-right text-xl p-4 h-12 mb-4 bg-background/50 backdrop-blur-sm font-mono"
            />

            <div className="max-h-[400px] overflow-y-auto mb-4">
              {history.map((entry, index) => (
                <div key={index} className="text-sm text-muted-foreground text-right mb-1">
                  {entry}
                </div>
              ))}
            </div>

            <ScientificKeypad
              onNumberClick={handleNumber}
              onOperatorClick={handleOperator}
              onFunctionClick={handleFunction}
              onClear={handleClear}
              onUndo={handleUndo}
              onCalculate={handleCalculate}
            />
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-background/95 shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-blue-500/20 rounded-full"
              >
                <RefreshCcw className="h-6 w-6 text-blue-500" />
              </motion.div>
              <h3 className="text-lg font-semibold">Convertisseur</h3>
            </div>

            <CurrencyConverter onConversion={handleNewConversion} />
          </div>
        </Card>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <Card className="p-6 backdrop-blur-sm bg-background/95 shadow-lg">
          <div className="flex items-center space-x-4 mb-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-primary/20 rounded-full"
            >
              <History className="h-6 w-6 text-primary" />
            </motion.div>
            <h3 className="text-lg font-semibold">Historique des conversions</h3>
          </div>
          <ConversionHistory history={conversionHistory} />
        </Card>
      </motion.div>
    </div>
  );
};

export default Calculator;
