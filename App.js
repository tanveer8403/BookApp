import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './screens/HomeStack';
import Borrowed from './screens/Borrowed';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from './styles';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return <MaterialIcons name="library-books" size={size} color={color} />;
            } else if (route.name === 'Borrowed') {
              return <Ionicons name={focused ? 'book' : 'book-outline'} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Borrowed" component={Borrowed} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
