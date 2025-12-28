import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserToken = create(
  persist(
    set => ({
      token: {
        access_token: '',
        refresh_token: '',
      },
      setToken: (tokenDetails: any) => set({ token: tokenDetails }),
    }),
    {
      name: 'access-token',
    },
  ),
);

export default useUserToken;
