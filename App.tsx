import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import ExpenseDetail from './components/ExpenseDetail/ExpenseDetail';
import ExpenseEdit from './components/ExpenseEdit/ExpenseEdit';
import ExpenseCreate from './components/ExpenseCreate/ExpenseCreate';

export default function App() {
  // call function to use Stack.Navigator
  const Stack = createNativeStackNavigator();

  // use navigator to navigate to different components (similar to react router routes/paths)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ title: 'Welcome' }} />
        <Stack.Screen name='Profile' component={Profile} options={{ title: 'Profile' }} />
        <Stack.Screen name='ExpenseDetail' component={ExpenseDetail} options={{ title: 'Expense Detail' }} />
        <Stack.Screen name='ExpenseEdit' component={ExpenseEdit} options={{ title: 'Edit Expense' }} />
        <Stack.Screen name='ExpenseCreate' component={ExpenseCreate} options={{ title: 'Create Expense' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}