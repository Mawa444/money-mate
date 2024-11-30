import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Added missing import
import { motion } from "framer-motion";
import { Calculator as CalculatorIcon, RefreshCcw, History } from "lucide-react";
import { ConversionHistory, ConversionRecord } from "@/components/ConversionHistory";
import { ConversionResult } from "@/components/ConversionResult";
import { CalculatorKeypad } from "@/components/calculator/CalculatorKeypad";
import { CurrencyCode } from "@/types/calculator";
import { calculateConversion, handleCalculatorInput } from "@/utils/calculatorUtils";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("FCFA");
  const [toCurrency, setToCurrency] = useState<CurrencyCode>("EUR");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [history, setHistory] = useState<ConversionRecord[]>([]);

  const handleNumber = (num: string) => {
    setDisplay(prev => handleCalculatorInput(prev, num));
  };

  const handleOperator = (operator: string) => {
    setDisplay(prev => handleCalculatorInput(prev, operator));
  };

  const handleCalculate = () => {
    setDisplay(prev => handleCalculatorInput(prev, "="));
  };

  const handleConversion = () => {
    const result = calculateConversion(amount, fromCurrency, toCurrency);
    setConvertedAmount(result);

    if (result) {
      const newRecord: ConversionRecord = {
        id: Date.now().toString(),
        fromAmount: amount,
        fromCurrency,
        toAmount: result,
        toCurrency,
        date: new Date(),
      };

      setHistory(prev => [newRecord, ...prev].slice(0, 10));
    }
  };

  const handleCurrencyChange = (
    value: string,
    setter: (value: CurrencyCode) => void
  ) => {
    setter(value as CurrencyCode);
    setConvertedAmount("");
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
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 backdrop-blur-sm bg-background/95 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-primary/20 rounded-full"
                >
                  <CalculatorIcon className="h-6 w-6 text-primary" />
                </motion.div>
                <h3 className="text-lg font-semibold">Calculatrice</h3>
              </div>

              <Input
                value={display}
                readOnly
                className="text-right text-xl p-4 h-12 mb-4 bg-background/50 backdrop-blur-sm"
              />

              <CalculatorKeypad
                onNumberClick={handleNumber}
                onOperatorClick={handleOperator}
                onCalculate={handleCalculate}
              />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
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

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Montant</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Entrez le montant"
                    className="mt-1 bg-background/50 backdrop-blur-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">De</label>
                    <select
                      value={fromCurrency}
                      onChange={(e) => handleCurrencyChange(e.target.value, setFromCurrency)}
                      className="w-full mt-1 p-2 rounded-md border border-input bg-background/50 backdrop-blur-sm"
                    >
                      <option value="FCFA">FCFA</option>
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Vers</label>
                    <select
                      value={toCurrency}
                      onChange={(e) => handleCurrencyChange(e.target.value, setToCurrency)}
                      className="w-full mt-1 p-2 rounded-md border border-input bg-background/50 backdrop-blur-sm"
                    >
                      <option value="EUR">EUR</option>
                      <option value="FCFA">FCFA</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>

                <Button 
                  onClick={handleConversion}
                  className="w-full shadow-lg hover:shadow-xl transition-all"
                >
                  Convertir
                </Button>

                {convertedAmount && (
                  <ConversionResult
                    fromAmount={amount}
                    fromCurrency={fromCurrency}
                    toAmount={convertedAmount}
                    toCurrency={toCurrency}
                  />
                )}
              </div>
            </div>
          </Card>
        </motion.div>
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
          <ConversionHistory history={history} />
        </Card>
      </motion.div>
    </div>
  );
};

export default Calculator;
