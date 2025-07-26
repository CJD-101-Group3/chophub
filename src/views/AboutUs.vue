<!-- ActivityPage.vue 或 About.vue -->
<script setup>
import EventCard from '@/components/EventCard.vue';

// 1. 在頁面中，引入您想使用的圖片
import imageForCard1 from '@/assets/icon/activity1.png';
</script>

<template>
  <div class="p-8 bg-gray-100 flex gap-8">
    <EventCard 
      :eventImage="imageForCard1" 
      :isFeatured="true"
      title="鍛造群俠會 - 刀匠線上交流"
      eventType="線上活動"
      eventDate="2025/7/23(三) 10:00AM"
      :rating="4"
      :reviewCount="82"
    />
  </div>
</template>