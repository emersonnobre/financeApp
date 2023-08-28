import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ManageExpenses from '../../screens/ManageExpensesScreen';
import { GlobalStyles } from '../../constants/styles';
import ExpensesTabs from './expensesTabs';
import Account from '../../screens/User/Account';
import { CameraP } from '../../components/ui/ImagePicker';

const Stack = createNativeStackNavigator();

export default function AuthenticatedStack() {
	return <Stack.Navigator screenOptions={{
		headerStyle: { backgroundColor: GlobalStyles.colors.primary700, },
		headerTintColor: GlobalStyles.colors.grey100,
	}}>
		<Stack.Screen name='TabNavigator' component={ExpensesTabs} options={{ headerShown: false }} />
		<Stack.Screen  name='ManageExpenses' component={ManageExpenses} presentation='modal' />
		<Stack.Screen  name='Account' component={Account} presentation='modal' />
		<Stack.Screen name='Camera' component={CameraP} options={{ headerShown: false }} />
	</Stack.Navigator>
}