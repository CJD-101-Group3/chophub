<script setup>
import Theheader from '@/components/Theheader.vue'
</script>

<template>
    <Theheader />
    <div class="w-full bg-black flex justify-center">
        <div class="relative w-full max-w-[1920px] aspect-[16/7]">
            <!-- 背景圖 -->
            <img src="/Home_img/BG_img.png" alt="Home Background" class="absolute inset-0 w-full h-full object-fill" />

            <!-- Smith -->
            <img
                src="/Home_img/Smith_1.png"
                alt="Smith"
                class="absolute w-[35vw] bottom-[8%] left-1/2 translate-x-[-50%] z-20" />

            <!-- 手0 -->
            <img
                src="/Home_img/Hand_0.png"
                alt="Smith 手"
                class="absolute w-[13vw] bottom-[35%] left-1/2 translate-x-[-8%] z-10" />
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
            <img
                src="/Home_img/Weapons.png"
                alt="武器架"
                class="absolute w-[40vw] bottom-[13%] translate-x-[9%] z-30" />
            <!-- 窗戶 -->
            <img
                src="/Home_img/Window_d.png"
                alt="窗戶(日)"
                class="absolute w-[27vw] bottom-[54%] left-1/2 translate-x-[-20%] z-10" />
            <!-- 留言板 -->
            <img
                src="/Home_img/Board.png"
                alt="留言板"
                class="absolute w-[43vw] bottom-[33%] left-1/2 translate-x-[13%] z-30" />
            <!-- 活動黑板 -->
            <img
                src="/Home_img/Event_board.png"
                alt="活動黑板"
                class="absolute w-[28vw] bottom-[0%] left-1/2 translate-x-[27%] z-30" />
            <!-- 桶子 -->
            <img
                src="/Home_img/Taru.png"
                alt="桶子"
                class="absolute w-[20vw] bottom-[0%] left-1/2 translate-x-[-90%] z-30" />
                <!-- 吊燈 -->
            <img
                src="/Home_img/Light.png"
                alt="吊燈"
                class="absolute w-[20vw] bottom-[68%]  left-1/2 translate-x-[-99%] z-30" />
        </div>
    </div>
</template>
