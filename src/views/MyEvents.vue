<script setup>
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import MyEventItem from '@/components/MyEventItem.vue';
import { getPublicImg } from '@/utils/getPublicImg'
import { ref, computed } from 'vue';

// --- STATE MANAGEMENT ---

// 1. 優化 Tabs 的定義，使其更具擴展性
const tabs = ref([
  { key: 'upcoming', name: '即將到來' },
  { key: 'history', name: '歷史活動' },
  { key: 'cancelled', name: '已取消' },
  { key: 'favorites', name: '我的收藏' }
]);

// 2. 預設顯示 '即將到來' 的活動
const activeTab = ref('upcoming');

const image1 = getPublicImg('events/burning-coal.jpg')
const image2 = getPublicImg('events/forgingseafood-and-man.png')
const image3 = getPublicImg('events/katana-exhibition.png')
const image4 = getPublicImg('events/forgingman.png')
const image5 = getPublicImg('events/dark-stithy-workshop-with-hammer-anvil-firs-plan-fire-stove-background.jpg')



// --- MOCK DATA (優化的核心) ---
// 為每個活動添加 'status' 屬性來驅動 UI 變化
// status: 'upcoming' (即將到來), 'past' (已結束，可評論), 'reviewed' (已評論)
const allActivities = ref([
  {
    id: 1,
    title: '【鍛造群俠會】刀匠線上交流',
    dateTime: '2025/7/23(三) 10:00am',
    imageUrl: image1,
    price: 500,
    ticketCount: 1,
    eventType: '線上活動',
    status: 'upcoming',
    isFavorited: true
  },
  {
    id: 2,
    title: '【匠魂燒鍛】小型鍛刀入門體驗',
    dateTime: '2024/5/15(五) 14:00pm',
    imageUrl: image2,
    price: 1200,
    ticketCount: 2,
    eventType: '實體工作坊',
    status: 'past',
    isFavorited: false
  },
  {
    id: 3,
    title: '【工藝知識講堂】冷兵器構造全解析',
    dateTime: '2024/4/01(一) 19:30pm',
    imageUrl: image3,
    price: 500,
    ticketCount: 1,
    eventType: '線上課程',
    status: 'reviewed',
    isFavorited: false
  },
  {
    id: 4,
    title: '【刀劍研磨所】親手拋光你的第一把刀',
    dateTime: '2025/9/01(一) 19:30pm',
    imageUrl: image4,
    price: 1100,
    ticketCount: 1,
    eventType: '實體工作坊',
    status: 'cancelled',
    isFavorited: true
  },
  {
    id: 5,
    title: '匠人現場 - 劍柄木雕實作坊',
    dateTime: '2025/8/12(二) 13:30PM',
    imageUrl: image5,
    price: 2800,
    ticketCount: 1,
    eventType: '實體活動',
    status: 'upcoming',
    isFavorited: true
  },
]);

// --- COMPUTED PROPERTIES ---

// 根據 activeTab 動態過濾活動列表
const filteredActivities = computed(() => {
  switch (activeTab.value) {
    case 'upcoming':
      return allActivities.value.filter(act => act.status === 'upcoming');
    case 'history':
      return allActivities.value.filter(act => act.status === 'past' || act.status === 'reviewed');
    case 'cancelled':
      return allActivities.value.filter(act => act.status === 'cancelled');
    // --- NEW: 新增收藏活動的過濾邏輯 ---
    case 'favorites':
      return allActivities.value.filter(act => act.isFavorited);
    default:
      return [];
  }
});

// --- NEW: 新增處理取消事件的函式 ---
function handleCancelActivity(activityId) {
  const activityToCancel = allActivities.value.find(act => act.id === activityId);
  if (activityToCancel) {
    activityToCancel.status = 'cancelled';
    console.log(`Activity ${activityId} has been cancelled.`);
  }
}

// --- NEW: 處理收藏狀態切換的函式 (用於解說) ---
function handleToggleFavorite(activityId) {
  const activity = allActivities.value.find(act => act.id === activityId);
  if (activity) {
    activity.isFavorited = !activity.isFavorited;
  }
}
</script>

<template>
  <main class="bg-[#282828] pb-16 flex flex-col min-h-screen">
    <Theheader />
    <div>
      <div class="text-white h3 font-bold text-center py-9 md:h2">我的活動</div>

      <div class="mx-auto max-w-5xl space-y-4">

        <!-- 1. Tabs Navigation-->
        <div class="border-b-2 border-[#4F4F4F] px-4">
          <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key" :class="[
            'px-6 py-3 text-lg font-medium transition-colors duration-300 rounded-none',
            { 'border-b-4 border-b-[#F2994A] text-white': activeTab === tab.key },
            { 'text-gray-400 hover:text-white': activeTab !== tab.key }
          ]">
            {{ tab.name }}
          </button>
        </div>

        <!-- 2. Display a message if no activities match the filter -->
        <div v-if="filteredActivities.length === 0" class="text-center text-gray-400 py-12">
          <p class="text-xl">這個分類下沒有活動喔！</p>
        </div>

        <!-- 3. Dynamic List Rendering based on the active tab -->
        <MyEventItem v-else v-for="activity in filteredActivities" :key="activity.id" v-bind="activity"
          @write-review="handleWriteReview" @cancel-activity="handleCancelActivity" />
      </div>

    </div>
  </main>
  <Thefooter />
</template>
