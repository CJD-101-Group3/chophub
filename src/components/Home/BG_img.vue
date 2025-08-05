<template>
    <div :class="wrapperClass">
        <img :src="bgSrc" alt="背景圖" class="absolute inset-0 w-full h-full object-cover z-0" />
    </div>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

const { width } = useWindowSize()

// 控制圖片路徑
const bgSrc = computed(() => (width.value < 768 ? '/Home_img/phone_BG_img.png' : '/Home_img/BG_img.png'))

const wrapperClass = computed(() => (width.value < 768 ? 'h-[100vh]' : 'aspect-[16/7]'))
</script>
