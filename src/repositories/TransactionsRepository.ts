import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    let income = 0;

    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type === 'income') {
        income += transactions[i].value;
      }
    }

    let outcome = 0;

    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type === 'outcome') {
        outcome += transactions[i].value;
      }
    }

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }
}

export default TransactionsRepository;
