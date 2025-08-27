import api from './axios.js'; 
import axios from 'axios';

// const API_BASE_URL = 'https://tibamef2e.com/cjd101/g3/api';
const API_BASE_URL = 'http://localhost:8888/chophub-API/api'; // 本機測試用

/**
 * 呼叫後端登入 API
 * @param {object} credentials - 包含 username 和 password 的物件
 * @returns {Promise<object>} - 後端成功時回傳的 data 物件
 */
export async function login(credentials) {
  try {
    // 【關鍵修改 #3】將所有的 axios.post/get 改為 api.post/get
    const response = await api.post(`${API_BASE_URL}/user_login.php`, credentials);
    return response.data;
  } catch (e) {
    const errorMessage = e.response?.data?.error || e.message || '登入時發生未知錯誤';
    throw new Error(errorMessage);
  }
}

/**
 * 呼叫後端註冊 API
 * @param {object} credentials - 包含 display_name, email, password 的物件
 * @returns {Promise<object>} - 後端成功時回傳的訊息物件
 */
export async function signup(credentials) {
  try {
    const response = await api.post(`${API_BASE_URL}/user_signup.php`, credentials);
    return response.data;
  } catch (e) {
    const errorMessage = e.response?.data?.message || e.message || '註冊時發生未知錯誤';
    throw new Error(errorMessage);
  }
}

export async function logout() {
  const res = await axios.post(`${API_BASE_URL}/user_logout.php`, {}, { withCredentials: true })
  return res.data
}

/**
 * 呼叫 me.php 來獲取當前登入的使用者資訊
 * @returns {Promise<object>} - 後端回傳的 user 物件
 */
export async function getMe() {
  try {
    const response = await api.get(`${API_BASE_URL}/user_me.php`);
    return response.data.user; 
  } catch (e) {
    const errorMessage = e.response?.data?.message || '憑證無效或已過期';
    throw new Error(errorMessage);
  }
}