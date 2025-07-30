<script setup>
import { defineProps, ref, computed } from 'vue';

// --- Script 區塊維持不變 ---
import bigStarIcon from '@/assets/icon/bigstar.svg';
import bigStarActiveIcon from '@/assets/icon/bigstar_h.svg';
import fireIcon from '@/assets/icon/fire.svg';
import moreIcon from '@/assets/icon/more.svg';
import smallLikeIcon from '@/assets/icon/smalllike.svg';
import smallLikeActiveIcon from '@/assets/icon/smalllike_h.svg';
import smallUserIcon from '@/assets/icon/smalluser.svg';
import smallStarIcon from '@/assets/icon/smallstar.svg';
import smallStarActiveIcon from '@/assets/icon/smallstar_h.svg';

const props = defineProps({
  id: { type: Number, required: true },
  postImage: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  userName: { type: String, default: '使用者名稱' },
  postTitle: { type: String, default: '手裡劍' },
  isHot: { type: Boolean, default: false },
  description: { type: String, default: '四爪對稱手裡劍，結構精準銳利，中心圓孔設計，兼具工藝美感與穩定投擲性能。' },
  likes: { type: Number, default: 82 },
  stars: { type: Number, default: 24 },
});

const isBigStarFavorited = ref(false);
const isLiked = ref(false);
const isStarred = ref(false);
const localLikes = ref(props.likes);
const localStars = ref(props.stars);

const bigStarSrc = computed(() => isBigStarFavorited.value ? bigStarActiveIcon : bigStarIcon);
const smallLikeSrc = computed(() => isLiked.value ? smallLikeActiveIcon : smallLikeIcon);
const smallStarSrc = computed(() => isStarred.value ? smallStarActiveIcon : smallStarIcon);

function toggleBigStarFavorite() {
  isBigStarFavorited.value = !isBigStarFavorited.value;
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
  <!-- 卡片寬度維持 90% 縮放 -->
  <div class="flex flex-col w-full md:w-[348px] bg-[#FEFEFE] rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
    
    <div class="relative">
      <img :src="postImage" alt="Post Image" class="w-full h-auto object-cover" />
      <!-- 大星星維持 70% 縮放 -->
      <img
        v-if="isFeatured"
        :src="bigStarSrc"
        alt="Featured Post"
        class="absolute top-4 right-4 w-10 h-10 cursor-pointer"
        @click="toggleBigStarFavorite"
      />
    </div>

    <!-- 內邊距維持 90% 縮放 -->
    <div class="flex flex-col flex-grow p-5">
      <div class="flex items-center justify-between mb-[14px]">
        <div class="flex items-center gap-x-2.5">
          <!-- 【ICON 修改】使用者圖示恢復 100% 尺寸 (w/h-8) -->
          <img :src="smallUserIcon" alt="User" class="w-8 h-8" />
          <!-- 字體維持 90% 縮放 -->
          <span class="text-[#F2994C] text-lg font-normal leading-[25.2px] tracking-[0.8px]">{{ userName }}</span>
        </div>
        <button class="text-gray-400 focus:outline-none focus:ring-0">
          <!-- 【ICON 修改】更多圖示恢復 100% 尺寸 (w/h-6) -->
          <img :src="moreIcon" alt="More options" class="w-6 h-6" />
        </button>
      </div>
      <div class="flex items-center gap-x-2 mb-2.5">
        <!-- 標題維持 90% 縮放 -->
        <h2 class="text-[#F2994A] text-[25.2px] font-medium leading-[35.28px] tracking-[1.12px]">{{ postTitle }}</h2>
        <!-- 火焰圖示維持 90% 縮放 (w/h-5) -->
        <img v-if="isHot" :src="fireIcon" alt="Hot Post" class="w-5 h-5" />
      </div>
      <!-- 描述文字維持 90% 縮放 -->
      <p class="text-[#4F4F4F] text-sm font-normal leading-relaxed mb-5">
        {{ description }}
      </p>
      <div class="flex-grow"></div>
      <div class="flex justify-end items-center gap-x-5 mb-3.5 text-gray-500">
        <div class="flex items-center gap-x-2 cursor-pointer" @click="toggleLike">
          <!-- 【ICON 修改】讚圖示恢復 100% 尺寸 (w/h-6) -->
          <img :src="smallLikeSrc" alt="Likes" class="w-6 h-6" />
          <!-- 計數寬度和字體維持 90% 縮放 -->
          <span class="w-7 text-left text-sm">{{ localLikes }}</span>
        </div>
        <div class="flex items-center gap-x-2 cursor-pointer" @click="toggleStar">
          <!-- 【ICON 修改】收藏圖示恢復 100% 尺寸 (w/h-6) -->
          <img :src="smallStarSrc" alt="Stars" class="w-6 h-6" />
          <!-- 計數寬度和字體維持 90% 縮放 -->
          <span class="w-7 text-left text-sm">{{ localStars }}</span>
        </div>
      </div>
      <!-- 按鈕維持 90% 縮放 -->
      <router-link 
        :to="`/post/${id}`"
        class="w-full bg-[#F2994A] text-[#ffffff] font-semibold rounded-lg text-base h-[59px] flex items-center justify-center focus:outline-none focus:ring-0"
      >
        查看更多
      </router-link>
    </div>
  </div>
</template>