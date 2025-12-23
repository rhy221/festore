import { isTokenExpired } from '@/lib/http';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (user, token) => {
        localStorage.setItem('accessToken', token);
        set({ user, token, isAuthenticated: true });
      },
      
      logout: () => {
        localStorage.removeItem('accessToken');
        set({ user: null, token: null, isAuthenticated: false });
      },
      
      updateUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      
      // --- PHẦN QUAN TRỌNG NHẤT ---
      onRehydrateStorage: () => (state) => {
        // Hàm này chạy SAU KHI dữ liệu từ localStorage được nạp vào state
        if (state && state.token) {
          // Kiểm tra nếu token hết hạn
          if (isTokenExpired(state.token)) {
            console.log("Token expired during hydration. Logging out...");
            // Gọi hàm logout của store để reset state
            state.logout();
          }
        }
      },
    }
  )
);
