<script setup>
import { ref } from 'vue';

// --- 1. 引入共用組件 ---
import TheHeader from '@/components/Theheader.vue';
import TheFooter from '@/components/Thefooter.vue';

// --- 2. 引入所有圖片資源 ---
// 桌機版圖片
import heroImage from '@/assets/icon/about-hero.png';
import artisan1 from '@/assets/icon/artisan-1.png';
import artisan2 from '@/assets/icon/artisan-2.png';
import artisan3 from '@/assets/icon/artisan-3.png';
// 【修改】引入您要用於手機版的三張新圖片
// 請務必將檔名和路徑替換成您自己的實際檔案
import mobileArtisan1 from '@/assets/icon/artisan-mobile-1.png'; 
import mobileArtisan2 from '@/assets/icon/artisan-mobile-2.png';
import mobileArtisan3 from '@/assets/icon/artisan-mobile-3.png';

import emailIcon from '@/assets/icon/aboutusemail.png';
import mainLogo from '@/assets/icon/aboutuslogo.png';

// --- 3. 準備頁面資料 ---

// 桌機版工匠資料 (維持不變)
const artisans = [
  { name: '李明', image: artisan1 },
  { name: '美筍', image: artisan2 },
  { name: '楊凱', image: artisan3 },
];

// 【修改】建立一個專門給手機版使用的圖片資料陣列
const mobileArtisans = [
  { id: 'mobile1', image: mobileArtisan1 },
  { id: 'mobile2', image: mobileArtisan2 },
  { id: 'mobile3', image: mobileArtisan3 },
];
</script>

<template>
  <div class="bg-[#282828] text-white">
    <TheHeader />

    <main class="container mx-auto px-6 py-12 md:py-20">
      <div class="space-y-20 md:space-y-28">

        <!-- Section 1: Hero 區塊 (維持不變) -->
        <section class="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div class="space-y-4 text-center lg:text-left">
            <h1 class="text-4xl lg:text-5xl font-bold">About Us</h1>
            <h2 class="text-3xl lg:text-4xl font-bold text-orange-400">ChopHub</h2>
            <p class="text-gray-300 leading-relaxed">
              ChopHub 是一個專注於冷兵器文化交流的交流平台...
            </p>
          </div>
          <div>
            <img :src="heroImage" alt="Artisan at work" class="rounded-lg shadow-lg w-full">
          </div>
        </section>

        <!-- Section 2: 統計數據欄 (維持不變) -->
        <section class="bg-[#F2994A] rounded-lg py-10 px-6">
          <div class="grid gap-8 text-center md:grid-cols-3">
            <div><p class="text-4xl lg:text-5xl font-bold">50+</p><p class="mt-2 text-lg">專業工匠</p></div>
            <div><p class="text-4xl lg:text-5xl font-bold">10+</p><p class="mt-2 text-lg">合作企業</p></div>
            <div><p class="text-4xl lg:text-5xl font-bold">200+</p><p class="mt-2 text-lg">分享貼文</p></div>
          </div>
        </section>

        <!-- Section 3: 專業工匠介紹 -->
        <section class="grid gap-12 lg:grid-cols-2 lg:items-center">
          <!-- 桌機版的圖片區塊 (維持不變，使用 artisans 資料) -->
          <div class="hidden lg:flex justify-center gap-6">
            <div v-for="artisan in artisans" :key="artisan.name" class="text-center">
              <img :src="artisan.image" :alt="artisan.name" class="w-40 h-48 object-cover rounded-lg shadow-md">
              <p class="mt-3 font-semibold">{{ artisan.name }}</p>
            </div>
          </div>
          <!-- 文字內容 (維持不變) -->
          <div class="text-center lg:text-left">
            <h2 class="text-3xl lg:text-4xl font-bold mb-4">專業工匠・匠心鍛鋼</h2>
            <p class="text-gray-300 leading-relaxed">
              他們不只是打造兵器，更傳承一段歷史...
            </p>
          </div>
          
          <!-- 
            【修改】手機版的圖片區塊
            - 將 v-for 的對象從 'artisans' 改為 'mobileArtisans'
            - 移除顯示名字的 <p> 標籤，以符合手機版設計
          -->
          <div class="lg:hidden flex flex-col items-center gap-8">
            <div v-for="artisan in mobileArtisans" :key="artisan.id" class="w-full">
              <img :src="artisan.image" :alt="'Artisan image ' + artisan.id" class="w-full h-80 object-cover rounded-lg shadow-md">
            </div>
          </div>
        </section>

        <!-- Section 4: 聯絡我們 (維持不變) -->
        <section>
          <div class="flex flex-col-reverse items-center gap-12 text-center lg:flex-row lg:justify-between lg:text-left">
            <div class="space-y-4">
              <h2 class="text-4xl font-bold">Contact Us</h2>
              <a href="mailto:chophub@gmail.com" class="flex items-center justify-center lg:justify-start gap-3 text-lg text-gray-300 hover:text-orange-400 transition">
                <img :src="emailIcon" alt="Email" class="w-6 h-6">
                <span>chophub@gmail.com</span>
              </a>
            </div>
            <div>
              <img :src="mainLogo" alt="ChopHub Logo" class="w-48 h-48">
            </div>
          </div>
        </section>

      </div>
    </main>

    <TheFooter />
  </div>
</template>