<script setup>
import { defineProps, ref, computed } from 'vue';
import axios from 'axios'; // 【新增】引入 axios
import fireIcon from '@/assets/icon/fire.svg';
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
  likes: { type: Number, default: 0 },
  stars: { type: Number, default: 0 },
});

// isLiked 狀態可以根據使用者是否已按讚來初始化 (進階功能)
const isLiked = ref(false); 
const isStarred = ref(false);
const localLikes = ref(props.likes);
const localStars = ref(props.stars);

const smallLikeSrc = computed(() => isLiked.value ? smallLikeActiveIcon : smallLikeIcon);
const smallStarSrc = computed(() => isStarred.value ? smallStarActiveIcon : smallStarIcon);

// 【修改】將 toggleLike 函式替換為非同步 API 呼叫
async function toggleLike() {
  try {
    // 【非常重要】您必須用真實的邏輯來獲取當前登入者的 ID
    // 這通常來自 Pinia, Vuex, 或 localStorage
    const currentUserId = 1; // 暫時寫死為 1，請務必替換！

    if (!currentUserId) {
      alert('請先登入才能按讚！');
      return;
    }

    const apiUrl = 'http://localhost:8888/chophub-admin/api/toggleLike.php';
    const response = await axios.post(apiUrl, {
      post_id: props.id,
      user_id: currentUserId,
    });

    if (response.data && response.data.status === 'success') {
      // 根據後端回傳的結果，即時更新畫面上的讚數和圖示
      if (response.data.action === 'liked') {
        localLikes.value++;
        isLiked.value = true;
      } else if (response.data.action === 'unliked') {
        localLikes.value--;
        isLiked.value = false;
      }
    } else {
      console.error('API 操作失敗:', response.data.message);
    }
  } catch (error) {
    console.error('呼叫按讚 API 時出錯:', error);
    alert('操作失敗，請稍後再試。');
  }
}

// 收藏功能 (未來您可以比照 toggleLike 模式建立 toggleFavorite.php)
function toggleStar() {
  isStarred.value = !isStarred.value;
  localStars.value += isStarred.value ? 1 : -1;
  // TODO: 呼叫 toggleFavorite.php API
}
</script>

<template>
  <!-- Template 結構維持不變 -->
  <router-link 
    :to="`/post/${id}`"
    class="flex flex-col w-full md:w-[348px] bg-[#FEFEFE] rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2"
  >
    <div class="relative">
      <img :src="postImage" alt="Post Image" class="w-full h-auto object-cover" />
    </div>
    <div class="flex flex-col flex-grow p-5">
      <div class="flex items-center justify-between mb-[14px]">
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
        <div class="flex items-center gap-x-2.5 cursor-pointer" @click.prevent.stop="toggleLike">
          <img :src="smallLikeSrc" alt="Likes" class="w-7 h-7" />
          <span class="w-8 text-left text-base">{{ localLikes }}</span>
        </div>
        <div class="flex items-center gap-x-2.5 cursor-pointer" @click.prevent.stop="toggleStar">
          <img :src="smallStarSrc" alt="Stars" class="w-7 h-7" />
          <span class="w-8 text-left text-base">{{ localStars }}</span>
        </div>
      </div>
      <div 
        class="w-full bg-[#F2994A] text-[#ffffff] font-semibold rounded-lg text-base h-[59px] flex items-center justify-center focus:outline-none focus:ring-0 hover:text-white"
      >
        查看更多
      </div>
    </div>
  </router-link>
</template>