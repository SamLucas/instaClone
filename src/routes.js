import 'react-native-gesture-handler';
import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Logo from './assets/instagram.png';

const Stack = createStackNavigator();

// Import pages
import Feed from './pages/feed';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            title: <Image source={Logo} />,
            headerTitleAlign: 'center',
            headerTitleStyle: { padding: 20 },
            headerStyle: { backgroundColor: '#f5f5f5' },
          }}
          name="Feed"
          component={Feed}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
