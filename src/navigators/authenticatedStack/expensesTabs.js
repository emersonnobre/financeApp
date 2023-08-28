import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import AllExpenses from '../../screens/Expenses/AllExpenses';
import RecentExpenses from '../../screens/RecentExpenses';
import Home from '../../screens/Home';
import { GlobalStyles } from '../../constants/styles';
import IconButton from '../../components/ui/IconButton';

const Tab = createBottomTabNavigator();

export default function ExpensesTabs() {
	return <Tab.Navigator screenOptions={({ navigation }) => ({
		headerStyle: { backgroundColor: GlobalStyles.colors.primary700 },
		headerTintColor: GlobalStyles.colors.grey100,
		tabBarStyle: { backgroundColor: GlobalStyles.colors.primary700 },
		tabBarActiveTintColor: GlobalStyles.colors.accent300, 
		tabBarInactiveTintColor: '#ccc7',
		headerTitleAlign: 'center',
		headerRight: ({ tintColor }) => <IconButton 
			onPress={() => navigation.navigate('ManageExpenses')} 
			icon='add'
			size={24} 
			color={tintColor}
		/>,
		headerLeft: ({ tintColor }) => <IconButton 
			onPress={() => navigation.navigate('Account')}
			icon='person-circle-outline' 
			color={tintColor} 
			size={24} 
		/>,
	})}>
		<Tab.Screen 
			name='Home'
			component={Home}
			options={{
				title: 'Home',
				tabBarLabel: 'Home',
				tabBarIcon: ({ color, size }) => <Icon name='home-outline' color={color} size={size} />
			}}
		/>
		<Tab.Screen 
			name='RecentExpenses' 
			component={RecentExpenses}
			options={{ 
				title: 'Recent expenses',
				tabBarLabel: 'Recent',
				tabBarIcon: ({ color, size }) => <Icon name='hourglass-outline' color={color} size={size} />
			}}
		/>
		<Tab.Screen 
			name='AllExpenses' 
			component={AllExpenses}
			options={{
				title: 'All expenses',
				tabBarLabel: 'All',
				tabBarIcon: ({ color, size }) => <Icon name='list-outline' color={color} size={size} />
			}}
		/>
	</Tab.Navigator>
}