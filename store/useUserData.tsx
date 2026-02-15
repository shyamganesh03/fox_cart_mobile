import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useUserData = create(
  persist(
    set => ({
      user: {},
      setUser: (userDetails: any) => set({ user: userDetails }),
    }),
    {
      name: 'userData',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useUserData;
