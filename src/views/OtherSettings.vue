<script setup>
import { ref } from 'vue';
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';

// --- (手機版) 下拉選單狀態 ---
const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// --- (電腦版) 側邊欄狀態 ---
// 主要改動點：預設選中的標籤改為 '其他設定'
const activeTab = ref('其他設定'); 
const menuItems = ref([
  { name: '會員資訊', href: '#' },
  { name: '貼文相關', href: '#' },
  { name: '收藏相關', href: '#' },
  { name: '我的活動', href: '#' },
  { name: '其他設定', href: '#' },
]);

// --- 會員資料 (側邊欄和下拉選單會用到) ---
const memberInfo = ref({
  name: '露比匠',
  avatarUrl: '/src/assets/users/userp.png',
});

// --- 主要改動點：用一個 ref 物件來管理所有設定的開關狀態 ---
const settings = ref({
  // 通知與提醒 (根據 Figma 設計圖設定初始值)
  newWeaponAlerts: false,
  newEventNotifications: true,
  newPostReplies: true,
  postReportedAlerts: false,
  // 隱私設定 (根據 Figma 設計圖設定初始值)
  isCollectionPublic: false,
  areBadgesPublic: true,
  showLocation: false,
});

</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Theheader />

    <div class="flex-1 container mx-auto p-4 lg:flex lg:gap-8 lg:p-8">
      <!-- 左側邊欄 (電腦版顯示) - 結構完全重用 -->
      <aside class="hidden lg:block lg:w-64 flex-shrink-0">
        <div class="bg-white p-4 rounded-lg shadow-md sticky top-24">
          <div class="flex flex-col items-center text-center border-b pb-4 mb-4">
            <img 
              :src="memberInfo.avatarUrl" 
              alt="Avatar" 
              class="w-24 h-24 rounded-full object-cover mb-3"
            />
            <h2 class="text-xl font-bold text-gray-800">{{ memberInfo.name }}</h2>
          </div>
          <nav class="flex flex-col space-y-2">
            <a
              v-for="item in menuItems"
              :key="item.name"
              :href="item.href"
              @click.prevent="activeTab = item.name"
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
        
        <!-- 手機版下拉式選單 (在電腦版上會隱藏) - 結構完全重用 -->
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

        <!-- ============================================= -->
        <!-- ==        這裡是此頁面全新的內容          == -->
        <!-- ============================================= -->
        <div class="space-y-8">
          
          <!-- 通知與提醒 卡片 -->
          <div class="bg-white p-6 lg:p-8 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-6">通知與提醒</h2>
            <div class="space-y-5">
              <!-- 每個設定項目 -->
              <div class="flex justify-between items-center border-b pb-4">
                <span class="text-gray-700">新武器上架提醒</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="settings.newWeaponAlerts" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#f5b37b] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F2994A]"></div>
                </label>
              </div>
              <div class="flex justify-between items-center border-b pb-4">
                <span class="text-gray-700">新活動詳情通知</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="settings.newEventNotifications" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#f5b37b] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F2994A]"></div>
                </label>
              </div>
              <div class="flex justify-between items-center border-b pb-4">
                <span class="text-gray-700">新回覆我的貼文通知</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="settings.newPostReplies" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#f5b37b] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F2994A]"></div>
                </label>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700">貼文被檢舉與移除通知</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="settings.postReportedAlerts" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#f5b37b] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F2994A]"></div>
                </label>
              </div>
            </div>
          </div>

          <!-- 隱私設定 卡片 -->
          <div class="bg-white p-6 lg:p-8 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-6">隱私設定</h2>
            <div class="space-y-5">
              <div class="flex justify-between items-center border-b pb-4">
                <span class="text-gray-700">金精選收藏是否公開</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="settings.isCollectionPublic" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#f5b37b] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F2994A]"></div>
                </label>
              </div>
              <div class="flex justify-between items-center border-b pb-4">
                <span class="text-gray-700">成就徽章是否公開</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="settings.areBadgesPublic" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#f5b37b] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F2994A]"></div>
                </label>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700">是否顯示所在地區</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="settings.showLocation" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#f5b37b] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F2994A]"></div>
                </label>
              </div>
            </div>
          </div>

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