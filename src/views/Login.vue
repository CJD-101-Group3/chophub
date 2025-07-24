<script setup>
import { ref } from 'vue';

// 1. 定義 emit 事件，讓這個元件可以通知父層「使用者提交了表單」
const emit = defineEmits(['submit']);

// 2. 使用 ref 來建立響應式變數，儲存帳號和密碼的輸入值
const account = ref('');
const password = ref('');

// 3. 當表單提交時要執行的函式
function handleSubmit() {
  // 防呆：如果帳號或密碼是空的，就不繼續執行
  if (!account.value || !password.value) {
    alert('請輸入帳號和密碼！');
    return;
  }
  
  // 建立要傳遞給父層的資料包
  const credentials = {
    account: account.value,
    password: password.value,
  };
  
  // 觸發 submit 事件，並將帳號密碼資料 (credentials) 傳遞出去
  emit('submit', credentials);
}
</script>

<template>
  <div class="max-w-sm w-full text-center">
    <!-- Logo -->
    <div class="mx-auto mb-4">
      <!-- 建議將 Figma 中的大 Logo 匯出成 SVG 或圖片，並用 <img> 標籤替換掉下面的 SVG -->
      <!-- <img src="/path/to/your/logo.svg" alt="ChopHub Logo" class="w-24 h-24 mx-auto"> -->
    </div>

    <h1 class="text-4xl font-bold text-gray-800 mb-8">ChopHub</h1>

    <!-- 將 form 的 submit 事件綁定到 handleSubmit 函式上 -->
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- 帳號輸入欄 -->
      <div>
        <input 
          v-model="account" 
          type="text" 
          placeholder="帳號" 
          class="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
      </div>
      
      <!-- 密碼輸入欄 -->
      <div class="relative">
        <input 
          v-model="password" 
          type="password" 
          placeholder="密碼" 
          class="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
        <!-- 密碼可視性切換按鈕 -->
        <button type="button" class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
      
      <!-- 忘記密碼連結 -->
      <div class="text-left">
          <a href="#" class="text-sm text-gray-600 hover:text-orange-500">忘記密碼？</a>
      </div>

      <!-- 登入按鈕: type="submit" 會觸發 form 的 submit 事件 -->
      <button type="submit" class="w-full bg-[#EE782C] hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">
        登入
      </button>

      <!-- 立即註冊按鈕 -->
      <button type="button" class="w-full bg-white border border-orange-400 text-orange-400 hover:bg-orange-50 font-bold py-3 px-4 rounded-md transition-colors duration-300">
        立即註冊
      </button>
    </form>
  </div>
</template>