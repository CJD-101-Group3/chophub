<template>
   <div class="min-h-screen  relative overflow-hidden">

     <!-- 動態背景層，固定並覆蓋父元素 -->
    <div
      class="absolute inset-0 -z-10
        bg-[linear-gradient(135deg,#0d1012,#1a1d1f,#111314,#080807,#28343d,#080807,#0d1012)]
        bg-[length:600%_600%]
        animate-gradient-diagonal"
    ></div>
  <Theheader />
   
  
  <div class="w-full h-[633px] bg-black"></div>
  <div class="relative   h-7">
  <div class="absolute bottom-0 left-0 w-1/2 h-1 bg-[#b06b29]"></div>
  <div class="absolute bottom-3 left-0 w-3/4 h-1 bg-[#d6853c]"></div>
  <div class="absolute bottom-6 left-0 w-full h-4 bg-[#F2994A]"></div>
</div>


<!-- 輪播 -->
<div class=" text-white py-12 flex justify-center w-full mt-8">
    <Swiper
      :modules="[EffectCoverflow, Pagination]"
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      pagination
      class="w-full "
    >
      <SwiperSlide
        v-for="(img, index) in images"
        :key="index"
        :style="{ width: '400px', height: '500px' }"
        class="   rounded-xl overflow-hidden"
      >
        <img :src="img" class="w-full h-full object-cover" />
      </SwiperSlide>
    </Swiper>
  </div>


  <!-- 水平線 -->
    <hr class="border-0 h-0.5 bg-gradient-to-r from-[#FFFFFF]/50 via-transparent to-[#FFFFFF]/50 my-6" />



  <!-- 搜尋列 -->
<div class="flex items-center space-x-2 md:ml-[200px] my-6 mt-10">
  <input
    type="text"
    placeholder="搜尋..."
    class="w-[500px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
  />
  <button
    class="px-4 py-2 bg-[#F2994A] text-white rounded-lg hover:bg-orange-500 transition"
  >
    搜尋
  </button>
</div>

<!-- 水平線 -->
<div class="relative h-6 w-[1752px] mx-auto my-6">
  <div class="absolute bottom-4 left-0 w-full h-0.5 bg-[#F2994A]"></div>
</div>

<!-- 主內容區：左分類 + 右商品 -->
<div class="container mx-auto max-w-8xl px-4">
  <div class="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">

    <!-- 左側分類選單 -->
  <aside
  class="backdrop-blur-md p-6 rounded-xl 
          text-white  max-w-[280px] bg-[#FFFFFF]" 
>
  <h2 class="text-xl font-semibold mb-6 tracking-wide text-black">分類</h2>
  <ul>
  <li class="border-b border-black/20 last:border-b-0">
      <button
        class=" text-black w-full text-left px-4 py-3 rounded-md 
                hover:bg-[#F2994A] hover:text-[#1a1f23] 
                transition duration-300 font-medium"
      >
        劍類
      </button>
    </li>
    <li class="border-b border-black/20 last:border-b-0">
      <button
        class=" text-black w-full text-left px-4 py-3 rounded-md 
                hover:bg-[#F2994A] hover:text-[#1a1f23] 
                transition duration-300 font-medium"
      >
        斧頭類
      </button>
    </li>
    <li class="border-b border-black/20 last:border-b-0">
      <button
        class="text-black w-full text-left px-4 py-3 rounded-md 
                hover:bg-[#F2994A] hover:text-[#1a1f23] 
                transition duration-300 font-medium"
      >
        長柄武器
      </button>
    </li>
    <li class="border-b border-black/20  last:border-b-0">
      <button
        class="text-black w-full text-left px-4 py-3 rounded-md 
                hover:bg-[#F2994A] hover:text-[#1a1f23] 
                transition duration-300 font-medium"
      >
        弓箭類
      </button>
    </li>
    <li>
      <button
        class="text-black w-full text-left px-4 py-3 rounded-md 
                hover:bg-[#F2994A] hover:text-[#1a1f23] 
                transition duration-300 font-medium"
      >
        盾牌
      </button>
    </li>
  </ul>
</aside>

    <!-- 右側商品卡片區 -->
    <main>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeaponCard 
          v-for="post in posts" 
          :key="post.id" 
          v-bind="post" 
        />
      </div>
    </main>

  </div>
</div>

<div class="w-full h-8 "></div>


    <Thefooter />
    </div>
</template>


<script setup>
import { ref } from 'vue'
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
import WeaponCard from '../components/WeaponCard.vue';


import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

const images = [
  'https://swiperjs.com/demos/images/nature-1.jpg',
  'https://swiperjs.com/demos/images/nature-2.jpg',
  'https://swiperjs.com/demos/images/nature-3.jpg',
  'https://swiperjs.com/demos/images/nature-4.jpg',
  'https://swiperjs.com/demos/images/nature-5.jpg',
  'https://swiperjs.com/demos/images/nature-6.jpg',
  'https://swiperjs.com/demos/images/nature-7.jpg',
]

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

