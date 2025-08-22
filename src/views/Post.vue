<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import CreatePostModal from '@/components/CreatePostModal.vue'; 
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import PostCard from '@/components/PostCard.vue';
import Pagination from '@/components/Pagination.vue';
import searchIcon from '@/assets/icon/search.svg';

// --- 響應式狀態 ---
const posts = ref([]); // API 回傳的貼文
const isLoading = ref(true); // 增加一個載入狀態
const isModalOpen = ref(false);
const isDropdownOpen = ref(false);
const searchTerm = ref(''); // 搜尋關鍵字

// 排序選項改為物件，方便將中文對應到 API 參數
const selectedSort = ref({ text: '最新發布', value: 'latest' });
const sortOptions = ref([
  { text: '最熱門', value: 'popular' },
  { text: '最多收藏', value: 'most_favorited' },
  { text: '最新發布', value: 'latest' },
  { text: '最多留言', value: 'most_commented' }
]);

// --- 分頁狀態 (暫時未使用，但保留) ---
const currentPage = ref(1);
const totalPages = ref(1);

// --- 核心 API 呼叫函式 ---
const fetchPosts = async () => {
  isLoading.value = true;
  try {
    // 將搜尋和排序參數附加到 URL 上
    const params = new URLSearchParams({
      search: searchTerm.value,
      sort: selectedSort.value.value
    }).toString();
    
    const apiUrl = `http://localhost:8888/ChopHub-API/api/getPosts.php?${params}`;
    const response = await axios.get(apiUrl);

    if (response.data && response.data.status === 'success') {
      // 資料映射邏輯
      posts.value = response.data.data.map(post => ({
        id: parseInt(post.post_id, 10),
        postImage: post.image_url,
        userName: post.username,
        postTitle: post.title,
        description: post.content,
        likes: parseInt(post.likes_count, 10) || 0,
        stars: parseInt(post.favorites_count, 10) || 0,
        isHot: (parseInt(post.likes_count, 10) || 0) > 150,
      }));
    } else {
      console.error('API 回傳錯誤:', response.data.message);
      posts.value = [];
    }
  } catch (error) {
    console.error('獲取貼文失敗:', error);
    posts.value = [];
  } finally {
    isLoading.value = false;
  }
};

// --- 事件處理函式 ---
function selectSort(option) {
  selectedSort.value = option;
  isDropdownOpen.value = false;
  fetchPosts(); 
}

function performSearch() {
  fetchPosts();
}

// 使用 watch 來實現 "輸入時延遲搜尋"
let debounceTimer;
watch(searchTerm, () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fetchPosts();
  }, 500); // 使用者停止輸入 500 毫秒後，自動觸發搜尋
});

// 元件掛載時，立即獲取一次資料
onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#282828] relative">
    <TheHeader />

    <main class="flex-grow w-full px-4 py-8 flex justify-center">
      <div class="w-full max-w-7xl">
        
        <!-- 搜尋與排序欄 -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-8">
          <div class="flex items-stretch gap-2 md:gap-4">
            
            <!-- 排序下拉選單 -->
            <div class="relative flex-shrink-0">
              <button @click="isDropdownOpen = !isDropdownOpen" class="flex items-center justify-between bg-[#F2994A] text-white px-3 rounded-lg font-semibold text-sm md:text-base md:w-40 h-11">
                <span>{{ selectedSort.text }}</span>
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div v-if="isDropdownOpen" class="absolute top-full left-0 mt-2 w-40 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg shadow-lg z-10 p-2 flex flex-col gap-2">
                <a v-for="option in sortOptions" :key="option.value" @click.prevent="selectSort(option)" href="#" class="w-full bg-transparent text-[#F8F9FA] font-semibold border-2 border-[#F2994A] rounded-lg h-[36px] flex items-center justify-center transition-colors hover:bg-[#F2994A]/20 hover:text-[#F2994A]">
                  {{ option.text }}
                </a>
              </div>
            </div>

            <!-- 搜尋欄位 -->
            <div class="relative flex-grow border-2 border-[#F2994A] rounded-lg h-11">
              <input v-model="searchTerm" @keyup.enter="performSearch" type="text" placeholder="搜尋標題、內容或作者..." class="w-full h-full bg-white pl-4 pr-10 text-gray-800 text-sm md:text-base focus:outline-none rounded-lg">
              <button @click="performSearch" class="absolute right-2 top-1/2 -translate-y-1/2 p-1"><img :src="searchIcon" alt="Search" class="w-5 h-5"></button>
            </div>

            <!-- Post 按鈕 -->
            <button @click="isModalOpen = true" class="flex-shrink-0 border-2 border-[#F2994A] text-[#F2994A] bg-transparent rounded-lg flex items-center justify-center gap-2 font-semibold hover:bg-[#F2994A] hover:text-white transition-colors h-11 px-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              <span>Post</span>
            </button>
          </div>
        </div>

        <!-- 貼文卡片列表 -->
        <div v-if="isLoading" class="text-white text-center text-xl">
          <p>正在載入貼文...</p>
        </div>
        <div v-else-if="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PostCard v-for="post in posts" :key="post.id" v-bind="post" />
        </div>
        <div v-else class="text-white text-center text-xl bg-gray-700/50 p-8 rounded-lg">
          <p>找不到符合條件的貼文。</p>
          <p class="text-base mt-2">請試試看更換搜尋關鍵字！</p>
        </div>

        <!-- 分頁組件 -->
        <Pagination v-if="!isLoading && posts.length > 0" :total-pages="totalPages" v-model:currentPage="currentPage" class="mt-8" />
      
      </div>
    </main>

    <TheFooter />

    <!-- 彈窗組件 -->
    <CreatePostModal v-if="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>