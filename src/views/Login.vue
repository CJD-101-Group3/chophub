<script setup>
// Script 部分完全不需要修改，因為它只處理邏輯，與樣式無關
import { ref } from 'vue';

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
  console.log('表單已提交:', credentials);
}
</script>

<template>
  <!-- 頁面容器: 
    手機上背景為淺灰，電腦上也是，這部分通常不需要改動 -->
  <div class="flex items-center justify-center min-h-screen bg-gray-50">

    <!-- 表單主要區塊: 這是修改的核心 -->
    <!-- 
      手機 (預設): 佔滿寬度(w-full)、上下左右留一些邊距(p-4)。
      電腦 (lg): 限制最大寬度(lg:max-w-sm)、變成白色卡片(lg:bg-white)、
               增加陰影(lg:shadow-md)、增加圓角(lg:rounded-lg)、增加更多邊距(lg:p-8)。
    -->
    <div class="w-full p-4 text-center 
                lg:max-w-sm  lg:p-8">
      
      <!-- Logo: 手機上較小，電腦上較大 -->
      <div class="mx-auto mb-4">
        <!--
          手機 (預設): 寬高設為 180px
          電腦 (lg): 寬高恢復到 250px
        -->
        <img src="/src/assets/blackLogo.png" alt="ChopHub Logo" class="w-[180px] h-[180px] mx-auto 
                                                                    lg:w-[250px] lg:h-[250px]">
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- 帳號輸入欄: 這類輸入框的樣式通常在手機和電腦上通用，不需修改 -->
        <div>
          <input 
            v-model="account" 
            type="text" 
            placeholder="帳號" 
            class="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-300 rounded-md transition-colors
                   focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
          >
        </div>
        
        <!-- 密碼輸入欄: 同上，通用樣式不需修改 -->
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
        
        <!-- 忘記密碼連結: 手機上置中，電腦上靠左 -->
        <!--
          手機 (預設): 繼承父層的 text-center
          電腦 (lg): 明確指定為 text-left
        -->
        <div class="text-center lg:text-left">
            <a href="#" class="text-sm text-gray-600 hover:text-orange-500 transition-colors">忘記密碼？</a>
        </div>

        <!-- 登入按鈕: 通用樣式不需修改 -->
        <button 
          type="submit" 
          class="w-full bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-3 px-4 rounded-md 
                 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E87A3A]"
        >
          登入
        </button>

        <!-- 立即註冊按鈕: 通用樣式不需修改 -->
        <button
          type="button"
          class="w-full bg-white border border-[#F2994A] text-[#F2994A] hover:border-[#e87a3a] hover:bg-[#E88C3A] hover:text-[#FFFFFF] font-bold py-3 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
        >
          立即註冊
        </button>
      </form>
    </div>

  </div>
</template>