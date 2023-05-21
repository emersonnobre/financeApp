import { View, StyleSheet, } from 'react-native';

import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';

import { GlobalStyles } from '../../constants/styles';

export default function ExpensesOutput({ periodName, expenses = [] }) {
	return (
		<View style={styles.container}>
			<ExpensesSummary periodName={periodName} expenses={expenses} />
			<ExpensesList expenses={expenses} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 24,
		paddingHorizontal: 24,
		paddingBottom: 0,
		flex: 1,
		backgroundColor: GlobalStyles.colors.primary600,
	},
});
