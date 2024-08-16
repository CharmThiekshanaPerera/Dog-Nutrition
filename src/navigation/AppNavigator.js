import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen/DiscoverScreen';
import CategoryScreen from '../screens/CategoryScreen/CategoryScreen';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import ProductDetails from '../screens/ProductScreen/ProductDetails';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{ title: 'Categories' }} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} options={({ route }) => ({ title: route.params.categoryName })} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Your Profile' }} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
