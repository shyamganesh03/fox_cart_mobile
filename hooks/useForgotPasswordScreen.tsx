import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

import { forgotPassword } from 'api/authApi';
import { RootNavigatorParamList } from 'types/rootNavigatorParamList';

export const useForgotPasswordScreen = () => {
  const navigation: NativeStackNavigationProp<RootNavigatorParamList> =
    useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
  }>({});

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleInputChange = (value: string) => {
    setEmail(value);
    const isEmailValid = validateEmail(value);
    if (!isEmailValid) {
      setErrors(prev => ({ ...prev, email: 'Invalid email address' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await forgotPassword(email);
      if (response.success) {
        Toast.show({
          type: 'success',
          text1: response.data.message || 'Reset link sent to your email',
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

  const goBack = () => {
    navigation.goBack();
  };

  return {
    email,
    errors,
    loading,
    handleInputChange,
    handleSubmit,
    goBack,
  };
};
