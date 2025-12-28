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
import PasswordInput from 'components/PasswordInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSignInScreen } from 'hooks/useSignInScreen';

const SignInScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const {
    email,
    password,
    errors,
    loading,
    handleInputChange,
    handleSignIn,
    goToForgotPassword,
    goToSignUp,
  } = useSignInScreen();

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Fox cart</Text>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.caption}>Sign in to continue your journey</Text>
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
            error={!!errors.password}
            errorMessage={errors.password}
            onChangeText={(text: string) => handleInputChange('password', text)}
          />
          <Button
            mode="text"
            onPress={goToForgotPassword}
            style={styles.forgotCTAStyle}
          >
            forgot Password?
          </Button>
          <Button
            mode="contained"
            onPress={handleSignIn}
            style={styles.ctaStyle}
            disabled={
              !!errors.email || !!errors.password || !email || !password
            }
            loading={loading}
          >
            Sign In
          </Button>
          <Button
            mode="outlined"
            onPress={goToSignUp}
            style={styles.ctaStyle}
            disabled={loading}
          >
            Sign Up
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignInScreen;

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
