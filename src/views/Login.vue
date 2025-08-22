<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
import Basebutton from '../components/Basebutton.vue';

// --- 表單和 UI 狀態管理 ---
const form = reactive({
  username: '', // 
  password: '',
});
const loading = ref(false);
const error = ref(null);
const isPasswordVisible = ref(false);

const router = useRouter();
const authStore = useAuthStore();

function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value;
}

// --- 處理表單提交的函式 ---
async function handleSubmit() {
  error.value = null;
  loading.value = true;
  try {
    // **修改2: 準備 credentials 時使用 username**
    const credentials = {
      username: form.username,
      password: form.password,
    };

    let login_result = await authStore.loginAction(credentials);

    //if(login_result.status){
      alert('登入成功！');
      router.push('/UserProfile');
    //}else{
      //alert("fail")
    //}

    

  } catch (e) {
    console.error(`登入流程失敗: ${e.message}`);
    error.value = '帳號或密碼錯誤，請重試。';
  } finally {
    loading.value = false;
  }
}

function goToRegister() {
  router.push('/register');
}

const baseUrl = import.meta.env.BASE_URL;
</script>

<template>
  <div class="absolute inset-0 -z-10">
    <vue-particles id="tsparticles" :options="{ /* ... */ }" />
  </div>
  <div class="flex flex-col min-h-screen bg-[#282828]">
    <Theheader />
    <div class="flex-1 flex items-center justify-center">
      <div class="w-11/12 max-w-xs p-4 text-center lg:max-w-sm lg:p-8">
        <div class="mx-auto mb-4">
          <img src="/src/assets/icon/LOGO.png" alt="ChopHub Logo" class="w-[200px] h-[200px] mx-auto lg:w-[250px] lg:h-[250px]">
        </div>
        <div class="text-left mb-6">
          <span class="text-sm text-white">還沒有帳號嗎？</span>
          <a :href="`${baseUrl}register`" class="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors">立即註冊</a>
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <!-- **修改3: v-model 綁定到 form.username，並更新 placeholder 和 type** -->
            <input
              v-model="form.username"
              type="text"
              placeholder="帳號"
              required
              autocomplete="username"
              class="w-full px-4 py-3 bg-[#F8F9FA] border-2 border-[#F2994A] rounded-md transition-colors
                     focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
            >
          </div>
          <div class="relative">
            <input
              v-model="form.password"
              :type="isPasswordVisible ? 'text' : 'password'"
              placeholder="密碼"
              required
              autocomplete="current-password"
              class="w-full px-4 py-3 bg-[#F8F9FA] border-2 border-[#F2994A] rounded-md transition-colors
                     focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
            >
            <button @click="togglePasswordVisibility" type="button" class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <!-- ... (眼睛圖示 SVG) ... -->
            </button>
          </div>
          <div class="text-center lg:text-left">
            <a href="#" class="text-sm text-white hover:text-orange-500 transition-colors">忘記密碼？</a>
          </div>
          <div v-if="error" class="p-3 text-sm text-center text-red-300 bg-red-800/60 rounded-md">
            {{ error }}
          </div>
          <Basebutton type="submit" variant="primary" class="w-full h-12" :disabled="loading">
            {{ loading ? '登入中...' : '登入' }}
          </Basebutton>
          <Basebutton type="button" variant="outline" class="w-full h-12" @click="goToRegister">立即註冊</Basebutton>
        </form>
      </div>
    </div>
    <Thefooter />
  </div>
</template>