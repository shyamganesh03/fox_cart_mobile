import axios from 'axios';
import { API_END_POINT } from 'react-native-dotenv';

export async function signUp(email: string, password: string) {
  console.log('API end point ', API_END_POINT);
  try {
    const response = await axios.post(`${API_END_POINT}/auth/signup`, {
      email,
      password,
    });
    console.log('response ', response);
    return response.data;
  } catch (error) {
    console.log('Error on Signup ', error);
  }
}
