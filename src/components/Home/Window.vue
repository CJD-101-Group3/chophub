<template>
    <!-- 夜間遮罩 -->
    <div
        v-if="!isDay"
        class="absolute inset-0 bg-[#BB5E00]/40 pointer-events-none z-[5] transition-opacity duration-500"></div>

    <!-- 窗戶圖片 -->
    <img
        :src="isDay ? window_img_d : window_img_n"
        alt="窗戶"
        class="absolute 
        w-[60vw] h-[33vh] left-[40%] bottom-[65%] 
        md:w-[27vw] md:bottom-[54%] md:left-1/2 md:translate-x-[-20%] 
        z-10 cursor-pointer transition duration-300 
        hover:drop-shadow-[0_0_20px_rgba(180,100,255,0.6)]"
        @click="toggleWindow" />
</template>

<script setup>

defineProps({
    isDay: Boolean,
})
const emit = defineEmits(['toggle'])

const toggleWindow = () => emit('toggle')

import { getPublicImg } from '@/utils/getPublicImg'
const window_img_d = getPublicImg('Home_img/Window_d.png')
const window_img_n = getPublicImg('Home_img/Window_n.png')
</script>
