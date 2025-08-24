<template>
    <div
        class="absolute 
        w-[50vw] h-[35vh] left-[-10%] bottom-[65%] 
        md:w-[20vw] md:bottom-[65%] md:left-[28%] 
        z-30 cursor-pointer"
        :class="{ 'animate-sway-once': isShaking }"
        @click="handleClick">
        <!-- 夜間光暈 -->
        <div
            v-if="!isDay"
             class="absolute left-1/2 -translate-x-1/2 -bottom-[1.2vw]
                  w-[40vw] h-[8vw] md:w-[20vw] md:h-[4vw]
                  rounded-full pointer-events-none z-0
                  opacity-50 blur-lg
                  bg-[radial-gradient(ellipse_at_center,rgba(255,255,150,0.22)_0%,rgba(255,255,150,0.1)_45%,transparent_75%)]"></div>

        <!-- 吊燈 -->
        <img
            src="/Home_img/Light.png"
            alt="吊燈"
            :class="[
                'w-full transition duration-300',
                !isDay && 'drop-shadow-[0_0_40px_rgba(255,255,150,0.7)] brightness-110',
            ]" />
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ isDay: Boolean })
const emit = defineEmits(['toggle'])

const isShaking = ref(false)

function handleClick() {
    // 觸發燈光切換
    emit('toggle')

    // 觸發晃動動畫
    isShaking.value = true
    setTimeout(() => {
        isShaking.value = false
    }, 500) // 和動畫時間一致
}
</script>

<style scoped>
@keyframes sway-once {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(2deg);
    }
    50% {
        transform: rotate(-2deg);
    }
    75% {
        transform: rotate(1deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

.animate-sway-once {
    animation: sway-once 0.5s ease-in-out;
    transform-origin: top center;
}
</style>
