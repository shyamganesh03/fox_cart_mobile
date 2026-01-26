import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useUserToken = create(
  persist(
    set => ({
      token: {
        id: '',
        access_token: '',
        refresh_token: '',
      },
      setToken: (tokenDetails: any) => set({ token: tokenDetails }),
    }),
    {
      name: 'access-token',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useUserToken;
