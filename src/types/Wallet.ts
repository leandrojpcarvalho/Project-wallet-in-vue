export interface Wallet {
  description: string;
  currency: string;
  method: string;
  value: number | null;
  type: string;
  id: string;
}

export interface Currency {
  code: string;
  codein: string;
  name: string;
  ask: string;
}

export interface Currencies {
  [key: string]: Currency;
}

export interface AddExpense {
  addNewExpense: (param: Wallet) => void;
}
