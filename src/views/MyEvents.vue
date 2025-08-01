<template>
  <Theheader />

  <main class="bg-[#282828] pb-16">

    <div>
      <div class="text-white h3 font-bold text-center py-9 md:h2">我的活動</div>

      <div class="mx-auto max-w-5xl space-y-4">

        <!-- 1. Tabs Navigation (優化後的語意) -->
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
        <MyEventItem 
          v-else
          v-for="activity in filteredActivities" 
          :key="activity.id" 
          v-bind="activity"
          @write-review="handleWriteReview" 
        />
      </div>

    </div>
  </main>

  <Thefooter />
</template>

<script setup>
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
import MyEventItem from '../components/MyEventItem.vue';
import { ref, computed } from 'vue'; // 引入 computed

// --- STATE MANAGEMENT ---

// 1. 優化 Tabs 的定義，使其更具擴展性
const tabs = ref([
  { key: 'upcoming', name: '即將到來' },
  { key: 'history', name: '歷史活動' },
  { key: 'cancelled', name: '已取消' }
]);

// 2. 預設顯示 '即將到來' 的活動
const activeTab = ref('upcoming');

// --- MOCK DATA (優化的核心) ---
// 為每個活動添加 'status' 屬性來驅動 UI 變化
// status: 'upcoming' (即將到來), 'past' (已結束，可評論), 'reviewed' (已評論)
const allActivities = ref([
  {
    id: 1,
    title: '【鍛造群俠會】刀匠線上交流',
    dateTime: '2025/7/23(三) 10:00am',
    imageUrl: '/events/burning-coal.jpg',
    price: 500,
    ticketCount: 1,
    eventType: '線上活動',
    status: 'upcoming' // 這是個未來的活動
  },
  {
    id: 2,
    title: '【匠魂燒鍛】小型鍛刀入門體驗',
    dateTime: '2024/5/15(五) 14:00pm', // 假設這是過去的活動
    imageUrl: '/events/forgingseafood-and-man.png',
    price: 1200,
    ticketCount: 2,
    eventType: '實體工作坊',
    status: 'past' // 狀態為 "已結束"，可以填問卷
  },
  {
    id: 3,
    title: '【工藝知識講堂】冷兵器構造全解析',
    dateTime: '2024/4/01(一) 19:30pm', // 假設這是已評論過的活動
    imageUrl: '/events/katana-exhibition.png',
    price: 500,
    ticketCount: 1,
    eventType: '線上課程',
    status: 'reviewed' // 狀態為 "已評論"
  },
  {
    id: 4,
    title: '【刀劍研磨所】親手拋光你的第一把刀',
    dateTime: '2025/9/01(一) 19:30pm',
    imageUrl: '/events/forgingman.png',
    price: 1100,
    ticketCount: 1,
    eventType: '實體工作坊',
    status: 'cancelled' // 這是已取消的活動
  },
]);

// --- COMPUTED PROPERTIES ---

// 根據 activeTab 動態過濾活動列表
const filteredActivities = computed(() => {
  switch (activeTab.value) {
    case 'upcoming':
      return allActivities.value.filter(act => act.status === 'upcoming');
    case 'history':
      // 歷史活動包含 "已結束" 和 "已評論" 的
      return allActivities.value.filter(act => act.status === 'past' || act.status === 'reviewed');
    case 'cancelled':
      return allActivities.value.filter(act => act.status === 'cancelled');
    default:
      return [];
  }
});
</script>