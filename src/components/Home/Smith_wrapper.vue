<template>
    <div
        class="absolute left-1/2 translate-x-[-50%] z-20 bottom-[5%] w-[50vw] sm:bottom-[11%] sm:w-[37vw] md:bottom-[11%] md:w-[15vw]">
        <!-- 對話泡泡 -->
        <div
            :key="message"
            class="absolute top-[-19%] left-[3%] translate-x-[-50%] px-4 py-2 bg-white border-2 border-black rounded-lg text-black w-max shadow-lg animate-fade-in text-[5vw] sm:text-[3vw] md:text-[1.5vw]">
            {{ message }}

            <div
                class="absolute left-1/2 translate-x-[-50%] top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-black"></div>
        </div>

        <!-- 圖像本體 -->
        <div class="relative w-full">
            <!-- 陰影 -->
            <div
                class="absolute bottom-[5%] left-1/2 translate-x-[-30%] w-[12vw] h-[8vw] md:w-[6vw] md:h-[4vw] bg-black/20 rounded-full blur-[2px] z-0"></div>

            <!-- Smith 本人 -->
            <img src="/Home_img/Smith_1.png" alt="Smith" class="w-full relative z-20" />
            <!-- 手 -->
            <img
                src="/Home_img/Hand_0.png"
                alt="Smith 手"
                class="absolute bottom-[50%] left-1/2 z-10 w-[28vw] translate-x-[-53%] sm:bottom-[50%] sm:w-[21vw]
                md:bottom-[50%] md:w-[9vw] md:translate-x-[18%] animate-swing-hand" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 輪播訊息陣列
const messages = [
    '歡迎來到 ChopHub！',
    '看看武器架上的武器吧!',
    '也許有新的活動喔!',
    '有鐵塊又偷溜出去了？',
    '我昨天鍛的劍呢！',
    '別看了,逛留言板吧!',
]

const message = ref(messages[0])
let index = 0

// 每 3 秒輪播訊息
onMounted(() => {
    setInterval(() => {
        index = (index + 1) % messages.length
        message.value = messages[index]
    }, 4000)
})
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.5s ease-in-out both;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: scale(0.95);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes swingHand {
    0%,
    100% {
        transform: translateX(18%) rotate(0deg);
    }
    10% {
        transform: translateX(18%) rotate(5deg);
    }
    20% {
        transform: translateX(18%) rotate(0deg);
    }
    30% {
        transform: translateX(18%) rotate(7deg);
    }
    40% {
        transform: translateX(18%) rotate(0deg);
    }
    50% {
        transform: translateX(18%) rotate(5deg);
    }
    60% {
        transform: translateX(18%) rotate(0deg);
    }
}

.animate-swing-hand {
    animation: swingHand 4s ease-in-out infinite;
    transform-origin: left bottom;
}
</style>
