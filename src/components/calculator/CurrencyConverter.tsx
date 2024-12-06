import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConversionResult } from "@/components/ConversionResult";
import { CurrencyCode, ConversionRecord } from "@/types/calculator";
import { calculateConversion } from "@/utils/calculatorUtils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CurrencyConverterProps {
  onConversion: (record: ConversionRecord) => void;
}

const CURRENCIES: { code: CurrencyCode; name: string }[] = [
  { code: "FCFA", name: "Franc CFA" },
  { code: "EUR", name: "Euro" },
  { code: "USD", name: "Dollar US" },
  { code: "GBP", name: "Livre Sterling" },
  { code: "JPY", name: "Yen Japonais" },
  { code: "CNY", name: "Yuan Chinois" },
  { code: "AUD", name: "Dollar Australien" },
  { code: "CAD", name: "Dollar Canadien" },
  { code: "CHF", name: "Franc Suisse" },
  { code: "INR", name: "Roupie Indienne" },
  { code: "BRL", name: "Real Brésilien" },
  { code: "RUB", name: "Rouble Russe" },
  { code: "ZAR", name: "Rand Sud-africain" },
  { code: "NGN", name: "Naira Nigérian" },
  { code: "GHS", name: "Cedi Ghanéen" }
];

export const CurrencyConverter = ({ onConversion }: CurrencyConverterProps) => {
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("FCFA");
  const [toCurrency, setToCurrency] = useState<CurrencyCode>("EUR");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

  const handleConversion = () => {
    const result = calculateConversion(amount, fromCurrency, toCurrency);
    setConvertedAmount(result);

    if (result) {
      onConversion({
        id: crypto.randomUUID(),
        date: new Date(),
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
          <Select value={fromCurrency} onValueChange={(value: CurrencyCode) => setFromCurrency(value)}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Sélectionnez une devise" />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.name} ({currency.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Vers</label>
          <Select value={toCurrency} onValueChange={(value: CurrencyCode) => setToCurrency(value)}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Sélectionnez une devise" />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.name} ({currency.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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