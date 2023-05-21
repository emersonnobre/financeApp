import { View, Text, StyleSheet, } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

export default function ExpensesSummary({ expenses, periodName }) {
	const totalSumExpenses = expenses.reduce((sum, current) => sum + current.amount, 0);

	return (
		<View style={styles.container}>
			<Text style={styles.periodText}>{periodName}</Text>
			<Text style={styles.totalSumText}>R${totalSumExpenses.toFixed(2)}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: GlobalStyles.colors.primary50,		
		borderRadius: 4,
	},
	periodText: {
		fontWeight: 500,
		color: GlobalStyles.colors.primary600,
	},
	totalSumText: {
		fontWeight: 'bold',
		color: GlobalStyles.colors.primary700,
	},
});
