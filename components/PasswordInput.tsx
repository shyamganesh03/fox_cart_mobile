import React, { memo, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, HelperText, useTheme } from 'react-native-paper';

type PasswordInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  onBlur?: () => void;
};

const PasswordInput = ({
  value,
  onChangeText,
  label = 'Password',
  error = false,
  errorMessage,
  disabled = false,
  autoFocus = false,
  onBlur,
}: PasswordInputProps) => {
  const theme = useTheme();
  const [secureText, setSecureText] = useState(true);

  const toggleSecureText = useCallback(() => {
    setSecureText(prev => !prev);
  }, []);

  return (
    <>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureText}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={autoFocus}
        disabled={disabled}
        error={error}
        onBlur={onBlur}
        right={
          <TextInput.Icon
            icon={secureText ? 'eye-off' : 'eye'}
            onPress={toggleSecureText}
            accessibilityLabel={secureText ? 'Show password' : 'Hide password'}
          />
        }
        style={styles.input}
        outlineColor={theme.colors.outline}
        activeOutlineColor={theme.colors.primary}
      />

      {error && errorMessage ? (
        <HelperText type="error" visible={error}>
          {errorMessage}
        </HelperText>
      ) : null}
    </>
  );
};

export default memo(PasswordInput);

const styles = StyleSheet.create({
  input: {
    marginBottom: 4,
  },
});
