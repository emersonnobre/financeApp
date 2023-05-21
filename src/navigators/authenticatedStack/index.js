import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ManageExpenses from '../../screens/ManageExpensesScreen';
import { GlobalStyles } from '../../constants/styles';
import ExpensesTabs from './expensesTabs';

const Stack = createNativeStackNavigator();

export default function AuthenticatedStack() {
	return <Stack.Navigator screenOptions={{
		headerStyle: { backgroundColor: 'white', },
		headerTintColor: GlobalStyles.colors.primary700,
	}}>
		<Stack.Screen name='TabNavigator' component={ExpensesTabs} options={{ headerShown: false }} />
		<Stack.Screen  name='ManageExpenses' component={ManageExpenses} presentation='modal' />
	</Stack.Navigator>
}