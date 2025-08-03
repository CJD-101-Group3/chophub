<script setup>
import Theheader from '@/components/Theheader.vue'
import Smith_wrapper from '@/components/Home/Smith_wrapper.vue'
import Smith_hammer from '@/components/Home/Smith_hammer.vue'
import Hand1 from '@/components/Home/Hand1.vue'
import Weapon_bar from '@/components/Home/Weapon_bar.vue'
import Board from '@/components/Home/Board.vue'
import Event from '@/components/Home/Event.vue'
import Window from '@/components/Home/Window.vue'
import Lamp from '@/components/Home/Lamp.vue'
import Taru from '@/components/Home/Taru.vue'
import { ref } from 'vue'

const isDay = ref(true)

const toggleWindow = () => {
    isDay.value = !isDay.value
}
</script>

<template>
    <Theheader />
    <div class="w-full bg-black flex justify-center">
        <div class="relative w-full max-w-[1920px] aspect-[16/7]">
            <!-- 背景圖 -->
            <img src="/Home_img/BG_img.png" alt="Home Background" class="absolute inset-0 w-full h-full object-fill" />

            <!-- Smith_wrapper -->
            <Smith_wrapper />
            <!-- Smith_hammer -->
            <!-- <Smith_hammer /> -->
            <!-- 手0 -->
            <Hand1 />
            <!-- 鐵砧 -->
            <img
                src="/Home_img/Anv.png"
                alt="鐵砧"
                class="absolute w-[17vw] bottom-[6%] left-1/2 translate-x-[-10%] z-30" />
            <!-- 鐵塊 -->
            <img
                src="/Home_img/Iron1.png"
                alt="鐵塊"
                class="absolute w-[8vw] bottom-[21%] left-1/2 translate-x-[43%] z-30" />
            <!-- 武器架 -->
            <Weapon_bar />
            <!-- 留言板 -->
            <Board />
            <!-- 活動黑板 -->
            <Event />
            <!-- 桶子 -->
            <Taru/>
            <!-- 窗戶元件，點擊會切換 isDay -->
            <Window :isDay="isDay" @toggle="toggleWindow" />
            <!-- 吊燈元件，根據 isDay 顯示燈光 -->
            <Lamp :isDay="isDay" @toggle="toggleWindow" />
        </div>
    </div>
</template>
