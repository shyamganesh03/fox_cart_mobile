import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootNavigatorParamList } from 'types/rootNavigatorParamList';

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

  const signIn = async () => {
    try {
      setLoading(true);

      const response = {};

      //   if (response.success) {
      //     Alert.alert('Success', 'Logged in successfully');
      //     // navigation.replace('Home');
      //   } else {
      //     Alert.alert('Error', response.message || 'Login failed');
      //   }
    } catch (error) {
      //   Alert.alert('Error', 'Something went wrong');
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

  return {
    email,
    password,
    errors,
    loading,
    handleInputChange,
    signIn,
    goToSignUp,
    goToForgotPassword,
  };
};
