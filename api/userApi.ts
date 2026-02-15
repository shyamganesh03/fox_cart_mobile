import axios from 'axios';
// @ts-ignore
import { API_END_POINT } from '@env';
import { getUserToken } from 'utils/utils';

export async function getUserDetails(id: string) {
  try {
    const token = await getUserToken();
    const response = await axios.get(`${API_END_POINT}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error fetching user details:', error);
    return {
      success: false,
      message: error.response?.data?.message,
    };
  }
}

export async function updateUserDetails(id: string, userDetails: any) {
  try {
    const token = await getUserToken();

    const response = await axios.put(
      `${API_END_POINT}/users/${id}`,
      userDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error updating user details:', error);
    return {
      success: false,
      message: error.response?.data?.message,
    };
  }
}

export async function updateFcmToken(id: string, fcmToken: string) {
  try {
    const token = await getUserToken();
    const response = await axios.put(
      `${API_END_POINT}/user/${id}/fcm-token`,
      {
        fcmToken,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error updating FCM token:', error);
    return {
      success: false,
      message: error.response?.data?.message,
    };
  }
}

export async function updateProfilePic(id: string, file: File) {
  try {
    const token = await getUserToken();

    const response = await axios.post(
      `${API_END_POINT}/user/${id}/profile-pic`,
      {
        file,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error updating profile picture:', error);
    return {
      success: false,
      message: error.response?.data?.message,
    };
  }
}

export async function deleteProfilePic(id: string) {
  try {
    const token = await getUserToken();
    const response = await axios.delete(
      `${API_END_POINT}/user/${id}/profile-pic`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error deleting profile picture:', error);
    return {
      success: false,
      message: error.response?.data?.message,
    };
  }
}
