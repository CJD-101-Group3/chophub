// src/stores/user.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 使用 'user' 作為第一個參數，這是 store 的唯一 ID
export const useUserStore = defineStore('user', () => {
  
  // --- State ---
  // 使用 ref 來定義狀態屬性，就像在元件中一樣
  // 我們用 null 來表示初始時沒有使用者資訊（未登入）
  const userInfo = ref(null); 
  // 你也可以儲存更複雜的物件，例如：
  // const userInfo = ref({ name: '露比匠', avatarUrl: '/path/to/avatar.png' });

  // --- Getters ---
  // 使用 computed 來定義 getter，這能讓我們方便地判斷登入狀態
  const isLoggedIn = computed(() => userInfo.value !== null);

  // --- Actions ---
  // 定義可以修改 state 的函式
  
  // 登入 action
  function login(userData) {
    // 模擬登入，將傳入的使用者資料存入 state
    // 在真實專案中，這裡你可能會先呼叫 API，成功後再儲存資料
    userInfo.value = userData; 
    console.log('User logged in:', userInfo.value);
  }

  // 登出 action
  function logout() {
    userInfo.value = null; // 清空使用者資料
    console.log('User logged out');
  }

  // 最後，將所有需要對外暴露的 state、getters 和 actions 都 return 出去
  return {
    userInfo,
    isLoggedIn,
    login,
    logout
  }
})
