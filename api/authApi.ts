import axios from 'axios';
// @ts-ignore
import { API_END_POINT } from '@env';
import { getUserToken } from 'utils/utils';

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
    console.log('error: ', error, JSON.stringify(error));
    return {
      success: false,
      message: error.response?.data?.message,
    };
  }
}

export async function signOut(email: string, password: string) {
  try {
    const token = await getUserToken();
    const response = await axios.post(`${API_END_POINT}/auth/signout`, {
      accessToken: token,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.log('error: ', error, JSON.stringify(error));
    return {
      success: false,
      message: error.response?.data?.message,
    };
  }
}

export async function forgotPassword(email: string) {
  try {
    const response = await axios.post(`${API_END_POINT}/auth/forgot-password`, {
      email,
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
