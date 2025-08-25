<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { getPublicImg } from '@/utils/getPublicImg';
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
import { useAuthStore } from '@/stores/auth'; // 新增這行

const authStore = useAuthStore(); // 新增這行

// --- 通用佈局相關的資料 ---
const isDropdownOpen = ref(false);
const toggleDropdown = () => isDropdownOpen.value = !isDropdownOpen.value;
const route = useRoute();
const menuItems = ref([
  { name: '會員資訊', href: '/UserProfile' },
  { name: '貼文相關', href: '/PostActivity' },
  { name: '收藏相關', href: '/UserCollections' },
  { name: '其他設定', href: '/OtherSettings' },
]);
const activeTab = computed(() => {
  const currentRoute = menuItems.value.find(item => item.href === route.path);
  return currentRoute ? currentRoute.name : '其他設定';
});
const memberInfo = ref({
  name: '露比匠',
  avatarUrl: getPublicImg('users/userp.png'),
});

// --- API 相關狀態 ---
const loading = ref(true);
const error = ref(null);
const saving = ref(false);

// ******** 新增：編輯模式狀態 ********
const isEditing = ref(false);

// --- 響應式表單資料 ---
const privacySettings = reactive({
  is_collections_public: false,
  is_achievements_public: false,
  is_location_public: false,
});

const userId = authStore.userId;

// --- GET 請求，獲取目前的設定 ---
async function fetchPrivacySettings() {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get(import.meta.env.VITE_API_BASE + `user/userProfile.php?user_id=${userId}`);
    if (response.data.status === 'success') {
      const settings = response.data.data;
      privacySettings.is_collections_public = !!parseInt(settings.is_collections_public);
      privacySettings.is_achievements_public = !!parseInt(settings.is_achievements_public);
      privacySettings.is_location_public = !!parseInt(settings.is_location_public);
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    console.error("獲取隱私設定失敗:", err);
    error.value = "無法載入設定，請稍後再試。";
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await fetchPrivacySettings();

  // 取得使用者頭像
  try {
    const response = await axios.get(import.meta.env.VITE_API_BASE + `user/userProfile.php?user_id=${userId}`);
    if (response.data.status === 'success') {
      const userData = response.data.data;
      memberInfo.value.avatarUrl = userData.avatar_url
        ? import.meta.env.VITE_API_BASE + `${userData.avatar_url}`
        : getPublicImg('users/userp.png');
      memberInfo.value.name = userData.display_name;
    }
  } catch (err) {
    console.error('載入使用者頭像失敗:', err);
    memberInfo.value.avatarUrl = getPublicImg('users/userp.png');
  }
});

// --- PATCH 請求，儲存變更 ---
async function handleSave() {
  saving.value = true;
  try {
    const payload = {
      is_collections_public: privacySettings.is_collections_public ? 1 : 0,
      is_achievements_public: privacySettings.is_achievements_public ? 1 : 0,
      is_location_public: privacySettings.is_location_public ? 1 : 0,
    };
    const response = await axios.patch(
      import.meta.env.VITE_API_BASE + `user/userProfile.php?user_id=${userId}`,
      payload
    );
    if (response.data.status === 'success') {
      alert('隱私設定已更新！');
      isEditing.value = false;
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    console.error("儲存失敗:", err);
    alert(`儲存失敗: ${err.response?.data?.message || err.message}`);
    await fetchPrivacySettings();
  } finally {
    saving.value = false;
  }
}

// --- 放棄修改函式 ---
function handleCancel() {
  if (confirm('確定要放棄修改嗎？')) {
    isEditing.value = false;
    fetchPrivacySettings();
  }
}
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
  <div class="flex flex-col min-h-screen">
    <Theheader />
    <div class="flex-1 container mx-auto p-4 lg:flex lg:gap-8 lg:p-8">
      <aside class="hidden lg:block lg:w-72 flex-shrink-0">
        <div class="bg-white p-4 rounded-lg shadow-[0_8px_32px_0_rgba(255,255,255,0.4)] sticky top-24">
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
      
      <main class="flex-1">
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
        <div class="space-y-8">
          <div class="max-w-4xl mx-auto space-y-8">
            <div class="bg-white p-6 lg:p-8 rounded-lg shadow-[0_8px_32px_0_rgba(255,255,255,0.4)]">
              <h2 class="text-2xl font-bold text-gray-800 mb-6">隱私設定</h2>
              <div v-if="loading" class="text-center py-10">載入中...</div>
              <div v-else-if="error" class="text-center text-red-500 py-10">{{ error }}</div>
              <div v-else class="space-y-5">
                <template v-if="isEditing">
                  <div class="flex justify-between items-center border-b pb-4">
                    <span class="text-gray-700 text-xl">精選收藏是否公開</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="privacySettings.is_collections_public" class="sr-only peer">
                      <div class="w-14 h-8 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#F2994A]"></div>
                    </label>
                  </div>
                  <div class="flex justify-between items-center border-b pb-4">
                    <span class="text-gray-700 text-xl">成就徽章是否公開</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="privacySettings.is_achievements_public" class="sr-only peer">
                      <div class="w-14 h-8 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#F2994A]"></div>
                    </label>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-700 text-xl">是否顯示所在地區</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="privacySettings.is_location_public" class="sr-only peer">
                      <div class="w-14 h-8 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#F2994A]"></div>
                    </label>
                  </div>
                </template>
                <template v-else>
                   <div class="flex justify-between items-center border-b pb-4">
                    <span class="text-gray-700 text-xl">精選收藏是否公開</span>
                    <span :class="privacySettings.is_collections_public ? 'text-green-600' : 'text-gray-500'" class="font-semibold text-xl">{{ privacySettings.is_collections_public ? '公開' : '不公開' }}</span>
                  </div>
                  <div class="flex justify-between items-center border-b pb-4">
                    <span class="text-gray-700 text-xl">成就徽章是否公開</span>
                     <span :class="privacySettings.is_achievements_public ? 'text-green-600' : 'text-gray-500'" class="font-semibold text-xl">{{ privacySettings.is_achievements_public ? '公開' : '不公開' }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-700 text-xl">是否顯示所在地區</span>
                     <span :class="privacySettings.is_location_public ? 'text-green-600' : 'text-gray-500'" class="font-semibold text-xl">{{ privacySettings.is_location_public ? '顯示' : '不顯示' }}</span>
                  </div>
                </template>
                <div class="pt-4">
                  <template v-if="isEditing">
                    <div class="flex gap-4">
                      <button @click="handleSave" :disabled="saving" class="w-full bg-[#F2994A] text-white font-bold py-3 px-4 rounded-lg transition-colors hover:bg-[#E88C3A] disabled:bg-gray-400">
                        {{ saving ? '儲存中...' : '儲存設定' }}
                      </button>
                      <button @click="handleCancel" class="w-full bg-white hover:bg-gray-100 text-gray-700 border border-gray-400 font-bold py-3 px-4 rounded-lg transition-colors">
                        放棄修改
                      </button>
                    </div>
                  </template>
                  <template v-else>
                     <button @click="isEditing = true" class="w-full bg-[#F2994A] text-white font-bold py-3 px-4 rounded-lg transition-colors hover:bg-white hover:text-black border border-[#F2994A]">
                       修改設定
                     </button>
                  </template>
                </div>
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
</style>