<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // 1. 引入 Pinia Store

// 2. 實例化 Store
const authStore = useAuthStore();

// 3. 當 App 元件第一次被掛載到畫面上時，
//    立刻執行 fetchUser action 來檢查並恢復登入狀態。
onMounted(() => {
  authStore.fetchUser();
});
</script>

<template>
  <!-- 
    4. 使用 v-if="authStore.isAuthReady" 來確保
       在身份驗證流程完成之前，整個網站先不顯示任何內容 (或顯示載入畫面)。
       這可以避免使用者看到頁面從「未登入」閃爍成「已登入」的狀態。
  -->
  <div v-if="authStore.isAuthReady">
    <RouterView />
  </div>
  <div v-else>
    <!-- 這是一個可選的、非常棒的體驗優化 -->
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background-color: #111827; color: white; font-size: 1.5rem;">
      正在驗證您的身份...
    </div>
  </div>
</template>

<style scoped>
/* 您原有的 style 保持不變 */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>