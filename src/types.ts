export interface LoanOption {
  amount: number;
  installments: {
    [key: number]: number;
  };
}
