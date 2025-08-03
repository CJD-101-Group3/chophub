<script setup>
// --- Script 區塊完全维持不变 ---
import { ref } from 'vue';
import TheHeader from '@/components/Theheader.vue';
import TheFooter from '@/components/Thefooter.vue';
import heroImage from '@/assets/icon/about-hero.png';
import artisan1 from '@/assets/icon/artisan-1.png';
import artisan2 from '@/assets/icon/artisan-2.png';
import artisan3 from '@/assets/icon/artisan-3.png';
import mobileArtisan1 from '@/assets/icon/artisan-mobile-1.png'; 
import mobileArtisan2 from '@/assets/icon/artisan-mobile-2.png';
import mobileArtisan3 from '@/assets/icon/artisan-mobile-3.png';
import emailIcon from '@/assets/icon/aboutusemail.png';
import mainLogo from '@/assets/icon/aboutuslogo.png';

const artisans = [
  { name: '李明', image: artisan1 },
  { name: '美筍', image: artisan2 },
  { name: '楊凱', image: artisan3 },
];
const mobileArtisans = [
  { id: 'mobile1', image: mobileArtisan1 },
  { id: 'mobile2', image: mobileArtisan2 },
  { id: 'mobile3', image: mobileArtisan3 },
];
</script>

<template>
  <div class="bg-[#282828] text-white">
    <TheHeader />

    <main class="py-12 md:py-20">
      
      <!-- Section 1: Hero 區塊 -->
      <div class="container mx-auto px-6 max-w-screen-lg">
        <section class="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-12">
          <!-- 【修改點 1】將 text-center lg:text-left 改為 text-left -->
          <div class="space-y-4 text-left">
            <h1 class="text-4xl lg:text-5xl font-bold text-[#F8F9FA]">About Us</h1>
            <h2 class="hidden lg:block text-3xl lg:text-4xl font-bold text-[#F2994A]">ChopHub</h2>
            <p class="text-[#F8F9FA] text-base md:text-xl leading-relaxed">
              ChopHub 是一個專注於冷兵器文化的交流平台，致力於提供深入的兵器知識、真實用戶評論與工匠介紹。在這裡，你可以瀏覽各式兵器資料，從東方武士刀到西方長劍，並針對武器的實用性、造型與歷史留下星等評價。我們同時邀請專業工匠分享鍛造理念，讓冷兵器不再只是收藏品，而是一種跨越時代的工藝精神。ChopHub，讓歷史的鋒刃在現代再次閃耀。
            </p>
          </div>
          <div>
            <img :src="heroImage" alt="Artisan at work" class="rounded-lg shadow-lg w-full max-w-lg mx-auto">
          </div>
        </section>
      </div>

      <!-- Section 2: 統計數據欄 (此區塊保持不變，手機版置中) -->
      <section class="bg-[#F2994A] mt-20 md:mt-28 ">
        <div class="  px-6 py-10">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-screen-lg mx-auto">
            <div><p class="text-4xl lg:text-5xl font-bold">50+</p><p class="mt-2 text-lg">專業工匠</p></div>
            <div><p class="text-4xl lg:text-5xl font-bold">10+</p><p class="mt-2 text-lg">合作企業</p></div>
            <div><p class="text-4xl lg:text-5xl font-bold">200+</p><p class="mt-2 text-lg">分享貼文</p></div>
          </div>
        </div>
      </section>
      
      <div class="container mx-auto px-6 max-w-screen-lg mt-20 md:mt-28 space-y-20 md:space-y-28">
        
        <!-- Section 3: 專業工匠介紹 -->
        <section class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
          <div class="hidden lg:flex justify-center gap-6">
            <div v-for="artisan in artisans" :key="artisan.name" class="text-center w-48">
              <div class="aspect-[3/4] w-full rounded-lg overflow-hidden shadow-md">
                <img :src="artisan.image" :alt="artisan.name" class="w-full h-full object-cover object-top">
              </div>
              <p class="mt-3 font-semibold">{{ artisan.name }}</p>
            </div>
          </div>
          <!-- 【修改點 2】將 text-center lg:text-left 改為 text-left -->
          <div class="text-left max-w-md">
            <h3 class="text-3xl lg:text-3xl font-bold mb-4">專業工匠・匠心鍛鋼</h3>
            <p class="text-gray-300 leading-relaxed">
              他們不只是打造兵器，更傳承一段歷史。在高溫與錘聲中，金屬被反覆淬鍊，成就每一把兼具實用與美學的冷兵器。ChopHub 精選介紹來自世界各地的工匠職人，讓你認識背後那雙鍛造出傳奇的雙手。
            </p>
          </div>
          <div class="lg:hidden flex flex-col items-center gap-8">
            <div v-for="artisan in mobileArtisans" :key="artisan.id" class="w-full">
              <img :src="artisan.image" :alt="'Artisan image ' + artisan.id" class="w-full h-80 object-cover rounded-lg shadow-md">
            </div>
          </div>
        </section>

        <!-- Section 4: 聯絡我們 (此區塊保持不變，手機版置中) -->
        <section>
          <div class="flex flex-col-reverse items-center gap-12 text-center lg:flex-row lg:items-center lg:justify-between">
            <div class="space-y-4 lg:text-left">
              <h1 class="text-4xl font-bold">Contact Us</h1>
              <a href="mailto:chophub@gmail.com" class="flex items-center justify-center lg:justify-start gap-3 text-lg text-gray-300 hover:text-orange-400 transition">
                <img :src="emailIcon" alt="Email" class="w-12 h-12">
                <span><h2>chophub@gmail.com</h2></span>
              </a>
            </div>
            <div>
              <img :src="mainLogo" alt="ChopHub Logo" class="w-60 h-60">
            </div>
          </div>
        </section>
        
      </div>
    </main>

    <TheFooter />
  </div>
</template>