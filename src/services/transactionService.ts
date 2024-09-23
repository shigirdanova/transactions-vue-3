import transactionsMock from '../mockData.json'; 

import { Transaction } from './types';

export const fetchTransactions = async (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactionsMock);
    }, 1000); 
  });
};

export const processTransaction = (transaction: Transaction): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (transaction.success) {
        resolve(true);
      } else {
        reject(false);
      }
    }, 1000);
  });
};