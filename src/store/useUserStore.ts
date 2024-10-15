import { create } from 'zustand';

import { UserData } from '@/apis/types/User';

interface UserStore {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  removeUser: () => void;
}

const useUserStore = create<UserStore>(set => ({
  user: null,
  setUser: user => set(() => ({ user })),
  removeUser: () => set(() => ({ user: null })),
}));

export default useUserStore;
