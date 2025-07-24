<script setup>
import { ref } from 'vue';

// 如果這是一個獨立頁面，可能不需要 emit，但保留它無害
const emit = defineEmits(['submit']);

// --- 👇 新增的欄位 👇 ---
const account = ref('');
const email = ref(''); // 新增 Email 欄位
const password = ref('');
const confirmPassword = ref(''); // 新增確認密碼欄位

// --- 👇 讓密碼可見性功能動起來的額外邏輯 👇 ---
const isPasswordVisible = ref(false);
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

function handleSubmit() {
  // --- 👇 更新的驗證邏輯 👇 ---
  if (!account.value || !email.value || !password.value || !confirmPassword.value) {
    alert('所有欄位都必須填寫！');
    return;
  }
  if (password.value !== confirmPassword.value) {
    alert('兩次輸入的密碼不一致！');
    return;
  }

  const registrationData = {
    account: account.value,
    email: email.value,
    password: password.value,
  };

  emit('submit', registrationData);
  // 在這裡可以加入實際的註冊 API 請求
  console.log('註冊表單已提交:', registrationData);
  alert('註冊成功！'); // 提示用戶
}
</script>

<template>
  <!-- 頁面容器，樣式與登入頁面完全相同 -->
  <div class="flex items-center justify-center min-h-screen bg-gray-50">

    <!-- 表單主要區塊 -->
    <div class="max-w-sm w-full text-center p-6">
      
      <!-- Logo -->
      <div class="mx-auto mb-4">
        <img src="/src/assets/logo.png" alt="ChopHub Logo" class="w-[250px] h-[250px] mx-auto">
      </div>

      <!-- 👇 表單的 title 可以更新一下 👇-->
      <h2 class="text-2xl font-bold text-gray-800 mb-6">建立您的帳號</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- 帳號輸入欄 (保留) -->
        <div>
          <input 
            v-model="account" 
            type="text" 
            placeholder="設定帳號" 
            class="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-300 rounded-md transition-colors
                   focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
          >
        </div>
        
        <!-- 👇 --- 新增 Email 輸入欄 --- 👇 -->
        <div>
          <input 
            v-model="email" 
            type="email" 
            placeholder="電子郵件" 
            class="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-300 rounded-md transition-colors
                   focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
          >
        </div>

        <!-- 密碼輸入欄 (修改以支援可見性切換) -->
        <div class="relative">
          <input 
            v-model="password" 
            :type="isPasswordVisible ? 'text' : 'password'"  
            placeholder="設定密碼" 
            class="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-300 rounded-md transition-colors
                   focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
          >
          <!-- 👇 按鈕加上 @click 事件來觸發切換 👇 -->
          <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <!-- 根據 isPasswordVisible 的狀態顯示不同的 SVG 圖示 -->
            <svg v-if="!isPasswordVisible" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" />
            </svg>
          </button>
        </div>
        
        <!-- 👇 --- 新增確認密碼輸入欄 --- 👇 -->
        <div class="relative">
          <input 
            v-model="confirmPassword" 
            :type="isPasswordVisible ? 'text' : 'password'" 
            placeholder="確認密碼" 
            class="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-300 rounded-md transition-colors
                   focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
          >
        </div>

        <!-- 👇 將 "忘記密碼" 替換成 "已有帳號" 的登入連結 👇 -->
        <div class="text-center">
            <span class="text-sm text-gray-600">已經有帳號了？</span>
            <a href="/login" class="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors">立即登入</a>
        </div>

        <!-- 登入按鈕 -> 註冊按鈕 -->
        <button 
          type="submit" 
          class="w-full bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-3 px-4 rounded-md 
                 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E87A3A]"
        >
          註冊
        </button>

        <!-- 這裡不再需要 "立即註冊" 按鈕，所以將它移除 -->
        
      </form>
    </div>

  </div>
</template>