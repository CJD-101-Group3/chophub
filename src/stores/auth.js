// src/stores/auth.js
import { defineStore } from 'pinia';
import { login, signup, getMe } from '@/api/auth.js';

const USER_KEY = 'user';

function safeReadUser() {
  // 某些情況下會被寫入字串 "undefined"/"null" 或壞 JSON
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw || raw === 'undefined' || raw === 'null') return null;
  try {
    return JSON.parse(raw);
  } catch {
    // 內容壞掉就清掉，避免下一次再炸
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

function safeWriteUser(val) {
  if (typeof window === 'undefined') return;
  if (!val) {
    localStorage.removeItem(USER_KEY);
    return;
    }
  localStorage.setItem(USER_KEY, JSON.stringify(val));
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: safeReadUser(),
    isAuthReady: false,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    currentUser: (state) => state.user,
    userId: (state) => state.user?.user_id,
    userRole: (state) => state.user?.role,
  },

  actions: {
    async loginAction(credentials) {
      try {
        const responseData = await login(credentials);
        // 防呆：確保後端真的帶回 user
        const nextUser = responseData?.user ?? null;
        this.user = nextUser;
        safeWriteUser(nextUser);
        return responseData;
      } catch (error) {
        this.user = null;
        safeWriteUser(null);
        throw error;
      }
    },

    async signupAction(credentials) {
      const response = await signup(credentials);
      return response.message;
    },

    logoutAction() {
      this.user = null;
      safeWriteUser(null);
      window.location.href = '/login';
    },

    // 在 App 啟動時呼叫一次
    async fetchUser() {
      try {
        const userData = await getMe(); // 可能丟錯（例如 Cookie 過期）
        this.user = userData ?? null;
        safeWriteUser(this.user);
      } catch (error) {
        console.log('恢復登入狀態失敗:', error.message);
        this.user = null;
        safeWriteUser(null);
      } finally {
        this.isAuthReady = true;
      }
    },
  },
});
