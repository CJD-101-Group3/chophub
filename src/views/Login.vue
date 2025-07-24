<script setup>
import { ref } from 'vue';

// 如果這是一個獨立頁面，可能不需要 emit，但保留它無害
const emit = defineEmits(['submit']);

const account = ref('');
const password = ref('');

function handleSubmit() {
  if (!account.value || !password.value) {
    alert('請輸入帳號和密碼！');
    return;
  }
  const credentials = {
    account: account.value,
    password: password.value,
  };
  emit('submit', credentials);
  // 在這裡可以加入實際的登入 API 請求
  console.log('表單已提交:', credentials);
}
</script>

<template>
  <!-- 👇👇👇 主要修改在這裡：這是整個頁面的容器 👇👇👇 -->
  <div class="flex items-center justify-center min-h-screen bg-gray-50">

    <!-- 這是表單本身的主要區塊 -->
    <div class="max-w-sm w-full text-center p-6">
      
      <!-- Logo -->
      <div class="mx-auto mb-4 h-24">
        <!-- 這裡放上您的 Logo 圖片或 SVG -->
        <!-- <img src="/logo.svg" alt="ChopHub Logo" class="w-24 h-24 mx-auto"> -->
      </div>

      <h1 class="text-4xl font-bold text-gray-800 mb-8">ChopHub</h1>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- 帳號輸入欄 -->
        <div>
          <input 
            v-model="account" 
            type="text" 
            placeholder="帳號" 
            class="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-300 rounded-md transition-colors
                   focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
          >
        </div>
        
        <!-- 密碼輸入欄 -->
        <div class="relative">
          <input 
            v-model="password" 
            type="password" 
            placeholder="密碼" 
            class="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-300 rounded-md transition-colors
                   focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
          >
          <button type="button" class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        
        <!-- 忘記密碼連結 -->
        <div class="text-left">
            <a href="#" class="text-sm text-gray-600 hover:text-orange-500 transition-colors">忘記密碼？</a>
        </div>

        <!-- 登入按鈕 -->
        <button 
          type="submit" 
          class="w-full bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-3 px-4 rounded-md 
                 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E87A3A]"
        >
          登入
        </button>

        <!-- 立即註冊按鈕 -->
        <button
          type="button"
          class="w-full bg-white border border-[#F2994A] text-[#F2994A] hover: hover:border-[#e87a3a] hover:text-[#e87a3a] font-bold py-3 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
        >
          立即註冊
        </button>
      </form>
    </div>

  </div>
</template>