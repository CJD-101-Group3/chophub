<script setup>
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import GeneralButton from '../components/GeneralButton.vue';
import DropDownFilter from '@/components/DropDownFilter.vue';
import EventCard from '@/components/EventCard.vue';
import Pagination from '@/components/Pagination.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

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


// --- 原始活動資料 ---
const events = ref([
   {
      id: 1,
      title: '匠魂初試 - 手作小刀實體體驗',
      type: '實體活動',
      // 【修正 3】: 為每筆資料加上 'location' 屬性
      location: '台北市',
      date: '2025/8/03(日) 14:00PM',
      rating: 5,
      reviews: 121,
      isFeatured: true,
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1887'
   },
   {
      id: 2,
      title: '【虛擬兵器匠】線上設計你的奇幻刀劍',
      type: '線上活動',
      location: '線上',
      date: '2025/8/10(日) 19:00PM',
      rating: 4,
      reviews: 76,
      isFeatured: true,
      image: '/events/knife-exhibition.png'
   },
   {
      id: 3,
      title: '鍛造群俠會 - 刀匠線上交流',
      type: '線上活動',
      location: '線上',
      date: '2025/7/23(三) 10:00AM',
      rating: 4,
      reviews: 82,
      isFeatured: false,
      image: ''
   },
   {
      id: 4,
      title: '匠人現場 - 劍柄木雕實作坊',
      type: '實體活動',
      location: '台中市',
      date: '2025/8/12(二) 13:30PM',
      rating: 4,
      reviews: 64,
      isFeatured: true,
      image: '/events/dark-stithy-workshop-with-hammer-anvil-firs-plan-fire-stove-background.jpg'
   },
   {
      id: 5,
      title: '皮革護刀鞘 - 線上手作課程',
      type: '線上活動',
      location: '線上',
      date: '2025/8/20(三) 15:00PM',
      rating: 5,
      reviews: 97,
      isFeatured: false,
      image: '/events/forgingman.png'
   },
   {
      id: 6,
      title: '匠人故事夜 - 鍛劍師傅的職人生涯',
      type: '線上活動',
      location: '線上',
      date: '2025/8/04(一) 20:00PM',
      rating: 4.5,
      reviews: 43,
      isFeatured: false,
      image: '/events/viking-forges-weapons-swords-smithy-man-warrior-s-clothes-is-smithy.jpg'
   }
]);

// --- 核心篩選邏輯 ---
const filteredEvents = computed(() => {
   let result = events.value;

   if (selectedType.value !== 'all') {
      result = result.filter(event => event.type === selectedType.value);
   }

   if (selectedLocation.value !== 'all') {
      result = result.filter(event => event.location === selectedLocation.value);
   }

   if (selectedTime.value !== 'default') {
      result = result.slice().sort((a, b) => {
         const dateA = new Date(a.date.split('(')[0]);
         const dateB = new Date(b.date.split('(')[0]);
         if (selectedTime.value === 'newest') {
            return dateB - dateA;
         } else {
            return dateA - dateB;
         }
      });
   }
   return result;
});


// --- 頁數模擬資料 ---
// 在實際應用中，totalPages 應該來自後端 API
const mockTotalPages = ref(15);
const currentPage = ref(1);
</script>

<template>
   <Theheader />
   <main class="bg-[#282828] flex-1 flex flex-col items-center overflow-y-auto space-y-4 md:space-y-6">
      <div class="relative">
         <img src="/events/hero-background.jpg" alt="鑄造師" class="block z-index-[-1] opacity-[60%]">
         <p class="absolute top-[40%] left-[13%] text-[#fff] text-xl font-bold tracking-widest md:text-4xl lg:text-6xl">
            冷鋼烈火 ·
            共赴匠魂之旅</p>
         <p class="absolute top-[45%] left-[13%] text-[#fff] mt-5 md:mt-10 text-base md:text-2xl lg:text-3xl">
            體驗鍛造、深度研修，沉浸兵器之美</p>
      </div>

      <div class="flex justify-center items-center">
         <GeneralButton 
            variant="primary" 
            @click="goToMyEvents" 
            width="150px" height="50px" font-size="20px">
            我的活動
         </GeneralButton>
      </div>

      <div class="flex flex-row gap-3">
         <DropDownFilter title="活動類型" :items="typeItems" v-model="selectedType" />

         <DropDownFilter title="時間排序" :items="timeItems" v-model="selectedTime" />

         <DropDownFilter title="活動地點" :items="locationItems" v-model="selectedLocation" />
      </div>

      <div v-if="filteredEvents.length > 0" class="inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
         <EventCard v-for="event in filteredEvents" :key="event.id" :title="event.title" :event-type="event.type"
            :event-date="event.date" :rating="event.rating" :review-count="event.reviews"
            :is-featured="event.isFeatured" :event-image="event.image" @learn-more="handleLearnMore"
            class="shadow-[8px_8px_15px_rgba(255,255,255,0.4)] hover:shadow-[8px_8px_24px_rgba(255,255,255,0.4)] transition-shadow duration-300"/>
      </div>

      <div v-else class="text-white text-center py-10">
         <p>找不到符合條件的活動，請嘗試調整篩選條件。</p>
      </div>

      <div>

         <Pagination :total-pages="mockTotalPages" v-model:currentPage="currentPage" />

      </div>
   </main>

   <Thefooter />
</template>
