import { useContext } from 'react';

import ExpensesOutput from '../components/ExpensesList/ExpensesOutput';

import { ExpensesContext } from '../store/expensens.context';

export default function RecentExpenses() {
	const { expenses } = useContext(ExpensesContext);

	return <ExpensesOutput periodName='Last 7 days' expenses={expenses} />;
}
