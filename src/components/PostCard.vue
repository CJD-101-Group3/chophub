<script setup>
import { defineProps, ref, computed, onMounted } from 'vue';
import axios from 'axios';
import fireIcon from '@/assets/icon/fire.svg';
import smallLikeIcon from '@/assets/icon/smalllike.svg';
import smallLikeActiveIcon from '@/assets/icon/smalllike_h.svg';
import smallUserIcon from '@/assets/icon/smalluser.svg';
import smallStarIcon from '@/assets/icon/smallstar.svg';
import smallStarActiveIcon from '@/assets/icon/smallstar_h.svg';

const props = defineProps({
  id: { type: Number, required: true },
  postImage: { type: String, default: '' },
  userName: { type: String, default: '使用者名稱' },
  postTitle: { type: String, default: '手裡劍' },
  isHot: { type: Boolean, default: false },
  description: { type: String, default: '...' },
  likes: { type: Number, default: 0 },
  stars: { type: Number, default: 0 },
  authorId: { type: Number, required: true },
});

const isLiked = ref(false);
const isStarred = ref(false);
const localLikes = ref(props.likes);
const localStars = ref(props.stars);
const currentUserId = 1; // 假設這是當前登入者的 ID

const smallLikeSrc = computed(() => isLiked.value ? smallLikeActiveIcon : smallLikeIcon);
const smallStarSrc = computed(() => isStarred.value ? smallStarActiveIcon : smallStarIcon);

const fetchLikeStatus = async () => {
  if (!currentUserId) return;
  try {
    // --- 【重要修改點】 ---
    const apiUrl = `${import.meta.env.VITE_API_BASE}/posts/getPostLikeStatus.php?post_id=${props.id}&user_id=${currentUserId}`;
    const response = await axios.get(apiUrl);
    if (response.data && response.data.status === 'success') {
      isLiked.value = response.data.data.isLiked;
    }
  } catch (error) {
    console.error(`查詢貼文 ${props.id} 按讚狀態失敗:`, error);
  }
};

async function toggleLike() {
  if (!currentUserId) return alert('請先登入！');
  try {
    // --- 【重要修改點】 ---
    const apiUrl = `${import.meta.env.VITE_API_BASE}/posts/toggleLike.php`;
    const response = await axios.post(apiUrl, {
      post_id: props.id,
      user_id: currentUserId,
    });
    if (response.data && response.data.status === 'success') {
      if (response.data.action === 'liked') {
        localLikes.value++;
        isLiked.value = true;
      } else if (response.data.action === 'unliked') {
        localLikes.value--;
        isLiked.value = false;
      }
    }
  } catch (error) {
    console.error('呼叫按讚 API 時出錯:', error);
  }
}

const fetchFavoriteStatus = async () => {
  if (!currentUserId) return;
  try {
    // --- 【重要修改點】 ---
    const apiUrl = `${import.meta.env.VITE_API_BASE}/posts/getPostFavoriteStatus.php?post_id=${props.id}&user_id=${currentUserId}`;
    const response = await axios.get(apiUrl);
    if (response.data && response.data.status === 'success') {
      isStarred.value = response.data.data.isFavorited;
    }
  } catch (error) {
    console.error(`查詢貼文 ${props.id} 收藏狀態失敗:`, error);
  }
};

async function toggleStar() {
  if (!currentUserId) return alert('請先登入！');
  try {
    // --- 【重要修改點】 ---
    const apiUrl = `${import.meta.env.VITE_API_BASE}/posts/toggleFavorite.php`;
    const response = await axios.post(apiUrl, {
      post_id: props.id,
      user_id: currentUserId,
    });
    if (response.data && response.data.status === 'success') {
      if (response.data.action === 'favorited') {
        localStars.value++;
        isStarred.value = true;
      } else if (response.data.action === 'unfavorited') {
        localStars.value--;
        isStarred.value = false;
      }
    }
  } catch (error) {
    console.error('呼叫收藏 API 時出錯:', error);
  }
}

onMounted(() => {
  fetchLikeStatus();
  fetchFavoriteStatus();
});
</script>

<template>
  <router-link 
    :to="`/post/${id}`"
    class="flex flex-col w-full bg-[#FEFEFE] rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 h-full"
  >
    <img v-if="postImage" :src="postImage" alt="Post Image" class="w-full h-48 object-cover rounded-t-2xl" />
    <div v-else class="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 rounded-t-2xl">
      暫無圖片
    </div>

    <div class="flex flex-col flex-grow p-5">
      <div class="flex items-center justify-between mb-4">
        <!-- 【關鍵修改】router-link 的 :to 綁定使用了 authorId prop -->
        <router-link 
          :to="`/ArtisanShowcase/${authorId}`" 
          class="flex items-center gap-x-2.5 group" 
          @click.stop
        >
          <img :src="smallUserIcon" alt="User" class="w-8 h-8 rounded-full" />
          <span class="text-[#F2994C] text-lg font-normal leading-tight tracking-wide group-hover:underline">{{ userName }}</span>
        </router-link>
      </div>
      <div class="flex items-center gap-x-2 mb-2.5">
        <h2 class="text-[#F2994A] text-2xl font-medium leading-snug tracking-wider">{{ postTitle }}</h2>
        <img v-if="isHot" :src="fireIcon" alt="Hot Post" class="w-5 h-5" />
      </div>
      <p class="text-[#4F4F4F] text-sm font-normal leading-relaxed mb-5 line-clamp-3">
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
      <div class="w-full bg-[#F2994A] text-white font-semibold rounded-lg text-base h-[59px] flex items-center justify-center">
        查看更多
      </div>
    </div>
  </router-link>
</template>