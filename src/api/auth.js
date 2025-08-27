// src/api/auth.js
import api from './axios.js'

export async function login(credentials) {
  const { data } = await api.post('/user_login.php', credentials)
  if (data?.ok === false) throw new Error(data?.message || '登入失敗')
  return data
}

export async function getMe() {
  const { data } = await api.get('/user_me.php')
  return data      // 回傳整個物件，store 會從 data.user 取
}

export async function logout() {
  const { data } = await api.post('/user_logout.php', {})
  return data
}

export async function signup(payload) {
  const { data } = await api.post('/user_signup.php', payload)
  if (data?.ok === false) throw new Error(data?.message || '註冊失敗')
  return data
}