// src/api/user.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888/ChopHub-API/api/';

/**
 * 获指定 ID 的完整使用者资料
 * @param {number} userId - 使用者 ID
 * @returns {Promise<object>}
 */
export async function fetchUserProfileData(userId) {
  try {
    const response = await axios.get(`${API_BASE_URL}userProfile.php?user_id=${userId}`);
    return response.data.data;
  } catch (e) {
    const errorMessage = e.response?.data?.message || e.message;
    throw new Error(errorMessage);
  }
}