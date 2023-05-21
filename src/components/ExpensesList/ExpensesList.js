import { FlatList, Text, StyleSheet, } from 'react-native';

import ExpenseItemList from './ExpenseItemList';

export default function ExpensesList({ expenses }) {
	return (
		<FlatList 
			style={styles.container}
			data={expenses}
			renderItem={({ item }) => <ExpenseItemList {...item} />}
			showsVerticalScrollIndicator={false}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 6,
	},
});
