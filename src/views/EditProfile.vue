<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import axios from 'axios'
import { getPublicImg } from '@/utils/getPublicImg'
import { useAuthStore } from '@/stores/auth'
import Theheader from '../components/Theheader.vue'
import Thefooter from '../components/Thefooter.vue'

// 不走 Cookie 的開發模式：避免多餘 CORS 條件
axios.defaults.withCredentials = false

const authStore = useAuthStore()
const userId = authStore.userId

// --- UI 狀態 ---
const isDropdownOpen = ref(false)
const toggleDropdown = () => (isDropdownOpen.value = !isDropdownOpen.value)
const activeTab = ref('會員資訊')
const menuItems = ref([
  { name: '會員資訊', href: '/UserProfile' },
  { name: '貼文相關', href: '/PostActivity' },
  { name: '收藏相關', href: '/UserCollections' },
  { name: '其他設定', href: '/OtherSettings' }
])

const memberInfo = ref({
  name: '載入中...',
  avatarUrl: getPublicImg('users/userp.png')
})

// --- API 狀態 ---
const loading = ref(true)
const error = ref(null)
const saving = ref(false)
const uploading = ref(false)

// --- 編輯模式 ---
const isEditingAccount = ref(false)
const isEditingProfile = ref(false)

// --- 圖片上傳 ---
const fileInput = ref(null)
function handleAvatarUploadClick () {
  fileInput.value?.click()
}

async function onFileChange (e) {
  const file = e.target.files?.[0]
  if (!file) return

  // 基本檢查
  if (!file.type.startsWith('image/')) {
    alert('請選擇有效的圖片檔案')
    e.target.value = ''
    return
  }
  if (file.size > 3 * 1024 * 1024) {
    alert('圖片大小上限 3MB')
    e.target.value = ''
    return
  }

  // 先用 ObjectURL 即時預覽
  const previewUrl = URL.createObjectURL(file)
  profileForm.avatarUrl = previewUrl
  memberInfo.value.avatarUrl = previewUrl

  // 立即上傳（DEV：直帶 user_id，不走 Cookie）
  try {
    uploading.value = true
    const fd = new FormData()
    fd.append('avatar', file)             // 後端接 key：avatar
    fd.append('user_id', String(userId))  // ★ 關鍵：開發階段直傳 user_id

    const { data } = await axios.post(
      import.meta.env.VITE_API_BASE + '/user/userAvatar.php',
      fd
    )

    if (data.status === 'success') {
      const fullUrl = data.data?.avatar_full_url
      if (fullUrl) {
        profileForm.avatarUrl = fullUrl
        memberInfo.value.avatarUrl = fullUrl
      }
      // 同步 localStorage 的 user（相對路徑）
      const raw = localStorage.getItem('user')
      if (raw && raw !== 'undefined' && raw !== 'null') {
        try {
          const u = JSON.parse(raw)
          u.avatar_url = data.data.avatar_url // e.g. uploads/avatars/...
          localStorage.setItem('user', JSON.stringify(u))
        } catch {}
      }
      alert('頭像已更新')
    } else {
      throw new Error(data.message || '上傳失敗')
    }
  } catch (err) {
    console.error(err)
    alert(`上傳失敗：${err.response?.data?.message || err.message}`)
    await fetchUserProfile() // 回滾顯示
  } finally {
    uploading.value = false
    e.target.value = '' // 清空 input，避免同檔不觸發 change
  }
}

// --- 表單資料 ---
const profileForm = reactive({
  email: '',
  password: '',
  backup_email: '',
  display_name: '',
  badge: '',
  birthday: '',
  gender: '',
  created_at: '',
  location: '',
  avatarUrl: null
})

// 顯示頭像
const displayAvatar = computed(() => {
  return profileForm.avatarUrl || getPublicImg('users/userp.png')
})

// --- 讀取使用者資料 ---
async function fetchUserProfile () {
  loading.value = true
  error.value = null
  try {
    const resp = await axios.get(
      import.meta.env.VITE_API_BASE + `/user/userProfile.php?user_id=${userId}`
    )
    if (resp.data.status === 'success') {
      const userData = resp.data.data
      Object.assign(profileForm, userData)

      // badge 用 role
      profileForm.badge = userData.role || '一般會員'

      // avatarUrl 轉成完整網址顯示
      profileForm.avatarUrl = userData.avatar_url
        ? import.meta.env.VITE_API_BASE + `/${userData.avatar_url}`
        : getPublicImg('users/userp.png')

      memberInfo.value.avatarUrl = profileForm.avatarUrl
      memberInfo.value.name = userData.display_name

      profileForm.birthday = userData.birthday ? userData.birthday.split(' ')[0] : ''
      profileForm.created_at = userData.created_at
        ? userData.created_at.split(' ')[0].replace(/-/g, '/')
        : ''
      profileForm.password = ''
    } else {
      throw new Error(resp.data.message || '讀取會員資料失敗')
    }
  } catch (err) {
    console.error('獲取使用者資料失敗:', err)
    error.value = '無法載入使用者資料，請稍後再試。'
  } finally {
    loading.value = false
  }
}

onMounted(fetchUserProfile)

// --- 更新使用者資料 ---
async function handleSave (formType) {
  saving.value = true
  const apiUrl = import.meta.env.VITE_API_BASE + `/user/userProfile.php?user_id=${userId}`
  let payload = {}

  if (formType === 'account') {
    payload = { backup_email: profileForm.backup_email }
    if (profileForm.password && profileForm.password.trim() !== '') {
      payload.password = profileForm.password
    }
  } else if (formType === 'profile') {
    payload = {
      display_name: profileForm.display_name,
      birthday: profileForm.birthday,
      gender: profileForm.gender,
      location: profileForm.location
    }
  }

  try {
    const response = await axios.patch(apiUrl, payload)
    if (response.data.status === 'success') {
      alert('更新成功！')
      await fetchUserProfile()
      if (formType === 'account') isEditingAccount.value = false
      if (formType === 'profile') isEditingProfile.value = false
    } else {
      throw new Error(response.data.message || '後端回報更新失敗')
    }
  } catch (err) {
    console.error('更新失敗:', err)
    alert(`更新失敗: ${err.response?.data?.message || err.message}`)
  } finally {
    saving.value = false
  }
}

// 放棄修改
function handleCancel (formType) {
  if (confirm('確定要放棄所有未儲存的修改嗎？')) {
    if (formType === 'account') isEditingAccount.value = false
    if (formType === 'profile') isEditingProfile.value = false
    fetchUserProfile()
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
            <img :src="displayAvatar" alt="Avatar" class="w-40 h-40 rounded-full object-cover mb-3" />
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
        <!-- 手機版選單 -->
        <div class="relative lg:hidden mb-6">
          <button
            @click="toggleDropdown"
            class="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-md shadow-sm"
          >
            <div class="flex items-center">
              <img :src="displayAvatar" alt="Avatar" class="w-8 h-8 rounded-full object-cover mr-3" />
              <span class="font-semibold">{{ memberInfo.name }}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                 class="w-5 h-5 transition-transform" :class="{ 'rotate-180': isDropdownOpen }">
              <path fill-rule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd" />
            </svg>
          </button>
          <transition name="fade">
            <div v-if="isDropdownOpen" class="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg">
              <router-link
                v-for="item in menuItems"
                :key="item.name"
                :to="item.href"
                class="block px-4 py-3 text-gray-700 hover:bg-[#F2994A] hover:text-white"
              >
                {{ item.name }}
              </router-link>
            </div>
          </transition>
        </div>

        <!-- 載入/錯誤 -->
        <div v-if="loading" class="text-center text-gray-700 text-xl">資料載入中...</div>
        <div v-else-if="error" class="text-center text-red-500 text-xl">{{ error }}</div>

        <!-- 內容 -->
        <div v-else class="space-y-8 max-w-2xl mx-auto">
          <!-- 大頭照 -->
          <div class="relative w-72 h-72 mx-auto group">
            <img :src="displayAvatar" alt="User Avatar" class="w-full h-full object-cover rounded-full border-4 border-white" />
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full
                        flex items-center justify-center gap-4 p-2 transition-opacity duration-300">
              <button
                @click="handleAvatarUploadClick"
                class="text-sm bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-2 px-4 rounded-[8px]
                       transition-all opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 duration-300"
                :disabled="uploading"
              >
                {{ uploading ? '上傳中…' : '圖片上傳' }}
              </button>
              <input
                type="file"
                ref="fileInput"
                @change="onFileChange"
                accept="image/*"
                class="hidden"
              />
            </div>
          </div>

          <!-- 帳號與安全 -->
          <div class="bg-white p-6 lg:p-8 rounded-lg shadow-[0_8px_32px_0_rgba(255,255,255,0.4)]">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">帳號與安全</h2>
            <div class="space-y-4 text-xl">
              <div class="grid grid-cols-3 items-center gap-4">
                <span class="font-bold text-gray-600 col-span-1">電子信箱</span>
                <span class="font-medium text-gray-900 col-span-2">{{ profileForm.email }}</span>
              </div>

              <template v-if="isEditingAccount">
                <div class="grid grid-cols-3 items-center gap-4">
                  <label for="password" class="font-bold text-gray-600 col-span-1">重設密碼</label>
                  <input id="password" type="password" v-model="profileForm.password"
                         placeholder="留空為不更改密碼" autocomplete="new-password"
                         class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <label for="backupEmail" class="font-bold text-gray-600 col-span-1">備用信箱</label>
                  <input id="backupEmail" type="email" v-model="profileForm.backup_email"
                         class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md" />
                </div>
              </template>

              <template v-else>
                <div class="grid grid-cols-3 items-center gap-4">
                  <span class="font-bold text-gray-600 col-span-1">密碼</span>
                  <span class="font-medium text-gray-900 col-span-2">********</span>
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <span class="font-bold text-gray-600 col-span-1">備用信箱</span>
                  <span class="font-medium text-gray-900 col-span-2">
                    {{ profileForm.backup_email || '尚未設定' }}
                  </span>
                </div>
              </template>
            </div>

            <div class="mt-6 flex gap-4">
              <template v-if="isEditingAccount">
                <button
                  @click="handleSave('account')"
                  class="flex-1 bg-[#F2994A] text-white font-bold py-2 px-4 rounded-[8px] transition-colors
                         hover:border-[#F2994A] hover:brightness-110 hover:bg-white hover:text-black"
                  :disabled="saving"
                >
                  {{ saving ? '儲存中...' : '確認儲存' }}
                </button>
                <button
                  @click="handleCancel('account')"
                  class="flex-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-400 font-bold py-2 px-4 rounded-[8px] transition-colors"
                >
                  取消
                </button>
              </template>
              <template v-else>
                <button
                  @click="isEditingAccount = true"
                  class="flex-1 bg-[#F2994A] text-white font-bold py-2 px-4 rounded-[8px] transition-colors
                         hover:bg-white hover:text-black hover:border hover:border-[#F2994A]"
                >
                  編輯
                </button>
                <!-- <button
                  class="flex-1 bg-white hover:bg-gray-100 text-red-600 border border-red-600 font-bold py-2 px-4 rounded-[8px] transition-colors"
                >
                  刪除帳號
                </button> -->
              </template>
            </div>
          </div>

          <!-- 會員資訊 -->
          <div class="bg-white p-6 lg:p-8 rounded-lg shadow-[0_8px_32px_0_rgba(255,255,255,0.4)]">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">會員資訊</h2>
            <div class="space-y-4 text-xl">
              <template v-if="isEditingProfile">
                <div class="grid grid-cols-3 items-center gap-4">
                  <label class="font-bold text-gray-600 col-span-1">會員暱稱</label>
                  <input type="text" v-model="profileForm.display_name"
                         class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <span class="font-bold text-gray-600 col-span-1">身份徽章</span>
                  <span class="font-medium text-gray-900 col-span-2">{{ profileForm.badge }}</span>
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <label class="font-bold text-gray-600 col-span-1">生日</label>
                  <input type="date" v-model="profileForm.birthday"
                         class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <label class="font-bold text-gray-600 col-span-1">性別</label>
                  <select v-model="profileForm.gender" class="col-span-2 w-1/2 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                    <option>男生</option><option>女生</option><option>其他</option>
                  </select>
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <span class="font-bold text-gray-600 col-span-1">加入時間</span>
                  <span class="font-medium text-gray-900 col-span-2">{{ profileForm.created_at }}</span>
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <label class="font-bold text-gray-600 col-span-1">所在地區</label>
                  <input type="text" v-model="profileForm.location"
                         class="col-span-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md" />
                </div>
              </template>

              <template v-else>
                <div class="grid grid-cols-3 items-center gap-4">
                  <span class="font-bold text-gray-600 col-span-1">會員暱稱</span>
                  <span class="font-medium text-gray-900 col-span-2">{{ profileForm.display_name }}</span>
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <span class="font-bold text-gray-600 col-span-1">身份徽章</span>
                  <span class="font-medium text-gray-900 col-span-2">{{ profileForm.badge }}</span>
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <span class="font-bold text-gray-600 col-span-1">生日</span>
                  <span class="font-medium text-gray-900 col-span-2">{{ profileForm.birthday }}</span>
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <span class="font-bold text-gray-600 col-span-1">性別</span>
                  <span class="font-medium text-gray-900 col-span-2">{{ profileForm.gender }}</span>
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <span class="font-bold text-gray-600 col-span-1">加入時間</span>
                  <span class="font-medium text-gray-900 col-span-2">{{ profileForm.created_at }}</span>
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <span class="font-bold text-gray-600 col-span-1">所在地區</span>
                  <span class="font-medium text-gray-900 col-span-2">{{ profileForm.location }}</span>
                </div>
              </template>
            </div>

            <div class="mt-6 flex gap-4">
              <template v-if="isEditingProfile">
                <button
                  @click="handleSave('profile')"
                  class="flex-1 bg-[#F2994A] text-white font-bold py-2 px-4 rounded-[8px] transition-colors
                         hover:border-[#F2994A] hover:brightness-110 hover:bg-white hover:text-black"
                  :disabled="saving"
                >
                  {{ saving ? '儲存中...' : '儲存' }}
                </button>
                <button
                  @click="handleCancel('profile')"
                  class="flex-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-400 font-bold py-2 px-4 rounded-[8px] transition-colors"
                >
                  放棄修改
                </button>
              </template>
              <template v-else>
                <button
                  @click="isEditingProfile = true"
                  class="flex-1 bg-[#F2994A] text-white font-bold py-2 px-4 rounded-[8px] transition-colors
                         hover:bg-white hover:text-black hover:border hover:border-[#F2994A]"
                >
                  編輯
                </button>
              </template>
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
.fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; transform: translateY(-10px); }
.sticky { position: -webkit-sticky; position: sticky; }
</style>
