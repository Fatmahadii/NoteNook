import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Note from './src/Note';
import EditScreen from './src/EditScreen';

  const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= 'Note' component={Note} options={{headerShown: false}}/>
        <Stack.Screen name="Edit" component={EditScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


