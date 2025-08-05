<template>
  <!-- 
    父層容器負責佈局：
    - grid: 啟用 CSS Grid。
    - grid-cols-1: 手機上每行 1 張卡片。
    - md:grid-cols-2: 768px 以上每行 2 張。
    - xl:grid-cols-3: 1280px 以上每行 3 張。
    - gap-8: 設定卡片間的間距。
    - p-8: 設定容器的內邊距。
  -->
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto p-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-8">精選活動</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        
        <!-- 使用 v-for 迴圈渲染您的卡片 -->
        <YourEventCard
          v-for="event in featuredEvents"
          :key="event.id"
          :id="event.id"
          :event-image="event.eventImage"
          :title="event.title"
          :event-type="event.eventType"
          :event-date="event.eventDate"
          :rating="event.rating"
          :review-count="event.reviewCount"
        />

      </div>
    </div>
  </div>
</template>

<script setup>
// 引入您優化後的卡片元件
import YourEventCard from '@/components/YourEventCard.vue';
import { ref } from 'vue';

// 假設的活動數據
const featuredEvents = ref([
  { id: 'evt001', eventImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678', title: '鍛造群俠會 - 線上交流', eventType: '線上活動', eventDate: '2025/7/23(三) 10:00AM', rating: 4, reviewCount: 82 },
  { id: 'evt002', eventImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865', title: '一日鐵匠實體工作坊', eventType: '實體工作坊', eventDate: '2025/8/15(五) 09:00AM', rating: 5, reviewCount: 156 },
  { id: 'evt003', eventImage: '', title: '金工藝術展覽', eventType: '展覽', eventDate: '2025/9/01 - 9/30', rating: 4, reviewCount: 45 },
]);
</script>