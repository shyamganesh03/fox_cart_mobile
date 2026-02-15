import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserToken = async () => {
  const token = await AsyncStorage.getItem('access-token');
  const parsedToken = token ? JSON.parse(token) : null;
  return parsedToken?.state.token.access_token;
};
