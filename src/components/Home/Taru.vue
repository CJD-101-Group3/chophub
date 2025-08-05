<template>
    <div
        class="hidden md:block absolute w-[20vw] bottom-0 left-1/2 translate-x-[-90%] z-30 group cursor-pointer"
        :class="jumped"
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
@keyframes double-hop {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(10deg);
    }
    50% {
        transform: rotate(-30deg);
    }
    75% {
        transform: rotate(-10deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

.jump-taru {
    animation: double-hop 0.5s ease-in-out;
    transform-origin: bottom center;
}
</style>
