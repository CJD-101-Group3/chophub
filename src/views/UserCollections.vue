<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getPublicImg } from '@/utils/getPublicImg';
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
// 定義響應式變量
const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};

// --- 通用佈局相關的資料 ---
const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const activeTab = ref('收藏相關');

const menuItems = ref([
  { name: '會員資訊', href: '/UserProfile' },
  { name: '貼文相關', href: '/PostActivity' },
  { name: '收藏相關', href: '/UserCollections' },
  { name: '其他設定', href: '/OtherSettings' },
]);

const memberInfo = ref({
  name: '露比匠',
  avatarUrl: getPublicImg('users/userp.png'),
});

// --- 「收藏的武器」區塊，準備接收 API 資料 ---
const collectedWeapons = ref([]);
const loadingWeapons = ref(false);
const errorWeapons = ref(null);

// --- 「收藏的徽章」區塊，準備接收 API 資料 ---
const collectedBadges = ref([]);
const loadingBadges = ref(false);
const errorBadges = ref(null);


// 呼叫「收藏的武器」API
async function fetchFavoriteWeapons() {
  loadingWeapons.value = true;
  errorWeapons.value = null;
  const userId = authStore.userId;

  try {
    const response = await axios.get(`http://localhost:8888/ChopHub-API/api/get_user_favorite_weapons.php?user_id=${userId}`);
    if (response.data.status === 'success') {
      collectedWeapons.value = response.data.data;
    } else {
      throw new Error(response.data.message || '無法載入武器收藏');
    }
  } catch (err) {
    console.error('請求「武器收藏」API 失敗:', err);
    errorWeapons.value = '資料載入失敗，請稍後再試。';
  } finally {
    loadingWeapons.value = false;
  }
}

// 呼叫「擁有的徽章」API
async function fetchUserAchievements() {
  loadingBadges.value = true;
  errorBadges.value = null;
  const userId = authStore.userId;

  try {
    const response = await axios.get(`http://localhost:8888/ChopHub-API/api/get_user_achievements.php?user_id=${userId}`);
    if (response.data.status === 'success') {
      collectedBadges.value = response.data.data;
    } else {
      throw new Error(response.data.message || '無法載入徽章收藏');
    }
  } catch (err) {
    console.error('請求「徽章收藏」API 失敗:', err);
    errorBadges.value = '資料載入失敗，請稍後再試。';
  } finally {
    loadingBadges.value = false;
  }
}

// 在元件掛載後同時執行兩個 API 請求
onMounted(async () => {
  fetchFavoriteWeapons();
  fetchUserAchievements();

  // 取得使用者頭像
  try {
    const userId = authStore.userId;
    const response = await axios.get('http://localhost:8888/ChopHub-API/api/userProfile.php', {
      params: { user_id: userId }
    });
    if (response.data.status === 'success') {
      const userData = response.data.data;
      memberInfo.value.avatarUrl = userData.avatar_url
        ? `http://localhost:8888/ChopHub-API/${userData.avatar_url}`
        : getPublicImg('users/userp.png');
      memberInfo.value.name = userData.display_name;
    }
  } catch (err) {
    console.error('載入使用者頭像失敗:', err);
    memberInfo.value.avatarUrl = getPublicImg('users/userp.png');
  }
});


// (前端操作) 切換徽章配戴狀態
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
  // 注意：這裡的改變只在前端。若要儲存，需在點擊「儲存」按鈕時，
  // 將 collectedBadges 的狀態發送到後端 API 進行更新。
};

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
      <!-- 左側邊欄 (電腦版顯示) -->
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
              @click="activeTab = item.name"
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
            <div v-if="isDropdownOpen" class="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
              <router-link v-for="item in menuItems" :key="item.name" :to="item.href" class="block px-4 py-3 text-gray-700 hover:bg-[#F2994A] hover:text-white">{{ item.name }}</router-link>
            </div>
          </transition>
        </div>
        
        <!-- 主內容 -->
        <div class="space-y-8">

          <!-- 我收藏的武器 -->
          <div class="bg-white p-6 lg:p-8 rounded-lg max-w-4xl mx-auto min-h-[300px]" style="box-shadow: 0 15px 30px rgba(255, 255, 255, 0.4);">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">我收藏的武器</h2>
            
            <div v-if="loadingWeapons" class="text-center text-gray-500">載入中...</div>
            <div v-else-if="errorWeapons" class="text-center text-red-500">{{ errorWeapons }}</div>
            <div v-else-if="collectedWeapons.length === 0" class="text-center text-gray-500">尚未收藏任何武器。</div>

            <div v-else class="flex space-x-6 overflow-x-auto pb-4">
              <a v-for="weapon in collectedWeapons" :key="weapon.id" :href="'/weaponslist/weapondetail/' + weapon.id" class="flex-shrink-0 group">
                <div class="w-48 h-48 lg:w-56 lg:h-56 bg-white p-2 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
                  <img :src="weapon.imageUrl" :alt="weapon.name" class="w-full h-full object-contain">
                </div>
              </a>
            </div>
          </div>

          <!-- 我收藏的徽章 -->
          <div class="bg-white p-6 lg:p-8 rounded-lg max-w-4xl mx-auto min-h-[300px]" style="box-shadow: 0 15px 30px rgba(255, 255, 255, 0.4);">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">我收藏的徽章</h2>

            <div v-if="loadingBadges" class="text-center text-gray-500">載入中...</div>
            <div v-else-if="errorBadges" class="text-center text-red-500">{{ errorBadges }}</div>
            <div v-else-if="collectedBadges.length === 0" class="text-center text-gray-500">尚未獲得任何徽章。</div>
            
            <div v-else>
              <div class="flex space-x-6 overflow-x-auto pb-4">
                <div v-for="badge in collectedBadges" :key="badge.id" class="flex flex-col items-center space-y-3 flex-shrink-0">
                  <div class="w-40 h-40 lg:w-48 lg:h-48 bg-white p-2 rounded-lg shadow-md overflow-hidden">
                    <img :src="badge.imageUrl" :alt="badge.name" class="w-full h-full object-contain">
                  </div>
                  <span class="font-semibold text-gray-800">{{ badge.name }}</span>
                  <!-- <button
                    @click="toggleEquip(badge.id)"
                    class="w-32 text-white font-bold py-2 px-4 rounded-[8px] transition-colors duration-200"
                    :class="badge.isEquipped ? 'bg-[#D15B5B] hover:bg-[#b94a4a]' : 'bg-gray-400 hover:bg-gray-500'"
                  >
                    {{ badge.isEquipped ? '配戴中' : '配戴' }}
                  </button> -->
                </div>
              </div>
              <!-- 儲存按鈕 -->
              <div class="mt-6 text-center">
                <!-- <button
                  class="w-full lg:w-auto bg-[#F2994A] text-white font-bold py-3 px-16 rounded-[8px] transition-colors duration-300 border-2 border-transparent
                         hover:bg-white hover:text-black hover:border-[#F2994A]"
                >
                  儲存
                </button> -->
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

/* 美化滾動條 (可選) */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}
.overflow-x-auto::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 10px;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #F2994A;
  border-radius: 10px;
  border: 2px solid #F2994A;
}
.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background-color: #F2994A;
}
</style>