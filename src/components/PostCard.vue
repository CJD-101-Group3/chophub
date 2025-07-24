<script setup>
import { defineProps } from 'vue';

// 匯入所有需要的圖示
import bigStarIcon from '@/assets/icon/bigstar.svg';
import fireIcon from '@/assets/icon/fire.svg';
import moreIcon from '@/assets/icon/more.svg';
import smallLikeIcon from '@/assets/icon/smalllike.svg';
import smallUserIcon from '@/assets/icon/smalluser.svg';
import smallStarIcon from '@/assets/icon/smallstar.svg';

// 定義組件可以接收的 props
// 這讓我們的組件變得可重用，可以顯示不同的貼文資料
defineProps({
  postImage: {
    type: String,
    required: true,
  },
  isFeatured: { // 控制是否顯示右上角的大星星
    type: Boolean,
    default: false,
  },
  userName: {
    type: String,
    default: '使用者名稱',
  },
  postTitle: {
    type: String,
    default: '手裡劍',
  },
  isHot: { // 控制是否顯示標題旁的火焰圖示
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: '四爪對稱手裡劍，結構精準銳利，中心圓孔設計，兼具工藝美感與穩定投擲性能。',
  },
  likes: {
    type: Number,
    default: 82,
  },
  stars: {
    type: Number,
    default: 24,
  },
});
</script>

<template>
  <!-- 
    卡片外層容器 
    - bg-[#FEFEFE]: 接近白色的背景
    - rounded-2xl: 圓角
    - shadow-md: 中等陰影
    - overflow-hidden: 確保圖片的圓角能被裁切
    - flex flex-col: 使用 flex 佈局，讓按鈕能固定在底部
    - w-[387px] h-[685px]: 根據 Figma 數值設定固定大小
  -->
  <div class="flex flex-col w-[387px] h-[685px] bg-[#FEFEFE] rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
    
    <!-- 圖片區塊 -->
    <div class="relative">
      <img :src="postImage" alt="Post Image" class="w-full h-[280px] object-cover" />
      <!-- 精選貼文的星星圖示 (v-if 控制顯示) -->
      <img v-if="isFeatured" :src="bigStarIcon" alt="Featured Post" class="absolute top-5 right-5 w-14 h-14" />
    </div>

    <!-- 內容區塊 -->
    <div class="flex flex-col flex-grow p-6">
      
      <!-- 使用者資訊 -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-x-3">
          <img :src="smallUserIcon" alt="User" class="w-8 h-8" />
          <span class="text-gray-600 text-base">{{ userName }}</span>
        </div>
        <button class="text-gray-400">
          <img :src="moreIcon" alt="More options" class="w-6 h-6" />
        </button>
      </div>

      <!-- 貼文標題 -->
      <div class="flex items-center gap-x-2 mb-3">
        <h2 class="text-3xl font-bold text-gray-800">{{ postTitle }}</h2>
        <!-- 熱門貼文的火焰圖示 (v-if 控制顯示) -->
        <img v-if="isHot" :src="fireIcon" alt="Hot Post" class="w-6 h-6" />
      </div>
      
      <!-- 貼文描述 -->
      <p class="text-gray-500 text-base leading-relaxed mb-6">
        {{ description }}
      </p>

      <!-- 按讚與收藏數 -->
      <div class="flex items-center gap-x-6 text-gray-500">
        <div class="flex items-center gap-x-2">
          <img :src="smallLikeIcon" alt="Likes" class="w-6 h-6" />
          <span>{{ likes }}</span>
        </div>
        <div class="flex items-center gap-x-2">
          <img :src="smallStarIcon" alt="Stars" class="w-6 h-6" />
          <span>{{ stars }}</span>
        </div>
      </div>
      
      <!-- 撐開剩餘空間，讓按鈕固定在底部 -->
      <div class="flex-grow"></div>

      <!-- 查看更多按鈕 -->
      <button class="w-full bg-[#F5A623] text-[#333333] font-semibold py-3.5 rounded-lg text-lg hover:bg-orange-500 transition-colors duration-300">
        查看更多
      </button>

    </div>
  </div>
</template>