<template>
    <!-- 夜間遮罩 -->
    <div
        v-if="!isDay"
        class="hidden md:block absolute inset-0 bg-[#BB5E00]/40 pointer-events-none z-[5] transition-opacity duration-500"></div>

    <!-- 窗戶圖片 -->
    <img
        :src="isDay ? window_img_d : window_img_n"
        alt="窗戶"
        class="absolute w-[27vw] bottom-[54%] left-1/2 translate-x-[-20%] z-10 cursor-pointer transition duration-300 hover:drop-shadow-[0_0_20px_rgba(180,100,255,0.6)]"
        @click="toggleWindow" />
</template>

<script setup>

defineProps({
    isDay: Boolean,
})
const emit = defineEmits(['toggle'])

const toggleWindow = () => emit('toggle')

const window_img_d = `${import.meta.env.BASE_URL}Home_img/Window_d.png`
const window_img_n = `${import.meta.env.BASE_URL}Home_img/Window_n.png`
</script>
