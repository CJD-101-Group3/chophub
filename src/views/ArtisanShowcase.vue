<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { getPublicImg } from '@/utils/getPublicImg';
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
import SocialIcon from '../components/SocialIcon.vue'; 
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const route = useRoute();

// --- API 相關狀態 ---
const loading = ref(true);
const error = ref(null);

// --- 刀匠的所有展示資料都集中管理 ---
const artisanProfile = ref({
  name: '載入中...',
  avatarUrl: getPublicImg('users/userp.png'), 
  mainBadge: { name: '', iconUrl: '' },
  joinDate: '',
  location: '',
  intro: '',
  card: {
    imageUrl: getPublicImg('users/artisan-card-bg.png'),
    quote: '',
    details: '',
  },
  socialLinks: [],
  featuredWorks: [],
  featuredPosts: [],
  achievements: [],
  // ******** 新增：用來儲存隱私設定 ********
  privacySettings: {
    is_collections_public: true, // 預設為 true，API 拿到資料後會覆蓋
    is_achievements_public: true,
    is_location_public: true,
  }
});

// 這樣 userId 會優先用路由參數，沒有就用自己的 id
const userId = ref(route.params.userId || authStore.userId);

// --- GET 請求 ---
onMounted(async () => {
  loading.value = true;
  error.value = null;

  try {
    const [
      userRes,
      artisanRes,
      achievementsRes,
      postsRes,
      weaponsRes
    ] = await Promise.all([
<<<<<<< HEAD
      axios.get(`${import.meta.env.VITE_API_BASE}user/userProfile.php?user_id=${userId.value}`),
      axios.get(`${import.meta.env.VITE_API_BASE}user/artisanProfile.php?user_id=${userId.value}`),
      axios.get(`${import.meta.env.VITE_API_BASE}user/get_user_achievements.php?user_id=${userId.value}`),
      axios.get(`${import.meta.env.VITE_API_BASE}user/get_user_posts.php?user_id=${userId.value}`),
      axios.get(`${import.meta.env.VITE_API_BASE}user/get_user_favorite_weapons.php?user_id=${userId.value}`)
=======
      axios.get(import.meta.env.VITE_API_BASE + `user/userProfile.php?user_id=${userId.value}`),
      axios.get(import.meta.env.VITE_API_BASE + `user/artisanProfile.php?user_id=${userId.value}`),
      axios.get(import.meta.env.VITE_API_BASE + `user/get_user_achievements.php?user_id=${userId.value}`),
      axios.get(import.meta.env.VITE_API_BASE + `user/get_user_posts.php?user_id=${userId.value}`),
      axios.get(import.meta.env.VITE_API_BASE + `user/get_user_favorite_weapons.php?user_id=${userId.value}`)
>>>>>>> 7fbf986b3909fe73efafd038c0a6d124ef261980
    ]);

    // 1. 處理一般使用者資料 (已修改)
    if (userRes.data.status === 'success') {
      const userData = userRes.data.data;
      artisanProfile.value.name = userData.display_name;
      artisanProfile.value.joinDate = userData.created_at ? userData.created_at.split(' ')[0].replace(/-/g, '/') : '';
      artisanProfile.value.location = userData.location;
      artisanProfile.value.avatarUrl = userData.avatar_url
<<<<<<< HEAD
        ? `${import.meta.env.VITE_FILE_URL}${userData.avatar_url}`
=======
        ? import.meta.env.VITE_API_BASE + `${userData.avatar_url}`
>>>>>>> 7fbf986b3909fe73efafd038c0a6d124ef261980
        : getPublicImg('users/userp.png');
      
      // ******** 將隱私設定存入 ref ********
      artisanProfile.value.privacySettings.is_collections_public = !!parseInt(userData.is_collections_public);
      artisanProfile.value.privacySettings.is_achievements_public = !!parseInt(userData.is_achievements_public);
      artisanProfile.value.privacySettings.is_location_public = !!parseInt(userData.is_location_public);
    }

    // 2. 處理刀匠專屬資料 (已修改)
    if (artisanRes.data.status === 'success') {
      const artisanData = artisanRes.data.data;
      if (artisanData.profile) {
        artisanProfile.value.card.quote = `「${artisanData.profile.tagline}」`;
        artisanProfile.value.card.details = `鍛造資歷 ${artisanData.profile.years_experience} 年\n專長：${artisanData.profile.specialty}\n流派：${artisanData.profile.sect}`;
      }
      if (artisanData.quotes && artisanData.quotes.length > 0) {
        artisanProfile.value.intro = artisanData.quotes[0].content;
      }
      if (artisanData.social_links && Array.isArray(artisanData.social_links)) {
        artisanProfile.value.socialLinks = artisanData.social_links.map(link => ({
          id: link.link_id,
          platform: link.platform,
          handle: link.url,
          link: link.url
        }));
      }
    }

    // 3. 處理成就徽章
    if (achievementsRes.data.status === 'success') {
      artisanProfile.value.achievements = achievementsRes.data.data;
      if (artisanProfile.value.achievements.length > 0) {
        artisanProfile.value.mainBadge.name = achievementsRes.data.data[0].name;
        artisanProfile.value.mainBadge.iconUrl = achievementsRes.data.data[0].imageUrl;
      }
    }

    // 4. 處理精選貼文
    if (postsRes.data.status === 'success') {
      artisanProfile.value.featuredPosts = postsRes.data.data.slice(0, 6).map(post => ({
        ...post,
        date: post.date.split(' ')[0].replace(/-/g, '/'),
        category: '【匠人日誌】'
      }));
    }

    // 5. 處理精選作品
    if (weaponsRes.data.status === 'success') {
      artisanProfile.value.featuredWorks = weaponsRes.data.data.slice(0, 5);
    }

  } catch (err) {
    console.error("載入刀匠展示頁資料失敗:", err);
    error.value = "無法載入刀匠資料，請確認該使用者是否存在且具有刀匠身份。";
  } finally {
    loading.value = false;
  }
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
      <div v-if="loading" class="text-center text-white text-2xl">載入刀匠資料中...</div>
      <div v-else-if="error" class="text-center text-red-400 text-2xl p-8 bg-gray-800 rounded-lg">{{ error }}</div>
      <div v-else class="max-w-2xl lg:max-w-5xl mx-auto space-y-10 lg:space-y-12">

        <!-- 頂部個人資訊 -->
        <section class="text-center space-y-4 lg:flex lg:gap-8 lg:text-left lg:items-center">
          <img 
            :src="artisanProfile.avatarUrl" 
            alt="Artisan Avatar" 
            class="w-full max-w-sm mx-auto rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.4)] lg:w-60 lg:h-60 lg:mx-0 lg:flex-shrink-0 object-cover"
            @error="event.target.src = getPublicImg('users/userp.png')"
          >
          <div class="space-y-3">
            <h1 class="text-4xl lg:text-5xl font-bold text-white">{{ artisanProfile.name }}</h1>
            <div v-if="artisanProfile.mainBadge.name && artisanProfile.privacySettings.is_achievements_public" class="flex items-center justify-center lg:justify-start gap-2 text-xl font-semibold text-white">
              {{ artisanProfile.mainBadge.name }}
              <img :src="artisanProfile.mainBadge.iconUrl" alt="Badge Icon" class="w-8 h-8">
            </div>
            <div class="text-white text-2xl">
              <p>加入時間：{{ artisanProfile.joinDate }}</p>
              <!-- ******** 加入 v-if 判斷 ******** -->
              <p v-if="artisanProfile.privacySettings.is_location_public">所在地：{{ artisanProfile.location }}</p>
            </div>
          </div>
        </section>

        <!-- ... 刀匠簡介, 刀匠卡片, 社群連結 (不變) ... -->
        <section>
          <h2 class="text-3xl font-bold text-white mb-8">刀匠簡介：</h2>
          <p class="text-2xl text-white whitespace-pre-line leading-relaxed">{{ artisanProfile.intro }}</p>
        </section>
        <section class="relative rounded-lg overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.4)]">
          <a href="#" class="block cursor-pointer relative z-10">
            <img :src="artisanProfile.card.imageUrl" alt="Artisan at work" class="w-full h-56 md:h-72 object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 lg:p-8 text-white pointer-events-none">
              <p class="text-3xl lg:text-4xl font-bold mb-12">{{ artisanProfile.card.quote }}</p>
              <p class="text-sm lg:text-xl whitespace-pre-line leading-snug">{{ artisanProfile.card.details }}</p>
            </div>
          </a>
        </section>
        <section class="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
          <a v-for="link in artisanProfile.socialLinks" :key="link.id" :href="link.link" target="_blank" class="flex items-center gap-4 bg-[#F2994A] p-4 rounded-lg shadow-sm hover:bg-[#F2B94C] transition-colors duration-200">
            <div class="w-10 h-10 bg-white rounded-md flex items-center justify-center">
              <SocialIcon :platform="link.platform" class="w-6 h-6 text-gray-800" />
            </div>
            <div>
              <p class="font-bold text-gray-800">{{ link.platform }}</p>
              <p class="text-sm text-gray-600">{{ link.handle }}</p>
            </div>
          </a>
        </section>


        <!-- 刀匠精選作品 (已加入 v-if) -->
        <section v-if="artisanProfile.privacySettings.is_collections_public" class="bg-white transition-shadow duration-300 rounded-lg p-6 lg:p-8" style="box-shadow: 0 15px 30px rgba(255, 255, 255, 0.4);">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">刀匠精選作品</h2>
          <div class="flex space-x-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:gap-6 lg:space-x-0 lg:pb-0">
            <a v-for="work in artisanProfile.featuredWorks" :key="work.id" :href="'/Weaponslist/weapondetail/' + work.id" class="flex-shrink-0 group w-56 lg:w-full">
              <div class="bg-black p-2 rounded-lg shadow-md overflow-hidden">
                <img :src="work.imageUrl" :alt="'作品 ' + work.id" class="w-full h-48 lg:h-40 object-contain">
              </div>
              <button class="mt-3 w-full bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-2 px-4 rounded-md transition-colors text-sm">查看更多</button>
            </a>
          </div>
        </section>

        <!-- 刀匠精選貼文 (不變) -->
        <section class="bg-white transition-shadow duration-300 rounded-lg p-6 lg:p-8" style="box-shadow: 0 15px 30px rgba(255, 255, 255, 0.4);">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">刀匠精選貼文</h2>
          <table class="w-full text-left hidden lg:table">
            <thead><tr class="border-b-2"><th class="py-2 font-semibold">文章標題</th><th class="py-2 font-semibold text-right">發表日期</th></tr></thead>
            <tbody>
              <tr v-for="post in artisanProfile.featuredPosts" :key="post.id" class="border-b last:border-b-0">
                <td class="py-4"><a :href="`/post/${post.id}`" class="text-gray-800 hover:text-[#F2994A] transition-colors"><span class="text-gray-500">{{ post.category }}</span> {{ post.title }}</a></td>
                <td class="py-4 text-right text-gray-500">{{ post.date }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- 成就徽章 (已加入 v-if) -->
        <section v-if="artisanProfile.privacySettings.is_achievements_public" class="bg-white transition-shadow duration-300 rounded-lg p-6 lg:p-8" style="box-shadow: 0 15px 30px rgba(255, 255, 255, 0.4);">          
          <h2 class="text-2xl font-bold text-gray-800 mb-6">成就徽章</h2>
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
.overflow-x-auto::-webkit-scrollbar { height: 8px; }
.overflow-x-auto::-webkit-scrollbar-track { background: transparent; }
.overflow-x-auto::-webkit-scrollbar-thumb { background-color: #F2994A; border-radius: 10px; }
.overflow-x-auto::-webkit-scrollbar-thumb:hover { background-color: #E88C3A; }
</style>