<script setup>
import { ref } from 'vue';
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
// **【步驟 4.1】** 引入你剛剛建立的 SocialIcon 元件
import SocialIcon from '../components/SocialIcon.vue'; 

// 引入圖片資源
import artisanAvatar from '../assets/users/userp.png';
import artisanCardBg from '../assets/users/artisan-card-bg.png';
import weapon1 from '../assets/weapons/weapon1.png';
import weapon2 from '../assets/weapons/weapon2.png';
import weapon3 from '../assets/weapons/weapon3.png';
import weapon4 from '../assets/weapons/weapon4.png';
import weapon5 from '../assets/weapons/weapon5.png';
import badge1 from '../assets/badges/badge1.png';
import badge2 from '../assets/badges/badge2.png';
import badge3 from '../assets/badges/badge3.png';
import badge4 from '../assets/badges/badge4.png';

const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};

// --- 刀匠的所有展示資料都集中管理 ---
const artisanProfile = ref({
  name: 'Hattori Hanzo',
  avatarUrl: artisanAvatar,
  mainBadge: {
    name: '黑鐵級刀匠',
    iconUrl: badge2,
  },
  joinDate: '2024/03/01',
  location: '日本・伊賀',
  intro: '千錘百鍊，鋼魂不滅。\n服部半藏，專精於日式直刃鍛造，擁有超過 20 年工藝經驗，致力於融合古法鍛造與現代力學美學。擅長使用玉鋼、反覆摺疊鍛打與水冷退火技法。其作品曾於《冷鋼祭》奪下優勝，並被多位收藏家收藏。',
  card: {
    imageUrl: artisanCardBg,
    quote: '「火不熄，我不止」',
    details: '鍛造資歷 20 年\n專長：摺疊鋼 / 日式直刃 / 劈砍雕刻\n常用鋼材：白紙鋼、玉鋼\n流派：伊賀古法流',
  },
  socialLinks: [
    { id: 1, platform: 'YOUTUBE', handle: '@Hattori_Hanzo5777', link: '#' },
    { id: 2, platform: 'Instagram', handle: '@Hattori_Hanzo5777', link: '#' },
    { id: 3, platform: 'X', handle: '@Hattori_Hanzo5777', link: '#' },
    { id: 4, platform: 'Gmail', handle: 'Hattori5777@gmail.com', link: 'mailto:Hattori5777@gmail.com' },
    { id: 5, platform: 'Podcast', handle: '專訪：聽見火光的聲音', link: '#' },
  ],
  featuredWorks: [
    { id: 1, imageUrl: weapon1, link: '#' },
    { id: 2, imageUrl: weapon2, link: '#' },
    { id: 3, imageUrl: weapon3, link: '#' },
    { id: 4, imageUrl: weapon4, link: '#' },
    { id: 5, imageUrl: weapon5, link: '#' },
  ],
  featuredPosts: [
    { id: 1, category: '【匠人日誌】', title: '【鋼火與水氣】一把刀的靈魂在什麼時候誕生？', date: '2025/07/12', link: '#' },
    { id: 2, category: '【匠人日誌】', title: '【鋼火與水氣】一把刀的靈魂在什麼時候誕生？', date: '2025/07/12', link: '#' },
    { id: 3, category: '【匠人日誌】', title: '【鋼火與水氣】一把刀的靈魂在什麼時候誕生？', date: '2025/07/12', link: '#' },
    { id: 4, category: '【匠人日誌】', title: '【鋼火與水氣】一把刀的靈魂在什麼時候誕生？', date: '2025/07/12', link: '#' },
    { id: 5, category: '【匠人日誌】', title: '【鋼火與水氣】一把刀的靈魂在什麼時候誕生？', date: '2025/07/12', link: '#' },
    { id: 6, category: '【匠人日誌】', title: '【鋼火與水氣】一把刀的靈魂在什麼時候誕生？', date: '2025/07/12', link: '#' },
  ],
  achievements: [
    { id: 1, name: '百鍊成鋒', imageUrl: badge1 },
    { id: 2, name: '黑鐵級刀匠', imageUrl: badge2 },
    { id: 3, name: '赤火初煉者', imageUrl: badge3 },
    { id: 4, name: '登入王', imageUrl: badge4 },
  ],
});
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

    <main class="flex-1 p-4 lg:p-12">
      <div class="max-w-2xl lg:max-w-5xl mx-auto space-y-10 lg:space-y-12">

        <!-- 頂部個人資訊 -->
        <section class="text-center space-y-4 lg:flex lg:gap-8 lg:text-left lg:items-center">
          <img :src="artisanProfile.avatarUrl" alt="Artisan Avatar" 
            class="w-full max-w-sm mx-auto rounded-lg shadow-lg lg:w-60 lg:h-60 lg:mx-0 lg:flex-shrink-0 object-cover">
          <div class="space-y-3">
            <h1 class="text-4xl lg:text-5xl font-bold text-white">{{ artisanProfile.name }}</h1>
            <div class="flex items-center justify-center lg:justify-start gap-2 text-xl font-semibold text-white">
              {{ artisanProfile.mainBadge.name }}
              <img :src="artisanProfile.mainBadge.iconUrl" alt="Badge Icon" class="w-8 h-8">
            </div>
            <div class="text-white">
              <p>加入時間：{{ artisanProfile.joinDate }}</p>
              <p>所在地：{{ artisanProfile.location }}</p>
            </div>
          </div>
        </section>

        <!-- 刀匠簡介 -->
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">刀匠簡介：</h2>
          <p class="text-white whitespace-pre-line leading-relaxed">{{ artisanProfile.intro }}</p>
        </section>

        <!-- 刀匠卡片 -->
        
        <section class="relative rounded-lg overflow-hidden shadow-lg">
          <router-link to="/ArtisanShowcase" class="cursor-pointer">
            <img :src="artisanProfile.card.imageUrl" alt="Artisan at work" class="w-full h-56 md:h-72 object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 lg:p-8 text-white">
              <p class="text-3xl lg:text-4xl font-bold mb-4">{{ artisanProfile.card.quote }}</p>
              <p class="text-sm lg:text-base whitespace-pre-line leading-snug">{{ artisanProfile.card.details }}</p>
            </div>
          </router-link>
        </section>

        <!-- 社群連結 -->
        <section class="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
          <a v-for="link in artisanProfile.socialLinks" :key="link.id" :href="link.link" target="_blank"
             class="flex items-center gap-4 bg-[#F2994A] p-4 rounded-lg shadow-sm hover:bg-[#F2B94C] transition-colors duration-200">

            <!-- **【步驟 4.2】** 將原本的 div 替換成 SocialIcon 元件 -->
            <div class="w-10 h-10 bg-white rounded-md flex items-center justify-center">
              <SocialIcon :platform="link.platform" class="w-6 h-6 text-gray-800" />
            </div>

            <div>
              <p class="font-bold text-gray-800">{{ link.platform }}</p>
              <p class="text-sm text-gray-600">{{ link.handle }}</p>
            </div>
          </a>
        </section>

        <!-- 刀匠精選作品 -->
        <section class="bg-[#ffffff] p-6 lg:p-8 rounded-lg shadow-sm">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">刀匠精選作品</h2>
          <div class="flex space-x-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:gap-6 lg:space-x-0 lg:pb-0">
            <a v-for="work in artisanProfile.featuredWorks" :key="work.id" :href="work.link" class="flex-shrink-0 group w-56 lg:w-full">
              <div class="bg-white p-2 rounded-lg shadow-md overflow-hidden">
                <img :src="work.imageUrl" :alt="'作品 ' + work.id" class="w-full h-48 lg:h-40 object-contain transition-transform duration-300 group-hover:scale-105">
              </div>
              <button class="mt-3 w-full bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-2 px-4 rounded-md transition-colors text-sm">
                查看更多
              </button>
            </a>
          </div>
        </section>

        <!-- 刀匠精選貼文 -->
        <section class="bg-white p-6 lg:p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">刀匠精選貼文</h2>
          <div class="space-y-4 lg:hidden">
            <a v-for="post in artisanProfile.featuredPosts" :key="post.id" :href="post.link" class="block bg-[#E2E9EF] p-4 rounded-lg hover:bg-gray-300 transition-colors">
              <p class="font-semibold text-gray-800">{{ post.category }} {{ post.title }}</p>
              <p class="text-sm text-gray-500 mt-2">發表日期：{{ post.date }}</p>
            </a>
          </div>
          <table class="w-full text-left hidden lg:table">
            <thead>
              <tr class="border-b-2">
                <th class="py-2 font-semibold">文章標題</th>
                <th class="py-2 font-semibold text-right">發表日期</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in artisanProfile.featuredPosts" :key="post.id" class="border-b last:border-b-0">
                <td class="py-4">
                  <a :href="post.link" class="text-gray-800 hover:text-[#F2994A] transition-colors">
                    <span class="text-gray-500">{{ post.category }}</span> {{ post.title }}
                  </a>
                </td>
                <td class="py-4 text-right text-gray-500">{{ post.date }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- 成就徽章 -->
        <section class="bg-white p-6 lg:p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">成就徽章 (可滑動)</h2>
          <div class="flex space-x-6 overflow-x-auto pb-4 lg:flex-wrap lg:justify-center lg:gap-x-4 lg:gap-y-6 lg:space-x-0">
            <div v-for="achievement in artisanProfile.achievements" :key="achievement.id" class="flex flex-col items-center flex-shrink-0 w-32 lg:w-24">
              <img :src="achievement.imageUrl" :alt="achievement.name" class="w-28 lg:w-24 h-auto object-contain">
              <span class="mt-2 text-sm font-semibold text-gray-700 text-center">{{ achievement.name }}</span>
            </div>
          </div>
        </section>

      </div>
    </main>

    <Thefooter />
  </div>
</template>

<style scoped>
/* 美化滾動條 */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}
.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #bdc3c7;
  border-radius: 10px;
}
.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background-color: #95a5a6;
}
</style>