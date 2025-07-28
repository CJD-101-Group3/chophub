<script setup>
import { ref } from 'vue'
import logo from '@/assets/icon/LOGO.png'
import Basebutton from './Basebutton.vue'
import user from '@/assets/icon/user.svg'
import message from '@/assets/icon/message.svg'
import weapon from '@/assets/icon/sword.svg'
import calendar from '@/assets/icon/calendar.svg'
import aboutus from '@/assets/icon/aboutus.svg'
const isOpen = ref(false)
</script>

<template>
    <header class="w-full h-[74px] bg-[#282828] flex items-center justify-between px-6 border-b-[0.5px] border-gray-700">
        <!-- Logo -->
        <RouterLink to="/MainPage">
        <div class="flex items-center space-x-2">
            <img :src="logo" alt="LOGO" class="w-[70px] h-[70px]" />
        </div>
        </RouterLink>
        <!-- 漢堡選單 -->
        <button @click="isOpen = true" class="h2 text-white md:hidden">≡</button>
        <!-- 電腦版導覽連結 -->
        <nav class="hidden md:flex h5 items-center space-x-6 text-white ">
            <RouterLink to="/post" class="h5 hover:text-orange-400 transition">貼文區</RouterLink>
            <RouterLink to="/weaponlist" class="h5 hover:text-orange-400 transition">武器展示區</RouterLink>
            <RouterLink to="/EventHomePage" class="h5 hover:text-orange-400 transition">活動專區</RouterLink>
            <RouterLink to="/About" class="h5 hover:text-orange-400 transition">關於我們</RouterLink>
            <div class="flex items-center space-x-2">
                <!-- 登入註冊按鈕 -->
                <RouterLink to="/Register">
                    <Basebutton>SignIn</Basebutton>
                </RouterLink>
                <RouterLink to="/Login">
                    <Basebutton variant="outline">LogIn</Basebutton>
                </RouterLink>
            </div>
        </nav>
    </header>

    <!-- 手機版側邊欄 -->
    <aside
        v-if="isOpen"
        class="fixed top-0 right-0 h-full w-[80vw] bg-[#F6B94A] z-50 p-6 space-y-5 text-black transition-all">
        <!-- 關閉按鈕 -->
        <div class="flex justify-end">
            <button @click="isOpen = false" class="h1  hover:text-white transition duration-300">×</button>
        </div>

        <!-- 登入 / 註冊 -->
        <RouterLink
            to="/Login"
            class="group flex items-center space-x-2 pb-3 border-b border-black hover:text-white transition duration-300 block"
            @click="isOpen = false">
            <img :src="user" alt="user" class="h1 w-5 h-5 group-hover:brightness-0 group-hover:invert duration-300" />
            <span class="font-bold">點此登入/註冊</span>
        </RouterLink>
        <!-- 導覽項目 -->
        <RouterLink
            to="/post"
            class="group flex items-center space-x-2 hover:text-white transition block"
            @click="isOpen = false">
            <img :src="message" alt="message" class="h1 w-5 h-5 group-hover:brightness-0 group-hover:invert duration-300" />
            <span class="font-bold">貼文區</span>
        </RouterLink>

        <RouterLink
            to="/Weaponslist"
            class="group flex items-center space-x-2 hover:text-white transition block"
            @click="isOpen = false">
            <img :src="weapon" alt="weapon" class="h1 w-5 h-5 group-hover:brightness-0 group-hover:invert duration-300" />
            <span class="font-bold">武器展示區</span>
        </RouterLink>

        <RouterLink
            to="/EventHomePage"
            class="group flex items-center space-x-2 hover:text-white transition block"
            @click="isOpen = false">
            <img :src="calendar" alt="calendar" class="h1 w-5 h-5 group-hover:brightness-0 group-hover:invert duration-300" />
            <span class="font-bold">活動專區</span>
        </RouterLink>

        <RouterLink
            to="/About"
            class="group flex items-center space-x-2 hover:text-white transition block"
            @click="isOpen = false">
            <img :src="aboutus" alt="aboutus" class="h1 w-5 h-5 group-hover:brightness-0 group-hover:invert duration-300" />
            <span class="font-bold">關於我們</span>
        </RouterLink>
    </aside>
</template>
