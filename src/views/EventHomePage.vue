<template>
   <Theheader />

   <main class="bg-[#282828] flex-1 flex flex-col items-center justify-center px-4 space-y-4 md:space-y-6">
      <div>
         <img src="/public/events/hero-background.jpg" alt="">
         <div class="text-white">
            <p>冷鋼烈火 · 共赴匠魂之旅</p>
            <p>體驗鍛造、深度研修，沉浸兵器之美</p>
         </div>
      <Basebutton>我的活動</Basebutton>
      <Basebutton>活動回饋</Basebutton>

      <!-- <DropDown title="會員資訊" :items="menuItems" @select="handleSelect" />
      <DropDown title="會員資訊" :items="menuItems" @select="handleSelect" />
      <DropDown title="會員資訊" :items="menuItems" @select="handleSelect" /> -->



         <!-- 在模板中使用卡片元件 -->
         <div class="flex flex-wrap justify-center gap-8">

            <!-- 
            使用 v-for 迴圈來動態生成多張卡片
            - :key 是 v-for 的必需屬性，確保效能與正確性
            - 使用 v-bind (可簡寫為 :) 將父層的資料綁定到子層的 props 上
            - 例如 :title="event.title" 會將我們 `events` 陣列中每個物件的 `title` 傳給 EventCard 的 `title` prop
            -->
            <EventCard
            v-for="event in events"
            :key="event.id"
            :title="event.title"
            :event-type="event.type"
            :event-date="event.date"
            :rating="event.rating"
            :review-count="event.reviews"
            :is-featured="event.isFeatured"
            :event-image="event.image"
            
            @learn-more="handleLearnMore"
            />
            
         </div>
      </div>

   </main>

   <Thefooter />
</template>

<script setup>
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import Basebutton from '@/components/Basebutton.vue';
import DropDown from '@/components/DropDown.vue';
import EventCard from '../components/EventCard.vue';
import { ref } from 'vue';


// //下拉式選單
// const menuItems = [
//   { label: '貼文相關', path: '/UserProfile' },
//   { label: '收藏相關', path: '/UserCollections' },
//   { label: '我的活動', path: '/MyActivities' },
//   { label: '其他設定', path: '/OtherSettings' }
// ]

// const handleSelect = (item) => {
//   console.log('test', item.label)
// }

   // 準備要傳遞給卡片的資料，通常這些資料會是從後端 API 獲取的
      const events = ref([
      {
         id: 1,
         title: '匠魂初試 - 手作小刀實體體驗',
         type: '實體活動',
         date: '2025/8/03(日) 14:00PM',
         rating: 5,
         reviews: 121,
         isFeatured: true,
         // 提供圖片路徑給 props
         image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1887' 
      },
      {
         id: 2,
         title: '【虛擬兵器匠】線上設計你的奇幻刀劍',
         type: '線上活動',
         date: '2025/8/10(日) 19:00PM',
         rating: 4,
         reviews: 76,
         isFeatured: true,
         // 這筆資料也提供圖片
         image: 'https://images.unsplash.com/photo-1504221587523-6cd1b3ae1967?q=80&w=1887'
      },
      {
         id: 3,
         title: '鍛造群俠會 - 刀匠線上交流',
         type: '線上活動',
         date: '2025/7/23(三) 10:00AM',
         rating: 4,
         reviews: 82,
         isFeatured: false,
         // 這筆資料 **不提供** 圖片，讓卡片元件自己使用預設圖
         image: '' 
      },
      {
         id: 4,
         title: '匠人現場 - 劍柄木雕實作坊',
         type: '實體活動',
         date: '2025/8/12(二) 13:30PM',
         rating: 4,
         reviews: 64,
         isFeatured: true,
         image: 'https://images.unsplash.com/photo-1504221587523-6cd1b3ae1967?q=80&w=1887'
      },
      {
         id: 5,
         title: '皮革護刀鞘 - 線上手作課程',
         type: '線上活動',
         date: '2025/8/20(三) 15:00PM',
         rating: 5,
         reviews: 97,
         isFeatured: false,
         image: 'https://images.unsplash.com/photo-1504221587523-6cd1b3ae1967?q=80&w=1887'
      },
      {
         id: 6,
         title: '匠人故事夜 - 鍛劍師傅的職人生涯',
         type: '線上活動',
         date: '2025/8/04(一) 20:00PM',
         rating: 4.5,
         reviews: 43,
         isFeatured: false,
         image: 'https://images.unsplash.com/photo-1504221587523-6cd1b3ae1967?q=80&w=1887'
      }
      ]);

   // 這是為了示範「事件處理」的函式 (詳見進階用法)
   function handleLearnMore(eventTitle) {
   alert(`你想了解更多關於「${eventTitle}」的資訊！`);
   // 在這裡可以加入你的邏輯，例如：
   // router.push({ name: 'EventDetail', params: { id: ... } });
   }
</script>
<style>
</style>