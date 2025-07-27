<script setup>
import { ref } from 'vue';

// --- 1. 引入所有需要的共用組件 ---
import TheHeader from '@/components/Theheader.vue'; // 假設路徑
import TheFooter from '@/components/Thefooter.vue'; // 假設路徑
import PostCard from '@/components/PostCard.vue';   // 假設路徑
import searchIcon from '@/assets/icon/search.svg'; // 引入搜尋圖示

// --- 2. 建立頁面的響應式狀態 ---

// 控制排序下拉選單是否開啟
const isDropdownOpen = ref(false);
// 當前選擇的排序方式
const selectedSort = ref('最熱門');
// 所有可選的排序方式
const sortOptions = ref(['評價最高', '最新發布', '最多留言']);
// 搜尋框的內容
const searchTerm = ref('');

// 頁碼狀態
const currentPage = ref(1);
const totalPages = ref(3); // 假設總共有 3 頁

// --- 3. 準備用來顯示的假資料 ---
// 在真實專案中，這些資料會從後端 API 獲取
const posts = ref(Array(9).fill({
  postImage: 'https://picsum.photos/400/280', // 使用線上隨機圖
  isFeatured: true,
  userName: '使用者名稱',
  postTitle: '手裡劍',
  isHot: Math.random() > 0.5, // 隨機決定是否熱門
  description: '四爪對稱手裡劍，結構精準銳利，中心圓孔設計，兼具工藝美感與穩定投擲性能。',
  likes: Math.floor(Math.random() * 200),
  stars: Math.floor(Math.random() * 50),
}));

// --- 4. 處理互動的函式 ---
function selectSort(option) {
  selectedSort.value = option;
  isDropdownOpen.value = false;
  // 在這裡可以加入重新獲取資料的邏輯
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    // 在這裡可以加入獲取特定頁面資料的邏輯
  }
}
</script>

<template>
  <!-- 頁面最外層容器，使用 flex 佈局確保 footer 能置底 -->
  <div class="flex flex-col min-h-screen bg-gray-900">
    <TheHeader />

    <!-- 主要內容區塊 -->
    <main class="flex-grow container mx-auto px-4 py-8">
      
      <!-- 篩選與搜尋列 -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        
        <!-- 排序下拉選單 (響應式) -->
        <div class="relative">
          <!-- 桌機版按鈕 -->
          <button @click="isDropdownOpen = !isDropdownOpen" class="hidden md:flex items-center justify-between w-40 bg-[#F2994A] text-white px-4 py-2 rounded-lg">
            <span>{{ selectedSort }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <!-- 手機版按鈕群組 -->
          <div class="flex md:hidden gap-2">
             <button v-for="option in ['最熱門', '評價最高', '最新發布', '最多留言']" :key="option" class="flex-1 bg-[#F2994A] text-white px-3 py-2 rounded-lg text-sm">
                {{ option }}
            </button>
          </div>
          <!-- 下拉式選單內容 (只在桌機版顯示) -->
          <div v-if="isDropdownOpen" class="hidden md:block absolute top-full left-0 mt-2 w-40 bg-gray-700 rounded-lg shadow-lg z-10">
            <a v-for="option in sortOptions" :key="option" @click="selectSort(option)" href="#" class="block px-4 py-2 text-white hover:bg-gray-600">
              {{ option }}
            </a>
          </div>
        </div>

        <!-- 搜尋框和貼文按鈕 -->
        <div class="flex items-center gap-4">
          <!-- 搜尋框 -->
          <div class="relative flex-grow">
            <input 
              v-model="searchTerm"
              type="text" 
              placeholder="搜尋貼文" 
              class="w-full bg-transparent border-2 border-[#F2994A] rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
            >
            <img :src="searchIcon" alt="Search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
          </div>
          <!-- 新增貼文按鈕 -->
          <button class="bg-[#F2994A] text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            <span>Post</span>
          </button>
        </div>
      </div>

      <!-- 響應式卡片網格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PostCard
          v-for="(post, index) in posts"
          :key="index"
          v-bind="post"
        />
      </div>

      <!-- 頁碼 -->
      <div class="flex justify-center items-center mt-12 space-x-2">
        <button 
            v-for="page in totalPages" 
            :key="page"
            @click="goToPage(page)"
            :class="[
                'w-10 h-10 rounded-lg font-bold transition-colors',
                currentPage === page 
                    ? 'bg-[#F2994A] text-white' 
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            ]"
        >
            {{ page }}
        </button>
      </div>
    </main>

    <TheFooter />
  </div>
</template>