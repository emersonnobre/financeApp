import { createContext, useEffect, useState } from 'react';
import Realm from 'realm';

import { getAllExpenses } from '../services/api';
import Expense from '../database/model/expense.model';
import database from '../database/config';

export const ExpensesContext = createContext({
    addExpense: (newExpense) => {},
    deleteExpense: (expenseId) => {},
    updateExpense: (expenseId, expenseData) => {},
    expenses: [],
});

export default function ExpensesProvider({ children }) {
	const databaseExpenses = database.useQuery(Expense);
	const realm = database.useRealm();

	useEffect(() => {
		init();
	}, []);

	async function init() {
		try {
			const { data: expenses } = await getAllExpenses();
			setExpenses(expenses);
		} catch(err) {
			console.log(err);
		}
	}

    const [expenses, setExpenses] = useState(databaseExpenses);

    function addExpense(newExpense) {
        const expense = {
			_id: new Realm.BSON.ObjectId(),
			description: newExpense.description,
			date: newExpense.date,
			amount: newExpense.amount,
			expensePicture: newExpense.expensePicture,
			latitude: newExpense.latitude,
			longitude: newExpense.longitude,
		};
		realm.write(() => {
			realm.create('Expense', expense);
		});
    }
    
    function updateExpense(id, expenseData) {
        const expense = realm.objectForPrimaryKey(Expense, Realm.BSON.ObjectId(id));
		realm.write(() => {
			expense.description = expenseData.description;
			expense.date = expenseData.date;
			expense.amount = expenseData.amount;
			expense.expensePicture = expenseData.expensePicture;
			expense.latitude = expenseData.latitude;
			expense.longitude = expenseData.longitude;
		});
    }
    
    function deleteExpense(expenseId) {
		const expense = realm.objectForPrimaryKey(Expense, Realm.BSON.ObjectId(expenseId));
		realm.write(() => {
			realm.delete(expense);
		});
    }
    
    const exportedValues = {
        addExpense,
        deleteExpense,
        updateExpense,
        expenses,
    }

    return <ExpensesContext.Provider value={exportedValues}>
        {children}
    </ExpensesContext.Provider>
}