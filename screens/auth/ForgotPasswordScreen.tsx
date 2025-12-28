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
import { useForgotPasswordScreen } from 'hooks/useForgotPasswordScreen';

const ForgotPasswordScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { email, errors, loading, handleInputChange, handleSubmit, goBack } =
    useForgotPasswordScreen();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Email to send reset link</Text>
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={(text: string) => handleInputChange(text)}
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
      <Button
        mode="contained"
        style={styles.ctaStyle}
        onPress={handleSubmit}
        disabled={!!errors.email || !email}
        loading={loading}
      >
        Submit
      </Button>
      <Button
        mode="outlined"
        onPress={goBack}
        style={styles.ctaStyle}
        disabled={loading}
      >
        Sign In
      </Button>
    </View>
  );
};

export default ForgotPasswordScreen;

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
    ctaStyle: {
      marginTop: 16,
    },
  });

const styles = StyleSheet.create({});
