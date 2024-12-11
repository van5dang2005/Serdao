import React, { createContext, useState, useContext } from 'react';
interface TransactionContextType {
    balance: number;
    transactions: any[];
    addTransaction: (amount: string, account:any) => void;
  }
  
const TransactionContext = createContext<TransactionContextType | undefined>(undefined);
export const useTransactions = () => useContext(TransactionContext);
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(1000);
  const addTransaction = (amount, account) => {
    const newTransaction = { id: Date.now(), amount: parseFloat(amount), account };
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    setBalance((prevBalance) => prevBalance - parseFloat(amount));
  };
  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, balance }}>
      {children}
    </TransactionContext.Provider>
  );
};
