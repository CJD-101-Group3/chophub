<script setup>
import { ref } from 'vue';
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';

// 用於控制下拉式選單的開合狀態
const isDropdownOpen = ref(false);

// 切換下拉選單顯示狀態的函數
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// 將會員資料用 ref 包裝起來，未來方便從 API 獲取
const memberInfo = ref({
  name: '露比匠',
  nickname: 'RUBI',
  realName: '無言組',
  badge: '刀匠 / 一般',
  birthDate: '1997/06/28',
  gender: '男生',
  joinDate: '2025/05/20',
  location: '加州',
  // 大頭貼和封面照的 URL，建議放在 public 或 assets 資料夾
  avatarUrl: '/path/to/your/avatar.png', // 替換成你的大頭貼路徑
  coverImageUrl: '/src/assets/blacksmith-cover.jpg' // 替換成你的封面照片路徑
});

</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <!-- 頁首 -->
    <Theheader />

    <!-- 
      主要內容區
      使用 flex-1 讓它自動填滿 Header 和 Footer 之間的剩餘空間
      使用 padding 提供內容與螢幕邊緣的間距
    -->
    <main class="flex-1 p-4 lg:p-8">
      <!-- 內容容器，用於置中和限制最大寬度 -->
      <div class="max-w-2xl mx-auto">
        
        <!-- 手機版下拉式選單 (在電腦版上會隱藏) -->
        <div class="relative lg:hidden mb-6">
          <!-- 下拉選單按鈕 -->
          <button @click="toggleDropdown" class="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-md shadow-sm">
            <div class="flex items-center">
              <!-- 這邊可以放一個小的圓形頭像 -->
              <div class="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
              <span class="font-semibold">{{ memberInfo.name }}</span>
            </div>
            <!-- 下拉箭頭 -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 transition-transform" :class="{'rotate-180': isDropdownOpen}">
              <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <!-- 下拉選單內容 -->
          <transition name="fade">
            <div v-if="isDropdownOpen" class="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
              <a href="#" class="block px-4 py-3 text-gray-700 hover:bg-gray-100">會員資訊</a>
              <a href="#" class="block px-4 py-3 text-gray-700 hover:bg-gray-100">貼文相關</a>
              <a href="#" class="block px-4 py-3 text-gray-700 hover:bg-gray-100">收藏相關</a>
              <a href="#" class="block px-4 py-3 text-gray-700 hover:bg-gray-100">我的活動</a>
              <a href="#" class="block px-4 py-3 text-gray-700 hover:bg-gray-100">其他設定</a>
            </div>
          </transition>
        </div>
        
        <!-- 封面大圖 -->
        <div class="mb-6">
          <img :src="memberInfo.coverImageUrl" alt="Cover Photo" class="w-full h-48 lg:h-64 object-cover rounded-lg shadow-md">
        </div>

        <!-- 歡迎訊息 -->
        <div class="text-center mb-8">
          <h1 class="text-2xl lg:text-3xl font-bold text-gray-800">{{ memberInfo.name }}</h1>
          <p class="text-gray-500">歡迎使用 ChopHub</p>
        </div>

        <!-- 會員資訊卡片 -->
        <div class="bg-white p-6 lg:p-8 rounded-lg shadow-md mb-8">
          <h2 class="text-xl font-bold mb-6 border-b pb-3">會員資訊</h2>
          
          <div class="space-y-4 text-sm lg:text-base">
            <!-- 資訊項目使用 flex 排版，讓標題和內容分列 -->
            <div class="flex justify-between items-center">
              <span class="text-gray-600">會員暱稱</span>
              <span class="font-medium text-gray-900">{{ memberInfo.nickname }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">真實姓名</span>
              <span class="font-medium text-gray-900">{{ memberInfo.realName }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">身份徽章</span>
              <span class="font-medium text-gray-900">{{ memberInfo.badge }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">生日</span>
              <span class="font-medium text-gray-900">{{ memberInfo.birthDate }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">性別</span>
              <span class="font-medium text-gray-900">{{ memberInfo.gender }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">加入時間</span>
              <span class="font-medium text-gray-900">{{ memberInfo.joinDate }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">所在地區</span>
              <span class="font-medium text-gray-900">{{ memberInfo.location }}</span>
            </div>
          </div>
        </div>

        <!-- 操作按鈕區 -->
        <div class="flex flex-col space-y-4">
          <button class="w-full bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">
            編輯資料
          </button>
          <button class="w-full bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">
            申請成為刀匠
          </button>
          <button class="w-full bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">
            刀匠展示頁
          </button>
        </div>
        
      </div>
    </main>

    <!-- 頁尾 -->
    <Thefooter />
  </div>
</template>

<style scoped>
/* 用於下拉選單的淡入淡出效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>