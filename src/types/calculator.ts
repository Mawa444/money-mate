export type CurrencyCode = 
  | "FCFA" 
  | "EUR" 
  | "USD" 
  | "GBP" 
  | "JPY" 
  | "CNY" 
  | "AUD" 
  | "CAD" 
  | "CHF" 
  | "INR" 
  | "BRL" 
  | "RUB" 
  | "ZAR" 
  | "NGN" 
  | "GHS";

export interface ConversionRates {
  [key: string]: Record<CurrencyCode, number>;
}

export interface ConversionRecord {
  id: string;
  date: Date;
  fromAmount: string;
  fromCurrency: CurrencyCode;
  toAmount: string;
  toCurrency: CurrencyCode;
}

export interface CalculatorState {
  display: string;
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  amount: string;
  convertedAmount: string;
}