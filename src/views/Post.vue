<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// --- 組件引入 ---
// 確保您的組件路徑是正確的
import CreatePostModal from '@/components/CreatePostModal.vue'; 
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import PostCard from '@/components/PostCard.vue';
import Pagination from '@/components/Pagination.vue';

// --- Icon 引入 ---
// 請確認您的 icon 路徑是正確的
import searchIcon from '@/assets/icon/search.svg';

// --- 響應式狀態 ---
const isModalOpen = ref(false);
const isDropdownOpen = ref(false);
const selectedSort = ref('最熱門');
const sortOptions = ref(['最熱門', '評價最高', '最新發布', '最多留言']); 
const searchTerm = ref('');

// --- 分頁狀態 ---
// 你可以讓後端 API 回傳總頁數，然後在這裡動態設定
const currentPage = ref(1);
const totalPages = ref(20); // 目前為靜態，可後續優化

// --- 貼文資料 ---
// 初始化為一個空陣列，等待 API 回傳資料
const posts = ref([]);

// --- 函式 ---

/**
 * @description 從後端 API 獲取貼文資料並更新到畫面上
 */
const fetchPosts = async () => {
  try {
    // 【關鍵點】請確保這個 URL 是你後端 API 的正確位址
    // 根據我們的偵錯，這個 URL 應該是正確的
    const apiUrl = 'http://localhost:8888/chophub-admin/api/getPosts.php';
    const response = await axios.get(apiUrl);

    
    // 檢查後端回傳的狀態是否為 'success'
    if (response.data && response.data.status === 'success') {
      
      // 將 API 回傳的資料陣列 (response.data.data) 存入 posts ref
      // 使用 .map 處理每一筆資料，確保格式符合前端需求
      posts.value = response.data.data.map(post => ({
        ...post,
        // 後端撈出來的 COUNT 結果可能是字串，建議轉為數字以利操作
        likes: parseInt(post.likes, 10) || 0, 
        stars: parseInt(post.favorites, 10) || 0, // 對應你前端的 stars
        
        // 你可以根據業務邏輯動態決定 isFeatured 和 isHot
        isFeatured: true, // 假設所有貼文都是精選
        isHot: (parseInt(post.likes, 10) || 0) > 150, // 讚數 > 150 則標為熱門
        id: post.post_id // 確保 key 使用的是 post_id
      }));

    } else {
      // API 回傳了資料，但 status 不是 success
      console.error('API returned an error:', response.data.message || 'Unknown error');
      // 清空陣列以防顯示舊資料
      posts.value = [];
    }
  } catch (error) {
    // 發生網路錯誤或 API 根本無法連上
    console.error('Failed to fetch posts:', error);
    // 清空陣列以防顯示舊資料
    posts.value = [];
    // 在這裡可以加入一些提示，例如 alert('無法載入貼文，請稍後再試。');
  }
};

// 【關鍵點】使用 onMounted 生命週期鉤子
// 這能確保在組件掛載到畫面上之後，立刻去執行 fetchPosts() 來獲取資料
onMounted(() => {
  fetchPosts();
});

// --- 其他互動函式 (可後續實作) ---
function selectSort(option) {
  selectedSort.value = option;
  isDropdownOpen.value = false;
  // TODO: 未來可以在這裡根據排序選項，帶上參數重新呼叫 fetchPosts()
  // 例如：fetchPosts({ sortBy: option });
}

function performSearch() {
  alert(`正在搜尋：${searchTerm.value}`);
  // TODO: 未來可以在這裡根據搜尋關鍵字，帶上參數重新呼叫 fetchPosts()
  // 例如：fetchPosts({ search: searchTerm.value });
}

// console.log('Vite 提供的 BASE_URL 是:', import.meta.env.BASE_URL);
// console.log('檢查 BASE_URL 是否為空: [', import.meta.env.BASE_URL, ']');
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#282828] relative">
    <TheHeader />

    <main class="flex-grow w-full px-4 py-8 flex justify-center">
      <!-- 【關鍵點】使用 v-if 來判斷是否有貼文 -->
      <!-- 當 posts.length > 0 時，才顯示貼文列表 -->
      <div v-if="posts.length > 0" class="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <!-- 搜尋與排序欄 -->
        <div class="bg-white rounded-lg shadow-md p-4 col-span-full">
          <div class="flex items-stretch gap-2 md:gap-4">
            
            <!-- 排序下拉選單 -->
            <div class="relative flex-shrink-0">
              <button @click="isDropdownOpen = !isDropdownOpen" class="flex items-center justify-between bg-[#F2994A] text-white px-3 rounded-lg font-semibold text-sm md:text-base md:w-40 h-11">
                <span>{{ selectedSort }}</span>
                <svg class="w-4 h-4 ml-1 transition-transform" :class="{'rotate-180': isDropdownOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div v-if="isDropdownOpen" class="absolute top-full left-0 mt-2 w-40 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg shadow-lg z-10 p-2 flex flex-col gap-2">
                <a v-for="option in sortOptions" :key="option" @click.prevent="selectSort(option)" href="#" class="w-full bg-transparent text-[#F8F9FA] font-semibold border-2 border-[#F2994A] rounded-lg h-[36px] flex items-center justify-center transition-colors hover:bg-[#F2994A]/20">
                  {{ option }}
                </a>
              </div>
            </div>

            <!-- 搜尋欄位 -->
            <div class="relative flex-grow border-2 border-[#F2994A] rounded-lg h-11">
              <input v-model="searchTerm" @keyup.enter="performSearch" type="text" placeholder="搜尋貼文" class="w-full h-full bg-white pl-4 pr-10 text-gray-800 text-sm md:text-base focus:outline-none rounded-lg">
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
        <PostCard 
          v-for="post in posts" 
          :key="post.id" 
          v-bind="post" 
        />

        <!-- 分頁組件 -->
        <div class="col-span-full">
            <Pagination 
                :total-pages="totalPages" 
                v-model:currentPage="currentPage" 
            />
        </div>

      </div>
      
      <!-- 當 API 請求失敗或沒有任何貼文時，顯示提示訊息 -->
      <div v-else class="text-white text-center text-xl">
        <p>正在載入貼文...</p>
        <!-- 你也可以根據不同狀態顯示不同訊息，例如載入失敗 -->
      </div>
    </main>

    <TheFooter />

    <!-- 彈窗組件 -->
    <CreatePostModal v-if="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>