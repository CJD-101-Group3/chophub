<script setup>
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import Basebutton from '@/components/Basebutton.vue';
import PageButton from '@/components/PageButton.vue';
import RatingSummary from '@/components/RatingSummary.vue';
import EventFilter from '@/components/EventFilter.vue';
import EventReviewItem from '@/components/EventReviewItem.vue';
import { ref } from 'vue';

// 在真實世界中，這些資料會來自 API
const ratingData = ref({
  average: 4.5,
  total: 2256896,
  distribution: [
    { stars: 5, count: 1805516 }, // 80%
    { stars: 4, count: 225689 },  // 10%
    { stars: 3, count: 112844 },   // 5%
    { stars: 2, count: 67706 },    // 3%
    { stars: 1, count: 45137 },    // 2%
  ].sort((a, b) => b.stars - a.stars) // 確保從 5 星排到 1 星
});


// 接收篩選器數據的方法
const applyDateFilter = (datePayload) => {
  // datePayload 就是 EventFilter emit 出來的那個物件
  console.log('篩選條件已更新:', datePayload); 
  // 輸出: { start: '用戶輸入的開始日期', end: '用戶輸入的結束日期' }

  // 根據 datePayload.start 和 datePayload.end
  // 過濾 `events` 陣列，或者向後端 API 發送新的請求
};

//評論列表
const activities = ref([
  {
    id: 1,
    title: '【鍛造群俠會】刀匠線上交流',
    dateTime: '2025/7/23(三) 10:00am',
    imageUrl: '/events/burning-coal.jpg', // Using a placeholder image
    eventType: '線上活動'
  },
  {
    id: 2,
    title: '【匠魂燒鍛】小型鍛刀入門體驗',
    dateTime: '2025/8/15(五) 14:00pm',
    imageUrl: '/events/forgingseafood-and-man.png',
    eventType: '實體工作坊'
  },
  {
    id: 3,
    title: '【工藝知識講堂】冷兵器構造全解析',
    dateTime: '2025/9/01(一) 19:30pm',
    imageUrl: '/events/katana-exhibition.png',
    eventType: '線上課程'
  },
  {
    id: 4,
    title: '【刀劍研磨所】親手拋光你的第一把刀',
    dateTime: '2025/9/01(一) 19:30pm',
    imageUrl: '/events/forgingman.png',
    eventType: '實體工作坊'
  },
  {
    id: 5,
    title: '【匠人日常】跟著師傅製作日式小刀',
    dateTime: '2025/9/01(一) 19:30pm',
    imageUrl: '/events/close-up-strong-male-hands-forging-molten-metal-anvil.jpg',
    eventType: '實體工作坊'
  }
]);



//頁碼
const currentPage = ref(1)

const goToPage = (page) => {
currentPage.value = page
}
</script>

<template>
   <Theheader />

   <main class="bg-[#282828]">
      <div>
         <div class="text-white h3 font-bold text-center py-9 md:h2">活動評論</div>
          
         <RatingSummary 
            class="mb-12"
            :average-rating="ratingData.average"
            :total-reviews="ratingData.total"
            :distributions="ratingData.distribution"
         />

         <EventFilter 
            class="mb-8" 
            @filter-applied="applyDateFilter" 
         />

         <div class="mx-5 my-5">
         <EventReviewItem
         v-for="activity in activities"
         :key="activity.id"
         v-bind="activity"
         />
         </div>

      <div class="flex items-center justify-center gap-2">
         <PageButton v-for="page in 3" :key="page" :number="page" :isActive="currentPage === page"
            @click="goToPage(page)" />
      </div>

      </div>
   </main>
   <Thefooter />
</template>


<style>
</style>