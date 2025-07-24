<script setup>
import { ref } from 'vue';

// emit 保持不變
const emit = defineEmits(['submit']);

// ref 欄位保持不變
const account = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// --- 👇 移除密碼可見性相關的邏輯 ---
// const isPasswordVisible = ref(false);
// const togglePasswordVisibility = () => { ... };

function handleSubmit() {
  // 驗證邏輯保持不變
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
  console.log('註冊表單已提交:', registrationData);
  alert('註冊成功！');
}
</script>

<template>
  <!-- 頁面容器 (不變) -->
  <div class="flex items-center justify-center min-h-screen bg-white">

    <!-- 表單主要區塊 (不變) -->
    <div class="max-w-sm w-full p-6">
      
      <!-- Logo 和標題 (不變) -->
      <div class="mx-auto mb-8">
        <img src="/src/assets/blackLogo.png" alt="ChopHub Logo" class="w-[250px] h-[250px]  mx-auto">
      </div>
      
      <!-- 「已有帳號」連結 (不變) -->
      <div class="text-center mb-6">
          <span class="text-sm text-gray-600">已經有帳號嗎？</span>
          <a href="/login" class="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors">立即登入</a>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- 帳號輸入欄 (不變) -->
        <div>
          <input 
            v-model="account" 
            type="text" 
            placeholder="帳號" 
            class="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-300 rounded-md transition-colors
                   focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
          >
        </div>
        
        <!-- Email 輸入欄 (不變) -->
        <div>
          <input 
            v-model="email" 
            type="email" 
            placeholder="信箱" 
            class="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-300 rounded-md transition-colors
                   focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
          >
        </div>

        <!-- 👇 --- 密碼輸入欄修改 --- 👇 -->
        <div class="relative">
          <!-- 1. 拿掉 :type 綁定，直接使用 type="password" -->
          <input 
            v-model="password" 
            type="password"  
            placeholder="密碼" 
            class="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-300 rounded-md transition-colors
                   focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
          >
          <!-- 2. 移除整個 <button> 和裡面的 SVG 圖示 -->
        </div>
        
        <!-- 👇 --- 確認密碼輸入欄修改 --- 👇 -->
        <div class="relative">
          <!-- 1. 拿掉 :type 綁定，直接使用 type="password" -->
          <input 
            v-model="confirmPassword" 
            type="password" 
            placeholder="確認密碼" 
            class="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-300 rounded-md transition-colors
                   focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
          >
          <!-- 2. 移除整個 <button> 和裡面的 SVG 圖示 -->
        </div>
        
        <!-- 註冊按鈕 (不變) -->
        <button 
          type="submit" 
          class="w-full bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-3 px-4 rounded-md 
                 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E87A3A] !mt-6"
        >
          立即註冊
        </button>
        
      </form>
    </div>

  </div>
</template>