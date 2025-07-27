<script setup>
import { ref, computed } from 'vue';
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';

// --- Layout State ---
const isDropdownOpen = ref(false);
const toggleDropdown = () => isDropdownOpen.value = !isDropdownOpen.value;

const activeTab = ref('我的活動'); // Set sidebar active tab
const menuItems = ref([
  { name: '會員資訊', href: '#' },
  { name: '貼文相關', href: '#' },
  { name: '收藏相關', href: '#' },
  { name: '我的活動', href: '#' },
  { name: '其他設定', href: '#' },
]);

const memberInfo = ref({
  name: '露比匠',
  avatarUrl: '/src/assets/users/userp.png',
});

// --- Page-specific State & Logic ---

// 1. Content Tabs
const contentTabs = ['已報名', '未完成', '已取消', '收藏'];
const activeContentTab = ref('已報名'); // Default content tab

// 2. All Activities Data (Simulated)
const allActivities = ref([
  { id: 1, title: '【鍛造群俠會】刀匠線上交流', type: '線上活動', date: '2025/7/23(三) 10:00am', imageUrl: '/src/assets/activities/activity1.jpg', status: '已報名' },
  { id: 2, title: '【古兵器講座】羅馬短劍的歷史', type: '線上活動', date: '2025/8/15(五) 19:30pm', imageUrl: '/src/assets/activities/activity2.jpg', status: '已報名' },
  { id: 3, title: '【新手入門】保養你的第一把刀', type: '線下活動', date: '2025/6/10(二) 14:00pm', imageUrl: '/src/assets/activities/activity3.jpg', status: '已完成' },
  { id: 4, title: '【年度拍賣會】稀有藏品預覽', type: '線上活動', date: '2025/4/01(一) 09:00am', imageUrl: '/src/assets/activities/activity4.jpg', status: '已取消' },
  { id: 5, title: '【鍛造群俠會】刀匠線上交流', type: '線上活動', date: '2025/7/23(三) 10:00am', imageUrl: '/src/assets/activities/activity1.jpg', status: '收藏' },
]);

// 3. Computed property to filter activities based on the active content tab
const filteredActivities = computed(() => {
  return allActivities.value.filter(activity => activity.status === activeContentTab.value);
});

// 4. Modal Logic
const isModalVisible = ref(false);
const activityToCancel = ref(null);

const handleCancelClick = (activity) => {
  activityToCancel.value = activity;
  isModalVisible.value = true;
};

const confirmCancellation = () => {
  if (activityToCancel.value) {
    const activity = allActivities.value.find(a => a.id === activityToCancel.value.id);
    if (activity) {
      activity.status = '已取消'; // Change status
      alert(`已成功取消報名：${activity.title}`);
    }
  }
  closeModal();
};

const closeModal = () => {
  isModalVisible.value = false;
  activityToCancel.value = null;
};

</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Theheader />

    <div class="flex-1 container mx-auto p-4 lg:flex lg:gap-8 lg:p-8">
      <!-- 左側邊欄 (電腦版顯示) - 結構與您提供的一致 -->
      <aside class="hidden lg:block lg:w-72 flex-shrink-0">
        <div class="bg-white p-4 rounded-lg shadow-md sticky top-24">
          <div class="flex flex-col items-center text-center border-b pb-4 mb-4">
            <img :src="memberInfo.avatarUrl" alt="Avatar" class="w-40 h-40 rounded-full object-cover mb-3"/>
            <h2 class="text-xl font-bold text-gray-800">{{ memberInfo.name }}</h2>
          </div>
          <nav class="flex flex-col space-y-2">
            <a v-for="item in menuItems" :key="item.name" :href="item.href" @click.prevent="activeTab = item.name"
              class="px-4 py-3 text-center rounded-md font-semibold transition-colors duration-200"
              :class="{ 'bg-[#F2994A] text-white': activeTab === item.name, 'text-gray-600 hover:bg-gray-100': activeTab !== item.name }">
              {{ item.name }}
            </a>
          </nav>
        </div>
      </aside>

      <!-- 右側主內容區 -->
      <main class="flex-1">
        
        <!-- 手機版下拉式選單 -->
        <div class="relative lg:hidden mb-6">
          <button @click="toggleDropdown" class="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-md shadow-sm">
            <div class="flex items-center">
              <img :src="memberInfo.avatarUrl" alt="Avatar" class="w-8 h-8 rounded-full object-cover mr-3"/>
              <span class="font-semibold">{{ memberInfo.name }}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 transition-transform" :class="{'rotate-180': isDropdownOpen}"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
          </button>
          <transition name="fade">
            <div v-if="isDropdownOpen" class="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg">
              <a v-for="item in menuItems" :key="item.name" :href="item.href" class="block px-4 py-3 text-gray-700 hover:bg-[#F2994A] hover:text-white">{{ item.name }}</a>
              <div class="border-t my-1"></div>
              <a href="#" class="block px-4 py-3 text-[#F2994A] font-bold">活動回饋區</a>
            </div>
          </transition>
        </div>

        <!-- ============================================= -->
        <!-- ==        這裡是此頁面全新的內容          == -->
        <!-- ============================================= -->
        <div class="space-y-8">
          
          <!-- 內容頁籤導覽列 -->
          <nav class="flex space-x-4 border-b">
            <button v-for="tab in contentTabs" :key="tab" @click="activeContentTab = tab"
              class="px-3 py-2 font-semibold transition-colors duration-200"
              :class="activeContentTab === tab ? 'border-b-2 border-[#F2994A] text-[#F2994A]' : 'text-gray-500 hover:text-gray-800'">
              {{ tab }}
            </button>
          </nav>

          <!-- 活動列表 -->
          <div class="space-y-6">
            <!-- 顯示篩選後的活動 -->
            <div v-for="activity in filteredActivities" :key="activity.id" class="bg-[#E2E9EF] p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4 items-center">
              <img :src="activity.imageUrl" alt="Activity Image" class="w-full md:w-48 h-32 object-cover rounded-md">
              <div class="flex-1">
                <h3 class="font-bold text-lg text-gray-800">{{ activity.title }}</h3>
                <p class="text-gray-600 text-sm">{{ activity.type }}</p>
                <p class="text-gray-600 text-sm">{{ activity.date }}</p>
              </div>
              <div class="flex flex-row md:flex-col gap-3 w-full md:w-auto">
                <button class="flex-1 bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-2 px-4 rounded-md transition-colors">查看詳情</button>
                <button v-if="activity.status === '已報名'" @click="handleCancelClick(activity)" class="flex-1 bg-white hover:bg-gray-200 text-gray-700 border border-gray-400 font-bold py-2 px-4 rounded-md transition-colors">退票</button>
              </div>
            </div>
            <!-- 如果沒有活動，顯示提示訊息 -->
            <div v-if="filteredActivities.length === 0" class="text-center py-10 text-gray-500">
              <p>此類別目前沒有任何活動。</p>
            </div>
          </div>

          <!-- 電腦版活動回饋區按鈕 -->
          <div class="hidden lg:flex justify-center">
            <button class="bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-3 px-10 rounded-md transition-colors">
              活動回饋區
            </button>
          </div>

        </div>
      </main>
    </div>

    <!-- 退票確認彈窗 -->
    <transition name="modal-fade">
      <div v-if="isModalVisible" class="fixed inset-0 bg-black bg-opacity-30 flex items-end justify-end p-4 lg:p-8">
        <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
          <p class="font-bold text-yellow-600 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" /></svg>
            您確定要取消這場活動報名嗎？
          </p>
          <div v-if="activityToCancel" class="mt-2 text-sm text-gray-600 bg-gray-100 p-3 rounded-md">
            <p class="font-semibold">{{ activityToCancel.title }}</p>
            <p>{{ activityToCancel.date }}</p>
          </div>
          <p class="mt-4 text-xs text-gray-500">取消後將無法再次參加本次活動，因您已過報名截止日取消，本次收費將無法退款，謝謝您。</p>
          <div class="mt-6 flex gap-4">
            <button @click="confirmCancellation" class="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors">確認退票</button>
            <button @click="closeModal" class="flex-1 bg-white hover:bg-gray-200 text-gray-700 border border-gray-400 font-bold py-2 px-4 rounded-md transition-colors">返回</button>
          </div>
        </div>
      </div>
    </transition>

    <Thefooter />
  </div>
</template>

<style scoped>
/* 既有樣式 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }
.sticky { position: -webkit-sticky; position: sticky; }

/* 彈窗專用動畫 */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>