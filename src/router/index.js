import { createRouter, createWebHistory } from 'vue-router'

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
import EventDetail from '@/views/EventDetail.vue'
import EventDetailRegistered from '@/views/EventDetailRegistered.vue'
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
    { path: '/', component: Home },
    { path: '/About', component: About },
    { path: '/post', component: Post },
    { path: '/Weaponslist', component: Weaponslist },
    { path: '/Login', component: Login },
    { path: '/events', component: events},
    { path: '/EventPayment', component: EventPayment},
    { path: '/Register', component: Register},
    { path: '/PaymentSuccess', component: PaymentSuccess},
    { path: '/EventReview', component: EventReview},
    { path: '/UserProfile', component: UserProfile},
    { path: '/ApplicationGuide', component: ApplicationGuide},
    { path: '/OtherSettings', component: OtherSettings},
    { path: '/EditProfile', component: EditProfile},
    { path: '/UserCollections', component: UserCollections},
    { path: '/MyActivities', component: MyActivities},
    { path: '/MyEvents', component: MyEvents},
    { path: '/event/:id', name: 'EventDetail', component: () => import('@/views/EventDetail.vue')},
    { path: '/EventDetailRegistered', component: EventDetailRegistered},
    { path: '/EventHomePage', component: EventHomePage},
    { path: '/EventReviewsOverview', component: EventReviewsOverview},
    { path: '/EditArtisanProfile', component: EditArtisanProfile},
    { path: '/ArtisanShowcase', component: ArtisanShowcase},
    { path: '/PostActivity', component: PostActivity},
    { path: '/post/:id', component: PostDetail },
    { path: '/Weaponslist/:WeaponDetail', component:WeaponDetail},
    { path: '/TicketDetailPage/:id', name: 'TicketDetail', component:TicketDetailPage},
    // 請在這支上新添路由，不要添加在PageNotFound頁面底下
    { path: '/:pathMatch(.*)*', component:PageNotFound},

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;