<script setup>
import logo from '@/assets/icon/LOGO.png'
import Basebutton from './Basebutton.vue';
</script>

<template>
    <header class="w-full h-[74px] bg-[#282828] flex items-center justify-between px-6">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
            <img :src="logo" alt="LOGO" class="w-[70px] h-[70px]" />
        </div>

        <!-- 導覽連結 -->
        <nav class="md:flex items-center space-x-6 text-white text-sm">
            <a href="#" class="h5 hover:text-orange-400 transition">貼文區</a>
            <a href="#" class="h5 hover:text-orange-400 transition">武器展示區</a>
            <a href="#" class="h5 hover:text-orange-400 transition">活動專區</a>
            <a href="#" class="h5 hover:text-orange-400 transition">關於我們</a>
            <div class="flex items-center space-x-2">
                <!-- 按鈕 -->
                <Basebutton>SignIn</Basebutton>
                <Basebutton variant="outline">LogIn</Basebutton>
            </div>
        </nav>
    </header>
</template>
