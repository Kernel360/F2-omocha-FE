import { create } from 'zustand';

interface TokenState {
  token: string | null;
  fetchToken: () => Promise<void>;
  checkToken: () => Promise<void>;
  setToken: (token: string | null) => void;
}

export const useTokenStore = create<TokenState>(set => ({
  token: null,
  fetchToken: async () => {
    try {
      const response = await fetch('/apis/set-cookie', {
        method: 'GET',
      });
      const data = await response.json();

      if (data.refreshToken) {
        set({ token: data.refreshToken });
      } else {
        set({ token: null });
      }
    } catch (e) {
      set({ token: null });
    }
  },
  checkToken: async () => {
    const tokenStore = useTokenStore.getState();
    await tokenStore.fetchToken();
  },
  setToken: (token: string | null) => set({ token }),
}));
