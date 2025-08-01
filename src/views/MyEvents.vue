<template>
  <Theheader />

  <main class="bg-[#282828]">

    <div>
      <div class="text-white h3 font-bold text-center py-9 md:h2">我的活動</div>

      <div class="mx-auto max-w-5xl space-y-4">

        <!-- 1. Tabs Navigation -->
        <div class="border-b-2 border-[#4F4F4F]">
          <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="[
            'px-6 py-3 text-lg font-medium transition-colors duration-300 rounded-none',
            { 'border-b-4 border-b-[#F2994A] text-white': activeTab === tab },
            { 'text-gray-400 hover:text-white': activeTab !== tab }
          ]">
            {{ tab }}
          </button>
        </div>

        <MyEventItem v-for="activity in activities" :key="activity.id" v-bind="activity" />
      </div>

    </div>
  </main>

  <Thefooter />
</template>

<script setup>
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
import MyEventItem from '../components/MyEventItem.vue';
import { ref } from 'vue';

// --- STATE MANAGEMENT ---

// 1. Define the available tabs
const tabs = ref(['已報名', '未完成', '已取消', '收藏']);

// 2. State to track the currently active tab
const activeTab = ref('已報名'); // Default to '已報名'


const activities = ref([
  {
    id: 1,
    title: '【鍛造群俠會】刀匠線上交流',
    dateTime: '2025/7/23(三) 10:00am',
    imageUrl: '/events/burning-coal.jpg', // Using a placeholder image
    price: 500,
    ticketCount: 1,
    eventType: '線上活動'
  },
  {
    id: 2,
    title: '【匠魂燒鍛】小型鍛刀入門體驗',
    dateTime: '2025/8/15(五) 14:00pm',
    imageUrl: '/events/forgingseafood-and-man.png',
    price: 1200,
    ticketCount: 2,
    eventType: '實體工作坊'
  },
  {
    id: 3,
    title: '【工藝知識講堂】冷兵器構造全解析',
    dateTime: '2025/9/01(一) 19:30pm',
    imageUrl: '/events/katana-exhibition.png',
    price: 500,
    ticketCount: 1,
    eventType: '線上課程'
  },
  {
    id: 4,
    title: '【刀劍研磨所】親手拋光你的第一把刀',
    dateTime: '2025/9/01(一) 19:30pm',
    imageUrl: '/events/forgingman.png',
    price: 1100,
    ticketCount: 1,
    eventType: '實體工作坊'
  },
  {
    id: 5,
    title: '【匠人日常】跟著師傅製作日式小刀',
    dateTime: '2025/9/01(一) 19:30pm',
    imageUrl: '/events/close-up-strong-male-hands-forging-molten-metal-anvil.jpg',
    price: 1600,
    ticketCount: 1,
    eventType: '實體工作坊'
  }
]);
</script>

<style></style>