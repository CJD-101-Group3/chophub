// src/stores/auth.js
import { defineStore } from 'pinia';
import { login, signup, getMe } from '@/api/auth.js'; // 1. 引入 getMe

export const useAuthStore = defineStore('auth', {
  /**
   * State: 用來儲存所有與驗證相關的狀態
   */
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null, 
    // 新增一個狀態，用來追蹤身份驗證是否已完成
    isAuthReady: false, 
  }),

  /**
   * Getters: 用來衍生出一些方便的狀態
   */
  getters: {
    isLoggedIn: (state) => !!state.user,
    currentUser: (state) => state.user,
    userId: (state) => state.user?.user_id,
    userRole: (state) => state.user?.role,
  },
  
  /**
   * Actions: 所有修改 state 的操作都應該在這裡定義
   */
  actions: {
    async loginAction(credentials) {
      try {
        const responseData = await login(credentials);
        this.user = responseData.user;
        localStorage.setItem('user', JSON.stringify(responseData.user));
        return responseData; 
      } catch (error) {
        this.user = null;
        localStorage.removeItem('user');
        throw error;
      }
    },

    async signupAction(credentials) {
      const response = await signup(credentials);
      return response.message; 
    },

    logoutAction() {
      this.user = null;
      localStorage.removeItem('user');
      // 登出後，我們希望重新整理頁面以確保所有狀態都被清除
      // 並且路由守衛會自動將使用者導向登入頁
      window.location.href = '/login';
    },

    // ******** 新增 fetchUser Action ********
    /**
     * 嘗試從後端恢復登入狀態。
     * 這個 action 應該在應用程式初始化時被呼叫一次。
     */
    async fetchUser() {
      // 如果本地已經有使用者資料，我們先假設他是登入的，以避免畫面閃爍
      // 然後在背景靜默地去跟後端驗證
      try {
        const userData = await getMe();
        // 如果成功獲取，更新 state 和 localStorage
        this.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        // 如果失敗 (例如 token 過期)，就清空狀態
        console.log("恢復登入狀態失敗:", error.message);
        this.user = null;
        localStorage.removeItem('user');
      } finally {
        // 無論成功或失敗，都將 isAuthReady 設為 true，
        // 表示身份驗證流程已完成，可以顯示頁面內容了。
        this.isAuthReady = true;
      }
    }
  }
});