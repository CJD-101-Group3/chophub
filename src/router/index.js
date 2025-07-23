import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/AboutUs.vue'
import Post from '../views/Post.vue'


const routes = [
    { path: '/', component: Home },
    { path: '/About', component: About },
    { path: '/post', component: Post }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;