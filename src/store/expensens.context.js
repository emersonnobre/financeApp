import { useReducer, createContext, useEffect } from 'react';
import { getAllExpenses } from '../services/api';

const fake_expenses = [
	{
		id: 'e1',
		description: 'a pair of shoes',
		amount: 29.90,
		date: new Date('2023-01-01')
	},
	{
		id: 'e2',
		description: 'tv',
		amount: 829.90,
		date: new Date('2023-01-01')
	},
	{
		id: 'e3',
		description: 'some new text',
		amount: 129.90,
		date: new Date('2023-01-01')
	},
	{
		id: 'e4',
		description: 'a pair of troursers levis',
		amount: 2912.90,
		date: new Date('2023-01-01')
	},
	{
		id: 'e7',
		description: 'a pair of troursers levis',
		amount: 2912.90,
		date: new Date('2023-01-01')
	},
	{
		id: 'e5',
		description: 'a pair of troursers levis',
		amount: 2912.90,
		date: new Date('2023-01-01')
	},
	{
		id: 'e6',
		description: 'a pair of troursers levis',
		amount: 2912.90,
		date: new Date('2023-01-01')
	},
	{
		id: 'e0',
		description: 'a pair of troursers levis',
		amount: 2912.90,
		date: new Date('2023-01-01')
	},
	{
		id: 'e8',
		description: 'a pair of troursers levis',
		amount: 2912.90,
		date: new Date('2023-01-01')
	},
	{
		id: 'e9',
		description: 'a pair of troursers levis',
		amount: 2912.90,
		date: new Date('2023-01-01')
	},
];

export const ExpensesContext = createContext({
    addExpense: (newExpense) => {},
    deleteExpense: (expenseId) => {},
    updateExpense: (expenseId, expenseData) => {},
    expenses: [],
});

function expensesReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            const newExpense = { ...action.payload, id: state.length ? (state.length + 1).toString() : '0' };
            return [...state, newExpense];
		case 'SET':
			return [...action.payload.map(item => ({...item, date: new Date(item.date)}))];
        case 'UPDATE':
            let expenses = [...state];
            expenses = expenses.map(expense => expense.id === action.payload.id ? { ...expense, ...action.payload.expenseData } : expense);
            return expenses;
        case 'DELETE':
            console.log('deleting', action.payload);
            return [ ...state.filter(expense => expense.id !== action.payload) ];
        default:
            return [...state];
    }
}

export default function ExpensesProvider({ children }) {
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

    const [expenses, dispatch] = useReducer(expensesReducer, fake_expenses);

    function addExpense(newExpense) {
        dispatch({ type: 'ADD', payload: newExpense });
    }

	function setExpenses(expenses) {
		dispatch({ type: 'SET', payload: expenses });
	}
    
    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id, expenseData } });
    }
    
    function deleteExpense(expenseId) {
        dispatch({ type: 'DELETE', payload: expenseId });
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