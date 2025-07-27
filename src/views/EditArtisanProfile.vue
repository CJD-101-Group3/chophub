<script setup>
import { ref, reactive } from 'vue';
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
// 引入所有需要的圖片資源，確保路徑正確
import userp from '../assets/users/userp.png';
import selectedWeaponImage from '../assets/weapons/selected-weapon.png';
import weapon2 from '../assets/weapons/weapon2.png';
import weapon3 from '../assets/weapons/weapon3.png';
import weapon4 from '../assets/weapons/weapon4.png';
import weapon5 from '../assets/weapons/weapon5.png';
import badge1 from '../assets/badges/badge1.png';
import badge2 from '../assets/badges/badge2.png';
import badge3 from '../assets/badges/badge3.png';
import badge4 from '../assets/badges/badge4.png';
import badge5 from '../assets/badges/badge5.png';

// (手機版) 下拉選單狀態
const isDropdownOpen = ref(false);
const toggleDropdown = () => isDropdownOpen.value = !isDropdownOpen.value;

// (電腦版) 側邊欄狀態
const activeTab = ref('會員資訊');
const menuItems = ref([
  { name: '會員資訊', href: '#' },
  { name: '貼文相關', href: '#' },
  { name: '收藏相關', href: '#' },
  { name: '我的活動', href: '#' },
  { name: '其他設定', href: '#' },
]);

// 原始會員資料
const memberInfo = ref({
  name: '露比匠',
  avatarUrl: userp,
  email: 'rubi520@gmail.com',
  password: 'r******4',
  backupEmail: 'rubija@gmail.com',
  nickname: 'RUBI',
  badge: '刀匠 / 一般',
  birthDate: '1997/06/28',
  gender: '男',
  joinDate: '2025/05/20',
  location: '加州',
  artisanIntro: '不破百鍊，鋼鐵不滅。\n股肱折疊，臂膀不滅。\n吾心如鏡，無所掛礙，故無所不斷。',
  artisanCard: {
    slogan: '眼盲，心不止。',
    experience: '20 年',
    specialty: '戰術直刀 / 日式武士刀 / 戰術斧頭',
    style: '自由心流',
  },
});

// 用於表單綁定的資料物件
const profileForm = reactive({
  ...memberInfo.value,
  password: '',
  featuredWeaponUrls: [
    selectedWeaponImage, weapon2, weapon3, weapon4, weapon5,
  ],
  // --- 主要改動點：新增社群連結資料 ---
  socialLinks: [
    { id: 1, platform: 'YOUTUBE', handle: '@Hattori_Hanzo5777' },
    { id: 2, platform: 'X', handle: '@Hattori_Hanzo5777' },
    { id: 3, platform: 'Podcast', handle: '專訪：聽見火光的聲音' },
    { id: 4, platform: 'Instagram', handle: '@Hattori_Hanzo5777' },
    { id: 5, platform: 'Gmail', handle: 'Hattori5777@gmail.com' },
  ]
});

// 徽章資料
const allBadges = ref([
  { id: 1, imageUrl: badge1, name: '黑鐵級刀匠' },
  { id: 2, imageUrl: badge2, name: '赤火初煉者' },
  { id: 3, imageUrl: badge3, name: '登入王' },
  { id: 4, imageUrl: badge4, name: '社群新星' },
  { id: 5, imageUrl: badge5, name: '新手村村民' },
]);

// --- 主要改動點：新增社群連結的處理函數 ---
const addSocialLink = () => {
  profileForm.socialLinks.push({
    id: Date.now(), // 用時間戳確保ID唯一
    platform: '',
    handle: ''
  });
};

const removeSocialLink = (index) => {
  profileForm.socialLinks.splice(index, 1);
};

</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Theheader />

    <div class="flex-1 container mx-auto p-4 lg:flex lg:gap-8 lg:p-8">
      <!-- 左側邊欄 -->
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" :class="{'rotate-180': isDropdownOpen}"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
          </button>
          <transition name="fade">
            <div v-if="isDropdownOpen" class="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg">
              <a v-for="item in menuItems" :key="item.name" :href="item.href" class="block px-4 py-3 text-gray-700 hover:bg-[#F2994A] hover:text-white">{{ item.name }}</a>
            </div>
          </transition>
        </div>

        <!-- 主內容 -->
        <div class="space-y-8 max-w-2xl mx-auto">
          
          <!-- 大頭照編輯區 (保留) -->
          <div class="relative w-80 h-96 mx-auto">
            <img :src="profileForm.avatarUrl" alt="User Avatar" class="w-full h-full object-cover rounded-xl shadow-lg">
            <div class="absolute bottom-0 left-0 right-0 h-1/3 bg-black bg-opacity-40 rounded-b-xl flex items-center justify-center gap-4 p-2">
              <button class="text-sm bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-2 px-4 rounded-md transition-colors">圖片上傳</button>
              <button class="text-sm bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md transition-colors">圖片移除</button>
            </div>
          </div>

          <!-- 帳號與安全 卡片 (保留) -->
          <div class="bg-white p-6 lg:p-8 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-6">帳號與安全</h2>
            <div class="space-y-4">
              <div class="grid grid-cols-3 items-center gap-4"><span class="text-gray-600 col-span-1">電子信箱</span><span class="font-medium text-gray-900 col-span-2">{{ profileForm.email }}</span></div>
              <div class="grid grid-cols-3 items-center gap-4"><label for="password" class="text-gray-600 col-span-1">密碼</label><input id="password" type="password" v-model="profileForm.password" placeholder="請輸入新密碼" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></div>
              <div class="grid grid-cols-3 items-center gap-4"><label for="backupEmail" class="text-gray-600 col-span-1">備用信箱</label><input id="backupEmail" type="email" v-model="profileForm.backupEmail" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></div>
            </div>
            <div class="mt-6 flex gap-4">
              <button class="flex-1 bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-2 px-4 rounded-md transition-colors">儲存</button>
              <button class="flex-1 bg-white hover:bg-gray-100 text-red-600 border border-red-600 font-bold py-2 px-4 rounded-md transition-colors">刪除帳號</button>
            </div>
          </div>

          <!-- 會員資訊 卡片 (保留) -->
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
          
          <!-- 刀匠簡介 卡片 (保留) -->
          <div class="bg-white p-6 lg:p-8 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-6">刀匠簡介</h2>
            <div class="space-y-4">
               <div class="grid grid-cols-3 gap-4">
                <label class="text-gray-600 col-span-1 pt-2">簡介內容</label>
                <textarea v-model="profileForm.artisanIntro" rows="5" class="col-span-2 w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></textarea>
              </div>
            </div>
             <div class="mt-6 flex gap-4">
              <button class="flex-1 bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-2 px-4 rounded-md transition-colors">儲存</button>
              <button class="flex-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-400 font-bold py-2 px-4 rounded-md transition-colors">放棄修改</button>
            </div>
          </div>

          <!-- 刀匠卡片 編輯區 (保留) -->
          <div class="bg-white p-6 lg:p-8 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-6">刀匠卡片</h2>
            <div class="space-y-4">
              <div class="grid grid-cols-3 items-center gap-4"><label class="text-gray-600 col-span-1">刀匠語錄</label><input type="text" v-model="profileForm.artisanCard.slogan" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></div>
              <div class="grid grid-cols-3 items-center gap-4"><label class="text-gray-600 col-span-1">鍛造資歷</label><input type="text" v-model="profileForm.artisanCard.experience" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></div>
              <div class="grid grid-cols-3 items-center gap-4"><label class="text-gray-600 col-span-1">專精領域</label><input type="text" v-model="profileForm.artisanCard.specialty" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></div>
              <div class="grid grid-cols-3 items-center gap-4"><label class="text-gray-600 col-span-1">流派</label><input type="text" v-model="profileForm.artisanCard.style" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></div>
            </div>
             <div class="mt-6 flex gap-4">
              <button class="flex-1 bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-2 px-4 rounded-md transition-colors">儲存</button>
              <button class="flex-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-400 font-bold py-2 px-4 rounded-md transition-colors">放棄修改</button>
            </div>
          </div>
          
            <!-- 社群連結 編輯區 -->
          <div class="bg-white p-6 lg:p-8 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-6">社群連結</h2>
            <div class="space-y-4">
              <!-- v-for 遍歷現有的社群連結 -->
              <div v-for="(link, index) in profileForm.socialLinks" :key="link.id" class="flex items-center gap-2">
                <input type="text" v-model="link.platform" placeholder="平台 (例如 YOUTUBE)" class="w-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]">
                <input type="text" v-model="link.handle" placeholder="帳號或連結" class="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]">
                <button @click="removeSocialLink(index)" class="p-2 text-[#D96570] hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                </button>
              </div>
            </div>
            <!-- 新增按鈕 -->
            <div class="mt-4 flex justify-center">
              <button @click="addSocialLink" class="w-12 h-12 bg-[#F2994A] rounded-full text-white text-3xl flex items-center justify-center shadow-lg hover:bg-[#E88C3A] transform hover:scale-110 transition-transform">
                +
              </button>
            </div>
             <div class="mt-6 flex gap-4">
              <button class="flex-1 bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-2 px-4 rounded-md transition-colors">儲存連結</button>
            </div>
          </div>

          <!-- 刀匠精選武器 (保留) -->
          <div class="bg-[#E2E9EF] p-6 lg:p-8 rounded-lg shadow-sm">
            <h2 class="text-xl font-bold text-gray-800 mb-6">刀匠精選武器</h2>
            <div class="flex space-x-6 overflow-x-auto pb-4 flex-nowrap">
              <div
                v-for="(weaponUrl, idx) in profileForm.featuredWeaponUrls"
                :key="idx"
                class="w-40 h-40 lg:w-48 lg:h-48 bg-white p-2 rounded-lg shadow-md overflow-hidden flex items-center justify-center flex-shrink-0"
              >
                <img :src="weaponUrl" alt="精選武器" class="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <!-- 所有徽章 展示區 (保留) -->
          <div class="bg-[#E2E9EF] p-6 lg:p-8 rounded-lg shadow-sm">
            <h2 class="text-xl font-bold text-gray-800 mb-6">刀匠徽章</h2>
            <div class="flex space-x-6 overflow-x-auto pb-4">
              <div v-for="badge in allBadges" :key="badge.id" class="flex flex-col items-center space-y-3 flex-shrink-0">
                <div class="w-40 h-40 lg:w-48 lg:h-48 bg-gray-800/20 p-2 rounded-lg shadow-md overflow-hidden">
                  <img :src="badge.imageUrl" :alt="badge.name" class="w-full h-full object-contain">
                </div>
                <span class="font-semibold text-gray-800 text-center">{{ badge.name }}</span>
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
/* 既有樣式 */
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

/* 美化滾動條 */
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