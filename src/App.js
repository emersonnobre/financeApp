import { useContext } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ExpensesProvider from './store/expensens.context';
import { GlobalStyles } from './constants/styles';
import AuthenticationStack from './navigators/authenticationStack';
import AuthenticatedStack from './navigators/authenticatedStack';
import AuthProvider, { AuthContext } from './store/auth.context';
import Realm from './database/config';

const Stack = createNativeStackNavigator();

function StackNavigator() {
	const { isAuthenticated } = useContext(AuthContext);

	return <Stack.Navigator screenOptions={{
		headerStyle: { backgroundColor: 'white', },
		headerTintColor: GlobalStyles.colors.primary700,
		headerShown: false,
	}}>
		{!isAuthenticated && <Stack.Screen name='AuthenticationStack' component={AuthenticationStack} />}
		{isAuthenticated && <Stack.Screen name='AuthenticatedStack' component={AuthenticatedStack} />}
	</Stack.Navigator>
}

function Pages() {
	return (
		<NavigationContainer>
			<StackNavigator />
		</NavigationContainer>
	);
}

function ContextsWrapper({ children }) {
	return (
		<Realm.RealmProvider>
			<AuthProvider>
				<ExpensesProvider>
					{children}
				</ExpensesProvider>
			</AuthProvider>
		</Realm.RealmProvider>
	);
}

export default function App() {
   return (
		<View style={{ flex: 1 }}>
			<ContextsWrapper>
				<Pages />
			</ContextsWrapper>
		</View>
   );
}
