<script setup>
import { ref } from 'vue';
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';

// emit 保持不變
const emit = defineEmits(['submit']);

// ref 欄位保持不變
const account = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// 處理表單提交的函數
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
  <!-- 主容器：背景色維持白色 -->
  <div class="flex flex-col min-h-screen bg-white">
    <Theheader />

    <!-- 內容區塊 flex-1，讓內容自動填滿剩餘空間 -->
    <div class="flex-1 flex items-center justify-center">
      <!-- 
        表單容器：
        手機 (預設): 寬度 11/12, 最大寬度 xs, 內距 p-4, 文字置中
        電腦 (lg): 最大寬度 sm, 內距 p-8
      -->
      <div class="w-11/12 max-w-xs p-4 text-center lg:max-w-sm lg:p-8">
        
        <!-- Logo 和標題 -->
        <div class="mx-auto mb-6">
          <!--
            Logo 圖片：
            手機 (預設): 寬高設為 200px
            電腦 (lg): 寬高恢復到 250px
          -->
          <img src="/src/assets/blackLogo.png" alt="ChopHub Logo" class="w-[200px] h-[200px] mx-auto
                                                                      lg:w-[250px] lg:h-[250px]">
        </div>
        
        <!-- 「已有帳號」連結：在手機和電腦上都保持置中 -->
        <div class="text-center mb-6">
          <span class="text-sm text-gray-600">已經有帳號嗎？</span>
          <a href="/login" class="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors">立即登入</a>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- 帳號輸入欄：通用樣式，不需修改 -->
          <div>
            <input 
              v-model="account" 
              type="text" 
              placeholder="帳號" 
              class="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-300 rounded-md transition-colors
                     focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
            >
          </div>
          
          <!-- Email 輸入欄：通用樣式，不需修改 -->
          <div>
            <input 
              v-model="email" 
              type="email" 
              placeholder="信箱" 
              class="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-300 rounded-md transition-colors
                     focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
            >
          </div>

          <!-- 密碼輸入欄：通用樣式，不需修改 -->
          <div class="relative">
            <input 
              v-model="password" 
              type="password"  
              placeholder="密碼" 
              class="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-300 rounded-md transition-colors
                     focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
            >
          </div>
          
          <!-- 確認密碼輸入欄：通用樣式，不需修改 -->
          <div class="relative">
            <input 
              v-model="confirmPassword" 
              type="password" 
              placeholder="確認密碼" 
              class="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-300 rounded-md transition-colors
                     focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
            >
          </div>
          
          <!-- 註冊按鈕：通用樣式，不需修改 -->
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

    <Thefooter />
  </div>
</template>