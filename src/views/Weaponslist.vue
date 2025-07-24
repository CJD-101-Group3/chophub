<template>
   <h1 class="text-center text-xl my-4">這是貼文區</h1>

  <div class="w-full h-[200px] bg-black"></div>
  <div class="w-full h-20 bg-red-200"></div>





   <div class="relative w-full max-w-[1532px] mx-auto overflow-hidden mt-10">
    <div
      ref="carouselRef"
      class="flex gap-4 transition-transform duration-500 ease-in-out"
      :style="{ 
        transform: `translateX(-${currentIndex * (cardWidth + gap)}px)` 
      }"
    >
      <div
        v-for="(color, index) in colors"
        :key="index"
        class="w-[500px] h-[300px] flex-shrink-0 rounded-lg flex items-center justify-center text-white text-2xl font-bold transition-transform duration-300"
        :class="[color]"
      >
        {{ index + 1 }}
      </div>
    </div>

    <!-- 左右按鈕 -->
    <button
      @click="prevSlide"
      class="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-70 text-black px-2 py-1 rounded"
    >
      ◀
    </button>
    <button
      @click="nextSlide"
      class="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-70 text-black px-2 py-1 rounded"
    >
      ▶
    </button>
  </div>
  


    

    


    
</template>


<script setup>
import { ref } from 'vue'
import PostCard from '@/components/PostCard.vue';

const colors = [
  'bg-red-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500'
]

const currentIndex = ref(1)
const cardWidth = 500
const gap = 16
const visibleCount = 3
const offset = (1600 - (cardWidth + gap)) / 2
const visibleCountMiddle = Math.floor(visibleCount / 1)

function nextSlide() {
  if ((currentIndex.value + visibleCount) < colors.length) {
    currentIndex.value++
  }
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

</script>

