<template>
  <div class="min-h-screen flex flex-col">
    <Theheader />
    <main class=" bg-[#282828] flex-1 flex flex-col items-center justify-center px-4 space-y-4 md:space-y-6">
        <div class="h3 font-bold text-white">報名成功！</div>
        <div class="h4 font-bold text-white text-center">感謝您的參與，<br>我們已收到您的報名與繳費資訊！</div>

        <basebutton class="w-[120px]">查看我的活動</basebutton>
    </main>
    <Thefooter />
  </div>
</template>

<script setup>
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import basebutton from '@/components/Basebutton.vue';
</script>

<style></style>