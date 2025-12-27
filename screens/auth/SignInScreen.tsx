import { Keyboard, StyleSheet, View } from 'react-native';
import React from 'react';
import {
  Button,
  MD3Theme,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import PasswordInput from 'components/PasswordInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootNavigatorParamList } from 'types/rootNavigatorParamList';
import { useNavigation } from '@react-navigation/native';

type SignInScreenProps = NativeStackNavigationProp<
  RootNavigatorParamList,
  'SignInScreen'
>;

const SignInScreen = (props: SignInScreenProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation: NativeStackNavigationProp<RootNavigatorParamList> =
    useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Fox cart</Text>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.caption}>Sign in to continue your journey</Text>
      <KeyboardAwareScrollView>
        <View style={styles.inputFieldContainer}>
          <TextInput label="Email" mode="outlined" />
          <PasswordInput value={''} onChangeText={(text: string) => {}} />
          <Button
            mode="text"
            onPress={() => {
              navigation.navigate('ForgotPasswordScreen');
            }}
            style={styles.forgotCTAStyle}
          >
            forgot Password?
          </Button>
          <Button mode="contained" onPress={() => {}} style={styles.ctaStyle}>
            Sign In
          </Button>
          <Button
            mode="outlined"
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}
            style={styles.ctaStyle}
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
