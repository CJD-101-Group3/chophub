// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios' // ⬅️ 新增
import { useAuthStore } from '@/stores/auth'

// --- 頁面元件 ---
import Home from '@/views/Home.vue'
import About from '@/views/AboutUs.vue'
import Post from '@/views/Post.vue'
import Weaponslist from '@/views/Weaponslist.vue'
import Login from '@/views/Login.vue'
import events from '@/views/events.vue'
import EventPayment from '@/views/EventPayment.vue'
import Register from '@/views/Register.vue'
import PaymentSuccess from '@/views/PaymentSuccess.vue'
import EventReview from '@/views/EventReview.vue'
import UserProfile from '@/views/UserProfile.vue'
import ApplicationGuide from '@/views/ApplicationGuide.vue'
import OtherSettings from '@/views/OtherSettings.vue'
import EditProfile from '@/views/EditProfile.vue'
import UserCollections from '@/views/UserCollections.vue'
import MyActivities from '@/views/MyActivities.vue'
import MyEvents from '@/views/MyEvents.vue'
import EventHomePage from '@/views/EventHomePage.vue'
import EventReviewsOverview from '@/views/EventReviewsOverview.vue'
import EditArtisanProfile from '@/views/EditArtisanProfile.vue'
import ArtisanShowcase from '@/views/ArtisanShowcase.vue'
import PostActivity from '@/views/PostActivity.vue'
import PostDetail from '@/views/PostDetail.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import WeaponDetail from '@/views/WeaponDetail.vue'
import TicketDetailPage from '@/views/TicketDetailPage.vue'

<<<<<<< HEAD
const routes = [
    // --- 公開頁面 (不需要登入) ---
    { path: '/', name: 'Home', component: Home },
    { path: '/About', component: About },
    { path: '/post', component: Post },
    { path: '/Weaponslist', component: Weaponslist },
    { path: '/Login', name: 'Login', component: Login }, // 建議為登入頁加上 name
    { path: '/Register', name: 'Register', component: Register }, // 建議為註冊頁加上 name
    { path: '/events', component: events },
    { path: '/EventHomePage', component: EventHomePage },
    { path: '/EventReviewsOverview', component: EventReviewsOverview },
    { path: '/post/:id', component: PostDetail },
    { path: '/weaponslist/weapondetail/:weapon_id', component:WeaponDetail},
    { path: '/ArtisanShowcase/:userId', name: 'ArtisanShowcase', component: ArtisanShowcase }, // 公開的刀匠展示頁
    { path: '/event/:id', name: 'EventDetail',
      name: 'event-detail',
      component: () => import('@/views/EventDetail.vue') },
    
    // --- 需要登入才能訪問的頁面 ---
    { path: '/EventPayment', component: EventPayment, meta: { requiresAuth: true } },
    { path: '/PaymentSuccess', component: PaymentSuccess, meta: { requiresAuth: true } },
    { path: '/EventReview', component: EventReview, meta: { requiresAuth: true } },
    { path: '/UserProfile', component: UserProfile, meta: { requiresAuth: true } },
    { path: '/ApplicationGuide', component: ApplicationGuide, meta: { requiresAuth: true } },
    { path: '/OtherSettings', component: OtherSettings, meta: { requiresAuth: true } },
    { path: '/EditProfile', component: EditProfile, meta: { requiresAuth: true } },
    { path: '/UserCollections', component: UserCollections, meta: { requiresAuth: true } },
    { path: '/MyActivities', component: MyActivities, meta: { requiresAuth: true } },
    { path: '/MyEvents', component: MyEvents, meta: { requiresAuth: true } },
    { path: '/EventDetailRegistered', component: () => import('@/views/EventDetailRegistered.vue'), meta: { requiresAuth: true } },    
    { path: '/PostActivity', component: PostActivity, meta: { requiresAuth: true } },
    { path: '/TicketDetailPage/:id', name: 'TicketDetail', component: TicketDetailPage, meta: { requiresAuth: true } },
    { path: '/my-events', name: 'My-Events', component: MyEvents, meta: { requiresAuth: true } },
=======
// ✅ 統一 API base（可用 .env 設定 VITE_API_BASE，否則用本機預設）
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8888/ChopHub-API'
>>>>>>> c4eb42fb621e707e84d2dbf9769cab62130cbcc2

const routes = [
  // --- 公開頁面 ---
  { path: '/', name: 'Home', component: Home },
  { path: '/About', component: About },
  { path: '/post', component: Post },
  { path: '/Weaponslist', component: Weaponslist },
  { path: '/Login', name: 'Login', component: Login, meta: { guestOnly: true } },
  { path: '/Register', name: 'Register', component: Register, meta: { guestOnly: true } },
  { path: '/events', component: events },
  { path: '/EventHomePage', component: EventHomePage },
  { path: '/EventReviewsOverview', component: EventReviewsOverview },
  { path: '/post/:id', component: PostDetail },
  { path: '/weaponslist/weapondetail/:weapon_id', component: WeaponDetail },

  // ⭐ 只允許「刀匠」ID 才能進入（人人都能看，但若手動輸入非刀匠 ID，就導回首頁）
  {
    path: '/ArtisanShowcase/:userId',
    name: 'ArtisanShowcase',
    component: ArtisanShowcase,
    beforeEnter: async (to, from, next) => {
      const { userId } = to.params
      if (!userId || isNaN(Number(userId))) {
        return next({ name: 'Home', replace: true })
      }
      try {
        // 1) 優先打輕量檢查 API：/api/is_artisan.php?user_id=xxx
        const res = await axios.get(`${API_BASE}/api/is_artisan.php`, { params: { user_id: userId } })
        if (res?.data?.is_artisan) {
          return next()
        }
        // 非刀匠
        return next({ name: 'Home', replace: true })
      } catch (err) {
        const status = err?.response?.status
        if (status === 404 || status === 403) {
          // 明確不是刀匠 / 禁止
          return next({ name: 'Home', replace: true })
        }
        // 2) 後備方案：若還沒有 is_artisan.php，就探一次 artisanProfile.php
        try {
          const r = await axios.get(`${API_BASE}/api/user/artisanProfile.php`, { params: { user_id: userId } })
          const ok = r?.data?.status === 'success' && r?.data?.data
          return ok ? next() : next({ name: 'Home', replace: true })
        } catch {
          return next({ name: 'Home', replace: true })
        }
      }
    }
  },

  { path: '/event/:id', name: 'EventDetail', component: () => import('@/views/EventDetail.vue') },

  // --- 需要登入 ---
  { path: '/EventPayment', component: EventPayment, meta: { requiresAuth: true } },
  { path: '/PaymentSuccess', component: PaymentSuccess, meta: { requiresAuth: true } },
  { path: '/EventReview', component: EventReview, meta: { requiresAuth: true } },
  { path: '/UserProfile', component: UserProfile, meta: { requiresAuth: true } },
  { path: '/ApplicationGuide', component: ApplicationGuide, meta: { requiresAuth: true } },
  { path: '/OtherSettings', component: OtherSettings, meta: { requiresAuth: true } },
  { path: '/EditProfile', component: EditProfile, meta: { requiresAuth: true } },
  { path: '/UserCollections', component: UserCollections, meta: { requiresAuth: true } },
  { path: '/MyActivities', component: MyActivities, meta: { requiresAuth: true } },
  { path: '/MyEvents', component: MyEvents, meta: { requiresAuth: true } },
  { path: '/EventDetailRegistered', component: () => import('@/views/EventDetailRegistered.vue'), meta: { requiresAuth: true } },
  { path: '/PostActivity', component: PostActivity, meta: { requiresAuth: true } },
  { path: '/TicketDetailPage/:id', name: 'TicketDetail', component: TicketDetailPage, meta: { requiresAuth: true } },

  // --- 需要特定角色 ---
  {
    path: '/EditArtisanProfile',
    component: EditArtisanProfile,
    meta: { requiresAuth: true, requiredRole: '刀匠' }
  },

  // --- 404 ---
  { path: '/:pathMatch(.*)*', name: 'PageNotFound', component: PageNotFound }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

/**
 * 全域前置守衛
 * 1) 需要登入的頁面：未登入 => 轉到 Login，並帶 redirect 回跳
 * 2) 已登入者不可再進入（Login / Register）
 * 3) 需要特定角色：角色不符 => 轉 Home（或 403 頁）
 */
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  const isLoggedIn = !!auth.isLoggedIn
  const userRole = auth.userRole || ''

  // 1) 需要登入
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  // 2) 已登入者不可進入（登入/註冊）
  if (to.meta.guestOnly && isLoggedIn) {
    return next({ name: 'Home' })
  }

  // 3) 需要特定角色
  if (to.meta.requiredRole) {
    const roles = Array.isArray(to.meta.requiredRole) ? to.meta.requiredRole : [to.meta.requiredRole]
    if (!roles.includes(userRole)) {
      return next({ name: 'Home' })
    }
  }

  return next()
})

export default router
