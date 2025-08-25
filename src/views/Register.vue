<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router' // 新增這行
import Theheader from '../components/Theheader.vue'
import Thefooter from '../components/Thefooter.vue'
import Basebutton from '../components/Basebutton.vue'

// 粒子用（保留）
const particlesLoaded = async (container) => {
  console.log('Particles container loaded', container)
}

// API Base（尾端不要 /）
const API_BASE = (import.meta.env.VITE_API_BASE ? import.meta.env.VITE_API_BASE.replace(/\/$/, '') : 'https://tibamef2e.com/cjd101/g3/api');

const baseURL = `${API_BASE}/user/`; // 因為 API_BASE 已經包含 /api

// 表單欄位
const account = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

// const baseUrl = import.meta.env.BASE_URL || '/'

const router = useRouter() // 新增這行

// 表單送出
async function handleSubmit() {
  // 前端驗證
  if (!account.value || !email.value || !password.value || !confirmPassword.value) {
    alert('所有欄位都必須填寫！')
    return
  }
  if (password.value !== confirmPassword.value) {
    alert('兩次輸入的密碼不一致！')
    return
  }
  // 最基本 email 檢查
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    alert('Email 格式不正確')
    return
  }
  if (password.value.length < 6) {
    alert('密碼長度至少需要 6 個字元')
    return
  }

  loading.value = true
  try {
    const payload = {
      account: account.value.trim(),
      email: email.value.trim(),
      password: password.value
    }

    const { data } = await axios.post(`${API_BASE}/api/signup.php`, payload, {
      headers: { 'Content-Type': 'application/json' }
    })

    if (data?.status === 'success') {
      alert('註冊成功！')
      account.value = ''
      email.value = ''
      password.value = ''
      confirmPassword.value = ''
      router.push('/login') // 新增這行，導向登入頁
    } else {
      throw new Error(data?.message || '註冊失敗')
    }
  } catch (err) {
    console.error('註冊失敗：', err?.response?.status, err?.response?.data || err)
    alert(`註冊失敗：${err?.response?.data?.message || err.message || '發生不明錯誤'}`)
  } finally {
    loading.value = false
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

    <div class="flex-1 flex items-center justify-center">
      <div class="w-11/12 max-w-xs p-4 text-center lg:max-w-sm lg:p-8">
        <div class="mx-auto mb-6">
          <img
            src="/src/assets/icon/LOGO.png"
            alt="ChopHub Logo"
            class="w-[200px] h-[200px] mx-auto lg:w-[250px] lg:h-[250px]"
          />
        </div>

        <div class="text-left mb-6">
          <span class="text-sm text-white">已經有帳號嗎？</span>
          <a :href="`${baseUrl}login`" class="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors">
            立即登入
          </a>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <input
              v-model="account"
              type="text"
              placeholder="帳號"
              class="w-full px-4 py-3 bg-[#F8F9FA] border-2 border-[#F2994A] rounded-md transition-colors
                     focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
            />
          </div>

          <div>
            <input
              v-model="email"
              type="email"
              placeholder="信箱"
              class="w-full px-4 py-3 bg-[#F8F9FA] border-2 border-[#F2994A] rounded-md transition-colors
                     focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
            />
          </div>

          <div class="relative">
            <input
              v-model="password"
              type="password"
              placeholder="密碼"
              class="w-full px-4 py-3 bg-[#F8F9FA] border-2 border-[#F2994A] rounded-md transition-colors
                     focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
            />
          </div>

          <div class="relative">
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="確認密碼"
              class="w-full px-4 py-3 bg-[#F8F9FA] border-2 border-[#F2994A] rounded-md transition-colors
                     focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]"
            />
          </div>

          <Basebutton type="submit" variant="primary" class="w-full h-12">
            {{ loading ? '送出中…' : '立即註冊' }}
          </Basebutton>
        </form>
      </div>
    </div>

    <Thefooter />
  </div>
</template>
