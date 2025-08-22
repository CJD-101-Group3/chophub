import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth' // 1. 引入 Pinia Auth Store

// --- 引入您的所有頁面元件 ---
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
    { path: '/Weaponslist/:WeaponDetail', component: WeaponDetail },
    { path: '/ArtisanShowcase/:userId', name: 'ArtisanShowcase', component: ArtisanShowcase }, // 公開的刀匠展示頁
    { path: '/event/:id', name: 'EventDetail', component: () => import('@/views/EventDetail.vue') },
    
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

    // --- 需要特定角色 (刀匠) 才能訪問的頁面 ---
    { 
      path: '/EditArtisanProfile', 
      component: EditArtisanProfile,
      meta: { requiresAuth: true, requiredRole: '刀匠' } // 假設登入後 role 欄位的值是 'artisan'
    },
    
    // --- 404 頁面，必須放在最後 ---
    { path: '/:pathMatch(.*)*', name: 'PageNotFound', component: PageNotFound },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE),
    routes
})

// --- 3. 建立全域前置路由守衛 ---
router.beforeEach((to, from, next) => {
  // 在守衛函式內部，我們才能安全地實例化 Pinia store
  const authStore = useAuthStore();
  
  const requiresAuth = to.meta.requiresAuth;
  const requiredRole = to.meta.requiredRole;

  // 檢查1: 目標頁面是否需要登入
  if (requiresAuth && !authStore.isLoggedIn) {
    // 如果需要登入，但 Pinia store 顯示使用者未登入
    console.log('路由守衛：此頁面需要登入，但使用者未登入。重新導向至 /Login');
    // 將使用者重新導向到登入頁面
    next({ name: 'Login' });
  }
  // 檢查2: 目標頁面是否需要特定角色
  else if (requiredRole && authStore.userRole !== requiredRole) {
    // 如果需要特定角色，但 Pinia store 中使用者的角色不符
    console.log(`路由守衛：此頁面需要 '${requiredRole}' 角色，但使用者角色是 '${authStore.userRole}'。重新導向至首頁`);
    // 將使用者重新導向到首頁 (或是一個 403 Forbidden 錯誤頁面)
    next({ name: 'Home' });
  }
  // 如果以上檢查都通過
  else {
    // 放行，讓使用者正常進入目標頁面
    next();
  }
});


export default router;