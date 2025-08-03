<script setup>
// --- Script 區塊維持不變 ---
import { defineProps, ref, computed } from 'vue';
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
  userName: { type: String, default: '使用者名稱' },
  postTitle: { type: String, default: '手裡劍' },
  isHot: { type: Boolean, default: false },
  description: { type: String, default: '四爪對稱手裡劍，結構精準銳利，中心圓孔設計，兼具工藝美感與穩定投擲性能。' },
  likes: { type: Number, default: 82 },
  stars: { type: Number, default: 24 },
});

const isLiked = ref(false);
const isStarred = ref(false);
const localLikes = ref(props.likes);
const localStars = ref(props.stars);

const smallLikeSrc = computed(() => isLiked.value ? smallLikeActiveIcon : smallLikeIcon);
const smallStarSrc = computed(() => isStarred.value ? smallStarActiveIcon : smallStarIcon);

function toggleLike() {
  isLiked.value = !isLiked.value;
  localLikes.value += isLiked.value ? 1 : -1;
}
function toggleStar() {
  isStarred.value = !isStarred.value;
  localStars.value += isStarred.value ? 1 : -1;
}

// 為了 .stop 修飾符而建立的空函式，避免點擊時出現控制台錯誤
function doNothing() {}
</script>

<template>
  <!-- 
    【修改 1】: 將根元素 div 換成 router-link
    - :to 屬性指向貼文詳情頁。
    - class 樣式完全繼承，外觀不變。
    - 現在整張卡片都是一個巨大的連結。
  -->
  <router-link 
    :to="`/post/${id}`"
    class="flex flex-col w-full md:w-[348px] bg-[#FEFEFE] rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2"
  >
    <div class="relative">
      <img :src="postImage" alt="Post Image" class="w-full h-auto object-cover" />
    </div>

    <div class="flex flex-col flex-grow p-5">
      <div class="flex items-center justify-between mb-[14px]">
        <!-- 
          【修改 2】: 在內部的 router-link 上加上 @click.stop
          - 這會讓點擊使用者名稱時，只觸發前往 ArtisanShowcase 的導航。
          - .stop 修飾符會阻止點擊事件冒泡到外層的卡片連結。
        -->
        <router-link 
          to="/ArtisanShowcase" 
          class="flex items-center gap-x-2.5 group"
          @click.stop 
        >
          <img :src="smallUserIcon" alt="User" class="w-8 h-8" />
          <span class="text-[#F2994C] text-lg font-normal leading-[25.2px] tracking-[0.8px] group-hover:underline">
            {{ userName }}
          </span>
        </router-link>
        <!-- 
          【修改 3】: 在按鈕上加上 @click.prevent.stop
          - .prevent 阻止按鈕的預設行為。
          - .stop 阻止點擊事件冒泡。
        -->
        <button 
          class="text-gray-400 focus:outline-none focus:ring-0"
          @click.prevent.stop="doNothing"
        >
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
      
      <div class="flex justify-end items-center gap-x-6 mb-3.5 text-gray-500">
        <!-- 
          【修改 4】: 在按讚/收藏的容器上加上 @click.prevent.stop
          - 這樣點擊按讚或收藏時，只會觸發 toggleLike/toggleStar 函式。
          - 不會觸發外層的頁面跳轉。
        -->
        <div class="flex items-center gap-x-2.5 cursor-pointer" @click.prevent.stop="toggleLike">
          <img :src="smallLikeSrc" alt="Likes" class="w-7 h-7" />
          <span class="w-8 text-left text-base">{{ localLikes }}</span>
        </div>
        <div class="flex items-center gap-x-2.5 cursor-pointer" @click.prevent.stop="toggleStar">
          <img :src="smallStarSrc" alt="Stars" class="w-7 h-7" />
          <span class="w-8 text-left text-base">{{ localStars }}</span>
        </div>
      </div>
      
      <!-- 
        【修改 5】: 將原本的 router-link 按鈕改為普通的 div
        - 因為整張卡片都已經是連結了，這裡不再需要一個重複的連結。
        - 改為 div 可以避免 HTML 中 <a> 標籤互相嵌套的無效結構。
        - 樣式保持不變，所以外觀看起來還是一個按鈕。
      -->
      <div 
        class="w-full bg-[#F2994A] text-[#ffffff] font-semibold rounded-lg text-base h-[59px] flex items-center justify-center focus:outline-none focus:ring-0 hover:text-white"
      >
        查看更多
      </div>
    </div>
  </router-link>
</template>