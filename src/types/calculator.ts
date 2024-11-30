export type CurrencyCode = "FCFA" | "EUR" | "USD";

export interface ConversionRates {
  [key: string]: Record<CurrencyCode, number>;
}

export interface CalculatorState {
  display: string;
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  amount: string;
  convertedAmount: string;
}