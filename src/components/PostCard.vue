<script setup>
import { defineProps, ref, computed } from 'vue';

// --- 1. 匯入所有需要的圖示 (包含啟用狀態的 _h 版本) ---
import bigStarIcon from '@/assets/icon/bigstar.svg';
import bigStarActiveIcon from '@/assets/icon/bigstar_h.svg'; // 啟用後的大星星
import fireIcon from '@/assets/icon/fire.svg';
import moreIcon from '@/assets/icon/more.svg';
import smallLikeIcon from '@/assets/icon/smalllike.svg';
import smallLikeActiveIcon from '@/assets/icon/smalllike_h.svg'; // 啟用後的讚
import smallUserIcon from '@/assets/icon/smalluser.svg';
import smallStarIcon from '@/assets/icon/smallstar.svg';
import smallStarActiveIcon from '@/assets/icon/smallstar_h.svg'; // 啟用後的小星星

// --- 2. 定義組件的 props ---
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

// --- 3. 建立本地響應式狀態，用於處理點擊事件 ---
// 用於追蹤大星星是否被點擊 (這裡的 isFeatured prop 僅控制初始顯示)
const isFeaturedActive = ref(props.isFeatured); 
// 追蹤是否按讚
const isLiked = ref(false); 
// 追蹤是否收藏
const isStarred = ref(false); 

// 建立本地的計數器，避免直接修改 props
const localLikes = ref(props.likes);
const localStars = ref(props.stars);

// --- 4. 動態計算要顯示的圖示 ---
// 這樣可以讓 template 更簡潔
const bigStarSrc = computed(() => isFeaturedActive.value ? bigStarActiveIcon : bigStarIcon);
const smallLikeSrc = computed(() => isLiked.value ? smallLikeActiveIcon : smallLikeIcon);
const smallStarSrc = computed(() => isStarred.value ? smallStarActiveIcon : smallStarIcon);

// --- 5. 點擊事件處理函式 ---
function toggleFeatured() {
  isFeaturedActive.value = !isFeaturedActive.value;
  // 如果需要，也可以在這裡處理收藏數量的增減
}

function toggleLike() {
  isLiked.value = !isLiked.value;
  // 根據 isLiked 的狀態來增加或減少讚數
  localLikes.value += isLiked.value ? 1 : -1;
}

function toggleStar() {
  isStarred.value = !isStarred.value;
  // 根據 isStarred 的狀態來增加或減少收藏數
  localStars.value += isStarred.value ? 1 : -1;
}
</script>

<template>
  <div class="flex flex-col w-[387px] h-[685px] bg-[#FEFEFE] rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
    
    <!-- 圖片區塊 -->
    <div class="relative">
      <img :src="postImage" alt="Post Image" class="w-full h-[280px] object-cover" />
      <!-- 
        精選貼文的星星圖示
        - v-if="isFeatured": 只有當 props.isFeatured 為 true 時才顯示
        - @click="toggleFeatured": 添加點擊事件
        - :src="bigStarSrc": 動態綁定圖示來源
        - cursor-pointer: 讓滑鼠移上去時顯示點擊手勢
       -->
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
          <span class="text-gray-600 text-base">{{ userName }}</span>
        </div>
        <button class="text-gray-400">
          <img :src="moreIcon" alt="More options" class="w-6 h-6" />
        </button>
      </div>

      <!-- 貼文標題 -->
      <div class="flex items-center gap-x-2 mb-3">
        <h2 class="text-3xl font-bold text-gray-800">{{ postTitle }}</h2>
        <img v-if="isHot" :src="fireIcon" alt="Hot Post" class="w-6 h-6" />
      </div>
      
      <!-- 貼文描述 -->
      <p class="text-gray-500 text-base leading-relaxed mb-6">
        {{ description }}
      </p>

      <!-- 撐開剩餘空間，讓後續的元素固定在底部 -->
      <div class="flex-grow"></div>

      <!-- 
        【排版修改】按讚與收藏數
        - 將此區塊移動到 flex-grow 之後
        - flex justify-end: 讓內容靠右對齊
        - mb-4: 與下方的按鈕增加間距
      -->
      <div class="flex justify-end items-center gap-x-6 mb-4 text-gray-500">
        <!-- 
          按讚區塊
          - @click="toggleLike": 觸發點擊事件
          - cursor-pointer: 提供可點擊的視覺提示
         -->
        <div class="flex items-center gap-x-2 cursor-pointer" @click="toggleLike">
          <img :src="smallLikeSrc" alt="Likes" class="w-6 h-6" />
          <span>{{ localLikes }}</span>
        </div>
        <!-- 
          收藏區塊
          - @click="toggleStar": 觸發點擊事件
          - cursor-pointer: 提供可點擊的視覺提示
         -->
        <div class="flex items-center gap-x-2 cursor-pointer" @click="toggleStar">
          <img :src="smallStarSrc" alt="Stars" class="w-6 h-6" />
          <span>{{ localStars }}</span>
        </div>
      </div>
      
      <!-- 查看更多按鈕 -->
      <button class="w-full bg-[#F5A623] text-[#333333] font-semibold py-3.5 rounded-lg text-lg hover:bg-orange-500 transition-colors duration-300">
        查看更多
      </button>

    </div>
  </div>
</template>