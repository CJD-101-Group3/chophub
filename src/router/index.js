import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/AboutUs.vue'
import Post from '../views/Post.vue'
import Weaponslist from '../views/Weaponslist.vue'
import Login from '../views/Login.vue'
import events from '../views/events.vue'
import EventPayment from '../views/EventPayment.vue'
import Register from '../views/Register.vue'
import MainPage from '@/views/MainPage.vue'
import PaymentSuccess from '@/views/PaymentSuccess.vue'
import EventReview from '@/views/EventReview.vue'
import UserProfile from '@/views/UserProfile.vue'
import ApplicationGuide from '@/views/ApplicationGuide.vue'
import OtherSettings from '@/views/OtherSettings.vue'




const routes = [
    { path: '/', component: Home },
    { path: '/About', component: About },
    { path: '/post', component: Post },
    { path: '/Weaponslist', component: Weaponslist },
    { path: '/Login', component: Login },
    { path: '/events', component: events},
    { path: '/EventPayment', component: EventPayment},
    { path: '/Register', component: Register},
    { path: '/MainPage', component: MainPage},
    { path: '/PaymentSuccess', component: PaymentSuccess},
    { path: '/EventReview', component: EventReview},
    { path: '/UserProfile', component: UserProfile},
    { path: '/ApplicationGuide', component: ApplicationGuide},
    { path: '/OtherSettings', component: OtherSettings},


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;