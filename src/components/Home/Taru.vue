<template>
    <div
        class="absolute w-[20vw] bottom-0 left-1/2 translate-x-[-90%] z-30 group cursor-pointer"
        :class=" jumped "
        @click="toggleJump">
        <img
            src="/Home_img/Taru.png"
            alt="桶子"
            class="w-full transition duration-300 ease-in-out group-hover:brightness-103 group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]"
            :class="{ 'jump-taru': jumped }" />
    </div>
</template>

<script setup>
import { ref } from 'vue'

const jumped = ref(false)

function toggleJump() {
    jumped.value = !jumped.value
}
</script>

<style scoped>
/* 小幅度左右跳動動畫 */
@keyframes double-hop {
    0% {
        transform: translateY(-8%);
    }
    25% {
        transform: translateY(-0%);
    }
    50% {
        transform: translateY(-5%);
    }
    75% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-2%);
    }
}

.jump-taru {
    animation: double-hop 1s ease-in-out;
}
</style>
