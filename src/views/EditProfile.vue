<script setup>
import { ref, reactive } from 'vue';
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

// 原始會員資料 (用於顯示)
const memberInfo = ref({
  name: '露比匠',
  avatarUrl: '/src/assets/users/userp.png',
  email: 'rubi520@gmail.com',
  password: 'r******4', // 顯示用的假密碼
  backupEmail: 'rubija@gmail.com',
  nickname: 'RUBI',
  badge: '刀匠 / 一般',
  birthDate: '1997/06/28',
  gender: '男',
  joinDate: '2025/05/20',
  location: '加州',
});

// 用於表單綁定的資料物件
const profileForm = reactive({ ...memberInfo.value });

// 為了讓密碼輸入框是空的，而不是顯示 'r******4'
profileForm.password = ''; 

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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 transition-transform" :class="{'rotate-180': isDropdownOpen}"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
          </button>
          <transition name="fade">
            <div v-if="isDropdownOpen" class="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg">
              <a v-for="item in menuItems" :key="item.name" :href="item.href" class="block px-4 py-3 text-gray-700 hover:bg-[#F2994A] hover:text-white">{{ item.name }}</a>
            </div>
          </transition>
        </div>

        <!-- 主內容 -->
        <div class="space-y-8 max-w-2xl mx-auto">
          
          <!-- 大頭照編輯區 -->
          <div class="relative w-80 h-96 mx-auto">
            <img :src="profileForm.avatarUrl" alt="User Avatar" class="w-full h-full object-cover rounded-xl shadow-lg">
            <div class="absolute bottom-0 left-0 right-0 h-1/3 bg-black bg-opacity-40 rounded-b-xl flex items-center justify-center gap-4 p-2">
              <button class="text-sm bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-2 px-4 rounded-md transition-colors">圖片上傳</button>
              <button class="text-sm bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md transition-colors">圖片移除</button>
            </div>
          </div>

          <!-- 帳號與安全 卡片 -->
          <div class="bg-white p-6 lg:p-8 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-6">帳號與安全</h2>
            <div class="space-y-4">
              <div class="grid grid-cols-3 items-center gap-4"><span class="text-gray-600 col-span-1">電子信箱</span><span class="font-medium text-gray-900 col-span-2">{{ profileForm.email }}</span></div>
              <div class="grid grid-cols-3 items-center gap-4"><label for="password" class="text-gray-600 col-span-1">密碼</label><input id="password" type="password" v-model="profileForm.password" placeholder="留空表示不修改密碼" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></div>
              <div class="grid grid-cols-3 items-center gap-4"><label for="backupEmail" class="text-gray-600 col-span-1">備用信箱</label><input id="backupEmail" type="email" v-model="profileForm.backupEmail" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></div>
            </div>
            <div class="mt-6 flex gap-4">
              <button class="flex-1 bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-2 px-4 rounded-md transition-colors">儲存</button>
              <button class="flex-1 bg-white hover:bg-gray-100 text-red-600 border border-red-600 font-bold py-2 px-4 rounded-md transition-colors">刪除帳號</button>
            </div>
          </div>

          <!-- 會員資訊 卡片 -->
          <div class="bg-white p-6 lg:p-8 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-6">會員資訊</h2>
            <div class="space-y-4">
              <div class="grid grid-cols-3 items-center gap-4"><label class="text-gray-600 col-span-1">會員暱稱</label><input type="text" v-model="profileForm.nickname" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></div>
              <div class="grid grid-cols-3 items-center gap-4"><span class="text-gray-600 col-span-1">身份徽章</span><span class="font-medium text-gray-900 col-span-2">{{ profileForm.badge }}</span></div>
              <div class="grid grid-cols-3 items-center gap-4"><label class="text-gray-600 col-span-1">生日</label><input type="text" v-model="profileForm.birthDate" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></div>
              <div class="grid grid-cols-3 items-center gap-4"><label class="text-gray-600 col-span-1">性別</label><input type="text" v-model="profileForm.gender" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></div>
              <div class="grid grid-cols-3 items-center gap-4"><span class="text-gray-600 col-span-1">加入時間</span><span class="font-medium text-gray-900 col-span-2">{{ profileForm.joinDate }}</span></div>
              <div class="grid grid-cols-3 items-center gap-4"><label class="text-gray-600 col-span-1">所在地區</label><input type="text" v-model="profileForm.location" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></div>
            </div>
            <div class="mt-6 flex gap-4">
              <button class="flex-1 bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-2 px-4 rounded-md transition-colors">儲存</button>
              <button class="flex-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-400 font-bold py-2 px-4 rounded-md transition-colors">放棄修改</button>
            </div>
          </div>

        </div>
      </main>
    </div>

    <Thefooter />
  </div>
</template>

<style scoped>
/* 既有樣式重用 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.sticky {
  position: -webkit-sticky;
  position: sticky;
}
</style>