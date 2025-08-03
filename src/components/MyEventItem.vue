<template>
  <!-- Main Card Container-->
  <div class="flex flex-col mx-5 md:mx-auto bg-white rounded-lg overflow-hidden shadow-[8px_8px_15px_rgba(255,255,255,0.6)]">
    
    <!-- Top section with details -->
    <div class="flex flex-col md:flex-row items-center gap-6 p-4">
      <!-- 1. Image Section -->
      <div class="flex-shrink-0 w-full md:w-64 rounded-md overflow-hidden">
        <div class="aspect-[16/10]">
          <img :src="imageUrl" :alt="title" class="w-full h-full object-cover">
        </div>
      </div>

      <!-- 2. Activity Details Section-->
      <div class="flex-grow w-full">
        <h3 class="text-2xl font-bold text-[#F2994A]">{{ title }}</h3>
        <p class="mt-2 text-lg text-gray-400">{{ eventType }}</p>
        <p class="mt-1 text-xl text-[#4F4F4F]">{{ dateTime }}</p>
      </div>

      <!-- 3. Buttons Section-->
      <div class="flex flex-shrink-0 gap-4">
        <div class="flex flex-col items-center justify-center bg-[#F2994A] px-3 py-3 text-white w-36 h-36">
          <span class="text-[20px] md:text-[24px]">訂單金額</span>
          <span class="text-[20px] font-bold md:text-[24px]">NT$ {{ price }}</span>
        </div>
        <div class="flex flex-col items-center justify-center bg-[#F2994A] px-3 py-3 text-white w-36 h-36">
          <span class="text-[20px] md:text-[24px]">有效票券</span>
          <span class="text-[20px] font-bold md:text-[24px]">{{ ticketCount }} 張</span>
        </div>
      </div>
    </div>

    <!-- 4. Action Bar-->
    <div class="border-t border-gray-200 p-4 flex justify-end items-center">
      
      <!-- 情況一：活動已結束，等待評論-->
      <a 
        v-if="status === 'past'"
        :href="`/EventReview`"
        class="bg-[#F2994A] hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 hover:text-white"
      >
        填寫活動問卷
      </a>

      <!-- 情況二：活動已評論完成-->
      <div v-if="status === 'reviewed'" class="flex items-center gap-2">
        <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span class="text-gray-700 font-semibold">已完成評論</span>
      </div>

      <!-- 情況三：活動即將到來-->
      <a
        v-if="status === 'upcoming'"
        :href="`/TicketDetailPage`"
        class="bg-[#4F4F4F] hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 hover:text-white"
      >
        查看票券詳情
      </a>

      <!-- 情況四：活動已取消 -->
       <div v-if="status === 'cancelled'" class="flex items-center gap-2">
        <span class="text-gray-500 font-semibold text-lg">活動已取消</span>
      </div>

    </div>
    
  </div>
</template>

<script setup>
defineProps({
  id: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    validator: (value) => ['upcoming', 'past', 'reviewed', 'cancelled'].includes(value),
  },
  title: { type: String, required: true },
  eventType: { type: String, default: '線上活動' },
  dateTime: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  ticketCount: { type: Number, required: true },
});

</script>