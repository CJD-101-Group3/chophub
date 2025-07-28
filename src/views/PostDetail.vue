<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import TheHeader from '@/components/Theheader.vue';
import TheFooter from '@/components/Thefooter.vue';

// useRoute() 可以讓我們存取目前路由的資訊，包括網址上的參數
const route = useRoute();

// 從路由參數中取得貼文的 ID
const postId = ref(route.params.id);

// 在真實的應用中，您會在這裡用 postId 去呼叫後端 API 來取得貼文的完整資料
// onMounted(async () => {
//   const postData = await fetchPostById(postId.value);
//   // ... 更新頁面資料
// });
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#282828]">
    <TheHeader />
    <main class="flex-grow container mx-auto max-w-4xl py-10 px-4 text-white">
      <h1 class="text-4xl font-bold text-[#F2994A] mb-4">貼文詳情</h1>
      <p class="text-xl text-gray-300">
        您正在查看 ID 為 <span class="font-bold text-yellow-300">{{ postId }}</span> 的貼文。
      </p>

      <div class="mt-8 p-6 bg-gray-700 rounded-lg">
        <h2 class="text-2xl mb-2">手裡劍</h2>
        <p>這裡是貼文的詳細內容...四爪對稱手裡劍，結構精準銳利，中心圓孔設計，兼具工藝美感與穩定投擲性能。</p>
      </div>

      <!-- 這個 router-link 提供了返回列表頁的功能 -->
      <router-link to="/" class="mt-8 inline-block bg-[#F2994A] text-white font-semibold rounded-lg px-6 py-3 hover:bg-opacity-80 transition-colors">
        返回貼文列表
      </router-link>
    </main>
    <TheFooter />
  </div>
</template>