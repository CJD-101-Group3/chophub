<script setup>
import { defineProps, ref, computed } from 'vue';

// --- 匯入所有圖示 ---
import bigStarIcon from '@/assets/icon/bigstar.svg';
import bigStarActiveIcon from '@/assets/icon/bigstar_h.svg';
import filledStarIcon from '@/assets/icon/starevaluate1.svg';
import emptyStarIcon from '@/assets/icon/starevaluate2.svg';

// --- 【1. 使用您提供的正確路徑，匯入預設圖片】 ---
import defaultEventImage from '@/assets/icon/activity1.png';


// --- 2. 修改 props 定義，讓 eventImage 變為非必要 ---
const props = defineProps({
  // 將 eventImage 改為非必須，並提供一個預設空值
  eventImage: { type: String, default: '' }, 
  isFeatured: { type: Boolean, default: false },
  title: { type: String, default: '鍛造群俠會 - 刀匠線上交流' },
  eventType: { type: String, default: '線上活動' },
  eventDate: { type: String, default: '2025/7/23(三) 10:00AM' },
  rating: { type: Number, default: 4 },
  reviewCount: { type: Number, default: 82 },
});

// --- 本地狀態 (收藏功能) ---
const isFavorited = ref(false);
const favoriteStarSrc = computed(() => {
  return isFavorited.value ? bigStarActiveIcon : bigStarIcon;
});
function toggleFavorite() {
  isFavorited.value = !isFavorited.value;
}

// --- 3. 建立計算屬性，用來判斷該顯示哪張圖 ---
const imageSource = computed(() => {
  // 如果父層有傳遞 eventImage 的值，就用它；
  // 否則，就用我們從正確路徑匯入的 defaultEventImage。
  return props.eventImage || defaultEventImage;
});

</script>

<template>
  <div class="flex flex-col w-full md:w-[387px] bg-[#FEFEFE] rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
    
    <div class="relative">
      <!-- 
        --- 4. 將圖片來源綁定到 imageSource ---
      -->
      <img :src="imageSource" alt="Event Image" class="w-full h-[215px] object-cover" />
      
      <img
        v-if="isFeatured"
        :src="favoriteStarSrc"
        alt="Featured Event"
        class="absolute top-5 right-5 w-14 h-14 cursor-pointer"
        @click="toggleFavorite"
      />
    </div>

    <!-- 內容區塊 (維持不變) -->
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
      <button class="w-full bg-[#F2994A] text-white font-semibold rounded-lg text-lg h-[56px] flex items-center justify-center 
        focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none 
        hover:outline-none hover:ring-0 hover:border-transparent hover:shadow-none"
      >
        了解詳情
      </button>
    </div>
  </div>
</template>