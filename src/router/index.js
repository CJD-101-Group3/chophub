import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/AboutUs.vue'
import Post from '../views/Post.vue'
import Weaponslist from '../views/Weaponslist.vue'
import Login from '../views/Login.vue'


const routes = [
    { path: '/', component: Home },
    { path: '/About', component: About },
    { path: '/post', component: Post },
    { path: '/Weaponslist', component: Weaponslist },
    { path: '/Login', component: Login },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;