<template>
   <Theheader />
   <main
      class="bg-[#282828] flex-1 flex flex-col items-center overflow-y-auto px-4 space-y-4 md:space-y-6 pt-6 md:pt-8">
      <div class="relative">
         <img src="/public/events/hero-background.jpg" alt="鑄造師" class="block z-index-[-1]">
         <p class="absolute top-[40%] left-[30%] text-[#fff] text-2xl font-bold tracking-widest md:text-4xl lg:text-6xl">冷鋼烈火 ·
            共赴匠魂之旅</p>
         <p class="absolute top-[45%] left-[30%] text-[#fff] mt-5 text-xl md:text-2xl lg:text-3xl">體驗鍛造、深度研修，沉浸兵器之美</p>
      </div>

      <!-- <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-30">
         </div> -->

      <div class="flex flex-row gap-3">
         <Basebutton>我的活動</Basebutton>
         <Basebutton>活動回饋</Basebutton>
      </div>

      <div class="flex flex-row gap-3">
         <DropDown title="會員資訊" :items="menuItems" @select="handleSelect" />
         <DropDown title="會員資訊" :items="menuItems" @select="handleSelect" />
         <DropDown title="會員資訊" :items="menuItems" @select="handleSelect" />
      </div>

      <div class="inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <EventCard v-for="event in events" :key="event.id" :title="event.title" :event-type="event.type"
            :event-date="event.date" :rating="event.rating" :review-count="event.reviews"
            :is-featured="event.isFeatured" :event-image="event.image" @learn-more="handleLearnMore" />
      </div>

      <div class="flex gap-2">
         <PageButton v-for="page in 3" :key="page" :number="page" :isActive="currentPage === page"
            @click="goToPage(page)" />
      </div>

   </main>

   <Thefooter />
</template>

<script setup>
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import Basebutton from '@/components/Basebutton.vue';
import DropDown from '@/components/DropDown.vue';
import EventCard from '@/components/EventCard.vue';
import PageButton from '../components/PageButton.vue';
import { ref } from 'vue';


// //下拉式選單
const menuItems = [
   { label: '貼文相關', path: '/UserProfile' },
   { label: '收藏相關', path: '/UserCollections' },
   { label: '我的活動', path: '/MyActivities' },
   { label: '其他設定', path: '/OtherSettings' }
]

const handleSelect = (item) => {
   console.log('test', item.label)
}

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
      image: '/public/events/knife-exhibition.png'
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
      image: '/public/events/dark-stithy-workshop-with-hammer-anvil-firs-plan-fire-stove-background.jpg'
   },
   {
      id: 5,
      title: '皮革護刀鞘 - 線上手作課程',
      type: '線上活動',
      date: '2025/8/20(三) 15:00PM',
      rating: 5,
      reviews: 97,
      isFeatured: false,
      image: '/public/events/forgingman.png'
   },
   {
      id: 6,
      title: '匠人故事夜 - 鍛劍師傅的職人生涯',
      type: '線上活動',
      date: '2025/8/04(一) 20:00PM',
      rating: 4.5,
      reviews: 43,
      isFeatured: false,
      image: '/public/events/viking-forges-weapons-swords-smithy-man-warrior-s-clothes-is-smithy.jpg'
   }
]);

// 這是為了示範「事件處理」的函式 (詳見進階用法)
function handleLearnMore(eventTitle) {
   alert(`你想了解更多關於「${eventTitle}」的資訊！`);
   // 在這裡可以加入你的邏輯，例如：
   // router.push({ name: 'EventDetail', params: { id: ... } });


   //PageButton
   const currentPage = ref(1)

   const goToPage = (page) => {
      currentPage.value = page
   }

}
</script>
<style></style>