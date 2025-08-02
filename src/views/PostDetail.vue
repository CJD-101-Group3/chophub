<script setup>
import { ref } from 'vue';

// --- 1. 引入共用組件 (假設您有) ---
import TheHeader from '@/components/Theheader.vue';
import TheFooter from '@/components/Thefooter.vue';

// --- 2. 引入此頁面需要的所有 icon ---
// 為了方便展示，我會直接使用 SVG 字串，您可以替換成您自己的 icon 組件或圖片
const icons = {
  verified: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`,
  like: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"></path></svg>`,
  comment: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z"></path></svg>`,
  save: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>`,
  share: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path></svg>`,
  send: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>`,
};

// --- 3. 建立頁面的假資料 ---
const postData = ref({
  imageUrl: 'https://placehold.co/800x900/2d3748/ffffff?text=Post\\nImage',
  author: {
    name: 'Hattori Hanzo',
    avatarUrl: 'https://placehold.co/40x40',
    isVerified: true,
  },
  title: '【致命冷兵器】',
  text: '冷兵器自古以來就是戰場上的殺戮利器，無需火藥，僅憑鋼鐵與技巧，便能決定生死。\n刀劍的鋒芒、長槍的凌厲、戰斧的沉重，每種武器都蘊含著獨特的戰鬥哲學與歷史痕跡。',
  likes: 82,
  saves: 24,
  comments: [
    { id: 1, author: { name: '中壢彭于晏', avatarUrl: 'https://placehold.co/36x36' }, text: '武器評價文字武器評價文字武器評價文字武器評價文字武器評價文字武器評價文字', time: '23週', likes: 82 },
    { id: 2, author: { name: 'Miyamoto', avatarUrl: 'https://placehold.co/36x36' }, text: 'A true masterpiece of craftsmanship.', time: '1d', likes: 15 },
  ],
});

const newComment = ref('');
</script>

<template>
  <TheHeader />
  
  <!-- 
    頁面容器：
    - 手機上: 預設樣式
    - 桌機上: md:p-10 (padding), md:bg-gray-100 (背景色)
  -->
  <div class="md:bg-gray-100 md:p-10">
    <!-- 
      卡片容器：
      - 手機上: 預設樣式 (滿版)
      - 桌機上: md:flex (水平排列), md:max-w-6xl (最大寬度), md:mx-auto (居中), md:rounded-lg, md:shadow-lg
    -->
    <main class="md:flex md:max-w-6xl md:mx-auto md:rounded-lg md:shadow-lg overflow-hidden bg-white">
      
      <!-- 
        圖片區塊：
        - 手機上: order-2 (排在內容下方), mt-4 (與上方間距)
        - 桌機上: md:order-1 (恢復順序), md:w-5/12 (寬度佔 5/12), md:mt-0
      -->
      <div class="md:w-5/12 order-2 md:order-1 mt-4 md:mt-0">
        <img :src="postData.imageUrl" alt="Post Image" class="w-full h-full object-cover">
      </div>

      <!-- 
        內容區塊：
        - 手機上: p-4 (內邊距), order-1 (排在圖片上方)
        - 桌機上: md:w-7/12 (寬度佔 7/12), md:p-8, md:order-2
      -->
      <div class="md:w-7/12 p-4 md:p-8 order-1 md:order-2 flex flex-col gap-4">
        
        <!-- 使用者資訊 -->
        <div class="flex items-center gap-3">
          <img :src="postData.author.avatarUrl" alt="Author Avatar" class="w-10 h-10 rounded-full object-cover">
          <span class="font-semibold text-base text-gray-800">{{ postData.author.name }}</span>
          <span v-if="postData.author.isVerified" v-html="icons.verified" class="w-5 h-5 text-blue-500"></span>
        </div>

        <!-- 貼文內容 -->
        <div>
          <h2 class="text-xl font-bold text-gray-800 mb-3">{{ postData.title }}</h2>
          <p class="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{{ postData.text }}</p>
        </div>

        <!-- 統計數據 -->
        <div class="flex items-center gap-6 text-sm text-gray-600">
          <div class="flex items-center gap-2">
            <span v-html="icons.like" class="w-5 h-5 text-gray-500"></span>
            <span>{{ postData.likes }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span v-html="icons.save" class="w-5 h-5 text-gray-500"></span>
            <span>{{ postData.saves }}</span>
          </div>
        </div>

        <!-- 互動按鈕 -->
        <div class="flex items-center justify-around border-y border-gray-200 py-2">
          <button class="flex items-center gap-2 text-gray-600 font-medium p-2 rounded-md hover:bg-gray-100 transition">
            <span v-html="icons.like" class="w-6 h-6"></span> 讚
          </button>
          <button class="flex items-center gap-2 text-gray-600 font-medium p-2 rounded-md hover:bg-gray-100 transition">
            <span v-html="icons.comment" class="w-6 h-6"></span> 留言
          </button>
          <button class="flex items-center gap-2 text-gray-600 font-medium p-2 rounded-md hover:bg-gray-100 transition">
            <span v-html="icons.save" class="w-6 h-6"></span> 收藏
          </button>
          <button class="flex items-center gap-2 text-gray-600 font-medium p-2 rounded-md hover:bg-gray-100 transition">
            <span v-html="icons.share" class="w-6 h-6"></span> 分享
          </button>
        </div>

        <!-- 留言區 -->
        <div class="flex-grow space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="font-semibold text-sm text-gray-800">留言</h3>
            <button class="text-blue-500 font-semibold text-sm">顯示全部</button>
          </div>
          <!-- 留言列表 -->
          <div class="space-y-5">
            <div v-for="comment in postData.comments" :key="comment.id" class="flex items-start gap-3">
              <img :src="comment.author.avatarUrl" alt="Commenter Avatar" class="w-9 h-9 rounded-full object-cover">
              <div class="flex-grow text-sm">
                <p>
                  <span class="font-semibold text-gray-800 mr-1.5">{{ comment.author.name }}</span>
                  <span class="text-gray-700">{{ comment.text }}</span>
                </p>
                <div class="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span>{{ comment.time }}</span>
                  <button class="font-semibold">檢舉</button>
                </div>
              </div>
              <div class="flex items-center gap-1 text-gray-600">
                <span v-html="icons.like" class="w-4 h-4 cursor-pointer"></span>
                <span class="text-xs">{{ comment.likes }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 留言輸入框 -->
        <div class="flex items-center gap-3 pt-4 border-t border-gray-200">
          <img :src="postData.author.avatarUrl" alt="Your Avatar" class="w-9 h-9 rounded-full object-cover hidden md:block">
          <div class="relative flex-grow">
            <input 
              v-model="newComment"
              type="text" 
              placeholder="輸入文字..." 
              class="w-full bg-gray-100 rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
            <button class="absolute right-2 top-1/2 -translate-y-1/2 p-1">
              <span v-html="icons.send" class="w-6 h-6 text-blue-500"></span>
            </button>
          </div>
        </div>

      </div>
    </main>
  </div>
  <TheFooter />
</template>