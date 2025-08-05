<template>
    <div class="">
        <!-- 揮槌動畫 -->
        <img :src="currentImage" alt="Smith hammer" class="w-full relative z-15 max-w-[300px] mx-auto" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 對話輪播

// 揮槌圖片陣列
const hammerFrames = ['/Home_img/Hand_1.png', '/Home_img/Hand_2.png', '/Home_img/Hand_3.png', '/Home_img/Hand_2.png']

const currentImage = ref(hammerFrames[0])
let imgIndex = 0

onMounted(() => {
    // 每 4 秒輪播訊息
    setInterval(() => {
        msgIndex = (msgIndex + 1) % messages.length
        message.value = messages[msgIndex]
    }, 4000)

    // 每 250ms 揮槌動畫切圖
    setInterval(() => {
        imgIndex = (imgIndex + 1) % hammerFrames.length
        currentImage.value = hammerFrames[imgIndex]
    }, 200)
})
</script>
