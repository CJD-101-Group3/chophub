<script setup>
// --- Script 區塊維持原樣，無需更動 ---
import { defineProps, ref, computed } from 'vue';

// 匯入所有需要的圖示
import bigStarIcon from '@/assets/icon/bigstar.svg';
import bigStarActiveIcon from '@/assets/icon/bigstar_h.svg';
import fireIcon from '@/assets/icon/fire.svg';
import moreIcon from '@/assets/icon/more.svg';
import smallLikeIcon from '@/assets/icon/smalllike.svg';
import smallLikeActiveIcon from '@/assets/icon/smalllike_h.svg';
import smallUserIcon from '@/assets/icon/smalluser.svg';
import smallStarIcon from '@/assets/icon/smallstar.svg';
import smallStarActiveIcon from '@/assets/icon/smallstar_h.svg';

// 定義 props
const props = defineProps({
  postImage: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  userName: { type: String, default: '使用者名稱' },
  postTitle: { type: String, default: '手裡劍' },
  isHot: { type: Boolean, default: false },
  description: { type: String, default: '四爪對稱手裡劍，結構精準銳利，中心圓孔設計，兼具工藝美感與穩定投擲性能。' },
  likes: { type: Number, default: 82 },
  stars: { type: Number, default: 24 },
});

// 本地狀態
const isFeaturedActive = ref(props.isFeatured);
const isLiked = ref(false);
const isStarred = ref(false);
const localLikes = ref(props.likes);
const localStars = ref(props.stars);

// 計算屬性
const bigStarSrc = computed(() => isFeaturedActive.value ? bigStarActiveIcon : bigStarIcon);
const smallLikeSrc = computed(() => isLiked.value ? smallLikeActiveIcon : smallLikeIcon);
const smallStarSrc = computed(() => isStarred.value ? smallStarActiveIcon : smallStarIcon);

// 事件處理函式
function toggleFeatured() {
  isFeaturedActive.value = !isFeaturedActive.value;
}
function toggleLike() {
  isLiked.value = !isLiked.value;
  localLikes.value += isLiked.value ? 1 : -1;
}
function toggleStar() {
  isStarred.value = !isStarred.value;
  localStars.value += isStarred.value ? 1 : -1;
}
</script>

<template>
  <!-- 
    【RWD 優化】
    - 移除了固定的 h-[685px]，讓卡片高度可以自適應內容。
    - w-full md:w-[387px] 的設定保持不變，確保了寬度的響應式。
  -->
  <div class="flex flex-col w-full md:w-[387px] bg-[#FEFEFE] rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
    
    <!-- 圖片區塊 (維持不變) -->
    <div class="relative">
      <img :src="postImage" alt="Post Image" class="w-full h-[280px] object-cover" />
      <img
        v-if="isFeatured"
        :src="bigStarSrc"
        alt="Featured Post"
        class="absolute top-5 right-5 w-14 h-14 cursor-pointer"
        @click="toggleFeatured"
      />
    </div>

    <!-- 內容區塊 -->
    <div class="flex flex-col flex-grow p-6">
     
      <!-- 使用者資訊 -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-x-3">
          <img :src="smallUserIcon" alt="User" class="w-8 h-8" />
          <!-- 
            【Figma 樣式修改】使用者名稱
            - color: #F2B94C
            - font-size: 20px (text-xl)
            - line-height: 28px (leading-7)
            - letter-spacing: 0.8px
          -->
          <span class="text-[#F2B94C] text-xl font-normal leading-7 tracking-[0.8px]">{{ userName }}</span>
        </div>
        <button class="text-gray-400">
          <img :src="moreIcon" alt="More options" class="w-6 h-6" />
        </button>
      </div>

      <!-- 貼文標題 -->
      <div class="flex items-center gap-x-2 mb-3">
        <!-- 
          【Figma 樣式修改】主標題
          - color: #F2994A
          - font-size: 28px
          - font-weight: 500 (font-medium)
          - line-height: 39.2px
          - letter-spacing: 1.12px
        -->
        <h2 class="text-[#F2994A] text-[28px] font-medium leading-[39.2px] tracking-[1.12px]">{{ postTitle }}</h2>
        <img v-if="isHot" :src="fireIcon" alt="Hot Post" class="w-6 h-6" />
      </div>
     
      <!-- 貼文描述 -->
      <!-- 
        【Figma 樣式修改】內文
        - color: #4F4F4F
        - font-size: 16px (text-base)
        - line-height: 22.4px
        - letter-spacing: 0.64px
      -->
      <p class="text-[#4F4F4F] text-base font-normal leading-[22.4px] tracking-[0.64px] mb-6">
        {{ description }}
      </p>

      <!-- 撐開剩餘空間，讓後續的元素固定在底部 -->
      <div class="flex-grow"></div>

      <!-- 按讚與收藏數 (維持不變) -->
      <div class="flex justify-end items-center gap-x-6 mb-4 text-gray-500">
        <div class="flex items-center gap-x-2 cursor-pointer" @click="toggleLike">
          <img :src="smallLikeSrc" alt="Likes" class="w-6 h-6" />
          <span>{{ localLikes }}</span>
        </div>
        <div class="flex items-center gap-x-2 cursor-pointer" @click="toggleStar">
          <img :src="smallStarSrc" alt="Stars" class="w-6 h-6" />
          <span>{{ localStars }}</span>
        </div>
      </div>
     
      <!-- 查看更多按鈕 -->
      <!-- 
        【Figma 樣式修改】按鈕
        - background: #F2994A
        - height: 65.5px (接近 65.492px)
        - 移除 py-3.5，改用 flex + items-center + justify-center 來置中文字
      -->
      <button class="w-full bg-[#F2994A] text-[#ffffff] font-semibold rounded-lg text-lg h-[65.5px] flex items-center justify-center">
        查看更多
      </button>

    </div>
  </div>
</template>