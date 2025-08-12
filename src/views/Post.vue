<script setup>
import { ref } from 'vue';

// --- 組件引入 ---
// 確保您的組件路徑正確
import CreatePostModal from '@/components/CreatePostModal.vue'; 
import TheHeader from '@/components/TheHeader.vue'; // 假設您有此組件
import TheFooter from '@/components/TheFooter.vue'; // 假設您有此組件
import PostCard from '@/components/PostCard.vue';   // 假設您有此組件
import Pagination from '@/components/Pagination.vue'; // 假設您有此組件

// --- Icon 引入 ---
// 請確認您的 icon 路徑是正確的
import searchIcon from '@/assets/icon/search.svg';

// --- 貼文圖片引入 ---
// 請確認您的圖片路徑是正確的
import post01 from '@/assets/post/post01.png';
import post02 from '@/assets/post/post02.png';
import post03 from '@/assets/post/post03.png';
import post04 from '@/assets/post/post04.png';
import post05 from '@/assets/post/post05.png';
import post06 from '@/assets/post/post06.png';
import post07 from '@/assets/post/post07.png';
import post08 from '@/assets/post/post08.png';
import post09 from '@/assets/post/post09.png';

// --- 響應式狀態 ---
const isModalOpen = ref(false);
const isDropdownOpen = ref(false);
const selectedSort = ref('最熱門');
const sortOptions = ref(['最熱門', '評價最高', '最新發布', '最多留言']); 
const searchTerm = ref('');

// --- 分頁狀態 ---
const currentPage = ref(1);
const totalPages = ref(20);

// --- 貼文假資料 ---
const posts = ref([
  { id: 1, postImage: post01, isFeatured: true, userName: '中壢彭于晏', postTitle: '刀鋒淬鍊記', isHot: true, description: '每把刀都需經高溫鍛造與淬火處理，才能擁有鋒利與堅韌的雙重特性。', likes: 188, stars: 45 },
  { id: 2, postImage: post02, isFeatured: true, userName: 'BladeMaker_99', postTitle: '武士刀開刃', isHot: false, description: '刀刃打磨的過程講究角度與手感，最終展現出光滑如鏡的刃口。', likes: 152, stars: 30 },
  { id: 3, postImage: post03, isFeatured: true, userName: '古兵小誌', postTitle: '冷兵器展覽', isHot: true, description: '展覽收錄來自各地的冷兵器，讓你一次看遍歷史的鋒芒與工藝之美。', likes: 199, stars: 48 },
  { id: 4, postImage: post04, isFeatured: true, userName: 'FireForge匠心', postTitle: '匠人訪談', isHot: false, description: '走進鐵匠的世界，聽他分享打造兵器時的堅持與心路歷程。', likes: 120, stars: 25 },
  { id: 5, postImage: post05, isFeatured: true, userName: 'ColdSteel手作', postTitle: '西洋劍製程', isHot: true, description: '每一把西洋劍從鋼材選擇到護手裝配，都需經歷數十道繁複工序。', likes: 176, stars: 41 },
  { id: 6, postImage: post06, isFeatured: true, userName: '斬鐵測試員', postTitle: '斧頭也浪漫', isHot: false, description: '這把斧頭融合雕刻與木作藝術，完全顛覆你對斧頭的想像！', likes: 98, stars: 15 },
  { id: 7, postImage: post07, isFeatured: true, userName: '鍛魂者_Yu', postTitle: '兵器保養法', isHot: true, description: '定期清潔、上油與防鏽處理，是維持刀劍狀態的基本保養流程。', likes: 165, stars: 38 },
  { id: 8, postImage: post08, isFeatured: true, userName: '戰場殘光', postTitle: '手工打造盾', isHot: false, description: '這面圓盾使用多層木板壓製成型，兼具古風美感與實戰強度。', likes: 134, stars: 29 },
  { id: 9, postImage: post09, isFeatured: true, userName: '武器控_阿鋒', postTitle: '仿古戰槍秀', isHot: true, description: '以古法工藝打造的仿宋代戰槍，每一枝都重現歷史風貌與細節。', likes: 192, stars: 47 },
]);

// --- 函式 ---
function selectSort(option) {
  selectedSort.value = option;
  isDropdownOpen.value = false;
}

function performSearch() {
  alert(`正在搜尋：${searchTerm.value}`);
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#282828] relative">
    <TheHeader />

    <main class="flex-grow w-full px-4 py-8 flex justify-center">
      <div class="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
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
        <Pagination 
          :total-pages="totalPages" 
          v-model:currentPage="currentPage" 
        />

      </div>
    </main>

    <TheFooter />

    <!-- 彈窗組件 -->
    <CreatePostModal v-if="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>