<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
import Basebutton from '../components/Basebutton.vue';






// 定義響應式變量
const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};

const router = useRouter();

// (手機版) 下拉選單狀態
const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// (電腦版) 側邊欄狀態
const activeTab = ref('會員資訊');

// **【修改處】** 從 menuItems 陣列中移除 '我的活動'
const menuItems = ref([
  { name: '會員資訊', href: '/UserProfile' },
  { name: '貼文相關', href: '/PostActivity' },
  { name: '收藏相關', href: '/UserCollections' },
  // { name: '我的活動', href: '/MyActivities' }, // <--- 已移除
  { name: '其他設定', href: '/OtherSettings' },
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
  avatarUrl: '/src/assets/users/userp.png',
});

// 跳轉到編輯頁面的函式
const goToEditProfile = () => {
  router.push('/EditProfile');
};

// 新增跳轉到刀匠展示頁的函式
const goToArtisanShowcase = () => {
  router.push('/ArtisanShowcase');
};

const goToEditArtisanProfile = () => {
  router.push('/EditArtisanProfile');
};

const goToApplicationGuide = () => {
  router.push('/ApplicationGuide');
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
              class="px-4 py-3 text-center rounded-md font-semibold transition-colors duration-200"
              :class="{
                'bg-[#F2B94C] text-white hover:text-white': activeTab === item.name,
                'text-gray-600 hover:bg-[#F2994A] hover:text-white': activeTab !== item.name
              }"
              @click="activeTab = item.name" 
            >
              {{ item.name }}
            </router-link>
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
              <router-link v-for="item in menuItems" :key="item.name" :to="item.href" class="block px-4 py-3 text-gray-700 hover:bg-[#F2994A] hover:text-white">{{ item.name }}</router-link>
            </div>
          </transition>
        </div>
        
        <div class="flex justify-center mb-6">
          <img 
            :src="memberInfo.avatarUrl" 
            alt="User Avatar" 
            class="w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-full shadow-[0_8px_32px_0_rgba(255,255,255,0.4)]"
          >
        </div>

        <!-- 歡迎訊息 -->
        <div class="text-center mb-8">
          <h1 class="text-2xl lg:text-3xl font-bold text-white">
            {{ memberInfo.name }}, 歡迎使用
          </h1>
        </div>

        <!-- 會員資訊卡片 -->
        <div class="bg-white p-6 lg:p-8 rounded-lg shadow-[0_8px_32px_0_rgba(255,255,255,0.4)] mb-8 max-w-xl mx-auto">
          <h2 class="text-2xl font-bold mb-6 border-b pb-3">會員資訊</h2>
          <div class="space-y-4 text-sm lg:text-xl">
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
          <Basebutton
            type="button"
            variant="primary"
            class="w-full h-12"
            @click="goToEditProfile"
          >
            編輯資料
          </Basebutton>
          <Basebutton
            type="button"
            variant="primary"
            class="w-full h-12"
            @click="goToArtisanShowcase"
          >
            刀匠展示頁
          </Basebutton>
          <Basebutton
            type="button"
            variant="primary"
            class="w-full h-12"
            @click="goToEditArtisanProfile"
          >
            刀匠編輯資料
          </Basebutton>
          <Basebutton
            type="button"
            variant="primary"
            class="w-full h-12"
            @click="goToApplicationGuide"
          >
            刀匠申請
          </Basebutton>
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