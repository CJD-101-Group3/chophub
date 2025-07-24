import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/AboutUs.vue'
import Post from '../views/Post.vue'
import Weaponslist from '../views/Weaponslist.vue'
import Login from '../views/Login.vue'
import events from '../views/events.vue'
import EventPayment from '../views/EventPayment.vue'
import Register from '../views/Register.vue'



const routes = [
    { path: '/', component: Home },
    { path: '/About', component: About },
    { path: '/post', component: Post },
    { path: '/Weaponslist', component: Weaponslist },
    { path: '/Login', component: Login },
    { path: '/events', component: events},
    { path: '/EventPayment', component: EventPayment},
    { path: '/Register', component: Register},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;