import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from '../screens/Authentication';

const Stack = createNativeStackNavigator();

export default function AuthenticationStack() {
	return <Stack.Navigator screenOptions={{ headerShown: false, }}>
		<Stack.Screen name='SignIn' component={Authentication} options={{ title: 'Sign In' }} />
	</Stack.Navigator>
}