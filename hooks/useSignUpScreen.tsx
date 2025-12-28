import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

import { RootNavigatorParamList } from 'types/rootNavigatorParamList';
import { signUp } from 'api/authApi';

type SignUpErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export const useSignUpScreen = () => {
  const navigation: NativeStackNavigationProp<RootNavigatorParamList> =
    useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<SignUpErrors>({});

  /* -------------------- VALIDATIONS -------------------- */

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value: string) => {
    return value.length >= 6;
  };

  const validateConfirmPassword = (value: string) => {
    return value === password;
  };

  /* -------------------- HANDLE INPUT CHANGES -------------------- */

  const handleInputChange = (
    field: 'email' | 'password' | 'confirmPassword',
    value: string,
  ) => {
    switch (field) {
      case 'email':
        setEmail(value);
        setErrors(prev => ({
          ...prev,
          email: validateEmail(value) ? '' : 'Invalid email address',
        }));
        break;

      case 'password':
        setPassword(value);
        setErrors(prev => ({
          ...prev,
          password: validatePassword(value)
            ? ''
            : 'Password must be at least 6 characters',
        }));
        break;

      case 'confirmPassword':
        setConfirmPassword(value);
        setErrors(prev => ({
          ...prev,
          confirmPassword: validateConfirmPassword(value)
            ? ''
            : 'Passwords not matching.',
        }));
        break;

      default:
        break;
    }
  };

  /* -------------------- API CALL -------------------- */

  const handleSignUp = async () => {
    try {
      setLoading(true);

      const response = await signUp(email, password);

      if (response.success) {
        Toast.show({
          type: 'success',
          text1: response?.data?.message || 'Signup Successful',
        });
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignInScreen' }],
        });
      } else {
        Alert.alert('Error', response.message || 'Signup failed');
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- NAVIGATION -------------------- */

  const goBack = () => {
    navigation.goBack();
  };

  return {
    email,
    password,
    confirmPassword,
    errors,
    loading,
    handleInputChange,
    handleSignUp,
    goBack,
  };
};
