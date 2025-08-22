<script setup>
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import GeneralButton from '../components/GeneralButton.vue';
import DropDownFilter from '@/components/DropDownFilter.vue';
import EventCard from '@/components/EventCard.vue';
import Pagination from '@/components/Pagination.vue';
import { getPublicImg } from '@/utils/getPublicImg';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const allEvents = ref([]);
const loading = ref(true); 
const error = ref(null); 

// --- 4. 建立獲取所有活動資料的函式 ---
async function fetchAllEvents() {
   loading.value = true;
   error.value = null; 
   try {
      const apiUrl = import.meta.env.VITE_API_BASE + '/api/getAllEvents.php';
      // const apiUrl = import.meta.env.VITE_API_BASE + '/api/getAllEvents.php';
      // console.log("正在請求 API:", apiUrl);

      const response = await axios.get(apiUrl);

      // console.log("API 成功回應:", response.data);

      allEvents.value = response.data?.data || response.data;

   } catch (err) {
      console.error("API 請求失敗:", err);
      error.value = "無法載入活動資料，請稍後再試。";
   } finally {
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
   { label: '鍛造體驗', value: '鍛造體驗' },
   { label: '兵器展覽', value: '兵器展覽' },
   { label: '線上講座', value: '線上講座' },
   { label: '手作課程', value: '手作課程' },

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


const filteredEvents = computed(() => {
   let result = allEvents.value;

   if (!result || !Array.isArray(result)) {
      return []; 
   }

   // 類型篩選
   if (selectedType.value !== 'all') {
      result = result.filter(event => event.name === selectedType.value);
   }

   // 地點篩選
   if (selectedLocation.value !== 'all') {
      result = result.filter(event => event.location === selectedLocation.value);
   }
   
   // 時間排序
   if (selectedTime.value !== 'default') {
      result = result.slice().sort((a, b) => {
         const dateA = new Date(a.start_time);
         const dateB = new Date(b.start_time);
         return selectedTime.value === 'newest' ? dateB - dateA : dateA - dateB;
      });
   }

   return result;
});


// --- 頁數資料 ---
const currentPage = ref(1);

// console.log('Vite 提供的 BASE_URL 是:', import.meta.env.BASE_URL);
// console.log('檢查 BASE_URL 是否為空: [', import.meta.env.BASE_URL, ']');

// ---分頁邏輯 ---

const itemsPerPage = 6;

const totalPages = computed(() => {
  return Math.ceil(filteredEvents.value.length / itemsPerPage);
});

// 3. 取得當前頁面要顯示的 6 筆資料
const paginatedEvents = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredEvents.value.slice(startIndex, endIndex);
});

</script>

<template>
   <Theheader />
   <main class="bg-[#282828] flex-1 flex flex-col items-center overflow-y-auto space-y-4 md:space-y-6">
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
         <!-- <DropDownFilter title="活動地點" :items="locationItems" v-model="selectedLocation" /> -->
      </div>

      <!-- 1. 載入中提示 -->
      <div v-if="loading" class="text-white text-center py-10">載入活動中...</div>

      <!-- 2. 錯誤提示 -->
      <div v-else-if="error" class="text-red-500 text-center py-10">{{ error }}</div>

      <!-- 3. 成功後，顯示卡片列表或無資料提示 -->
      <div v-else>
         <div v-if="filteredEvents.length > 0" class="inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
         <EventCard v-for="event in paginatedEvents" 
                  :key="event.event_id" 
                  :id="event.event_id" 
                  :title="event.title"
                  :event-type="event.name" 
                  :event-date="event.start_time" 
                  :rating="event.average_rating"
                  :review-count="event.rating_count" 
                  :eventImage="event.image_path" />
         </div>
         <!-- 沒有活動時的提示 -->
         <div v-else class="text-white text-center py-10">
            <p>找不到符合篩選條件的活動。</p>
         </div>
      </div>

      <div>
         <Pagination :total-pages="totalPages" v-model:currentPage="currentPage" />
      </div>
   </main>
   <Thefooter />
</template>

<script scoped>
</script>