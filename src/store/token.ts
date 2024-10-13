import { create } from 'zustand';

interface TokenState {
  refresh: string | null;
  access: string | null;
  setToken: (refresh: string | null) => void;
  clearToken: () => void;
}

export const useTokenStore = create<TokenState>(set => ({
  refresh: null,
  access: null,
  setToken: (refresh: string | null) => set({ refresh }),
  clearToken: () => set({ refresh: null, access: null }),
}));
