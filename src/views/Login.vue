<script setup>
// 引入其他組件
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
import Basebutton from '../components/Basebutton.vue';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
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

function goToRegister() {
  router.push('/register');
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#F8F9FA]">
    <Theheader />

    <div class="flex-1 flex items-center justify-center">
      <div class="w-11/12 max-w-xs p-4 text-center lg:max-w-sm lg:p-8">
        <div class="mx-auto mb-4">
          <img src="/src/assets/blackLogo.png" alt="ChopHub Logo" class="w-[200px] h-[200px] mx-auto lg:w-[250px] lg:h-[250px]">
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <input
              v-model="account"
              type="text"
              placeholder="帳號"
              class="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-300 rounded-md transition-colors
                     focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
            >
          </div>
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
          <div class="text-center lg:text-left">
            <a href="#" class="text-sm text-gray-600 hover:text-orange-500 transition-colors">忘記密碼？</a>
          </div>

          <!--
            修改後的按鈕區塊:
            我們移除了外層的 div 容器，讓 form 的 space-y-4 生效，
            使按鈕能夠垂直堆疊並帶有間距。
            因為 Basebutton 內部有固定寬度，按鈕會保持原寬度並在表單中置中。
           -->
          <Basebutton type="submit" variant="primary" class="w-full">登入</Basebutton>
          <Basebutton type="button" variant="outline" class="w-full" @click="goToRegister">立即註冊</Basebutton>
        </form>
      </div>
    </div>

    <Thefooter />
  </div>
</template>