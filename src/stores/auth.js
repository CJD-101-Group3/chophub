// src/stores/auth.js
import { defineStore } from 'pinia'
import { login, signup, getMe, logout as apiLogout } from '@/api/auth.js'

const USER_KEY = 'user'

function normalizeUser(u) {
  if (!u) return null
  const role = u.role || u.badge || '一般會員'
  return { ...u, role }
}

function safeReadUser() {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(USER_KEY)
  if (!raw || raw === 'undefined' || raw === 'null') return null
  try { return normalizeUser(JSON.parse(raw)) }
  catch { localStorage.removeItem(USER_KEY); return null }
}

function safeWriteUser(val) {
  if (typeof window === 'undefined') return
  if (!val) { localStorage.removeItem(USER_KEY); return }
  localStorage.setItem(USER_KEY, JSON.stringify(val))
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: safeReadUser(),
    isAuthReady: false,
  }),

  getters: {
    isLoggedIn: (s) => !!s.user,
    currentUser: (s) => s.user,
    userId: (s) => s.user?.user_id,
    userRole: (s) => s.user?.role,
  },

  actions: {
    async loginAction(credentials) {
      // 後端設定 Cookie；成功不代表已拿到 user，所以下一步一定 fetchUser
      await login(credentials)
      await this.fetchUser(true)
      return { ok: !!this.user }
    },

    async signupAction(payload) {
      const res = await signup(payload)
      return res?.message ?? 'OK'
    },

    async logoutAction() {
      try { await apiLogout() } catch {}
      this.user = null
      safeWriteUser(null)

      // 你可以選一種：SPA 導頁或完整刷新
      // 1) SPA 導頁（需在組件中取得 router 並呼叫）
      // router.push('/Login')

      // 2) 直接跳轉（完整重載，可避免殘留狀態）
      const baseUrl = import.meta.env.BASE_URL || '/'
      window.location.assign(`${baseUrl}Login`)
    },

    async fetchUser(force = false) {
      try {
        const res = await getMe() // me.php -> { user: {...}, renewed?: bool }
        const nextUser = normalizeUser(res?.user ?? res ?? null)
        this.user = nextUser
        safeWriteUser(nextUser)
        return nextUser
      } catch (e) {
        this.user = null
        safeWriteUser(null)
        throw e
      } finally {
        this.isAuthReady = true
      }
    },
  },
})