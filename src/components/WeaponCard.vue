 <script setup>
// --- Script 區塊維持不變 ---
import { defineProps, ref, computed } from 'vue';
import smallUserIcon from '@/assets/icon/avataaars.svg';
import smallStarIcon from '@/assets/icon/smallstar.svg';
import smallStarActiveIcon from '@/assets/icon/smallstar_h.svg';

const props = defineProps({
  weapon_id: { type: Number, required: true },
  postImages: { type: Array, default: () => [] }, // 改成陣列
  userName: { type: String, default: '使用者名稱' },
  postTitle: { type: String, default: '手裡劍' },
  description: { type: String, default: '' },
  likes: { type: Number, default: 0 },
  stars: { type: Number, default: 0 },
});
const isStarred = ref(false);
const localStars = ref(props.stars);

const smallStarSrc = computed(() => isStarred.value ? smallStarActiveIcon : smallStarIcon);

function toggleStar() {
  isStarred.value = !isStarred.value;
  localStars.value += isStarred.value ? 1 : -1;
}
</script>

<template>
  <!-- 
    【修改點】
    移除了 md:w-[348px]，只保留 w-full。
    這讓卡片的寬度完全由父層的 Grid 系統決定，實現了真正的響應式。
  -->
  <div class="flex flex-col w-full bg-[#FEFEFE] rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
    
    <div class="relative">
      <img :src="postImages" alt="Post Image" class="w-full h-[20rem] object-cover" />
    </div>

    <div class="flex flex-col flex-grow p-5">
      <!-- ... 卡片內部其他內容維持不變 ... -->
      <div class="flex items-center justify-between mb-[14px]">
        <router-link to="/ArtisanShowcase" class="flex items-center gap-x-2.5 group">
          <img :src="smallUserIcon" alt="User" class="w-8 h-8" />
          <span class="text-[#F2994C] text-lg font-normal leading-[25.2px] tracking-[0.8px] group-hover:underline">
            {{ userName }}
          </span>
        </router-link>
      </div>
      <div class="flex items-center gap-x-2 mb-2.5">
        <h2 class="text-[#F2994A] text-[25.2px] font-medium leading-[35.28px] tracking-[1.12px]">{{ postTitle }}</h2>
      </div>
      <p class="text-[#4F4F4F] text-sm font-normal leading-relaxed mb-5">
        {{ description }}
      </p>
      <div class="flex-grow"></div>
      
      <div class="flex justify-end items-center gap-x-6 mb-3.5 text-gray-500">

        <div class="flex items-center gap-x-2.5 cursor-pointer" @click="toggleStar">
          <img :src="smallStarSrc" alt="Stars" class="w-7 h-7" />
          <span class="w-8 text-left text-base">{{ localStars }}</span>
        </div>
      </div>
      
      <router-link 
  :to="`/weaponslist/weapondetail/${weapon_id}`"  
  class="w-full bg-[#F2994A] text-[#ffffff] font-semibold rounded-lg text-base h-[59px] flex items-center justify-center focus:outline-none focus:ring-0 hover:text-white"
>
  查看更多
</router-link>
    </div>
  </div>
</template>