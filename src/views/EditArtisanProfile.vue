<script setup>
import { ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
// 引入圖片資源
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

const route = useRoute();

const menuItems = ref([
  { name: '會員資訊', href: '/UserProfile' },
  { name: '貼文相關', href: '/PostActivity' },
  { name: '收藏相關', href: '/UserCollections' },
  { name: '我的活動', href: '/MyActivities' },
  { name: '其他設定', href: '/OtherSettings' },
]);

const activeTab = computed(() => {
  const currentRoute = menuItems.value.find(item => item.href === route.path);
  return currentRoute ? currentRoute.name : '會員資訊';
});

const countries = ref([
  "美國", "英國", "臺灣", "日本", "韓國", "中國", "香港", "澳門", "新加坡", "馬來西亞", "加拿大", "澳大利亞", "德國", "法國", "義大利", "西班牙", "印度", "巴西", "俄羅斯", "阿富汗", "阿爾巴尼亞", "阿爾及利亞", "安道爾", "安哥拉", "阿根廷", "亞美尼亞", "奧地利", "亞塞拜然", "巴哈馬", "巴林", "孟加拉", "巴貝多", "白俄羅斯", "比利時", "貝里斯", "不丹", "玻利維亞", "波士尼亞與赫塞哥維納", "波札那", "汶萊", "保加利亞", "柬埔寨", "喀麥隆", "中非共和國", "查德", "智利", "哥倫比亞", "剛果", "哥斯大黎加", "克羅埃西亞", "古巴", "賽普勒斯", "捷克", "丹麥", "吉布地", "多明尼加", "厄瓜多", "埃及", "薩爾瓦多", "赤道幾內亞", "愛沙尼亞", "衣索比亞", "斐濟", "芬蘭", "喬治亞", "迦納", "希臘", "瓜地馬拉", "幾內亞", "蓋亞那", "海地", "宏都拉斯", "匈牙利", "冰島", "印尼", "伊朗", "伊拉克", "愛爾蘭", "以色列", "牙買加", "約旦", "哈薩克", "肯亞", "科威特", "吉爾吉斯", "寮國", "拉脫維亞", "黎巴嫩", "賴比瑞亞", "利比亞", "列支敦斯登", "立陶宛", "盧森堡", "馬達加斯加", "馬拉威", "馬爾地夫", "馬利", "馬爾他", "茅利塔尼亞", "模里西斯", "墨西哥", "摩爾多瓦", "摩納哥", "蒙古", "蒙特內哥羅", "摩洛哥", "莫三比克", "緬甸", "納米比亞", "尼泊爾", "荷蘭", "紐西蘭", "尼加拉瓜", "奈及利亞", "北韓", "北馬其頓", "挪威", "阿曼", "巴基斯坦", "巴拿馬", "巴拉圭", "秘魯", "菲律賓", "波蘭", "葡萄牙", "卡達", "羅馬尼亞", "盧安達", "聖馬利諾", "沙烏地阿拉伯", "塞內加爾", "塞爾維亞", "獅子山", "斯洛伐克", "斯洛維尼亞", "索馬利亞", "南非", "南韓", "斯里蘭卡", "蘇丹", "瑞典", "瑞士", "敘利亞", "塔吉克", "坦尚尼亞", "泰國", "東帝汶", "多哥", "千里達及托巴哥", "突尼西亞", "土耳其", "土庫曼", "烏干達", "烏克蘭", "阿拉伯聯合大公國", "烏拉圭", "烏茲別克", "梵蒂岡", "委內瑞拉", "越南", "葉門", "尚比亞", "辛巴威"
]);

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
  location: '臺灣',
  artisanIntro: '不破百鍊，鋼鐵不滅。\n股肱折疊，臂膀不滅。\n吾心如鏡，無所掛礙，故無所不斷。',
  artisanCard: {
    slogan: '眼盲，心不止。',
    experience: '20 年',
    specialty: '戰術直刀 / 日式武士刀 / 戰術斧頭',
    style: '自由心流',
  },
});

const profileForm = reactive({
  ...memberInfo.value,
  password: '',
  featuredWeaponUrls: [selectedWeaponImage, weapon2, weapon3, weapon4, weapon5],
  socialLinks: [
    { id: 1, platform: 'YOUTUBE', handle: '@Hattori_Hanzo5777' },
    { id: 2, platform: 'X', handle: '@Hattori_Hanzo5777' },
    { id: 3, platform: 'Podcast', handle: '專訪：聽見火光的聲音' },
    { id: 4, platform: 'Instagram', handle: '@Hattori_Hanzo5777' },
    { id: 5, platform: 'Gmail', handle: 'Hattori5777@gmail.com' },
  ]
});

const allBadges = ref([
  { id: 1, imageUrl: badge1, name: '黑鐵級刀匠' },
  { id: 2, imageUrl: badge2, name: '赤火初煉者' },
  { id: 3, imageUrl: badge3, name: '登入王' },
  { id: 4, imageUrl: badge4, name: '社群新星' },
  { id: 5, imageUrl: badge5, name: '新手村村民' },
]);

const addSocialLink = () => {
  profileForm.socialLinks.push({ id: Date.now(), platform: '', handle: '' });
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
            <router-link
              v-for="item in menuItems"
              :key="item.name"
              :to="item.href"
              class="px-4 py-3 text-center rounded-md font-semibold transition-colors duration-200"
              :class="{
                'bg-[#F2B94C] text-white hover:text-white': activeTab === item.name,
                'text-gray-600 hover:bg-[#F2994A] hover:text-white': activeTab !== item.name
              }"
            >
              {{ item.name }}
            </router-link>
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
              <router-link v-for="item in menuItems" :key="item.name" :to="item.href" class="block px-4 py-3 text-gray-700 hover:bg-[#F2994A] hover:text-white">{{ item.name }}</router-link>
            </div>
          </transition>
        </div>

        <!-- 主內容 -->
        <div class="space-y-8 max-w-2xl mx-auto">
          
          <!-- **【修改處】** 大頭照編輯區改為圓形 -->
          <div class="relative w-72 h-72 mx-auto group">
            <img :src="profileForm.avatarUrl" alt="User Avatar" class="w-full h-full object-cover rounded-full shadow-lg">
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full flex items-center justify-center gap-4 p-2 transition-opacity duration-300">
              <button class="text-sm bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-2 px-4 rounded-md transition-all opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 duration-300">圖片上傳</button>
              <button class="text-sm bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md transition-all opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 duration-300 delay-100">圖片移除</button>
            </div>
          </div>

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

          <div class="bg-white p-6 lg:p-8 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-6">會員資訊</h2>
            <div class="space-y-4">
              <div class="grid grid-cols-3 items-center gap-4"><label class="text-gray-600 col-span-1">會員暱稱</label><input type="text" v-model="profileForm.nickname" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></div>
              <div class="grid grid-cols-3 items-center gap-4"><span class="text-gray-600 col-span-1">身份徽章</span><span class="font-medium text-gray-900 col-span-2">{{ profileForm.badge }}</span></div>
              <div class="grid grid-cols-3 items-center gap-4"><label class="text-gray-600 col-span-1">生日</label><input type="text" v-model="profileForm.birthDate" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></div>
              <div class="grid grid-cols-3 items-center gap-4">
                <label class="text-gray-600 col-span-1">性別</label>
                <select v-model="profileForm.gender" class="col-span-2 w-1/2 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]">
                  <option>男</option>
                  <option>女</option>
                </select>
              </div>
              <div class="grid grid-cols-3 items-center gap-4"><span class="text-gray-600 col-span-1">加入時間</span><span class="font-medium text-gray-900 col-span-2">{{ profileForm.joinDate }}</span></div>
              <div class="grid grid-cols-3 items-center gap-4">
                <label class="text-gray-600 col-span-1">所在地區</label>
                <select v-model="profileForm.location" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]">
                  <option disabled value="">請選擇地區</option>
                  <option v-for="country in countries" :key="country" :value="country">
                    {{ country }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mt-6 flex gap-4">
              <button class="flex-1 bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-2 px-4 rounded-md transition-colors">儲存</button>
              <button class="flex-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-400 font-bold py-2 px-4 rounded-md transition-colors">放棄修改</button>
            </div>
          </div>
          
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
          
          <div class="bg-white p-6 lg:p-8 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-6">社群連結</h2>
            <div class="space-y-4">
              <div v-for="(link, index) in profileForm.socialLinks" :key="link.id" class="flex items-center gap-2">
                <input type="text" v-model="link.platform" placeholder="平台 (例如 YOUTUBE)" class="w-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]">
                <input type="text" v-model="link.handle" placeholder="帳號或連結" class="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]">
                <button @click="removeSocialLink(index)" class="p-2 text-[#D96570] hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                </button>
              </div>
            </div>
            <div class="mt-4 flex justify-center">
              <button @click="addSocialLink" class="w-12 h-12 bg-[#F2994A] rounded-full text-white text-3xl flex items-center justify-center shadow-lg hover:bg-[#E88C3A] transform hover:scale-110 transition-transform">
                +
              </button>
            </div>
             <div class="mt-6 flex gap-4">
              <button class="flex-1 bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-2 px-4 rounded-md transition-colors">儲存連結</button>
            </div>
          </div>

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