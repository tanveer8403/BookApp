import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BooksList from './BooksList';
import BookDetail from './BookDetail';
import AddBook from './AddBook';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Books List" 
        component={BooksList} 
        options={{ headerShown: false }} // Hide header for Books List screen
      />
      <Stack.Screen name="Book Detail" component={BookDetail} />
      <Stack.Screen name="Add Book" component={AddBook} />
    </Stack.Navigator>
  );
}
