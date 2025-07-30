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
const activeTab = ref('收藏相關');
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
  avatarUrl: '/src/assets/users/userp.png',
});

// 收藏的武器資料
const collectedWeapons = ref([
  { id: 1, imageUrl: '/src/assets/weapons/weapon1.png', link: '/weapon/1' },
  { id: 2, imageUrl: '/src/assets/weapons/weapon2.png', link: '/weapon/2' },
  { id: 3, imageUrl: '/src/assets/weapons/weapon3.png', link: '/weapon/3' },
  { id: 4, imageUrl: '/src/assets/weapons/weapon4.png', link: '/weapon/4' },
  { id: 5, imageUrl: '/src/assets/weapons/weapon5.png', link: '/weapon/5' },
]);

// 收藏的徽章資料
const collectedBadges = ref([
  { id: 1, imageUrl: '/src/assets/badges/badge1.png', name: '黑鐵級刀匠', isEquipped: true },
  { id: 2, imageUrl: '/src/assets/badges/badge2.png', name: '赤火初煉者', isEquipped: true },
  { id: 3, imageUrl: '/src/assets/badges/badge3.png', name: '登入王', isEquipped: true },
  { id: 4, imageUrl: '/src/assets/badges/badge4.png', name: '社群新星', isEquipped: false },
  { id: 5, imageUrl: '/src/assets/badges/badge5.png', name: '新手村村民', isEquipped: false },
]);

const toggleEquip = (badgeId) => {
  const badgeToToggle = collectedBadges.value.find(b => b.id === badgeId);
  if (!badgeToToggle) return;

  if (badgeToToggle.isEquipped === false) {
    const equippedCount = collectedBadges.value.filter(b => b.isEquipped).length;
    if (equippedCount >= 3) {
      alert('最多只能配戴三個徽章！');
      return;
    }
  }
  badgeToToggle.isEquipped = !badgeToToggle.isEquipped;
};

</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Theheader />

    <div class="flex-1 container mx-auto p-4 lg:flex lg:gap-8 lg:p-8">
      <!-- 左側邊欄 (電腦版顯示) -->
      <aside class="hidden lg:block lg:w-72 flex-shrink-0">
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
              @click.prevent="activeTab = item.name"
              class="px-4 py-3 text-center rounded-md font-semibold transition-colors duration-200"
              :class="{
                /* 【修改處】修正了 active 和 inactive 狀態的 hover 樣式 */
                'bg-[#F2994A] text-white hover:text-white': activeTab === item.name,
                'text-gray-600 hover:bg-[#F2994A] hover:text-white': activeTab !== item.name
              }"
            >
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
        
        <!-- 主內容 -->
        <div class="space-y-8">

          <!-- 我收藏的武器 -->
          <div class="bg-[#E2E9EF] p-6 lg:p-8 rounded-lg shadow-sm">
            <h2 class="text-xl font-bold text-gray-800 mb-6">我收藏的武器</h2>
            <div class="flex space-x-6 overflow-x-auto pb-4">
              <a v-for="weapon in collectedWeapons" :key="weapon.id" :href="weapon.link" class="flex-shrink-0 group">
                <div class="w-48 h-48 lg:w-56 lg:h-56 bg-white p-2 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
                  <img :src="weapon.imageUrl" :alt="'武器 ' + weapon.id" class="w-full h-full object-contain">
                </div>
              </a>
            </div>
          </div>

          <!-- 我收藏的徽章 -->
          <div class="bg-[#E2E9EF] p-6 lg:p-8 rounded-lg shadow-sm">
            <h2 class="text-xl font-bold text-gray-800 mb-6">我收藏的徽章</h2>
            <div class="flex space-x-6 overflow-x-auto pb-4">
              <div v-for="badge in collectedBadges" :key="badge.id" class="flex flex-col items-center space-y-3 flex-shrink-0">
                <div class="w-40 h-40 lg:w-48 lg:h-48 bg-gray-800/20 p-2 rounded-lg shadow-md overflow-hidden">
                  <img :src="badge.imageUrl" :alt="badge.name" class="w-full h-full object-contain">
                </div>
                <span class="font-semibold text-gray-800">{{ badge.name }}</span>
                <button
                  @click="toggleEquip(badge.id)"
                  class="w-32 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
                  :class="badge.isEquipped ? 'bg-[#D15B5B] hover:bg-[#b94a4a]' : 'bg-gray-400 hover:bg-gray-500'"
                >
                  {{ badge.isEquipped ? '配戴中' : '配戴' }}
                </button>
              </div>
            </div>
            <!-- 儲存按鈕 -->
            <div class="mt-6 text-center">
              <button class="w-full lg:w-auto bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-3 px-16 rounded-md transition-colors duration-300">
                儲存
              </button>
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

/* 美化滾動條 (可選) */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}
.overflow-x-auto::-webkit-scrollbar-track {
  background: #e2e9ef;
  border-radius: 10px;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #8A9BCE;
  border-radius: 10px;
  border: 2px solid #e2e9ef;
}
.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background-color: #7385b7;
}
</style>