// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
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

const routes = [
  // --- 公開頁面 ---
  { path: '/', name: 'Home', component: Home },
  { path: '/About', component: About },
  { path: '/post', component: Post },
  { path: '/Weaponslist', component: Weaponslist },
  // 「guestOnly: true」=> 已登入者不可再進入
  { path: '/Login', name: 'Login', component: Login, meta: { guestOnly: true } },
  { path: '/Register', name: 'Register', component: Register, meta: { guestOnly: true } },
  { path: '/events', component: events },
  { path: '/EventHomePage', component: EventHomePage },
  { path: '/EventReviewsOverview', component: EventReviewsOverview },
  { path: '/post/:id', component: PostDetail },
  { path: '/weaponslist/weapondetail/:weapon_id', component: WeaponDetail },
  { path: '/ArtisanShowcase/:userId', name: 'ArtisanShowcase', component: ArtisanShowcase },
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
  history: createWebHistory(import.meta.env.VITE_BASE), // 你專案用 VITE_BASE 就保留
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

/**
 * 全域前置守衛
 * 1) 需要登入的頁面：未登入 => 轉到 Login，並帶 redirect 回跳
 * 2) 已登入者禁止進入的頁面（Login / Register）：已登入 => 轉到 Home
 * 3) 需要特定角色的頁面：角色不符 => 轉到 Home（或改成 403）
 */
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  const isLoggedIn = !!auth.isLoggedIn // 你的 store 已有 isLoggedIn 布林或 getter
  const userRole = auth.userRole || '' // 你的 store 已有 userRole（如 '刀匠' / '一般會員'）

  // 1) 需要登入
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  // 2) 已登入者不可進入的頁面（登入/註冊）
  if (to.meta.guestOnly && isLoggedIn) {
    return next({ name: 'Home' })
  }

  // 3) 需要特定角色
  if (to.meta.requiredRole) {
    const roles = Array.isArray(to.meta.requiredRole) ? to.meta.requiredRole : [to.meta.requiredRole]
    if (!roles.includes(userRole)) {
      return next({ name: 'Home' }) // 或者導到一個 403 頁
    }
  }

  return next()
})

export default router
