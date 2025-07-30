<script setup>
import { computed } from 'vue';

// 只保留 distributions 作為必要的 props
const props = defineProps({
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

// 自動計算總評論數
const totalReviews = computed(() => {
  // 使用 Array.reduce 來累加所有分佈的 count
  return props.distributions.reduce((sum, dist) => sum + dist.count, 0);
});

// 自動計算平均評分
const averageRating = computed(() => {
  // 如果沒有評論，平均分就是 0，避免除以零的錯誤
  if (totalReviews.value === 0) {
    return 0;
  }
  
  // 計算加權總分 (星星數 * 該星星的評論數)
  const totalScore = props.distributions.reduce((score, dist) => score + (dist.stars * dist.count), 0);
  
  // 計算原始平均分
  const rawAverage = totalScore / totalReviews.value;
  
  // 回傳一個格式化到小數點後一位的數字
  return parseFloat(rawAverage.toFixed(1));
});

const maxCount = computed(() => {
  if (!props.distributions || props.distributions.length === 0) {
    return 1;
  }
  return Math.max(...props.distributions.map(d => d.count));
});

const calculatePercentage = (count) => {
  if (maxCount.value === 0) {
    return '0%';
  }
  const percentage = (count / maxCount.value) * 100;
  return `${percentage}%`;
};
</script>

<template>
  <div class="max-w-4xl mx-auto bg-zinc-800 p-6 rounded-lg border border-zinc-700 flex flex-col md:flex-row items-center justify-center gap-8">
    
    <!-- 
      左側：總體評分 
    -->
    <div class="flex flex-col items-center text-center pr-0 md:pr-8 border-b-2 md:border-b-0 md:border-r-2 border-zinc-700 pb-6 md:pb-0">
      <p class="text-4xl md:text-7xl font-bold text-white">{{ averageRating }}</p>
      <div class="flex text-2xl text-yellow-400 my-2">
        <span v-for="n in 5" :key="n">
          {{ n <= Math.round(averageRating) ? '★' : '☆' }}
        </span>
      </div>
      <p class="text-gray-400">{{ totalReviews.toLocaleString() }} 則評論</p>
    </div>

    <!-- 
      右側:評分條 
    -->
    <div class="w-full flex justify-center">
      <div class="w-full md:max-w-xs space-y-2">
        <div 
          v-for="dist in distributions" 
          :key="dist.stars" 
          class="flex items-center gap-3 text-sm"
        >
          <span class="text-gray-300">{{ dist.stars }}</span>
          <span class="text-yellow-400">★</span>
          
          <div class="w-full bg-zinc-600 rounded-full h-2.5">
            <div 
              class="bg-yellow-500 h-2.5 rounded-full" 
              :style="{ width: calculatePercentage(dist.count)}"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
</style>