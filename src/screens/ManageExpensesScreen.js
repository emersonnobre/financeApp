import { View, StyleSheet, } from 'react-native';
import { useContext, useLayoutEffect, } from 'react';

import IconButton from '../components/ui/IconButton';
import ExpensesForm from '../components/ManageExpenses/ExpensesForm';

import { GlobalStyles } from '../constants/styles';

import { ExpensesContext } from '../store/expensens.context';

export default function ManageExpensesScreen({ route, navigation }) {
	const { addExpense, updateExpense, deleteExpense, expenses } = useContext(ExpensesContext);
	const expenseEditedId = route.params?.expenseId;

	const editedExpense = expenseEditedId ? expenses.find(expense => expense.id === expenseEditedId) : null;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: expenseEditedId ? 'Edit expense' : 'Add expense',
		});
	}, [navigation, expenseEditedId]);

	function cancelHandler() {
		navigation.goBack();	
	}

	function deleteExpenseHandler() {
		deleteExpense(expenseEditedId);
		navigation.goBack();
	}
	
	function saveExpenseHandler(expense) {
		if (expenseEditedId) {
			updateExpense(expenseEditedId, expense);
		} else {
			addExpense(expense);
		}

		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<ExpensesForm 
				onSubmit={saveExpenseHandler}
				onCancel={cancelHandler}
				defaultValues={editedExpense}
			/>
			{expenseEditedId && 
				<View style={styles.deleteContainer}>
					<IconButton icon='trash' size={36} color={GlobalStyles.colors.red500} onPress={deleteExpenseHandler} />
				</View>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: 'space-between',
	},
	deleteContainer: {
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: GlobalStyles.colors.primary700,
		width: '100%',
	},
});