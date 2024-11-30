import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Calculator as CalculatorIcon, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [fromCurrency, setFromCurrency] = useState("FCFA");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");

  const handleNumber = (num: string) => {
    setDisplay(prev => prev + num);
  };

  const handleOperator = (op: string) => {
    setDisplay(prev => prev + " " + op + " ");
  };

  const handleClear = () => {
    setDisplay("");
  };

  const handleCalculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(display);
      setDisplay(result.toString());
      toast({
        title: "Calcul effectué",
        description: `Résultat: ${result}`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Calcul invalide",
        variant: "destructive",
      });
    }
  };

  const handleConversion = () => {
    // Simulation de conversion (à remplacer par une vraie API)
    const rates = {
      FCFA: { EUR: 0.0015, USD: 0.0017 },
      EUR: { FCFA: 655.96, USD: 1.09 },
      USD: { FCFA: 601.80, EUR: 0.92 },
    };

    if (!amount) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un montant",
        variant: "destructive",
      });
      return;
    }

    const rate = rates[fromCurrency as keyof typeof rates][toCurrency as keyof typeof rates[typeof fromCurrency]];
    const result = parseFloat(amount) * rate;

    toast({
      title: "Conversion effectuée",
      description: `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`,
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Calculatrice</h1>
          <p className="text-muted-foreground">Calculez et convertissez vos montants</p>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
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
                className="text-right text-xl p-4 h-12 mb-4"
              />

              <div className="grid grid-cols-4 gap-2">
                {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((btn) => (
                  <Button
                    key={btn}
                    onClick={() => {
                      if (btn === "=") handleCalculate();
                      else if (["+", "-", "*", "/"].includes(btn)) handleOperator(btn);
                      else handleNumber(btn);
                    }}
                    variant={btn === "=" ? "default" : "outline"}
                    className="h-12 text-lg"
                  >
                    {btn}
                  </Button>
                ))}
              </div>

              <Button 
                onClick={handleClear}
                variant="destructive"
                className="w-full mt-2"
              >
                Effacer
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
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
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">De</label>
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="w-full mt-1 p-2 rounded-md border border-input bg-background"
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
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="w-full mt-1 p-2 rounded-md border border-input bg-background"
                    >
                      <option value="EUR">EUR</option>
                      <option value="FCFA">FCFA</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>

                <Button 
                  onClick={handleConversion}
                  className="w-full"
                >
                  Convertir
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Calculator;