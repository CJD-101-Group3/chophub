<script setup>
import { defineProps, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// --- 匯入所有圖示 ---
import bigStarIcon from '@/assets/icon/bigstar.svg';
import bigStarActiveIcon from '@/assets/icon/bigstar_h.svg';
import filledStarIcon from '@/assets/icon/starevaluate1.svg';
import emptyStarIcon from '@/assets/icon/starevaluate2.svg';
import defaultEventImage from '@/assets/icon/activity1.png';

// --- 定義 Props ---
const props = defineProps({
  id: { type: [String, Number], required: true },
  eventImage: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  title: { type: String, default: '鍛造群俠會 - 刀匠線上交流' },
  eventType: { type: String, default: '線上活動' },
  eventDate: { type: String, default: '2025/7/23(三) 10:00AM' },
  rating: { type: Number, default: 4 },
  reviewCount: { type: Number, default: 82 },
});
console.log(`卡片標題: '${props.title}', 收到的圖片 prop:`, props.eventImage);


// --- 收藏狀態 ---
const isFavorited = ref(false);
const favoriteStarSrc = computed(() => {
  return isFavorited.value ? bigStarActiveIcon : bigStarIcon;
});
function toggleFavorite() {
  isFavorited.value = !isFavorited.value;
}

// --- 計算圖片來源 ---
const imageSource = computed(() => {
  return props.eventImage || defaultEventImage;
});

// --- 點擊跳轉詳情頁 ---
const router = useRouter();
function goToDetail() {
  router.push(`/event/${props.id}`);
}

</script>

<template>
  <!-- 【修改】移除了 md:w-[387px]，讓寬度完全由父層的 grid 控制 -->
  <div class="flex flex-col w-full max-w-[350px] bg-[#FEFEFE] rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-2 shadow-[15px_15px_13px_rgba(255,255,255,0.5)] hover:shadow-[8px_8px_24px_rgba(255,255,255,0.4)] md:transition-shadow">
    
    <div class="relative">
      <img :src="imageSource" alt="Event Image" class="w-full h-[215px] object-cover" />
      
      <img
        :src="favoriteStarSrc"
        alt="Featured Event"
        class="absolute top-5 right-5 w-10 h-10 cursor-pointer"
        @click="toggleFavorite"
      />
    </div>

    <div class="flex flex-col flex-grow p-6">
      <!-- 【修改】將字體大小改為響應式 -->
      <h2 class="text-[#F2994A] text-2xl md:text-[28px] font-bold leading-tight mb-2">
        {{ title }}
      </h2>
      <div class="text-[#4F4F4F] text-base mb-4">
        <p>{{ eventType }}</p>
        <p>{{ eventDate }}</p>
      </div>
      <div class="flex items-center gap-x-2 text-base text-[#4F4F4F] mb-6">
        <div class="flex items-center">
          <template v-for="i in 5" :key="i">
            <img 
              :src="i <= rating ? filledStarIcon : emptyStarIcon" 
              alt="star" 
              class="w-5 h-5"
            />
          </template>
        </div>
        <span>{{ reviewCount }} reviews</span>
      </div>
      
      <!-- 這個空的 div 用來推開按鈕，是正確的用法 -->
      <div class="flex-grow"></div> 

      <button
        @click="goToDetail"
        class="w-full bg-[#F2994A] text-white font-semibold rounded-lg text-lg h-[56px] flex items-center justify-center 
        focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none 
        hover:outline-none hover:ring-0 hover:border-transparent hover:shadow-none"
      >
        了解詳情
      </button>
    </div>
  </div>
</template>