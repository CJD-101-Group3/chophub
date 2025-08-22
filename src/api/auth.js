// src/api/auth.js
import axios from 'axios';

// 讓 axios 在每次請求時都自動帶上 Cookie
axios.defaults.withCredentials = true;

// 統一定義您的後端 API 基礎路徑
const API_BASE_URL = 'http://localhost:8888/ChopHub-API/api/';

/**
 * 呼叫後端登入 API
 * @param {object} credentials - 包含 username 和 password 的物件
 * @returns {Promise<object>} - 後端成功時回傳的 data 物件
 */
export async function login(credentials) {
  try {
    const response = await axios.post(`${API_BASE_URL}login.php`, credentials);
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
    const response = await axios.post(`${API_BASE_URL}signup.php`, credentials);
    return response.data;
  } catch (e) {
    const errorMessage = e.response?.data?.message || e.message || '註冊時發生未知錯誤';
    throw new Error(errorMessage);
  }
}

// ******** 新增 getMe 函式 ********
/**
 * 呼叫 me.php 來獲取當前登入的使用者資訊
 * @returns {Promise<object>} - 後端回傳的 user 物件
 */
export async function getMe() {
  try {
    const response = await axios.get(`${API_BASE_URL}me.php`);
    // me.php 回傳的結構是 { user: {...}, renewed: ... }
    // 我們只需要 user 物件
    return response.data.user; 
  } catch (e) {
    // 如果 Cookie 無效或過期，後端會回傳 401 錯誤，axios 會捕捉到
    const errorMessage = e.response?.data?.message || '憑證無效或已過期';
    throw new Error(errorMessage);
  }
}