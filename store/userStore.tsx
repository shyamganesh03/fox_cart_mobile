import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserToken = create(
  persist(
    set => ({
      token: 0,
      setToken: (newToken: number) => set({ token: newToken }),
    }),
    {
      name: 'access-token',
    },
  ),
);

export default useUserToken;
