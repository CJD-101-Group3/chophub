<script setup>
import { defineProps, ref, computed } from 'vue';

// --- Script 區塊 ---
import bigStarIcon from '@/assets/icon/bigstar.svg';
import bigStarActiveIcon from '@/assets/icon/bigstar_h.svg';
import fireIcon from '@/assets/icon/fire.svg';
import moreIcon from '@/assets/icon/more.svg';
import smallLikeIcon from '@/assets/icon/smalllike.svg';
import smallLikeActiveIcon from '@/assets/icon/smalllike_h.svg';
import smallUserIcon from '@/assets/icon/smalluser.svg';
import smallStarIcon from '@/assets/icon/smallstar.svg';
import smallStarActiveIcon from '@/assets/icon/smallstar_h.svg';

// 【修改】移除不再需要的 authorId prop
const props = defineProps({
  id: { type: Number, required: true },
  // authorId: { type: Number, required: true }, // <--- 移除這一行
  postImage: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  userName: { type: String, default: '使用者名稱' },
  postTitle: { type: String, default: '手裡劍' },
  isHot: { type: Boolean, default: false },
  description: { type: String, default: '四爪對稱手裡劍，結構精準銳利，中心圓孔設計，兼具工藝美感與穩定投擲性能。' },
  likes: { type: Number, default: 82 },
  stars: { type: Number, default: 24 },
});

// --- 剩下的 script 內容完全維持不變 ---
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
      <img
        v-if="isFeatured"
        :src="bigStarSrc"
        alt="Featured Post"
        class="absolute top-4 right-4 w-10 h-10 cursor-pointer"
        @click="toggleBigStarFavorite"
      />
    </div>

    <div class="flex flex-col flex-grow p-5">
      <div class="flex items-center justify-between mb-[14px]">
        <router-link to="/ArtisanShowcase" class="flex items-center gap-x-2.5 group">
          <img :src="smallUserIcon" alt="User" class="w-8 h-8" />
          <span class="text-[#F2994C] text-lg font-normal leading-[25.2px] tracking-[0.8px] group-hover:underline">
            {{ userName }}
          </span>
        </router-link>
        <button class="text-gray-400 focus:outline-none focus:ring-0">
          <img :src="moreIcon" alt="More options" class="w-6 h-6" />
        </button>
      </div>
      <div class="flex items-center gap-x-2 mb-2.5">
        <h2 class="text-[#F2994A] text-[25.2px] font-medium leading-[35.28px] tracking-[1.12px]">{{ postTitle }}</h2>
        <img v-if="isHot" :src="fireIcon" alt="Hot Post" class="w-5 h-5" />
      </div>
      <p class="text-[#4F4F4F] text-sm font-normal leading-relaxed mb-5">
        {{ description }}
      </p>
      <div class="flex-grow"></div>
      <div class="flex justify-end items-center gap-x-5 mb-3.5 text-gray-500">
        <div class="flex items-center gap-x-2 cursor-pointer" @click="toggleLike">
          <img :src="smallLikeSrc" alt="Likes" class="w-6 h-6" />
          <span class="w-7 text-left text-sm">{{ localLikes }}</span>
        </div>
        <div class="flex items-center gap-x-2 cursor-pointer" @click="toggleStar">
          <img :src="smallStarSrc" alt="Stars" class="w-6 h-6" />
          <span class="w-7 text-left text-sm">{{ localStars }}</span>
        </div>
      </div>
      
      <!-- 
        【關鍵修改】在 class 最後加上 hover:text-white
      -->
      <router-link 
        :to="`/post/${id}`"
        class="w-full bg-[#F2994A] text-[#ffffff] font-semibold rounded-lg text-base h-[59px] flex items-center justify-center focus:outline-none focus:ring-0 hover:text-white"
      >
        查看更多
      </router-link>
    </div>
  </div>
</template>