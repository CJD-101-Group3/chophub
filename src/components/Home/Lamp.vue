<template>
    <div
        class="absolute w-[20vw] bottom-[68%] left-[30%] z-30 cursor-pointer"
        :class="{ 'animate-sway-once': isShaking }"
        @click="handleClick">
        <!-- 夜間光暈 -->
        <div
            v-if="!isDay"
            class="absolute top-full left-1/2 translate-x-[-50%] w-[40vw] h-[8vw] bg-yellow-200/20 rounded-full blur-2xl z-[-1] pointer-events-none"></div>

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
