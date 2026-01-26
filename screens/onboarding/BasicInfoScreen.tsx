import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  Button,
  MD3Theme,
  RadioButton,
  TextInput,
  useTheme,
} from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useBasicInfoScreen } from 'hooks/useBasicInfoScreen';

const BasicInfoScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const {
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
  } = useBasicInfoScreen();

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Fox cart</Text>
      <View style={styles.formContainer}>
        <TextInput
          label="Full Name"
          mode="outlined"
          value={fullName}
          onChangeText={text => setFullName(text)}
        />
        <View>
          <Text style={styles.sectionTitle}>Gender</Text>
          <View style={styles.genderSectionSubContainer}>
            <RadioButton
              value="male"
              status={gender === 'male' ? 'checked' : 'unchecked'}
              onPress={() => setGender('male')}
            />
            <Text style={styles.optionLabel}>Male</Text>
          </View>
          <View style={styles.genderSectionSubContainer}>
            <RadioButton
              value="female"
              status={gender === 'female' ? 'checked' : 'unchecked'}
              onPress={() => setGender('female')}
            />
            <Text style={styles.optionLabel}>Female</Text>
          </View>
        </View>
        <View>
          <Text style={styles.sectionTitle}>Phone number</Text>
          <PhoneInput
            ref={phoneInputRef}
            layout="first"
            defaultCode="IN"
            value={phoneNumber.phone}
            countryPickerProps={{ renderFlagButton: false }}
            textContainerStyle={styles.phoneInputTextContainerStyle}
            containerStyle={styles.phoneInputContainerStyle}
            onChangeCountry={country =>
              setPhoneNumber(prev => ({
                ...prev,
                code: country.callingCode[0] || '',
              }))
            }
            onChangeText={phone =>
              setPhoneNumber(prev => ({
                ...prev,
                phone: phone,
              }))
            }
          />
        </View>
      </View>
      <Button
        mode="contained"
        onPress={onContinue}
        style={styles.ctaStyle}
        disabled={disableCTA}
      >
        Continue
      </Button>
    </KeyboardAwareScrollView>
  );
};

export default BasicInfoScreen;

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.onBackground,
      marginBottom: 24,
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.onBackground,
      marginBottom: 8,
    },
    optionLabel: {
      fontSize: 16,
      color: theme.colors.onBackground,
    },
    formContainer: {
      marginBottom: 24,
      gap: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderRadius: 8,
    },
    genderSectionSubContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    ctaStyle: {
      position: 'absolute',
      bottom: 20,
      left: 16,
      right: 16,
    },
    phoneInputTextContainerStyle: {
      width: '100%',
      paddingVertical: 0,
    },
    phoneInputContainerStyle: {
      width: '100%',
      borderRadius: 8,
      height: 50,
      overflow: 'hidden',
    },
  });
