<template>
   <div class="min-h-screen bg-[#282828]">
  <Theheader />
   

  <div class="w-full h-[633px] bg-black"></div>
  <div class="w-full h-20 bg-[#F2994A]"></div>





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

  <!-- 水平線 -->
  <hr class="w-[1752px] mx-auto border-t-2 border-[#FFFFFF] my-6" />



  <!-- 搜尋列 -->
 <div class="flex items-center space-x-2 md:ml-[300px]">
  <input
    type="text"
    placeholder="搜尋..."
    class="w-[500px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F2994A] "
  />
</div>

<!-- 水平線 -->
  <hr class="w-[712px] md:ml-[300px] border-t-2 border-[#FFFFFF] my-6" />


    <div class="flex flex-wrap justify-center gap-4 p-4 bg-gray-100">
    <div class=" w-[500px] h-[800px] md:w-1/3  lg:w-1/4  bg-blue-400 text-white p-4 rounded text-center">Box 1</div>
    <div class=" w-[500px] h-[800px] md:w-1/3  lg:w-1/4  bg-green-400 text-white p-4 rounded text-center">Box 2</div>
    <div class=" w-[500px] h-[800px] md:w-1/3  lg:w-1/4  bg-red-400 text-white p-4 rounded text-center">Box 3</div>
    <div class=" w-[500px] h-[800px] md:w-1/3  lg:w-1/4  bg-purple-400 text-white p-4 rounded text-center">Box 4</div>
    <div class=" w-[500px] h-[800px] md:w-1/3  lg:w-1/4  bg-yellow-400 text-white p-4 rounded text-center">Box 5</div>
    <div class=" w-[500px] h-[800px] md:w-1/3  lg:w-1/4  bg-pink-400 text-white p-4 rounded text-center">Box 6</div>

    
</div>

    


    <Thefooter />
    </div>
</template>


<script setup>
import { ref } from 'vue'
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';

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

