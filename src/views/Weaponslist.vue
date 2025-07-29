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



  <div class="container mx-auto max-w-7xl">
    <div class=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
       <WeaponCard 
            v-for="post in posts" 
            :key="post.id" 
            v-bind="post" 
          />
    
    </div>
</div>
    


    <Thefooter />
    </div>
</template>


<script setup>
import { ref } from 'vue'
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
import WeaponCard from '../components/WeaponCard.vue';

const posts = ref(Array.from({ length: 9 }, (_, index) => ({
  id: index + 1, // 新增 id，從 1 開始
  postImage: `https://picsum.photos/400/280?random=${index + 1}`, // 讓每張圖片都不同
  isFeatured: true,
  userName: '使用者名稱',
  postTitle: '手裡劍',
  isHot: Math.random() > 0.5,
  description: '四爪對稱手裡劍，結構精準銳利，中心圓孔設計，兼具工藝美感與穩定投擲性能。',
  likes: Math.floor(Math.random() * 200),
  stars: Math.floor(Math.random() * 50),
})));

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

