<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- 動態背景層，固定並覆蓋父元素 -->

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
    <Theheader />


    <div class="w-full h-[633px] bg-black relative overflow-hidden">ㄗㄗ
      <img src="/src/assets/weapons/wb.png" alt="" class="w-full h-full object-cover" />
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 class="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
          鐵與血的傳承：冷兵器全覽
        </h1>
        <p class="text-lg md:text-2xl text-white drop-shadow-md">
          鋒芒萬丈：刀劍世界探索
        </p>
      </div>
    </div>
    <div class="relative h-7">
      <div class="absolute bottom-0 left-0 w-1/2 h-1 bg-[#b06b29]"></div>
      <div class="absolute bottom-3 left-0 w-3/4 h-1 bg-[#d6853c]"></div>
      <div class="absolute bottom-6 left-0 w-full h-4 bg-[#F2994A]"></div>
    </div>

    <!-- 輪播 -->
    <div class="text-white py-12 flex justify-center w-full mt-8 select-none">
      <Swiper
        :modules="[EffectCoverflow, Pagination]"
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        :coverflowEffect="{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }"
        :initial-slide="4"
        pagination
        class="w-full"
      >
        <SwiperSlide
          v-for="(img, index) in images"
          :key="index"
          :style="{ width: '400px', height: '500px' }"
          class="rounded-xl overflow-hidden"
        >
          <img :src="img" class="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- 水平線 -->
    <hr
      class="border-0 h-0.5 bg-gradient-to-r from-[#FFFFFF]/50 via-transparent to-[#FFFFFF]/50 my-6"
    />

    <!-- 搜尋列 -->
        <div class="flex  justify-center md:justify-between items-center  lg:ml-[120px] xl:ml-[200px] my-6 mt-10">
          <div class="flex items-center space-x-2">
            <input
            v-model="searchQuery"
              type="text"
              placeholder="搜尋..."
              class="w-[300px] md:w-[500px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
            />
            <button
            @click="doSearch"
              class="w-[70px] md:w-[100px] px-4 py-2 bg-[#F2994A] text-white rounded-lg hover:bg-orange-500 transition"
            >
              搜尋
            </button>
            
        </div>

  

      <div class="ml-auto   lg:mr-[120px]  xl:mr-[200px] hidden md:block">
       <!-- <DropDownFilter title="排序類型" :items="typeItems" v-model="selectedType" /> -->

       </div>


      
    </div>

    <!-- 水平線 -->
    <div class="relative h-6 w-[1752px] mx-auto my-6">
      <div class="absolute bottom-4 left-0 w-full h-0.5 bg-[#F2994A]"></div>
    </div>

    <!-- 主內容區：左分類 + 右商品 -->
    <div class="relative container mx-auto max-w-8xl px-4">
      <div class="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">

        <!-- 手機版下拉式選單-->
        <select
          id="categorySelect"
          class="block md:hidden w-full p-3 rounded-md border border-gray-300 text-black bg-white mb-6"
          onchange="handleCategoryChange(this.value)"
        >
          <option value="" selected disabled>請選擇分類</option>
          <option value="劍類">長劍</option>
          <option value="斧頭類">斧頭類</option>
          <option value="長柄武器">小刀</option>
          <option value="弓箭類">匕首</option>
          <option value="盾牌">長柄近戰武器</option>
        </select>

        <!-- 左側分類選單 -->
        <aside
          class="hidden md:block backdrop-blur-md p-6 rounded-xl text-white max-w-[280px] bg-[#FFFFFF] h-[600px]"
>
          <h2 class="text-xl font-semibold mb-6 tracking-wide text-black">
            分類
          </h2>
          <ul>
            
            <li class="border-b border-black/20 last:border-b-0">
              <button
              @click="selectCategory('')"
                class="text-black w-full text-left px-4 py-3 rounded-md hover:bg-[#F2994A] hover:text-[#1a1f23] transition duration-300 font-medium"
              >
                全部
              </button>
            </li>
            <li class="border-b border-black/20 last:border-b-0">
              <button
              @click="selectCategory('劍')"
                class="text-black w-full text-left px-4 py-3 rounded-md hover:bg-[#F2994A] hover:text-[#1a1f23] transition duration-300 font-medium"
              >
                劍類
              </button>
            </li>
            <li class="border-b border-black/20 last:border-b-0">
              <button
              @click="selectCategory('斧')"
                class="text-black w-full text-left px-4 py-3 rounded-md hover:bg-[#F2994A] hover:text-[#1a1f23] transition duration-300 font-medium"
              >
                斧頭類
              </button>
            </li>
            <li class="border-b border-black/20 last:border-b-0">
              <button
              @click="selectCategory('匕首')"
                class="text-black w-full text-left px-4 py-3 rounded-md hover:bg-[#F2994A] hover:text-[#1a1f23] transition duration-300 font-medium"
              >
                匕首
              </button>
            </li>
            
            
          </ul>
        </aside>


         <!-- **【核心修正】更新 v-if 邏輯，讓它能正確顯示三種狀態 ** -->

      <div v-if="loading">載入中...</div>
<div v-else-if="error">{{ error }}</div>
<div v-else>
  <div v-if="weapon.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
   <WeaponCard
             v-for="w in filteredWeapons"
                :key="w.weapon_id"
                :weapon_id="w.weapon_id"
                :postImages="w.weapon_url"
                :userName="w.user_id"
                :postTitle="w.title"
                :description="w.description"
          />
  </div>
  <div v-else>找不到符合篩選條件的活動。</div>
</div>


        <!-- 右側商品卡片區 -->
       
      </div>
    </div>

    <div class="w-full h-8"></div>

    <Thefooter />
  </div>
</template>

<script setup>
import { ref ,onMounted,computed} from "vue";
import Theheader from "../components/Theheader.vue";
import Thefooter from "../components/Thefooter.vue";
import WeaponCard from "../components/WeaponCard.vue";
import DropDownFilter from '@/components/DropDownFilter.vue';
import { getPublicImg } from '@/utils/getPublicImg'



import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// API串接
import axios from 'axios';


const loading = ref(false)
const weapon = ref([])
const error = ref(null)
const catrgoryKeyword = ref('') // 劍, 斧, 匕首
const selectCategory = (cat) => {
  catrgoryKeyword.value = cat
}

const searchQuery = ref(""); // 搜尋字

async function fetchAllWeapon() {
  loading.value = true
  error.value = null

  try {
    const response = await axios.get('http://localhost:8888/ChopHub-API/api/weapon/weaponList.php')
    // console.log('this is RESPONSE', response)

    const data = response.data?.data || null
    weapon.value = Array.isArray(data) ? data : []; // 確保是陣列
    // console.log('this is desired url', ...weapon.value)
    

  } catch (err) {
    console.error(err)
    error.value = err?.response?.data?.message || err.message
  } finally {
    loading.value = false
  }
};


onMounted(() => {
   fetchAllWeapon();
});
//API串接

const filterCategory = computed(() => {
  let result = [...weapon.value];

  // 搜尋篩選
  if (catrgoryKeyword.value) {
    result = result.filter(w =>
      w.title.toLowerCase().includes(catrgoryKeyword.value.toLowerCase())
    );
  }

  return result;

})

// 計算屬性：依 title 過濾
const filteredWeapons = computed(() => {
  let result = [...filterCategory.value];

  // 搜尋篩選
  if (searchQuery.value) {
    result = result.filter(w =>
      w.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return result;
});


const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};

const images = [
  'weapons/w4.png',
  "weapons/w6.png",
  "weapons/w5.png",
  "weapons/w2.png",
  "weapons/w1.png",
  "weapons/w3.png",
  "weapons/w7.png",
];


const imgs = [
  getPublicImg('weapons/w1.png'),
  getPublicImg('weapons/w2.png'),
  getPublicImg('weapons/w3.png'),
  getPublicImg('weapons/w4.png'),
  getPublicImg('weapons/w5.png'),
  getPublicImg('weapons/w6.png'),
  getPublicImg('weapons/w7.png'),
  getPublicImg('weapons/w7.png'),
  getPublicImg('weapons/w9.png'),

  // 可依需求多加
];

// ✅ 正確的 posts 陣列合併方式
const posts = ref(
  Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    postImage: imgs[index % imgs.length], // 從 imgs 陣列取圖
    isFeatured: true,
    userName: "使用者名稱",
    postTitle: `手裡劍 `,
    isHot: Math.random() > 0.5,
    description:
      "四爪對稱手裡劍，結構精準銳利，中心圓孔設計，兼具工藝美感與穩定投擲性能。",
    likes: Math.floor(Math.random() * 200),
    stars: Math.floor(Math.random() * 50),
  }))
);




const currentIndex = ref(1);
const cardWidth = 500;
const gap = 16;
const visibleCount = 3;
const offset = (1600 - (cardWidth + gap)) / 2;
const visibleCountMiddle = Math.floor(visibleCount / 1);

function nextSlide() {
  if (currentIndex.value + visibleCount < colors.length) {
    currentIndex.value++;
  }
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}


const typeItems = [
   { label: '收藏次數', value: 'all' },
   { label: '上架時間', value: '實體活動' },
   { label: '瀏覽次數', value: '線上活動' }
];
</script>
