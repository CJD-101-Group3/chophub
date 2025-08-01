<template>
    <div class="absolute w-[20vw] bottom-[68%] left-1/2 translate-x-[-99%] z-30">
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
defineProps({
    isDay: Boolean,
})
</script>
