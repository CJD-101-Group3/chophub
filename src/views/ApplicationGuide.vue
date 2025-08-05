<script setup>
import { useRouter } from 'vue-router';
import { getPublicImg } from '@/utils/getPublicImg';
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';



const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};


// 引入 Vue Router 的 useRouter，用於實現「回上一頁」功能
const router = useRouter();

// 定義一個返回上一頁的函數
const goBack = () => {
  router.back();
};

const hammerIconUrl = getPublicImg('users/hammericon.png');
const applicationFormUrl = getPublicImg('files/ChopHub-Application-Form.pdf');
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
    <!-- 頁首 -->
    <Theheader />

    <!-- 
      主要內容區
      - flex-1: 填滿剩餘空間
      - flex, items-center, justify-center: 讓內容卡片在垂直和水平方向置中
      - p-4: 在手機上提供內邊距
    -->
    <main class="flex-1 flex items-center justify-center p-4">
      
      <!-- 內容資訊卡片 -->
      <div class="w-full max-w-2xl mx-auto  bg-white p-6 lg:p-10 rounded-xl shadow-[0_8px_32px_0_rgba(255,255,255,0.4)]">
        
        <!-- 標題：新增 justify-center 來讓內容水平置中 -->
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-800 flex items-center justify-center gap-3 mb-6 lg:mb-8">
          刀匠申請須知
          <!-- 小鎚子 圖標 -->
          <img :src="hammerIconUrl" alt="鎚子圖標" class="w-10 h-10">
        </h1>
        
        <!-- 說明文字 -->
        <div class="space-y-5 text-gray-700 leading-relaxed text-lg">
          <p>親愛的使用者您好：</p>
          
          <p>若您為冷兵器創作者、鍛造職人，並希望於本平台申請刀匠認證，</p>

          <p>
            請透過 <strong class="font-semibold text-gray-800">電子郵件</strong> 寄信至官方信箱，信件內容需包含以下資訊：
          </p>

          <!-- 申請項目列表 -->
          <ul class="list-disc list-inside space-y-2 pl-2 text-gray-800">
            <li>真實姓名 (chophub網站暱稱)</li>
            <li>聯絡方式 (Email / 手機號碼)</li>
            <li>個人簡介與創作背景</li>
            <li>作品介紹</li>
            <li>各部件介紹</li>
            <li>至少三張能代表您鍛造/創作風格的作品照片</li>
            <li>詳細內容依照表單各項目提供壓縮檔案即可</li>
          </ul>

          <!-- 官方信箱 -->
          <p class="font-semibold text-gray-800 !mt-6">
            官方信箱：chophub@gmail.com
          </p>

          <p>
            若5個工作天內未收到您的來信，申請將會自動取消。
            我們收到您的來信後，將於 5 個工作天內與您聯繫進行進一步審核。
          </p>

          <p>
            感謝您的熱情與支持，讓我們一同打造專業而具溫度的冷兵器社群！
          </p>

          <!-- 範例表格下載 -->
          <p class="!mt-8">
            範例表格可下載：
            <!-- 
              TODO: 請將 href 替換為您實際的表單下載路徑 
              download 屬性會提示瀏覽器下載該文件
            -->
            <a :href="applicationFormUrl" download class="text-red-600 hover:text-red-700 font-semibold underline">
              刀匠申請表單
            </a>
          </p>
        </div>

        <!-- 回上一頁 按鈕 -->
        <div class="text-center mt-10">
          <button 
            @click="goBack"
            class="w-full sm:w-auto bg-[#F2994A] text-white font-bold py-3 px-12 rounded-md transition-colors duration-300 border-2 border-transparent
                   hover:bg-white hover:text-black hover:border-[#F2994A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E87A3A]"
          >
            回上一頁
          </button>
        </div>

      </div>
    </main>

    <!-- 頁尾 -->
    <Thefooter />
  </div>
</template>

<style scoped>
/* 可以在這裡添加一些僅限此頁面的額外樣式，目前暫時不需要 */
</style>