<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// 確保您有 TheHeader 和 TheFooter 元件
import TheHeader from '@/components/Theheader.vue';
import TheFooter from '@/components/Thefooter.vue';

// 實例化 router，用於手機版的返回按鈕功能
const router = useRouter();

// 模擬從 API 或 Vuex Store 獲取的貼文資料
const post = ref({
  id: 1,
  author: {
    name: '中壢彭于晏',
    avatar: 'https://i.pravatar.cc/150?u=pengyuyan'
  },
  title: '【奪命冷兵器】',
  content: '冷兵器自古以來就是戰場上的殺戮利器，無需火藥，僅憑鋼鐵與技巧，便能決定生死。刀劍的鋒芒、長槍的凌厲、戰斧的沉重，每一種武器都蘊含著獨特的戰鬥哲學與歷史痕跡。在冷冽的金屬光澤中，映照出人類智慧與殘酷戰爭的縮影，這就是冷兵器的致命魅力所在。',
  // 注意: 在實際應用中， './input_file_1.jpeg' 可能需要根據您的專案結構調整路徑，
  // 這裡假設是從 Public 或 Assets 目錄可以訪問的圖片。
  imageUrl: './input_file_1.jpeg', 
  likes: 82,
});

// 模擬留言資料
const comments = ref([
  { id: 1, author: { name: '中壢彭于晏', avatar: 'https://i.pravatar.cc/150?u=pengyuyan' }, content: '武器評價文字武器評價文字武器評價文字武器評價文字武器評價文字武器評價文字', likes: 82, time: '23週 讚 檢舉' },
  { id: 2, author: { name: '中壢彭于晏', avatar: 'https://i.pravatar.cc/150?u=pengyuyan' }, content: '武器評價文字武器評價文字武器評價文字武器評價文字武器評價文字武器評價文字', likes: 82, time: '23週 讚 檢舉' },
  { id: 3, author: { name: '中壢彭于晏', avatar: 'https://i.pravatar.cc/150?u=pengyuyan' }, content: '武器評價文字武器評價文字武器評價文字武器評價文字武器評價文字武器評價文字', likes: 82, time: '23週 讚 檢舉' },
  // 添加更多留言以測試滾動
  { id: 4, author: { name: '中壢彭于晏', avatar: 'https://i.pravatar.cc/150?u=pengyuyan' }, content: '這是很長的留言內容，測試滾動。這是很長的留言內容，測試滾動。這是很長的留言內容，測試滾動。這是很長的留言內容，測試滾動。這是很長的留言內容，測試滾動。', likes: 15, time: '1週 讚 檢舉' },
  { id: 5, author: { name: '中壢彭于晏', avatar: 'https://i.pravatar.cc/150?u=pengyuyan' }, content: '又一條測試留言。', likes: 5, time: '2天 讚 檢舉' },
  { id: 6, author: { name: '中壢彭于晏', avatar: 'https://i.pravatar.cc/150?u=pengyuyan' }, content: '留言留言留言留言', likes: 10, time: '1小時 讚 檢舉' },
  { id: 7, author: { name: '中壢彭于晏', avatar: 'https://i.pravatar.cc/150?u=pengyuyan' }, content: '再一條留言', likes: 1, time: '剛剛 讚 檢舉' },
]);

// 用於雙向綁定新的留言輸入框
const newComment = ref('');
</script>

<template>
  <!-- 
    全域性容器：使用 flex-col 和 min-h-screen 來確保 Header 和 Footer 貼齊頂部和底部，
    並讓中間的 main 區塊佔滿剩餘空間。
  -->
  <div class="min-h-screen flex flex-col bg-gray-100 dark:bg-zinc-800">

    <!-- Header (固定在頂部) -->
    <TheHeader class="fixed top-0 left-0 w-full z-50" />

    <!-- 
      主內容區域：
      1. 使用 flex-grow 佔滿中間的剩餘空間。
      2. 使用 mt-16 和 mb-16 (假設 Header/Footer 高度約為 64px = 4rem = 16 units) 避免內容被遮擋。
      3. 在桌面版 (lg) 設置最大寬度和置中。
    -->
    <main class="flex-grow mt-16 mb-16 px-4 lg:px-0">
      
      <div class="flex flex-col lg:flex-row lg:max-w-screen-xl lg:mx-auto lg:py-8 lg:gap-6 h-full">
        
        <!-- 
          左側欄 (僅網頁版顯示的大圖)
        -->
        <div class="hidden lg:block lg:w-7/12">
          <!-- 設置 sticky top-8 讓圖片在滾動時固定位置 (如果圖片容器足夠高) -->
          <div class="aspect-w-4 aspect-h-3 bg-zinc-800 rounded-lg overflow-hidden lg:h-full lg:sticky lg:top-8">
            <!-- 確保圖片路徑是正確的 -->
            <img :src="post.imageUrl" alt="Post Image" class="w-full h-full object-cover">
          </div>
        </div>

        <!-- 
          右側欄 (手機版為主要內容區)
        -->
        <div class="w-full lg:w-5/12 flex flex-col bg-white dark:bg-zinc-900 lg:rounded-lg lg:overflow-hidden lg:border lg:border-zinc-200 lg:dark:border-zinc-700">
          
          <!-- 手機版 Header (頁面專屬，非全局 Header) -->
          <header class="p-4 flex items-center gap-4 border-b border-zinc-200 dark:border-zinc-700 lg:hidden sticky top-0 bg-white dark:bg-zinc-900 z-10">
            <button @click="router.back()" class="text-zinc-600 dark:text-zinc-300 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div class="flex items-center gap-3">
              <img :src="post.author.avatar" alt="Author Avatar" class="w-8 h-8 rounded-full object-cover">
              <span class="font-bold text-zinc-800 dark:text-zinc-100">{{ post.author.name }}</span>
            </div>
          </header>
          
          <!-- 
            可滾動的內容區域：
            - `flex-grow` 讓此區域佔滿右側欄剩餘高度。
            - `overflow-y-auto` 實現內部滾動。
          -->
          <div class="flex-grow overflow-y-auto pb-24 lg:pb-0">
            <!-- 貼文主要內容容器 -->
            <div class="p-4 lg:p-6">

              <!-- 作者資訊 (僅網頁版顯示在頂部) -->
              <div class="hidden lg:flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <img :src="post.author.avatar" alt="Author Avatar" class="w-10 h-10 rounded-full object-cover">
                  <span class="font-bold text-zinc-800 dark:text-zinc-100">{{ post.author.name }}</span>
                </div>
                <button class="text-blue-500 font-semibold px-4 py-1.5 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/50">追蹤</button>
              </div>

              <!-- 貼文圖片 (僅手機版顯示) -->
              <div class="aspect-w-4 aspect-h-3 bg-zinc-800 rounded-lg overflow-hidden mb-4 lg:hidden">
                <img :src="post.imageUrl" alt="Post Image" class="w-full h-full object-cover">
              </div>

              <!-- 貼文內文 -->
              <div class="text-zinc-700 dark:text-zinc-300">
                <h2 class="font-bold text-lg text-zinc-800 dark:text-zinc-100">{{ post.title }}</h2>
                <p class="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{{ post.content }}</p>
              </div>

              <!-- 按讚/收藏/分享 -->
              <div class="flex items-center justify-between py-4 mt-4 border-t border-b border-zinc-200 dark:border-zinc-700">
                <div class="flex items-center gap-4 text-zinc-600 dark:text-zinc-300">
                  <button class="flex items-center gap-1.5 hover:text-red-500">
                    <!-- 點讚按鈕 -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 18.236V6.22a2 2 0 012-2h2.071a2 2 0 011.732 1.055l1.414 2.828zM7 9v9m-4-6h4" /></svg>
                    <span>{{ post.likes }}</span>
                  </button>
                  <button class="flex items-center gap-1.5 hover:text-blue-500">
                    <!-- 留言按鈕 -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    <span>{{ comments.length }}</span>
                  </button>
                </div>
                <div class="flex items-center gap-4 text-zinc-600 dark:text-zinc-300">
                  <!-- 收藏按鈕 -->
                  <button class="hover:text-yellow-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                  </button>
                  <!-- 分享按鈕 -->
                  <button class="hover:text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
                  </button>
                </div>
              </div>

              <!-- 留言標題 -->
              <div class="flex justify-between items-center px-4 lg:px-6 mt-4 mb-2">
                <h3 class="font-bold text-lg text-zinc-800 dark:text-zinc-100">留言</h3>
                <button class="text-blue-500 text-sm hover:underline">顯示全部</button>
              </div>
            </div>

            <!-- 留言列表 -->
            <div class="px-4 lg:px-6">
              <div v-for="comment in comments" :key="comment.id" class="flex gap-3 mb-6">
                <img :src="comment.author.avatar" alt="User Avatar" class="w-10 h-10 rounded-full object-cover">
                <div class="flex-grow">
                  <div class="flex justify-between items-center mb-1">
                    <span class="font-semibold text-zinc-800 dark:text-zinc-100">{{ comment.author.name }}</span>
                    <button class="text-blue-500 text-sm">追蹤</button>
                  </div>
                  <p class="text-sm text-zinc-700 dark:text-zinc-300">{{ comment.content }}</p>
                  <div class="flex items-center text-xs text-zinc-500 dark:text-zinc-400 mt-1 gap-2">
                    <span>{{ comment.time }}</span>
                    <span class="mx-1">·</span>
                    <button>讚</button>
                    <span class="mx-1">·</span>
                    <button>檢舉</button>
                    <div class="ml-auto flex items-center gap-1">
                      <span>{{ comment.likes }}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 18.236V6.22a2 2 0 012-2h2.071a2 2 0 011.732 1.055l1.414 2.828zM7 9v9m-4-6h4" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 
            留言輸入框 (手機版固定在底部，桌面版在右側欄底部)
            - 桌面版 (lg) 靜態定位，手機版 (fixed bottom-0)
          -->
          <div class="w-full p-4 border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 
                      fixed bottom-0 left-0 lg:static lg:p-6 lg:border-t lg:border-b-0 z-20">
            <div class="flex items-center gap-3">
              <img :src="post.author.avatar" alt="User Avatar" class="w-10 h-10 rounded-full object-cover">
              <div class="flex-grow relative">
                <input 
                  v-model="newComment" 
                  type="text" 
                  placeholder="輸入文字" 
                  class="w-full px-4 py-2 pr-12 rounded-full border border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500"
                />
                <button class="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>

    <!-- Footer (固定在底部) -->
    <TheFooter class="fixed bottom-0 left-0 w-full z-50" />
  </div>
</template>

<style scoped>
/* 可以根據需要在這裡添加特定的樣式 */
</style>