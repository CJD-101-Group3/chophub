// src/stores/auth.js
import { defineStore } from 'pinia'
import { login, signup, getMe, logout } from '@/api/auth.js'; // 1. 引入 logout

const USER_KEY = 'user'

// 讓使用者物件穩定：補上缺少的欄位（特別是 role）
function normalizeUser(u) {
  if (!u) return null
  // 後端有時用 role、有時用 badge；都沒有就給預設「一般會員」
  const role = u.role || u.badge || '一般會員'
  return { ...u, role }
}

function safeReadUser() {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(USER_KEY)
  if (!raw || raw === 'undefined' || raw === 'null') return null
  try {
    const u = JSON.parse(raw)
    return normalizeUser(u)
  } catch {
    localStorage.removeItem(USER_KEY)
    return null
  }
}

function safeWriteUser(val) {
  if (typeof window === 'undefined') return
  if (!val) {
    localStorage.removeItem(USER_KEY)
    return
  }
  localStorage.setItem(USER_KEY, JSON.stringify(val))
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
        const res = await login(credentials)   // 期望回傳 { user: {...} }
        const nextUser = normalizeUser(res?.user ?? null)
        this.user = nextUser
        safeWriteUser(nextUser)
        return res
      } catch (error) {
        this.user = null
        safeWriteUser(null)
        throw error
      }
    },

    async signupAction(payload) {
      const res = await signup(payload)        // 期望回傳 { message: '...' }
      return res?.message ?? 'OK'
    },

    async logoutAction() {
      this.user = null
      safeWriteUser(null)
      const res = await logout()  // 呼叫後端登出 API
      
      // console.log('User logged out');
      // 與路由的 path 大小寫一致：/Login
      const base = import.meta.env.VITE_API_BASE || '/'
      // console.log(base);
      // console.log(import.meta.env.VITE_LOCAL_FRONT + 'Login')
      window.location.href = `${import.meta.env.VITE_LOCAL_FRONT}Login`

      return res;
    },

    // App 啟動時可呼叫，用於恢復登入狀態（若你用 Cookie / Session）
    async fetchUser() {
      try {
        const me = await getMe()               // 期望回傳使用者物件；未登入應丟錯/回 null
        const normalized = normalizeUser(me ?? null)
        this.user = normalized
        safeWriteUser(normalized)
      } catch {
        this.user = null
        safeWriteUser(null)
      } finally {
        this.isAuthReady = true
      }
    },
  },
})
