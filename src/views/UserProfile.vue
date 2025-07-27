<script setup>
import { ref } from 'vue';
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';

// (手機版) 下拉選單狀態
const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// (電腦版) 側邊欄狀態
const activeTab = ref('會員資訊');
const menuItems = ref([
  { name: '會員資訊', href: '#' },
  { name: '貼文相關', href: '#' },
  { name: '收藏相關', href: '#' },
  { name: '我的活動', href: '#' },
  { name: '其他設定', href: '#' },
]);

// 會員資料
const memberInfo = ref({
  name: '露比匠',
  nickname: 'RUBI',
  realName: '無言組',
  badge: '刀匠 / 一般',
  birthDate: '1997/06/28',
  gender: '男生',
  joinDate: '2025/05/20',
  location: '加州',
  avatarUrl: '/src/assets/users/userp.png', // 大頭照路徑
  // --- 主要改動點：移除了 coverImageUrl ---
});
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Theheader />

    <div class="flex-1 container mx-auto p-4 lg:flex lg:gap-8 lg:p-8">
      <!-- 左側邊欄 (電腦版顯示) -->
      <aside class="hidden lg:block lg:w-64 flex-shrink-0">
        <div class="bg-white p-4 rounded-lg shadow-md sticky top-24">
          <div class="flex flex-col items-center text-center border-b pb-4 mb-4">
            <img 
              :src="memberInfo.avatarUrl" 
              alt="Avatar" 
              class="w-40 h-40 rounded-full object-cover mb-3"
            />
            <h2 class="text-xl font-bold text-gray-800">{{ memberInfo.name }}</h2>
          </div>
          <nav class="flex flex-col space-y-2">
            <a
              v-for="item in menuItems"
              :key="item.name"
              :href="item.href"
              @click="activeTab = item.name"
              class="px-4 py-3 text-center rounded-md font-semibold transition-colors duration-200"
              :class="{
                'bg-[#F2994A] text-white': activeTab === item.name,
                'text-gray-600 hover:bg-gray-100': activeTab !== item.name
              }"
            >
              {{ item.name }}
            </a>
          </nav>
        </div>
      </aside>

      <!-- 右側主內容區 -->
      <main class="flex-1">
        
        <!-- 手機版下拉式選單 (在電腦版上會隱藏) -->
        <div class="relative lg:hidden mb-6">
          <button @click="toggleDropdown" class="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-md shadow-sm">
            <div class="flex items-center">
              <img :src="memberInfo.avatarUrl" alt="Avatar" class="w-8 h-8 rounded-full object-cover mr-3"/>
              <span class="font-semibold">{{ memberInfo.name }}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 transition-transform" :class="{'rotate-180': isDropdownOpen}">
              <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </button>
          <transition name="fade">
            <div v-if="isDropdownOpen" class="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
              <a v-for="item in menuItems" :key="item.name" :href="item.href" class="block px-4 py-3 text-gray-700 hover:bg-[#F2994A] hover:text-white">{{ item.name }}</a>
            </div>
          </transition>
        </div>
        

        <div class="flex justify-center mb-6">
          <img 
            :src="memberInfo.avatarUrl" 
            alt="User Avatar" 
            class="w-64 h-80 lg:w-100 lg:h-120 object-cover rounded-xl shadow-lg"
          >
        </div>

        <!-- 歡迎訊息 -->
        <div class="text-center mb-8">
          <h1 class="text-2xl lg:text-3xl font-bold text-gray-800">
            {{ memberInfo.name }}, 歡迎使用
          </h1>
        </div>

        <!-- 會員資訊卡片 -->
        <div class="bg-white p-6 lg:p-8 rounded-lg shadow-md mb-8 max-w-xl mx-auto">
          <h2 class="text-xl font-bold mb-6 border-b pb-3">會員資訊</h2>
          <div class="space-y-4 text-sm lg:text-base">
            <div class="flex justify-between items-center"><span class="text-gray-600">會員暱稱</span><span class="font-medium text-gray-900">{{ memberInfo.nickname }}</span></div>
            <div class="flex justify-between items-center"><span class="text-gray-600">真實姓名</span><span class="font-medium text-gray-900">{{ memberInfo.realName }}</span></div>
            <div class="flex justify-between items-center"><span class="text-gray-600">身份徽章</span><span class="font-medium text-gray-900">{{ memberInfo.badge }}</span></div>
            <div class="flex justify-between items-center"><span class="text-gray-600">生日</span><span class="font-medium text-gray-900">{{ memberInfo.birthDate }}</span></div>
            <div class="flex justify-between items-center"><span class="text-gray-600">性別</span><span class="font-medium text-gray-900">{{ memberInfo.gender }}</span></div>
            <div class="flex justify-between items-center"><span class="text-gray-600">加入時間</span><span class="font-medium text-gray-900">{{ memberInfo.joinDate }}</span></div>
            <div class="flex justify-between items-center"><span class="text-gray-600">所在地區</span><span class="font-medium text-gray-900">{{ memberInfo.location }}</span></div>
          </div>
        </div>

        <!-- 操作按鈕區 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
          <button class="w-full bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">編輯資料</button>
          <!-- <button class="w-full bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">申請成為刀匠</button> -->
          <button class="w-full bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">刀匠展示頁</button>
        </div>
        
      </main>
    </div>

    <Thefooter />
  </div>
</template>

<style scoped>
/* 淡入淡出效果 (手機版下拉選單用) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 讓側邊欄在滾動時可以固定在頂部 */
.sticky {
  position: -webkit-sticky;
  position: sticky;
}
</style>