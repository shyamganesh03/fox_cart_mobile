import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import SignInScreen from 'screens/auth/SignInScreen';
import SignUpScreen from 'screens/auth/SignUpScreen';
import ForgotPasswordScreen from 'screens/auth/ForgotPasswordScreen';
import BasicInfoScreen from 'screens/onboarding/BasicInfoScreen';
import ProfilePicUploadScreen from 'screens/onboarding/ProfilePicUploadScreen';

import { RootNavigatorParamList } from 'types/rootNavigatorParamList';
import AddressInfoScreen from 'screens/onboarding/AddressInfoScreen';

const RootNavigator = () => {
  const Stack = createNativeStackNavigator<RootNavigatorParamList>();
  return (
    <>
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
          <Stack.Screen name="BasicInfoScreen" component={BasicInfoScreen} />
          <Stack.Screen
            name="AddressInfoScreen"
            component={AddressInfoScreen}
          />
          <Stack.Screen
            name="ProfilePicUploadScreen"
            component={ProfilePicUploadScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default RootNavigator;
