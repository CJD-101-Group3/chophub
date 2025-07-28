<template>
  <!-- Main Card Container -->
  <div class="flex flex-col mx-5 md:flex-row items-center gap-6 md:mx-auto bg-white p-4 border-b border-gray-700">
    
    <!-- 1. Image Section -->
    <div class="flex-shrink-0 w-64 rounded-md overflow-hidden"> <!-- 使用 w-64，一個有效的 Tailwind 尺寸 -->
      <div class="aspect-[16/10]"> <!-- 設定 4:3 的比例 -->
        <!-- B. 內層圖片，填滿容器 -->
        <img 
          :src="imageUrl" 
          :alt="title" 
          class="w-full h-full object-cover" 
        >
      </div>
    </div>

    <!-- 2. Activity Details Section -->
    <div class="flex-grow">
      <h3 class="text-2xl font-bold text-[#F2994A]">{{ title }}</h3>
      <p class="mt-2 text-lg text-gray-400">{{ eventType }}</p>
      <p class="mt-1 text-xl text-[#4F4F4F]">{{ dateTime }}</p>
    </div>

    <!-- 3. Buttons Section -->
    <div class="flex flex-shrink-0 gap-4">
      <!-- Order Amount Button -->
      <div class="flex flex-col items-center justify-center bg-[#F2994A] px-3 py-3 text-white w-36 h-36">
        <span class="text-[20px] md:text-[24px]">訂單金額</span>
        <span class="text-[20px] font-bold md:text-[24px]">NT$ {{ price }}</span>
      </div>
      
      <!-- Valid Tickets Button -->
      <div class="flex flex-col items-center justify-center bg-[#F2994A] px-3 py-3 text-white w-36 h-36">
        <span class="text-[20px] md:text-[24px]">有效票券</span>
        <span class="text-[20px] font-bold md:text-[24px]">{{ ticketCount }} 張</span>
      </div>
    </div>
    
  </div>
</template>

<script setup>
// Define the props that this component will accept
// This makes the component reusable for any activity data
defineProps({
  title: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    default: '線上活動', // A default value if not provided
  },
  dateTime: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ticketCount: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>

</style>