import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootNavigatorParamList } from 'types/rootNavigatorParamList';
import { signIn } from 'api/authApi';
import { Alert } from 'react-native';
import useUserToken from 'store/useUserToken';

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
          access_token: response.data.session.access_token,
          refresh_token: response.data.session.refresh_token,
        });
        Alert.alert(
          'Success',
          `User ${response.data.user.email} logged in successfully.`,
        );
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

  return {
    email,
    password,
    errors,
    loading,
    handleInputChange,
    handleSignIn,
    goToSignUp,
    goToForgotPassword,
  };
};
