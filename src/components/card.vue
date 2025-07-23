<!-- src/components/Card.vue -->
<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl border border-gray-200">
    <!-- 圖片區塊 -->
    <div class="relative">
      <img class="w-full h-48 object-cover" :src="post.imageUrl" alt="Post Image">
      <div class="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2 cursor-pointer transition-transform duration-300 group-hover:scale-110">
        <!-- 星星圖示 (SVG) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </div>
    </div>

    <div class="p-4 flex-grow flex flex-col">
      <!-- 使用者資訊 -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center">
          <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
             <!-- 使用者頭像圖示 (SVG) -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span class="text-sm font-medium text-gray-700">{{ post.user.name }}</span>
        </div>
        <button class="text-gray-400 hover:text-gray-600">
          <!-- "更多" 選項圖示 (SVG) -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </div>

      <!-- 貼文內容 -->
      <div class="flex-grow">
        <h3 class="text-xl font-bold text-gray-900 mb-1 flex items-center">
          {{ post.title }}
          <!-- 火焰圖示 (可選) -->
          <span class="text-orange-500 ml-2">🔥</span>
        </h3>
        <p class="text-gray-600 text-sm leading-relaxed">
          {{ post.description }}
        </p>
      </div>

      <!-- 互動與按鈕 -->
      <div class="mt-4 pt-4 border-t border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-6">
            <div class="flex items-center text-gray-500">
               <!-- 讚圖示 (SVG) -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.787l.09.044a2 2 0 002.243-.442l4.26-4.26a2 2 0 00.442-2.243l-.044-.09a2 2 0 00-1.787-1.106h-2.133V8.5a2 2 0 00-2-2h-1a2 2 0 00-2 2v1.833z" />
              </svg>
              <span class="text-sm">{{ post.likes }}</span>
            </div>
            <div class="flex items-center text-gray-500">
              <!-- 星星圖示 (SVG) -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span class="text-sm">{{ post.stars }}</span>
            </div>
          </div>
        </div>
        <button class="w-full bg-orange-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
          查看更多
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// 定義 props，讓父元件可以傳遞 post 物件進來
const props = defineProps({
  post: {
    type: Object,
    required: true,
  }
});
</script>