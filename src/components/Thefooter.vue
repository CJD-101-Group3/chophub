<script setup>
import instagram from '@/assets/icon/instagram.svg'
import Facebook from '@/assets/icon/Facebook.svg'
import Twitter from '@/assets/icon/twitter.svg'
import logo from '@/assets/icon/LOGO.png'
</script>

<template>
    <footer class="w-full h-[74px] bg-[#282828] flex items-center justify-between px-6 text-white text-sm">
        <!-- 左邊區塊 -->
        <div class="flex items-center space-x-4">
            <img :src="logo" alt="logo" class="w-[70px] h-[70px]" />
            <span class="text-white text-sm">© 2025 Chophub</span>
            <span>—</span>
            <a href="#" class="hover:text-orange-400 transition">About</a>
        </div>

        <!-- 右邊社群圖示 -->
        <div class="flex items-center space-x-4">
            <a href="#"><img :src="instagram" alt="instagram" class="w-[32px] h-[32px]" /></a>
            <a href="#"><img :src="Facebook" alt="facebook" class="w-[32px] h-[32px]" /></a>
            <a href="#"><img :src="Twitter" alt="twitter" class="w-[32px] h-[32px]" /></a>
        </div>
    </footer>
</template>
