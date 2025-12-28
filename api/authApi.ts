import axios from 'axios';
// @ts-ignore
import { API_END_POINT } from '@env';

export async function signUp(email: string, password: string) {
  try {
    const response = await axios.post(`${API_END_POINT}/auth/signup`, {
      email,
      password,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message,
    };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const response = await axios.post(`${API_END_POINT}/auth/signin`, {
      email,
      password,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message,
    };
  }
}
