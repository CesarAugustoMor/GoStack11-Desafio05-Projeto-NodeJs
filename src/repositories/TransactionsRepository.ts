import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

export default class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acumulator: Balance, transaction) => {
        switch (transaction.type) {
          case 'income':
            acumulator.income += transaction.value;
            acumulator.total += transaction.value;
            break;
          case 'outcome':
            acumulator.outcome += transaction.value;
            acumulator.total -= transaction.value;
            break;

          default:
            break;
        }
        return acumulator;
      },
      { income: 0, outcome: 0, total: 0 },
    );
    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}
