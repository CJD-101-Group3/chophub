<script setup>
import { ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getPublicImg } from '@/utils/getPublicImg'; // 

import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';


// 定義響應式變量
const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};

// (手機版) 下拉選單狀態
const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const route = useRoute();

// **【修改處】** 從 menuItems 陣列中移除 '我的活動'
const menuItems = ref([
  { name: '會員資訊', href: '/UserProfile' },
  { name: '貼文相關', href: '/PostActivity' },
  { name: '收藏相關', href: '/UserCollections' },
  // { name: '我的活動', href: '/MyActivities' }, // <--- 已移除
  { name: '其他設定', href: '/OtherSettings' },
]);

// 透過 computed 屬性來動態判斷當前 active 的頁籤名稱
const activeTab = computed(() => {
  const currentRoute = menuItems.value.find(item => item.href === route.path);
  // 如果找不到對應路由，預設高亮 '會員資訊'
  return currentRoute ? currentRoute.name : '會員資訊';
});

const countries = ref([
"美國", "英國", "臺灣", "日本", "韓國", "中國", "香港", "澳門", "新加坡", "馬來西亞", "加拿大", "澳大利亞", "德國", "法國", "義大利", "西班牙", "印度", "巴西", "俄羅斯", "阿富汗", "阿爾巴尼亞", "阿爾及利亞", "安道爾", "安哥拉", "阿根廷", "亞美尼亞", "奧地利", "亞塞拜然", "巴哈馬", "巴林", "孟加拉", "巴貝多", "白俄羅斯", "比利時", "貝里斯", "不丹", "玻利維亞", "波士尼亞與赫塞哥維納", "波札那", "汶萊", "保加利亞", "柬埔寨", "喀麥隆", "中非共和國", "查德", "智利", "哥倫比亞", "剛果", "哥斯大黎加", "克羅埃西亞", "古巴", "賽普勒斯", "捷克", "丹麥", "吉布地", "多明尼加", "厄瓜多", "埃及", "薩爾瓦多", "赤道幾內亞", "愛沙尼亞", "衣索比亞", "斐濟", "芬蘭", "喬治亞", "迦納", "希臘", "瓜地馬拉", "幾內亞", "蓋亞那", "海地", "宏都拉斯", "匈牙利", "冰島", "印尼", "伊朗", "伊拉克", "愛爾蘭", "以色列", "牙買加", "約旦", "哈薩克", "肯亞", "科威特", "吉爾吉斯", "寮國", "拉脫維亞", "黎巴嫩", "賴比瑞亞", "利比亞", "列支敦斯登", "立陶宛", "盧森堡", "馬達加斯加", "馬拉威", "馬爾地夫", "馬利", "馬爾他", "茅利塔尼亞", "模里西斯", "墨西哥", "摩爾多瓦", "摩納哥", "蒙古", "蒙特內哥羅", "摩洛哥", "莫三比克", "緬甸", "納米比亞", "尼泊爾", "荷蘭", "紐西蘭", "尼加拉瓜", "奈及利亞", "北韓", "北馬其頓", "挪威", "阿曼", "巴基斯坦", "巴拿馬", "巴拉圭", "秘魯", "菲律賓", "波蘭", "葡萄牙", "卡達", "羅馬尼亞", "盧安達", "聖馬利諾", "沙烏地阿拉伯", "塞內加爾", "塞爾維亞", "獅子山", "斯洛伐克", "斯洛維尼亞", "索馬利亞", "南非", "南韓", "斯里蘭卡", "蘇丹", "瑞典", "瑞士", "敘利亞", "塔吉克", "坦尚尼亞", "泰國", "東帝汶", "多哥", "千里達及托巴哥", "突尼西亞", "土耳其", "土庫曼", "烏干達", "烏克蘭", "阿拉伯聯合大公國", "烏拉圭", "烏茲別克", "梵蒂岡", "委內瑞拉", "越南", "葉門", "尚比亞", "辛巴威"
]);

const memberInfo = ref({
  name: '露比匠',
  avatarUrl: getPublicImg('users/userp.png'), // 
  email: 'rubi520@gmail.com',
  password: 'r******4',
  backupEmail: 'rubija@gmail.com',
  nickname: 'RUBI',
  badge: '刀匠 / 一般',
  birthDate: '1997/06/28',
  gender: '男',
  joinDate: '2025/05/20',
  location: '臺灣',
});

const profileForm = reactive({ ...memberInfo.value });
profileForm.password = ''; 

</script>

<template>
          <div class="absolute inset-0 -z-10">
      <vue-particles
      id="tsparticles"
      @particles-loaded="particlesLoaded"
      :options="{
        autoPlay: true,
        background: {
          color: {
            value: '#28282828',
          },
          image: '',
          position: '50% 50%',
          repeat: 'no-repeat',
          size: '20%',
          opacity: 1,
        },
        backgroundMask: {
          composite: 'destination-out',
          cover: {
            opacity: 1,
            color: {
              value: '',
            },
          },
          enable: false,
        },
        clear: true,
        defaultThemes: {},
        delay: 0,
        fullScreen: {
          enable: true,
          zIndex: 0,
        },
        detectRetina: true,
        duration: 0,
        fpsLimit: 120,
        interactivity: {
          detectsOn: 'window',
          events: {
            onClick: {
              enable: true,
              mode: 'repulse',
            },
            onDiv: {
              selectors: {},
              enable: false,
              mode: {},
              type: 'circle',
            },
            onHover: {
              enable: true,
              mode: 'bubble',
              parallax: {
                enable: false,
                force: 2,
                smooth: 10,
              },
            },
            resize: {
              delay: 0.5,
              enable: true,
            },
          },
          modes: {
            trail: {
              delay: 1,
              pauseOnStop: false,
              quantity: 1,
            },
            attract: {
              distance: 200,
              duration: 0.4,
              easing: 'ease-out-quad',
              factor: 1,
              maxSpeed: 50,
              speed: 1,
            },
            bounce: {
              distance: 200,
            },
            bubble: {
              distance: 250,
              duration: 2,
              mix: false,
              opacity: 0,
              size: 0,
              divs: {
                distance: 200,
                duration: 0.4,
                mix: false,
                selectors: {},
              },
            },
            connect: {
              distance: 80,
              links: {
                opacity: 0.5,
              },
              radius: 60,
            },
            grab: {
              distance: 400,
              links: {
                blink: false,
                consent: false,
                opacity: 1,
              },
            },
            push: {
              default: true,
              groups: [],
              quantity: 4,
            },
            remove: {
              quantity: 2,
            },
            repulse: {
              distance: 400,
              duration: 0.4,
              factor: 100,
              speed: 1,
              maxSpeed: 50,
              easing: 'ease-out-quad',
              divs: {
                distance: 200,
                duration: 0.4,
                factor: 100,
                speed: 1,
                maxSpeed: 50,
                easing: 'ease-out-quad',
                selectors: {},
              },
            },
            slow: {
              factor: 3,
              radius: 200,
            },
            particle: {
              replaceCursor: false,
              pauseOnStop: false,
              stopDelay: 0,
            },
            light: {
              area: {
                gradient: {
                  start: {
                    value: '#F2994A',
                  },
                  stop: {
                    value: '#000000',
                  },
                },
                radius: 1000,
              },
              shadow: {
                color: {
                  value: '#000000',
                },
                length: 2000,
              },
            },
          },
        },
        manualParticles: [],
        particles: {
          bounce: {
            horizontal: {
              value: 1,
            },
            vertical: {
              value: 1,
            },
          },
          collisions: {
            absorb: {
              speed: 2,
            },
            bounce: {
              horizontal: {
                value: 1,
              },
              vertical: {
                value: 1,
              },
            },
            enable: false,
            maxSpeed: 50,
            mode: 'bounce',
            overlap: {
              enable: true,
              retries: 0,
            },
          },
          color: {
            value: '#F2994A',
            animation: {
              h: {
                count: 0,
                enable: false,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: true,
                offset: 0,
              },
              s: {
                count: 0,
                enable: false,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: true,
                offset: 0,
              },
              l: {
                count: 0,
                enable: false,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: true,
                offset: 0,
              },
            },
          },
          effect: {
            close: true,
            fill: true,
            options: {},
            type: {},
          },
          groups: {},
          move: {
            angle: {
              offset: 0,
              value: 90,
            },
            attract: {
              distance: 200,
              enable: false,
              rotate: {
                x: 3000,
                y: 3000,
              },
            },
            center: {
              x: 50,
              y: 50,
              mode: 'percent',
              radius: 0,
            },
            decay: 0,
            distance: {},
            direction: 'none',
            drift: 0,
            enable: true,
            gravity: {
              acceleration: 9.81,
              enable: false,
              inverse: false,
              maxSpeed: 50,
            },
            path: {
              clamp: true,
              delay: {
                value: 0,
              },
              enable: false,
              options: {},
            },
            outModes: {
              default: 'out',
              bottom: 'out',
              left: 'out',
              right: 'out',
              top: 'out',
            },
            random: false,
            size: false,
            speed: {
              min: 0.1,
              max: 1,
            },
            spin: {
              acceleration: 0,
              enable: false,
            },
            straight: false,
            trail: {
              enable: false,
              length: 10,
              fill: {},
            },
            vibrate: false,
            warp: false,
          },
          number: {
            density: {
              enable: true,
              width: 1920,
              height: 1080,
            },
            limit: {
              mode: 'delete',
              value: 0,
            },
            value: 160,
          },
          opacity: {
            value: {
              min: 0.1,
              max: 1,
            },
            animation: {
              count: 0,
              enable: true,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: false,
              mode: 'auto',
              startValue: 'random',
              destroy: 'none',
            },
          },
          reduceDuplicates: false,
          shadow: {
            blur: 0,
            color: {
              value: '#000',
            },
            enable: false,
            offset: {
              x: 0,
              y: 0,
            },
          },
          shape: {
            close: true,
            fill: true,
            options: {},
            type: 'circle',
          },
          size: {
            value: {
              min: 2,
              max: 3,
            },
            animation: {
              count: 0,
              enable: false,
              speed: 5,
              decay: 0,
              delay: 0,
              sync: false,
              mode: 'auto',
              startValue: 'random',
              destroy: 'none',
            },
          },
          stroke: {
            width: 0,
          },
          zIndex: {
            value: 0,
            opacityRate: 1,
            sizeRate: 1,
            velocityRate: 1,
          },
          destroy: {
            bounds: {},
            mode: 'none',
            split: {
              count: 1,
              factor: {
                value: 3,
              },
              rate: {
                value: {
                  min: 4,
                  max: 9,
                },
              },
              sizeOffset: true,
              particles: {},
            },
          },
          roll: {
            darken: {
              enable: false,
              value: 0,
            },
            enable: false,
            enlighten: {
              enable: false,
              value: 0,
            },
            mode: 'vertical',
            speed: 25,
          },
          tilt: {
            value: 0,
            animation: {
              enable: false,
              speed: 0,
              decay: 0,
              sync: false,
            },
            direction: 'clockwise',
            enable: false,
          },
          twinkle: {
            lines: {
              enable: false,
              frequency: 0.05,
              opacity: 1,
            },
            particles: {
              enable: false,
              frequency: 0.05,
              opacity: 1,
            },
          },
          wobble: {
            distance: 5,
            enable: false,
            speed: {
              angle: 50,
              move: 10,
            },
          },
          life: {
            count: 0,
            delay: {
              value: 0,
              sync: false,
            },
            duration: {
              value: 0,
              sync: false,
            },
          },
          rotate: {
            value: 0,
            animation: {
              enable: false,
              speed: 0,
              decay: 0,
              sync: false,
            },
            direction: 'clockwise',
            path: false,
          },
          orbit: {
            animation: {
              count: 0,
              enable: false,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: false,
            },
            enable: false,
            opacity: 1,
            rotation: {
              value: 45,
            },
            width: 1,
          },
          links: {
            blink: false,
            color: {
              value: '#fff',
            },
            consent: false,
            distance: 100,
            enable: false,
            frequency: 1,
            opacity: 1,
            shadow: {
              blur: 5,
              color: {
                value: '#000',
              },
              enable: false,
            },
            triangles: {
              enable: false,
              frequency: 1,
            },
            width: 1,
            warp: false,
          },
          repulse: {
            value: 0,
            enabled: false,
            distance: 1,
            duration: 1,
            factor: 1,
            speed: 1,
          },
        },
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        responsive: [],
        smooth: false,
        style: {},
        themes: [],
        zLayers: 100,
        key: 'nasa',
        name: 'NASA',
        motion: {
          disable: false,
          reduce: {
            factor: 4,
            value: true,
          },
        },
      }"
    />
    </div>
  <div class="flex flex-col min-h-screen ">
    <Theheader />

    <div class="flex-1 container mx-auto p-4 lg:flex lg:gap-8 lg:p-8">
      <!-- 左側邊欄 -->
      <aside class="hidden lg:block lg:w-72 flex-shrink-0">
        <div class="bg-white p-4 rounded-lg shadow-[0_8px_32px_0_rgba(255,255,255,0.4)] sticky top-24">
          <div class="flex flex-col items-center text-center border-b pb-4 mb-4">
            <img 
              :src="memberInfo.avatarUrl" 
              alt="Avatar" 
              class="w-40 h-40 rounded-full object-cover mb-3"
            />
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
          
          <div class="relative w-72 h-72 mx-auto group">
            <img :src="profileForm.avatarUrl" alt="User Avatar" class="w-full h-full object-cover rounded-full border-4 border-white">
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full flex items-center justify-center gap-4 p-2 transition-opacity duration-300">
              <button class="text-sm bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-2 px-4 rounded-md transition-all opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 duration-300">圖片上傳</button>
              <!-- <button class="text-sm bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md transition-all opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 duration-300 delay-100">圖片移除</button> -->
            </div>
          </div>

          <div class="bg-white p-6 lg:p-8 rounded-lg shadow-[0_8px_32px_0_rgba(255,255,255,0.4)]">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">帳號與安全</h2>
            <div class="space-y-4 text-xl">
              <div class="grid grid-cols-3 items-center gap-4"><span class="text-gray-600 col-span-1">電子信箱</span><span class="font-medium text-gray-900 col-span-2">{{ profileForm.email }}</span></div>
              <div class="grid grid-cols-3 items-center gap-4"><label for="password" class="text-gray-600 col-span-1">重設密碼</label><input id="password" type="password" v-model="profileForm.password" placeholder="留空為不更改密碼" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></div>
              <div class="grid grid-cols-3 items-center gap-4"><label for="backupEmail" class="text-gray-600 col-span-1">備用信箱</label><input id="backupEmail" type="email" v-model="profileForm.backupEmail" class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"></div>
            </div>
            <div class="mt-6 flex gap-4">
              <button class="flex-1 bg-[#F2994A] text-white font-bold py-2 px-4 rounded-md transition-colors  hover:border-[#F2994A] hover:brightness-110 hover:bg-white hover:text-black">
                儲存
              </button>
              <button class="flex-1 bg-white hover:bg-gray-100 text-red-600 border border-red-600 font-bold py-2 px-4 rounded-md transition-colors">刪除帳號</button>
            </div>
          </div>

          <div class="bg-white p-6 lg:p-8 rounded-lg shadow-[0_8px_32px_0_rgba(255,255,255,0.4)]">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">會員資訊</h2>
            <div class="space-y-4 text-xl">
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
              <button class="flex-1 bg-[#F2994A] text-white font-bold py-2 px-4 rounded-md transition-colors  hover:border-[#F2994A] hover:brightness-110 hover:bg-white hover:text-black">
                儲存
              </button>
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