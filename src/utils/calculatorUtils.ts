import { CurrencyCode } from "@/types/calculator";

// Taux de change pour toutes les devises mondiales
export const currencyRates: Record<CurrencyCode, Record<CurrencyCode, number>> = {
  FCFA: { FCFA: 1, EUR: 0.0015, USD: 0.0017, GBP: 0.0013, JPY: 0.25, CNY: 0.012, AUD: 0.0026, CAD: 0.0023, CHF: 0.0015, INR: 0.14, BRL: 0.0084, RUB: 0.16, ZAR: 0.032, NGN: 0.78, GHS: 0.02 },
  EUR: { FCFA: 655.96, EUR: 1, USD: 1.09, GBP: 0.86, JPY: 158.77, CNY: 7.82, AUD: 1.66, CAD: 1.48, CHF: 0.96, INR: 90.91, BRL: 5.34, RUB: 101.27, ZAR: 20.51, NGN: 512.82, GHS: 13.16 },
  USD: { FCFA: 601.80, EUR: 0.92, USD: 1, GBP: 0.79, JPY: 145.67, CNY: 7.18, AUD: 1.52, CAD: 1.36, CHF: 0.88, INR: 83.40, BRL: 4.90, RUB: 92.91, ZAR: 18.82, NGN: 470.47, GHS: 12.08 },
  GBP: { FCFA: 769.36, EUR: 1.17, USD: 1.27, GBP: 1, JPY: 186.23, CNY: 9.18, AUD: 1.94, CAD: 1.74, CHF: 1.13, INR: 106.65, BRL: 6.26, RUB: 118.77, ZAR: 24.07, NGN: 601.44, GHS: 15.44 },
  JPY: { FCFA: 4.13, EUR: 0.0063, USD: 0.0069, GBP: 0.0054, JPY: 1, CNY: 0.049, AUD: 0.010, CAD: 0.0093, CHF: 0.0061, INR: 0.57, BRL: 0.034, RUB: 0.64, ZAR: 0.13, NGN: 3.23, GHS: 0.083 },
  CNY: { FCFA: 83.89, EUR: 0.13, USD: 0.14, GBP: 0.11, JPY: 20.31, CNY: 1, AUD: 0.21, CAD: 0.19, CHF: 0.12, INR: 11.62, BRL: 0.68, RUB: 12.94, ZAR: 2.62, NGN: 65.57, GHS: 1.68 },
  AUD: { FCFA: 395.16, EUR: 0.60, USD: 0.66, GBP: 0.52, JPY: 95.70, CNY: 4.71, AUD: 1, CAD: 0.89, CHF: 0.58, INR: 54.74, BRL: 3.22, RUB: 61.00, ZAR: 12.35, NGN: 308.86, GHS: 7.93 },
  CAD: { FCFA: 442.87, EUR: 0.68, USD: 0.74, GBP: 0.58, JPY: 107.30, CNY: 5.28, AUD: 1.12, CAD: 1, CHF: 0.65, INR: 61.37, BRL: 3.61, RUB: 68.37, ZAR: 13.84, NGN: 346.27, GHS: 8.89 },
  CHF: { FCFA: 683.29, EUR: 1.04, USD: 1.14, GBP: 0.89, JPY: 165.53, CNY: 8.15, AUD: 1.73, CAD: 1.54, CHF: 1, INR: 94.67, BRL: 5.56, RUB: 105.49, ZAR: 21.36, NGN: 534.19, GHS: 13.71 },
  INR: { FCFA: 7.22, EUR: 0.011, USD: 0.012, GBP: 0.0094, JPY: 1.75, CNY: 0.086, AUD: 0.018, CAD: 0.016, CHF: 0.011, INR: 1, BRL: 0.059, RUB: 1.11, ZAR: 0.23, NGN: 5.64, GHS: 0.14 },
  BRL: { FCFA: 122.84, EUR: 0.19, USD: 0.20, GBP: 0.16, JPY: 29.77, CNY: 1.47, AUD: 0.31, CAD: 0.28, CHF: 0.18, INR: 17.02, BRL: 1, RUB: 18.97, ZAR: 3.84, NGN: 96.08, GHS: 2.47 },
  RUB: { FCFA: 6.48, EUR: 0.0099, USD: 0.011, GBP: 0.0084, JPY: 1.57, CNY: 0.077, AUD: 0.016, CAD: 0.015, CHF: 0.0095, INR: 0.90, BRL: 0.053, RUB: 1, ZAR: 0.20, NGN: 5.06, GHS: 0.13 },
  ZAR: { FCFA: 31.98, EUR: 0.049, USD: 0.053, GBP: 0.042, JPY: 7.74, CNY: 0.38, AUD: 0.081, CAD: 0.072, CHF: 0.047, INR: 4.43, BRL: 0.26, RUB: 4.93, ZAR: 1, NGN: 25.00, GHS: 0.64 },
  NGN: { FCFA: 1.28, EUR: 0.0020, USD: 0.0021, GBP: 0.0017, JPY: 0.31, CNY: 0.015, AUD: 0.0032, CAD: 0.0029, CHF: 0.0019, INR: 0.18, BRL: 0.010, RUB: 0.20, ZAR: 0.040, NGN: 1, GHS: 0.026 },
  GHS: { FCFA: 49.82, EUR: 0.076, USD: 0.083, GBP: 0.065, JPY: 12.06, CNY: 0.59, AUD: 0.13, CAD: 0.11, CHF: 0.073, INR: 6.91, BRL: 0.41, RUB: 7.69, ZAR: 1.56, NGN: 38.95, GHS: 1 }
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

// Fonctions mathématiques améliorées pour la calculatrice scientifique
const evaluateScientificExpression = (expression: string): number => {
  // Remplacer les fonctions mathématiques par leurs équivalents JavaScript
  let processedExpression = expression
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/ln\(/g, 'Math.log(')
    .replace(/√\(/g, 'Math.sqrt(')
    .replace(/π/g, 'Math.PI')
    .replace(/e/g, 'Math.E')
    .replace(/\^/g, '**')
    .replace(/x²/g, '**2')
    .replace(/x³/g, '**3')
    .replace(/mod/g, '%');

  try {
    // Utilisation de Function pour évaluer l'expression de manière sécurisée
    return Function(`'use strict'; return (${processedExpression})`)();
  } catch (error) {
    console.error('Erreur lors de l\'évaluation de l\'expression:', error);
    throw new Error('Expression mathématique invalide');
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
    } catch (error) {
      return {
        result: "Erreur",
        history: [...history, `${currentDisplay} = Erreur`]
      };
    }
  }
  return {
    result: currentDisplay + input,
    history
  };
};