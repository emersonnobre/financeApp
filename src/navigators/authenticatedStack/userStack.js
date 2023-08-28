import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Account from '../../screens/User/Account';

const Stack = createNativeStackNavigator();

export default function UserStack() {
	return <Stack.Navigator screenOptions={{ headerShown: false, }}>
		<Stack.Screen name='Account' component={Account} />
	</Stack.Navigator>
}