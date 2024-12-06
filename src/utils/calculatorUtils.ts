import { CurrencyCode } from "@/types/calculator";

export const currencyRates: Record<CurrencyCode, Record<CurrencyCode, number>> = {
  FCFA: { FCFA: 1, EUR: 0.0015, USD: 0.0017 },
  EUR: { FCFA: 655.96, EUR: 1, USD: 1.09 },
  USD: { FCFA: 601.80, EUR: 0.92, USD: 1 },
};

const evaluateScientificExpression = (expression: string): number => {
  // Remplacer les fonctions mathématiques par leurs équivalents JavaScript
  expression = expression
    .replace(/sin/g, 'Math.sin')
    .replace(/cos/g, 'Math.cos')
    .replace(/tan/g, 'Math.tan')
    .replace(/log/g, 'Math.log10')
    .replace(/ln/g, 'Math.log')
    .replace(/√/g, 'Math.sqrt')
    .replace(/π/g, 'Math.PI')
    .replace(/e/g, 'Math.E')
    .replace(/mod/g, '%')
    .replace(/x²/g, '**2')
    .replace(/x³/g, '**3')
    .replace(/xⁿ/g, '**');

  try {
    return Function(`'use strict'; return (${expression})`)();
  } catch (error) {
    console.error('Error evaluating expression:', error);
    return NaN;
  }
};

export const handleCalculatorInput = (
  currentDisplay: string,
  input: string,
  history: string[] = []
): { result: string; history: string[] } => {
  if (input === "=") {
    try {
      const result = evaluateScientificExpression(currentDisplay).toString();
      return { 
        result,
        history: [...history, `${currentDisplay} = ${result}`]
      };
    } catch {
      return { 
        result: "Error",
        history: [...history, `${currentDisplay} = Error`]
      };
    }
  }
  return { 
    result: currentDisplay + input,
    history
  };
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