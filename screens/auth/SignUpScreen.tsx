import { StyleSheet, View } from 'react-native';
import React from 'react';
import {
  Button,
  HelperText,
  MD3Theme,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import PasswordInput from 'components/PasswordInput';
import { useSignUpScreen } from 'hooks/useSignUpScreen';

const SignUpScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const {
    email,
    password,
    confirmPassword,
    errors,
    handleInputChange,
    handleSignUp,
    goBack,
  } = useSignUpScreen();

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Fox cart</Text>
      <Text style={styles.title}>Welcome Hero</Text>
      <Text style={styles.caption}>Sign up to start your new journey</Text>
      <KeyboardAwareScrollView>
        <View style={styles.inputFieldContainer}>
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={(text: string) => handleInputChange('email', text)}
            error={!!errors.email}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          {!!errors.email ? (
            <HelperText type="error" visible>
              {errors.email}
            </HelperText>
          ) : null}
          <PasswordInput
            value={password}
            onChangeText={(text: string) => handleInputChange('password', text)}
            error={!!errors.password}
            errorMessage={errors.password}
          />
          <PasswordInput
            label="Re-Enter Password"
            value={confirmPassword}
            onChangeText={(text: string) =>
              handleInputChange('confirmPassword', text)
            }
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword}
          />
          <Button
            mode="contained"
            onPress={handleSignUp}
            style={styles.ctaStyle}
            disabled={
              !!errors.email ||
              !!errors.password ||
              !!errors.confirmPassword ||
              !email ||
              !password ||
              !confirmPassword
            }
          >
            Sign Up
          </Button>
          <Button mode="outlined" onPress={goBack} style={styles.ctaStyle}>
            Sign In
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUpScreen;

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 16,
    },
    title: {
      color: theme.colors.onBackground,
      fontSize: 18,
      fontWeight: 'bold',
      paddingVertical: 16,
    },
    logoText: {
      color: theme.colors.onBackground,
      fontSize: 14,
      marginTop: 8,
    },
    caption: {
      color: theme.colors.onBackground,
      marginTop: 4,
    },
    inputFieldContainer: {
      marginTop: 40,
      marginBottom: 16,
      gap: 16,
      flex: 1,
    },
    ctaStyle: {},
    forgotCTAStyle: {
      width: '50%',
      alignSelf: 'flex-end',
    },
  });
