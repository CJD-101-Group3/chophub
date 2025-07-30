<script setup>
// --- Script 區塊完全维持不变 ---
import { ref, computed } from 'vue';
import TheHeader from '@/components/Theheader.vue';
import TheFooter from '@/components/Thefooter.vue';
import PostCard from '@/components/PostCard.vue';
import searchIcon from '@/assets/icon/search.svg';

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
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#282828]">
    <TheHeader />

    <!-- 【修改】让 main 元素用 flex 来将内部的 grid 容器居中 -->
    <main class="flex-grow w-full px-4 py-8 flex justify-center">
      
      <!-- 
        【终极方案】
        1. 移除所有外部容器 (如 mx-auto, w-fit, max-w-...)
        2. 将这个 div 直接变成我们页面的“主网格骨架”。
        3. 它负责定义所有内容的布局和对齐。
      -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        
        <!-- 
          【修改】白色搜索栏现在是 Grid 的第一个子项目。
          - col-span-full: 这个 class 会命令此元素横跨所有可用的栏位。
            (手机上跨1栏, 平板上跨2栏, 桌机上跨3栏)
        -->
        <div class="bg-white rounded-lg shadow-md p-4 col-span-full">
          <div class="flex items-center gap-2 md:gap-4">
            <div class="relative flex-shrink-0">
              <button @click="isDropdownOpen = !isDropdownOpen" class="flex items-center justify-between bg-[#F2994A] text-[#F8F9FA] px-3 py-2 rounded-lg font-semibold text-sm md:text-base md:w-40">
                <span>{{ selectedSort }}</span>
                <svg class="w-4 h-4 ml-1 transition-transform" :class="{'rotate-180': isDropdownOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div v-if="isDropdownOpen" class="absolute top-full left-0 mt-2 w-40 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg shadow-lg z-10 p-2 flex flex-col gap-2">
                <a v-for="option in sortOptions" :key="option" @click="selectSort(option)" href="#" class="w-full bg-transparent text-[#F8F9FA] font-semibold border-2 border-[#F2994A] rounded-lg h-[35.67px] flex items-center justify-center transition-colors hover:bg-[#F2994A]/20">
                  {{ option }}
                </a>
              </div>
            </div>
            <div class="relative flex-grow border-2 border-[#F2994A] rounded-lg">
              <input v-model="searchTerm" type="text" placeholder="搜尋貼文" class="w-full bg-transparent py-2 pl-4 pr-10 text-gray-800 text-sm md:text-base focus:outline-none">
              <button @click="performSearch" class="absolute right-2 top-1/2 -translate-y-1/2 p-1"><img :src="searchIcon" alt="Search" class="w-5 h-5"></button>
            </div>
            <button class="flex-shrink-0 border-2 border-[#F2994A] text-[#F2994A] bg-transparent rounded-lg flex items-center justify-center gap-2 font-semibold hover:bg-[#F2994A] hover:text-white transition-colors p-2 md:px-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              <span class="hidden md:inline">Post</span>
            </button>
          </div>
        </div>

        <!-- 卡片现在是 Grid 的子项目，会自动排列 -->
        <PostCard 
          v-for="post in posts" 
          :key="post.id" 
          v-bind="post" 
        />

        <!-- 【修改】页码也需要横跨所有栏位，以确保它在网格的正下方居中 -->
        <div class="flex justify-center items-center mt-8 space-x-2 col-span-full">
          <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="['w-10 h-10 rounded-lg font-bold transition-colors', currentPage === page ? 'bg-[#F2994A] text-white' : 'bg-[#282828] text-gray-400 hover:bg-gray-600']">
            {{ page }}
          </button>
        </div>

      </div>
    </main>

    <TheFooter />
  </div>
</template>