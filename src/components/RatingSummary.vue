<template>
  <div class="bg-zinc-800 p-6 rounded-lg border border-zinc-700 flex flex-col md:flex-row items-center gap-8">
    
    <!-- 左側：總體評分 -->
    <div class="flex flex-col items-center text-center pr-0 md:pr-8 border-b-2 md:border-b-0 md:border-r-2 border-zinc-700 pb-6 md:pb-0">
      <p class="text-4xl md:text-7xl font-bold text-white">{{ averageRating }}</p>
      <div class="flex text-2xl text-yellow-400 my-2">
        <span v-for="n in 5" :key="n">
          {{ n <= Math.round(averageRating) ? '★' : '☆' }}
        </span>
      </div>
      <p class="text-gray-400">{{ totalReviews.toLocaleString() }} 則評論</p>
    </div>

    <!-- 右側：評分分佈長條圖 -->
    <div class="flex-grow w-full md:w-1/3">
      <div 
        v-for="dist in distributions" 
        :key="dist.stars" 
        class="flex items-center gap-3 text-sm"
      >
        <span class="text-gray-300">{{ dist.stars }}</span>
        <span class="text-yellow-400">★</span>
        <div class="w-full md:w-1/3 bg-zinc-600 rounded-full h-2.5">
          <div 
            class="bg-yellow-500 h-2.5 rounded-full" 
            :style="{ width: calculatePercentage(dist.count) }"
          ></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  averageRating: {
    type: Number,
    required: true,
    default: 0
  },
  totalReviews: {
    type: Number,
    required: true,
    default: 0
  },
  distributions: {
    type: Array,
    required: true,
    default: () => [
      { stars: 5, count: 0 },
      { stars: 4, count: 0 },
      { stars: 3, count: 0 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 },
    ]
  }
});

// 計算所有分佈中數量最多的那個，作為 100% 的基準
// 使用 computed 可以緩存計算結果，只有在依賴項改變時才重新計算
const maxCount = computed(() => {
  if (!props.distributions || props.distributions.length === 0) {
    return 1; // 避免除以 0
  }
  return Math.max(...props.distributions.map(d => d.count));
});

// 根據最大數量計算當前長條的寬度百分比
const calculatePercentage = (count) => {
  if (maxCount.value === 0) {
    return '0%';
  }
  const percentage = (count / maxCount.value) * 100;
  return `${percentage}%`;
};
</script>

<style scoped>
</style>