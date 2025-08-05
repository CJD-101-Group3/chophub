<template>
  <!-- 
    這是放置所有活動卡片的父層容器。
    我們使用 CSS Grid 來實現完美的響應式佈局。
    - grid: 啟用網格佈局。
    - grid-cols-1: 在手機尺寸上，每行顯示 1 個卡片。
    - sm:grid-cols-2: 在 sm (640px) 寬度以上，每行顯示 2 個。
    - lg:grid-cols-3: 在 lg (1024px) 寬度以上，每行顯示 3 個。
    - xl:grid-cols-4: 在 xl (1280px) 寬度以上，每行顯示 4 個。
    - gap-8: 設定卡片之間的間距為 8 (2rem 或 32px)。
    - p-8: 在容器周圍增加內邊距，避免卡片貼邊。
  -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
    
    <!-- 
      使用 v-for 迴圈來渲染您的 EventCard 元件。
      並監聽從卡片發出的 @view-details 事件。
    -->
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
      @view-details="showEventDetails"
    />
    
  </div>
</template>

<script setup>
// 引入您的活動卡片元件
import EventCard from '@/components/EventCard.vue';
import { ref } from 'vue';

// 假設這是您的活動數據
const events = ref([
  { id: 1, title: '山城工藝體驗：一日鐵匠之旅', type: '工作坊', date: '2024-10-26', rating: 5, reviews: 128, isFeatured: true },
  { id: 2, title: '現代金工：打造你的專屬銀戒', type: '課程', date: '2024-11-15', rating: 4, reviews: 92, isFeatured: false },
  { id: 3, title: '古法鑄劍術展覽與講座', type: '展覽', date: '2024-11-20', rating: 5, reviews: 210, isFeatured: true },
  { id: 4, title: '週末兵器鍛造入門', type: '工作坊', date: '2024-12-01', rating: 4, reviews: 76, isFeatured: false },
]);

// 處理卡片點擊後續動作的函式
function showEventDetails(eventId) {
  console.log(`準備顯示 ID 為 ${eventId} 的活動詳情`);
  // 可以在這裡執行路由跳轉等操作
  // import { useRouter } from 'vue-router';
  // const router = useRouter();
  // router.push(`/events/${eventId}`);
}
</script>