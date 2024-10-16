import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { UserData } from '@/apis/types/User';

interface UserStore {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  removeUser: () => void;
}

const useUserStore = create(
  persist<UserStore>(
    set => ({
      user: null,
      setUser: user => set(() => ({ user })),
      removeUser: () => set(() => ({ user: null })),
    }),
    {
      name: 'user-info-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useUserStore;
