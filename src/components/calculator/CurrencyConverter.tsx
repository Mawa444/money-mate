import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConversionResult } from "@/components/ConversionResult";
import { CurrencyCode } from "@/types/calculator";
import { calculateConversion } from "@/utils/calculatorUtils";

interface CurrencyConverterProps {
  onConversion: (record: {
    fromAmount: string;
    fromCurrency: CurrencyCode;
    toAmount: string;
    toCurrency: CurrencyCode;
  }) => void;
}

export const CurrencyConverter = ({ onConversion }: CurrencyConverterProps) => {
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("FCFA");
  const [toCurrency, setToCurrency] = useState<CurrencyCode>("EUR");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

  const handleCurrencyChange = (value: string, setter: (value: CurrencyCode) => void) => {
    setter(value as CurrencyCode);
  };

  const handleConversion = () => {
    const result = calculateConversion(amount, fromCurrency, toCurrency);
    setConvertedAmount(result);

    if (result) {
      onConversion({
        fromAmount: amount,
        fromCurrency,
        toAmount: result,
        toCurrency,
      });
    }
  };

  return (
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
  );
};