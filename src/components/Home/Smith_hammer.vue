<template>
    <div class="absolute bottom-[-10%] left-1/2 translate-x-[-38%] z-20 w-[43vw]">
        <!-- 對話泡泡 -->
        <div
            :key="message"
            class="absolute top-[-20%] left-[30%] translate-x-[-50%] px-4 py-2 bg-white border-2 border-black rounded-lg text-black w-max shadow-lg animate-fade-in"
            style="font-size: 1.5vw">
            {{ message }}
            <div
                class="absolute left-1/2 translate-x-[-50%] top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-black"></div>
        </div>

        <div class="relative w-full">
            <!-- 陰影 -->
            <div
                class="absolute bottom-[5%] left-1/2 translate-x-[-30%] w-[6vw] h-[4vw] bg-black/20 rounded-full blur-[2px] z-0"></div>
                <!-- Smith 本人 -->
            <img src="/Home_img/Smith_2.png" alt="Smith" class="w-full relative z-10" />
            <!-- 揮槌動畫 -->
            <img :src="currentImage" alt="Smith hammer" class="w-full relative z-10" />
            
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 對話輪播
const messages = [
    '歡迎來到 ChopHub！',
    '看看武器架上的武器吧!',
    '也許有新的活動喔!',
    '有鐵塊又偷溜出去了？',
    '我昨天鍛的劍呢！',
    '別看了,逛留言板吧!',
]

const message = ref(messages[0])
let msgIndex = 0

// 揮槌圖片陣列
const hammerFrames = [
    '/Home_img/Hand_1.png',
    '/Home_img/Hand_2.png',
    '/Home_img/Hand_3.png',
    '/Home_img/Hand_2.png',
]

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
    }, 250)
})
</script>