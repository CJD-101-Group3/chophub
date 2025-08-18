<script setup>
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import GeneralButton from '../components/GeneralButton.vue';
import DropDownFilter from '@/components/DropDownFilter.vue';
import EventCard from '@/components/EventCard.vue';
import Pagination from '@/components/Pagination.vue';
import { getPublicImg } from '@/utils/getPublicImg'
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const allEvents = ref([]); // 初始化一個空陣列，用來存放所有活動
const loading = ref(true); // 用於顯示「載入中」
const error = ref(null);   // 用於顯示錯誤訊息

// --- 4. 建立獲取所有活動資料的函式 ---
async function fetchAllEvents() {
   loading.value = true;  // 開始請求前，永遠先設定為載入中
   error.value = null;    // 清除之前的錯誤
   try {
      const apiUrl = 'http://localhost:8888/ChopHub-back-end/api/getAllEvents.php';
      console.log("正在請求 API:", apiUrl);

      const response = await axios.get(apiUrl);

      console.log("API 成功回應:", response.data);

      // **【核心修正】將 API 資料存入正確的 events 變數**
      // 假設您的 PHP 回傳的資料結構是 { "status": "success", "data": [...] }
      // 如果是，請使用 response.data.data。如果直接是 [...] 陣列，就用 response.data
      allEvents.value = response.data.data || response.data;

   } catch (err) {
      console.error("API 請求失敗:", err);
      error.value = "無法載入活動資料，請稍後再試。"; // 設定錯誤訊息給使用者看
   } finally {
      // **【核心修正】不論成功或失敗，最後都要結束載入狀態**
      loading.value = false;
   }
};


// --- 5. 在元件掛載後，自動執行上述函式 ---
onMounted(() => {
   fetchAllEvents();
});



const router = useRouter();

function goToMyEvents() {
   router.push('/MyEvents');
}


// --- 下拉選單的選項定義 ---

const typeItems = [
   { label: '所有類型', value: 'all' },
   { label: '實體活動', value: '實體活動' },
   { label: '線上活動', value: '線上活動' }
];

const timeItems = [
   { label: '預設排序', value: 'default' },
   { label: '由新到舊', value: 'newest' },
   { label: '由舊到新', value: 'oldest' }
];
const locationItems = [
   { label: '所有地點', value: 'all' },
   { label: '線上', value: '線上' },
   { label: '基隆市', value: '基隆市' },
   { label: '台北市', value: '台北市' },
   { label: '新北市', value: '新北市' },
   { label: '桃園市', value: '桃園市' },
   { label: '新竹市', value: '新竹市' },
   { label: '新竹縣', value: '新竹縣' },
   { label: '苗栗縣', value: '苗栗縣' },
   { label: '台中市', value: '台中市' },
   { label: '彰化縣', value: '彰化縣' },
   { label: '南投縣', value: '南投縣' },
   { label: '雲林縣', value: '雲林縣' },
   { label: '嘉義市', value: '嘉義市' },
   { label: '嘉義縣', value: '嘉義縣' },
   { label: '台南市', value: '台南市' },
   { label: '高雄市', value: '高雄市' },
   { label: '屏東縣', value: '屏東縣' },
   { label: '宜蘭縣', value: '宜蘭縣' },
   { label: '花蓮縣', value: '花蓮縣' },
   { label: '台東縣', value: '台東縣' },
   { label: '澎湖縣', value: '澎湖縣' },
   { label: '金門縣', value: '金門縣' },
   { label: '連江縣', value: '連江縣' }
];

// --- 篩選狀態定義 ---
const selectedType = ref('all');
const selectedTime = ref('default');
const selectedLocation = ref('all');


const banner = getPublicImg('events/hero-background.jpg')
const image1 = getPublicImg('events/littlenknife.jpg');
const image2 = getPublicImg('events/knife-exhibition.png');
const image3 = getPublicImg('events/onlineevents.jpg');
const image4 = getPublicImg('events/dark-stithy-workshop-with-hammer-anvil-firs-plan-fire-stove-background.jpg');
const image5 = getPublicImg('events/forgingman.png');
const image6 = getPublicImg('events/viking-forges-weapons-swords-smithy-man-warrior-s-clothes-is-smithy.jpg');


// --- 核心篩選邏輯 ---
const filteredEvents = computed(() => {
   let result = allEvents.value;

   if (!result || !Array.isArray(result)) {
      return []; // 如果資料還沒回來或是格式不對，回傳空陣列
   }

   // ... 您的篩選邏輯（這裡不需要改動）
   if (selectedType.value !== 'all') {
      // 請注意：這裡的 event.type 要和您資料庫回傳的欄位名稱一致
      result = result.filter(event => event.event_type === selectedType.value);
   }
   if (selectedLocation.value !== 'all') {
      result = result.filter(event => event.location === selectedLocation.value);
   }
   if (selectedTime.value !== 'default') {
      result = result.slice().sort((a, b) => {
         const dateA = new Date(a.event_date.split('(')[0]);
         const dateB = new Date(b.event_date.split('(')[0]);
         return selectedTime.value === 'newest' ? dateB - dateA : dateA - dateB;
      });
   }
   return result;
});


// --- 頁數模擬資料 ---
// 在實際應用中，totalPages 應該來自後端 API
const mockTotalPages = ref(15);
const currentPage = ref(1);

console.log('Vite 提供的 BASE_URL 是:', import.meta.env.BASE_URL);
console.log('檢查 BASE_URL 是否為空: [', import.meta.env.BASE_URL, ']');
</script>

<template>
   <Theheader />
   <main class="bg-[#282828] flex-1 flex flex-col items-center overflow-y-auto space-y-4 md:space-y-6">
      <!-- Banner 和按鈕部分不需要改動 -->
      <div class="relative">
         <img :src="banner" alt="鑄造師" class="block z-index-[-1] opacity-[60%]" />
         <p class="absolute top-[40%] left-[13%] text-[#fff] text-xl font-bold tracking-widest md:text-4xl lg:text-6xl">
            冷鋼烈火 · 共赴匠魂之旅
         </p>
         <p class="absolute top-[45%] left-[13%] text-[#fff] mt-5 md:mt-10 text-base md:text-2xl lg:text-3xl">
            體驗鍛造、深度研修，沉浸兵器之美
         </p>
      </div>
      <div class="flex justify-center items-center">
         <GeneralButton variant="primary" @click="goToMyEvents" width="150px" height="50px" font-size="20px">
            我的活動
         </GeneralButton>
      </div>
      <div class="flex flex-row gap-3">
         <DropDownFilter title="活動類型" :items="typeItems" v-model="selectedType" />
         <DropDownFilter title="時間排序" :items="timeItems" v-model="selectedTime" />
         <DropDownFilter title="活動地點" :items="locationItems" v-model="selectedLocation" />
      </div>

      <!-- **【核心修正】更新 v-if 邏輯，讓它能正確顯示三種狀態 ** -->

      <!-- 1. 載入中提示 -->
      <div v-if="loading" class="text-white text-center py-10">載入活動中...</div>

      <!-- 2. 錯誤提示 -->
      <div v-else-if="error" class="text-red-500 text-center py-10">{{ error }}</div>

      <!-- 3. 成功後，顯示卡片列表或無資料提示 -->
      <div v-else>
         <div v-if="filteredEvents.length > 0" class="inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
         <EventCard v-for="event in filteredEvents" 
                  :key="event.event_id" 
                  :id="event.event_id" 
                  :title="event.title"
                  :event-type="event.name" 
                  :event-date="event.start_time" 
                  :rating="event.average_rating"
                  :review-count="event.rating_count" 
                  :event-image="event.event_image_url" />
         </div>
         <!-- 沒有活動時的提示 -->
         <div v-else class="text-white text-center py-10">
            <p>找不到符合篩選條件的活動。</p>
         </div>
      </div>

      <div>
         <Pagination :total-pages="mockTotalPages" v-model:currentPage="currentPage" />
      </div>
   </main>
   <Thefooter />
</template>