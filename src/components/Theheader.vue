<script setup>
import logo from '@/src/assets/icon/LOGO.png'
</script>

<template>
    <header class="w-full h-[74px] bg-[#282828] flex items-center justify-between px-6">
        <!-- Logo -->
            <img :src="logo" alt="LOGO" class="flex items-center w-[70px] h-[70px] p-[2px]" />
        <!-- 導覽連結 -->
        <nav class="flex items-center space-x-6 text-white text-sm">
            <a href="#" class="hover:text-orange-400 transition">貼文區</a>
            <a href="#" class="hover:text-orange-400 transition">武器展示區</a>
            <a href="#" class="hover:text-orange-400 transition">活動專區</a>
            <a href="#" class="hover:text-orange-400 transition">關於我們</a>
        </nav>
    </header>
</template>
