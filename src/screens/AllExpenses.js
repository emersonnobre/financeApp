import { useContext } from 'react';

import ExpensesOutput from '../components/ExpensesList/ExpensesOutput';

import { ExpensesContext } from '../store/expensens.context';

export default function AllExpenses() {
	const { expenses } = useContext(ExpensesContext);

	return <ExpensesOutput periodName='All time' expenses={expenses} />;
}
