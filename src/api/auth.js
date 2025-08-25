// src/api/auth.js
import api from './axios.js'; // 假設您已經在這個檔案中設定了 withCredentials

// 您的後端 API 基礎路徑
const API_BASE_URL = 'http://localhost:8888/ChOPHub-API/api';

/**
 * 呼叫後端登入 API
 * @param {object} credentials - 包含 username 和 password 的物件
 */
export async function login(credentials) {
  try {
    // 請求的路徑是：.../api/login.php
    const response = await api.post(`${API_BASE_URL}/login.php`, credentials);
    return response.data;
  } catch (e) {
    const errorMessage = e.response?.data?.error || e.message || '登入時發生未知錯誤';
    throw new Error(errorMessage);
  }
}

/**
 * 呼叫後端註冊 API
 * @param {object} credentials - 包含 display_name, email, password 的物件
 */
export async function signup(credentials) {
  try {
    // 請求的路徑是：.../api/signup.php
    const response = await api.post(`${API_BASE_URL}/signup.php`, credentials);
    return response.data;
  } catch (e) {
    const errorMessage = e.response?.data?.message || e.message || '註冊時發生未知錯誤';
    throw new Error(errorMessage);
  }
}

/**
 * 呼叫 me.php 來獲取當前登入的使用者資訊
 */
export async function getMe() {
  try {
    // 請求的路徑是：.../api/me.php
    const response = await api.get(`${API_BASE_URL}/me.php`);
    return response.data.user; 
  } catch (e) {
    const errorMessage = e.response?.data?.message || '憑證無效或已過期';
    throw new Error(errorMessage);
  }
}

/**
 * 呼叫後端登出 API
 */
export async function logout() {
  try {
    // **修正**: 確保路徑是 /api/logout.php，沒有 /user/
    const response = await api.post(`${API_BASE_URL}/logout.php`);
    console.log('登出成功:', response.data);
    return response.data;
  } catch (e) {
    console.error('登出 API 呼叫失敗:', e.response?.data?.error || e.message);
    // 即使 API 呼叫失敗，前端登出流程依然要繼續
  }
}