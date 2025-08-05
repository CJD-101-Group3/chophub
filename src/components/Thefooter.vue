<script setup>
import instagram from '@/assets/icon/instagram.svg'
import Facebook from '@/assets/icon/Facebook.svg'
import Twitter from '@/assets/icon/twitter.svg'
import logo from '@/assets/icon/LOGO.png'
</script>

<template>
    <footer class="w-full h-[74px] bg-[#282828] flex items-center justify-between px-6 text-white border-t-[0.5px] border-gray-700">
        <!-- 左邊區塊 -->
        <div class="flex items-center space-x-4">
            <RouterLink to="/">
            <img :src="logo" alt="logo" class="w-[70px] h-[70px]" />
            </RouterLink>
            <span class="text-white h6">© 2025 Chophub.</span>
            <a href="#" class="hidden md:block h6">Built with by the ChopHub Team.</a>
        </div>

        <!-- 右邊社群圖示 -->
        <div class="flex items-center space-x-4">
            <a href="#"><img :src="instagram" alt="instagram" class="w-[32px] h-[32px]" /></a>
            <a href="#"><img :src="Facebook" alt="facebook" class="w-[32px] h-[32px]" /></a>
            <a href="#"><img :src="Twitter" alt="twitter" class="w-[32px] h-[32px]" /></a>
        </div>
    </footer>
</template>
