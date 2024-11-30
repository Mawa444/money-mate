import { CurrencyCode } from "@/types/calculator";

export const currencyRates: Record<CurrencyCode, Record<CurrencyCode, number>> = {
  FCFA: { FCFA: 1, EUR: 0.0015, USD: 0.0017 },
  EUR: { FCFA: 655.96, EUR: 1, USD: 1.09 },
  USD: { FCFA: 601.80, EUR: 0.92, USD: 1 },
};

export const handleCalculatorInput = (
  currentDisplay: string,
  input: string
): string => {
  if (input === "=") {
    try {
      return eval(currentDisplay).toString();
    } catch {
      return "Error";
    }
  }
  return currentDisplay + input;
};

export const calculateConversion = (
  amount: string,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
): string => {
  if (!amount) return "";
  const rate = currencyRates[fromCurrency][toCurrency];
  return (parseFloat(amount) * rate).toFixed(2);
};