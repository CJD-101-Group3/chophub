import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/AboutUs.vue'


const routes = [
    { path: '/', component: Home },
    { path: '/About', component: About }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;