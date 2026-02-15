import { useMemo, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PhoneInput from 'react-native-phone-number-input';

import { updateUserDetails } from 'api/userApi';
import useUserData from 'store/useUserData';
import { RootNavigatorParamList } from 'types/rootNavigatorParamList';

type Gender = 'male' | 'female' | '';

export const useBasicInfoScreen = () => {
  const phoneInputRef = useRef<PhoneInput>(null);

  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<Gender>('');
  const [phoneNumber, setPhoneNumber] = useState({
    code: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    gender: '',
    phoneNumber: '',
  });

  const disableCTA = useMemo(() => {
    return (
      !fullName.trim() ||
      !gender ||
      !phoneNumber.phone ||
      Object.values(errors).some(err => err !== '')
    );
  }, [fullName, gender, phoneNumber, errors]);

  const navigation: NativeStackNavigationProp<RootNavigatorParamList> =
    useNavigation();

  const userData = useUserData((state: any) => state.user);
  const setUserData = useUserData((state: any) => state.setUserData);

  /* -------------------- VALIDATIONS -------------------- */

  const validateFullName = () => {
    if (!fullName.trim()) {
      return 'Full name is required';
    }
    if (fullName.trim().length < 3) {
      return 'Name must be at least 3 characters';
    }
    return '';
  };

  const validateGender = () => {
    if (!gender) {
      return 'Please select gender';
    }
    return '';
  };

  const validatePhoneNumber = () => {
    const isValid = phoneInputRef.current?.isValidNumber(phoneNumber.phone);
    if (!phoneNumber.phone || !isValid) {
      return 'Please enter a valid phone number';
    }
    return '';
  };

  const validateForm = () => {
    const fullNameError = validateFullName();
    const genderError = validateGender();
    const phoneError = validatePhoneNumber();

    setErrors({
      fullName: fullNameError,
      gender: genderError,
      phoneNumber: phoneError,
    });

    return !fullNameError && !genderError && !phoneError;
  };

  /* -------------------- ACTIONS -------------------- */

  const onContinue = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    const payload = {
      fullName: fullName.trim(),
      gender,
      phoneNumber: `+${phoneNumber.code}-${phoneNumber.phone}`,
      onboarding_status: userData.onboarding_status + 1,
    };
    const response = await updateUserDetails(userData.id, payload);
    if (response.success) {
      setUserData(response.data);
      if (response.data.onboarding_status === 1) {
        navigation.navigate('AddressInfoScreen');
      } else if (response.data.onboarding_status === 2) {
        navigation.navigate('ProfilePicUploadScreen');
      }
    }
  };

  /* -------------------- RETURN -------------------- */

  return {
    fullName,
    gender,
    phoneNumber,
    errors,
    phoneInputRef,
    disableCTA,
    setFullName,
    setGender,
    setPhoneNumber,
    onContinue,
  };
};
