<script setup>
import { ref, computed } from 'vue';

// --- 1. 【新增】引入我們剛剛建立的彈窗組件 ---
import CreatePostModal from '@/components/CreatePostModal.vue';
import TheHeader from '@/components/Theheader.vue';
import TheFooter from '@/components/Thefooter.vue';
import PostCard from '@/components/PostCard.vue';
import searchIcon from '@/assets/icon/search.svg';
import pagearrowIcon1 from '@/assets/icon/pagearrowleft.svg';
import pagearrowIcon2 from '@/assets/icon/pagearrowright.svg';

// --- 2. 【新增】一個用來控制彈窗顯示/隱藏的狀態 ---
const isModalOpen = ref(false);

const isDropdownOpen = ref(false);
const selectedSort = ref('最熱門');
const sortOptions = ref(['最熱門', '評價最高', '最新發布', '最多留言']); 
const searchTerm = ref('');
const currentPage = ref(1);
const totalPages = ref(3);

const posts = ref(Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  postImage: `https://picsum.photos/400/280?random=${index + 1}`,
  isFeatured: true,
  userName: '使用者名稱',
  postTitle: '手裡劍',
  isHot: Math.random() > 0.5,
  description: '四爪對稱手裡劍，結構精準銳利，中心圓孔設計，兼具工藝美感與穩定投擲性能。',
  likes: Math.floor(Math.random() * 200),
  stars: Math.floor(Math.random() * 50),
})));


function selectSort(option) {
  selectedSort.value = option;
  isDropdownOpen.value = false;
}
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
function performSearch() {
  alert(`正在搜尋：${searchTerm.value}`);
}

// --- 【新增】2. 上一頁和下一頁的函式 ---
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}
</script>

<template>
  <!-- 
    【修改】在最外層加上一個 relative 定位
    這可以防止彈窗出現時，背景頁面發生位移
  -->
  <div class="flex flex-col min-h-screen bg-[#282828] relative">
    <TheHeader />

    <main class="flex-grow w-full px-4 py-8 flex justify-center">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  max-w-7xl">
        
        <div class="bg-white rounded-lg shadow-md p-4 col-span-full">
          <div class="flex items-center gap-2 md:gap-4">
            <div class="relative flex-shrink-0">
              <button @click="isDropdownOpen = !isDropdownOpen" class="flex items-center justify-between bg-[#F2994A] text-[#F8F9FA] px-3 py-2 rounded-lg font-semibold text-sm md:text-base md:w-40">
                <span>{{ selectedSort }}</span>
                <svg class="w-4 h-4 ml-1 transition-transform" :class="{'rotate-180': isDropdownOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div v-if="isDropdownOpen" class="absolute top-full left-0 mt-2 w-40 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg shadow-lg z-10 p-2 flex flex-col gap-2">
                <a v-for="option in sortOptions" :key="option" @click="selectSort(option)" href="#" class="w-full bg-transparent text-[#F8F9FA] font-semibold border-2 border-[#F2994A] rounded-lg h-[35.67px] flex items-center justify-center transition-colors hover:bg-[#F2994A]/20 hover:text-[#F8F9FA]">
                  {{ option }}
                </a>
              </div>
            </div>
            <div class="relative flex-grow border-2 border-[#F2994A] rounded-lg">
              <input v-model="searchTerm" type="text" placeholder="搜尋貼文" class="w-full bg-transparent py-2 pl-4 pr-10 text-gray-800 text-sm md:text-base focus:outline-none">
              <button @click="performSearch" class="absolute right-2 top-1/2 -translate-y-1/2 p-1"><img :src="searchIcon" alt="Search" class="w-5 h-5"></button>
            </div>
            <!-- 3. 【修改】為 Post 按鈕加上點擊事件，打開彈窗 -->
            <button @click="isModalOpen = true" class="flex-shrink-0 border-2 border-[#F2994A] text-[#F2994A] bg-transparent rounded-lg flex items-center justify-center gap-2 font-semibold hover:bg-[#F2994A] hover:text-white transition-colors p-2 md:px-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              <span class="hidden md:inline">Post</span>
            </button>
          </div>
        </div>

        <PostCard 
          v-for="post in posts" 
          :key="post.id" 
          v-bind="post" 
        />

        <div class="flex justify-center items-center mt-8 space-x-2 col-span-full">
          <!-- 上一頁按鈕 -->
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors bg-[#282828] text-gray-400 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <!-- 【修改】1. 使用 pagearrowIcon1 (左箭頭) -->
            <!-- 【修改】2. 移除 transform rotate-180 樣式 -->
            <img :src="pagearrowIcon1" alt="Previous" class="w-4 h-4">
          </button>

          <!-- 頁碼按鈕 -->
          <button 
            v-for="page in totalPages" 
            :key="page" 
            @click="goToPage(page)" 
            :class="['w-10 h-10 rounded-lg font-bold transition-colors', currentPage === page ? 'bg-[#F2994A] text-white' : 'bg-[#282828] text-gray-400 hover:bg-gray-600']"
          >
            {{ page }}
          </button>

          <!-- 下一頁按鈕 -->
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors bg-[#282828] text-gray-400 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <!-- 【修改】使用 pagearrowIcon2 (右箭頭) -->
            <img :src="pagearrowIcon2" alt="Next" class="w-4 h-4">
          </button>
        </div>

      </div>
    </main>

    <TheFooter />

    <!-- 4. 【新增】將彈窗組件放到頁面中 -->
    <!-- 
      - v-if="isModalOpen": 只有當 isModalOpen 為 true 時，彈窗才會被渲染出來
      - @close="isModalOpen = false": 監聽從子層 (彈窗) 發出的 'close' 事件，
        當事件發生時，將 isModalOpen 設為 false 來關閉彈窗
    -->
    <CreatePostModal v-if="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>