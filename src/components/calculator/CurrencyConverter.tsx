import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConversionResult } from "@/components/ConversionResult";
import { CurrencyCode, ConversionRecord } from "@/types/calculator";
import { calculateConversion } from "@/utils/calculatorUtils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [openFromDialog, setOpenFromDialog] = useState(false);
  const [openToDialog, setOpenToDialog] = useState(false);

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

  const getCurrencyName = (code: CurrencyCode) => {
    return CURRENCIES.find(c => c.code === code)?.name || code;
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
          <Dialog open={openFromDialog} onOpenChange={setOpenFromDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full mt-1 justify-between">
                {fromCurrency} - {getCurrencyName(fromCurrency)}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[350px]">
              <ScrollArea className="h-[400px]">
                <div className="grid gap-1">
                  {CURRENCIES.map((currency) => (
                    <Button
                      key={currency.code}
                      variant="ghost"
                      className="w-full justify-start font-normal"
                      onClick={() => {
                        setFromCurrency(currency.code);
                        setOpenFromDialog(false);
                      }}
                    >
                      {currency.code} - {currency.name}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <label className="text-sm font-medium">Vers</label>
          <Dialog open={openToDialog} onOpenChange={setOpenToDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full mt-1 justify-between">
                {toCurrency} - {getCurrencyName(toCurrency)}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[350px]">
              <ScrollArea className="h-[400px]">
                <div className="grid gap-1">
                  {CURRENCIES.map((currency) => (
                    <Button
                      key={currency.code}
                      variant="ghost"
                      className="w-full justify-start font-normal"
                      onClick={() => {
                        setToCurrency(currency.code);
                        setOpenToDialog(false);
                      }}
                    >
                      {currency.code} - {currency.name}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
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