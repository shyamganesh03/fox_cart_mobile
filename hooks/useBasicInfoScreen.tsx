import { useMemo, useRef, useState } from 'react';
import PhoneInput from 'react-native-phone-number-input';

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

  const onContinue = () => {
    const isValid = validateForm();
    if (!isValid) return;

    const payload = {
      fullName: fullName.trim(),
      gender,
      phoneNumber: `+${phoneNumber.code}-${phoneNumber.phone}`,
      onboarding_status: 2,
    };

    console.log('Basic Info Payload:', payload);

    // 👉 Call API or navigate next screen here
    // navigation.navigate('NextScreen', payload)
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
