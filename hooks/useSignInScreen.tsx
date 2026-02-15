import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootNavigatorParamList } from 'types/rootNavigatorParamList';
import { signIn } from 'api/authApi';
import { Alert } from 'react-native';
import useUserToken from 'store/useUserToken';
import { getUserDetails } from 'api/userApi';
import useUserData from 'store/useUserData';

export const useSignInScreen = () => {
  const navigation: NativeStackNavigationProp<RootNavigatorParamList> =
    useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const setToken = useUserToken((state: any) => state.setToken);
  const setUserData = useUserData((state: any) => state.setUser);

  /* -------------------- VALIDATIONS -------------------- */

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value: string) => {
    return value.length >= 6;
  };

  /* -------------------- handle input changes -------------------- */

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      setEmail(value);
      const isEmailValid = validateEmail(value);
      if (!isEmailValid) {
        setErrors(prev => ({ ...prev, email: 'Invalid email address' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    } else if (field === 'password') {
      setPassword(value);
      const isPasswordValid = validatePassword(value);
      if (!isPasswordValid) {
        setErrors(prev => ({
          ...prev,
          password: 'Password must be at least 6 characters',
        }));
      } else {
        setErrors(prev => ({ ...prev, password: '' }));
      }
    }
  };

  /* -------------------- API CALL -------------------- */

  const handleSignIn = async () => {
    try {
      setLoading(true);

      const response = await signIn(email, password);

      if (response.success) {
        setToken({
          id: response.data.user.id,
          access_token: response.data.session.access_token,
          refresh_token: response.data.session.refresh_token,
        });
        navigation.reset({
          index: 0,
          routes: [{ name: 'BasicInfoScreen' }],
        });
      } else {
        Alert.alert('Error', response.message || 'Login failed');
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- NAVIGATION -------------------- */

  const goToSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  const goToForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const handleInitialNavigation = async (userId: string) => {
    const userData = await getUserDetails(userId);
    if (userData.success) {
      setUserData(userData.data);
      switch (userData.data.onboarding_status) {
        case 0:
          return navigation.reset({
            index: 0,
            routes: [{ name: 'BasicInfoScreen' }],
          });
        case 1:
          return navigation.reset({
            index: 0,
            routes: [{ name: 'AddressInfoScreen' }],
          });
        case 2:
          return navigation.reset({
            index: 0,
            routes: [{ name: 'ProfilePicUploadScreen' }],
          });

        default:
          return navigation.reset({
            index: 0,
            routes: [{ name: 'BasicInfoScreen' }],
          });
      }
    }
  };

  return {
    email,
    password,
    errors,
    loading,
    handleInputChange,
    handleInitialNavigation,
    handleSignIn,
    goToSignUp,
    goToForgotPassword,
  };
};
