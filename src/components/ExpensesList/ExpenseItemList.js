import { View, Text, StyleSheet, Pressable, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util';

export default function ExpenseItemList({ _id, description, amount, date }) {
	const navigation = useNavigation();

	function manageExpenseHandler() {
		navigation.navigate('ManageExpenses', { expenseId: _id.toString() });
	}

	return (
		<Pressable onPress={manageExpenseHandler} style={({ pressed }) => (pressed && styles.pressed)}>
			<View style={styles.container}>
				<View style={styles.descriptionContainer}>
					<Text style={styles.description}>{description}</Text>
					<Text style={styles.date}>{getFormattedDate(date)}</Text>
				</View>
				<View style={styles.amountContainer}>
					<Text style={styles.amount}>R${amount.toFixed(2)}</Text>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'white',
		padding: 12,
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 6,
		elevation: 2,
		borderRadius: 6,
	},
	pressed: {
		opacity: .8
	},
	descriptionContainer: {
		flex: 3,
	},
	description: {
		color: GlobalStyles.colors.primary600,
		marginBottom: 5,
		fontWeight: 'bold',
	},
	date: {
		color: GlobalStyles.colors.grey500,
		fontWeight: 500,
	},
	amountContainer: {
		paddingHorizontal: 4,
		paddingVertical: 2,
		backgroundColor: GlobalStyles.colors.primary700,
		borderRadius: 4,
		minWidth: 80,
		alignItems: 'center',
	},
	amount: {
		color: GlobalStyles.colors.accent100,
	},
});
