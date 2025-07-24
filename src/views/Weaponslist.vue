<template>
    <h1>這是貼文區1</h1>
    <div class="w-full h-80 bg-black"></div>
    <div class="w-full h-20 bg-red-200"></div>

    <div class="relative w-[320px] h-[200px] overflow-hidden mx-auto">
    <div
      ref="carouselRef"
      class="flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(color, index) in colors"
        :key="index"
        class="w-full flex-shrink-0 h-[200px] flex items-center justify-center text-2xl font-bold text-white"
        :class="color"
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
import { ref, onMounted, onBeforeUnmount } from 'vue'

const colors = [
  'bg-red-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-yellow-500',
  'bg-purple-500'
]

const currentIndex = ref(0)
let intervalId = null

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % colors.length
}

function prevSlide() {
  currentIndex.value =
    (currentIndex.value - 1 + colors.length) % colors.length
}

onMounted(() => {
  intervalId = setInterval(nextSlide, 3000) // 每 3 秒自動輪播
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

