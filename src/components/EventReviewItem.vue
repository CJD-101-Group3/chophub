<template>
  <div class="w-full flex flex-col items-center gap-4 mx-auto bg-white p-4 border-b border-gray-700
              md:flex-row md:w-4/5 md:p-6 md:gap-6
              lg:w-3/4 mb-5">
    
    <div class="flex-shrink-0 w-full rounded-md overflow-hidden
                md:w-64">
      <div class="aspect-[16/10]"> 
        <img 
          :src="imageUrl" 
          :alt="title" 
          class="w-full h-full object-cover" 
        >
      </div>
    </div>

    <div class="flex-grow w-full text-center
                md:w-auto md:text-left">
      <h3 class="text-2xl font-bold text-[#F2994A]">{{ title }}</h3>
      <p class="mt-2 text-lg text-gray-400">{{ eventType }}</p>
      <p class="mt-1 text-xl text-[#4F4F4F]">{{ dateTime }}</p>
    </div>

    <div class="flex-shrink-0 w-full mt-2
                md:w-auto md:mt-0">
      <a href="./EventReview">
        <basebutton class="w-full h-[50px] text-[20px] font-bold md:w-[120px] md:text-[24px]">
        撰寫評論</basebutton>
      </a>
    </div>
    
  </div>
</template>

<script setup>
import Basebutton from './Basebutton.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    default: '線上活動',
  },
  dateTime: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
</style>