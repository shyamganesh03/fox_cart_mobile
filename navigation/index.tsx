import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SignInScreen from 'screens/auth/SignInScreen';
import SignUpScreen from 'screens/auth/SignUpScreen';
import ForgotPasswordScreen from 'screens/auth/ForgotPasswordScreen';
import { RootNavigatorParamList } from 'types/rootNavigatorParamList';

const RootNavigator = () => {
  const Stack = createNativeStackNavigator<RootNavigatorParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
