<script setup>
import { defineProps, ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // ✅ 匯入 router

// --- 匯入所有圖示 ---
import bigStarIcon from '@/assets/icon/bigstar.svg';
import bigStarActiveIcon from '@/assets/icon/bigstar_h.svg';
import filledStarIcon from '@/assets/icon/starevaluate1.svg';
import emptyStarIcon from '@/assets/icon/starevaluate2.svg';
import defaultEventImage from '@/assets/icon/activity1.png';

// --- 定義 Props ---
const props = defineProps({
  id: { type: [String, Number], required: true }, // ✅ 加入 id
  eventImage: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  title: { type: String, default: '鍛造群俠會 - 刀匠線上交流' },
  eventType: { type: String, default: '線上活動' },
  eventDate: { type: String, default: '2025/7/23(三) 10:00AM' },
  rating: { type: Number, default: 4 },
  reviewCount: { type: Number, default: 82 },
});

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
  <div class="flex flex-col w-full md:w-[387px] bg-[#FEFEFE] rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-2 shadow-[15px_15px_13px_rgba(255,255,255,0.5)] hover:shadow-[8px_8px_24px_rgba(255,255,255,0.4)] md:transition-shadow">
    
    <div class="relative">
      <img :src="imageSource" alt="Event Image" class="w-full h-[215px] object-cover" />
      
      <img
        v-if="isFeatured"
        :src="favoriteStarSrc"
        alt="Featured Event"
        class="absolute top-5 right-5 w-14 h-14 cursor-pointer"
        @click="toggleFavorite"
      />
    </div>

    <div class="flex flex-col flex-grow p-6">
      <h2 class="text-[#F2994A] text-[28px] font-bold leading-[26.4px] mb-2">
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
      <div class="flex-grow"></div>

      <!-- ✅ 點擊導向詳情頁 -->
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
