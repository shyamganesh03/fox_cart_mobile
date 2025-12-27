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

type SignUpScreenProps = NativeStackNavigationProp<
  RootNavigatorParamList,
  'SignUpScreen'
>;

const SignUpScreen = (props: SignUpScreenProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation: NativeStackNavigationProp<RootNavigatorParamList> =
    useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Fox cart</Text>
      <Text style={styles.title}>Welcome Hero</Text>
      <Text style={styles.caption}>Sign up to start your new journey</Text>
      <KeyboardAwareScrollView>
        <View style={styles.inputFieldContainer}>
          <TextInput label="Email" mode="outlined" />
          <PasswordInput value={''} onChangeText={(text: string) => {}} />
          <PasswordInput
            label="Re-Enter Password"
            value={''}
            onChangeText={(text: string) => {}}
          />
          <Button mode="contained" onPress={() => {}} style={styles.ctaStyle}>
            Sign Up
          </Button>
          <Button
            mode="outlined"
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.ctaStyle}
          >
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
