<script setup>
import { ref } from 'vue';

// --- 1. 引入所有需要的共用組件 ---
import TheHeader from '@/components/Theheader.vue';
import TheFooter from '@/components/Thefooter.vue';
import PostCard from '@/components/PostCard.vue';
import searchIcon from '@/assets/icon/search.svg';

// --- 2. 【修改】將下拉選單的狀態加回來 ---
const isDropdownOpen = ref(false); // <--- 加回這一行
const selectedSort = ref('最熱門');
// 【修改】將'最熱門'從這裡移除，它現在是主按鈕的標題
const sortOptions = ref(['評價最高', '最新發布', '最多留言']); 
const searchTerm = ref('');
const currentPage = ref(1);
const totalPages = ref(3);

// --- 3. 假資料 (維持不變) ---
const posts = ref(Array(9).fill({
  postImage: 'https://picsum.photos/400/280',
  isFeatured: true,
  userName: '使用者名稱',
  postTitle: '手裡劍',
  isHot: Math.random() > 0.5,
  description: '四爪對稱手裡劍，結構精準銳利，中心圓孔設計，兼具工藝美感與穩定投擲性能。',
  likes: Math.floor(Math.random() * 200),
  stars: Math.floor(Math.random() * 50),
}));

// --- 4. 【修改】處理互動的函式 ---
function selectSort(option) {
  selectedSort.value = option;
  isDropdownOpen.value = false; // <--- 加回這一行
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function performSearch() {
  alert(`正在搜尋：${searchTerm.value}`);
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#282828]">
    <TheHeader />

    <!-- 【修改】主要內容區塊的結構，確保對齊 -->
    <main class="flex-grow w-full px-4 py-8">
      <!-- 新增一個容器來統一控制內容寬度和居中 -->
      <div class="container mx-auto">
        
        <!-- 白色容器 (維持不變) -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            <!-- 【修改】將排序方式改回下拉選單模式 -->
            <div class="relative">
              <!-- 主按鈕 -->
              <button @click="isDropdownOpen = !isDropdownOpen" class="flex items-center justify-between w-40 bg-transparent text-gray-800 px-3 py-2 rounded-lg border-2 border-[#F2994A]">
                <span class="font-semibold">{{ selectedSort }}</span>
                <svg class="w-4 h-4 transition-transform" :class="{'rotate-180': isDropdownOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <!-- 下拉式選單 -->
              <div v-if="isDropdownOpen" class="absolute top-full left-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg z-10">
                <a v-for="option in sortOptions" :key="option" @click="selectSort(option)" href="#" class="block px-4 py-2 text-white hover:bg-gray-600">
                  {{ option }}
                </a>
              </div>
            </div>

            <!-- 搜尋框和貼文按鈕區域 -->
            <div class="flex items-center gap-4">
              <!-- 【修改】搜尋框加上橘色外框 -->
              <div class="relative flex-grow border-2 border-[#F2994A] rounded-lg">
                <input 
                  v-model="searchTerm"
                  type="text" 
                  placeholder="搜尋貼文" 
                  class="w-full bg-transparent py-2 pl-4 pr-10 text-gray-800 focus:outline-none"
                >
                <button @click="performSearch" class="absolute right-2 top-1/2 -translate-y-1/2 p-1">
                  <img :src="searchIcon" alt="Search" class="w-5 h-5">
                </button>
              </div>
              <!-- Post 按鈕 (維持不變) -->
              <button class="border-2 border-[#F2994A] text-[#F2994A] bg-transparent px-4 py-2 rounded-lg flex items-center gap-2 font-semibold hover:bg-[#F2994A] hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                <span>Post</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 響應式卡片網格 (維持不變) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PostCard
            v-for="(post, index) in posts"
            :key="index"
            v-bind="post"
          />
        </div>

        <!-- 【修改】頁碼顏色 -->
        <div class="flex justify-center items-center mt-12 space-x-2">
          <button 
              v-for="page in totalPages" 
              :key="page"
              @click="goToPage(page)"
              :class="[
                  'w-10 h-10 rounded-lg font-bold transition-colors',
                  currentPage === page 
                      ? 'bg-[#F2994A] text-white' 
                      : 'bg-[#282828] text-gray-400 hover:bg-gray-600' // <-- 修改顏色
              ]"
          >
              {{ page }}
          </button>
        </div>
      </div>
    </main>

    <TheFooter />
  </div>
</template>