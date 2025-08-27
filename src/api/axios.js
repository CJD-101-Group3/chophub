// src/api/axios.js
import axios from 'axios'

const stripSlashEnd = (s) => String(s || '').replace(/\/+$/, '')

const api = axios.create({
  baseURL: stripSlashEnd(import.meta.env.VITE_API_BASE) || 'http://localhost:8888/chophub-API/api',
  withCredentials: true,     // 預設帶 Cookie（跨站一定要）
  timeout: 20000,            // 20s 超時，避免掛太久
  headers: {
    Accept: 'application/json',
  },
})

// （可選）全域攔截 401，交給上層做導頁/清空登入
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // 這裡不要直接使用 useAuthStore()，以免在 Pinia 尚未初始化時出錯
      // 你可以發事件給全域監聽，或單純丟回錯誤讓路由守衛/呼叫端處理
      // window.dispatchEvent(new CustomEvent('api:unauthorized'))
    }
    return Promise.reject(err)
  }
)

export default api