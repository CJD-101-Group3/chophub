<script setup>
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import GeneralButton from '@/components/GeneralButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function goToMyEvents() {
  router.push('/MyEvents');
}
</script>

<style></style>

<template>
  <div class="min-h-screen flex flex-col">
    <Theheader />
    <main class=" bg-[#282828] flex-1 flex flex-col items-center justify-center px-4 space-y-4 md:space-y-6">
        <div class="h3 font-bold text-white">報名成功！</div>
        <div class="h4 font-bold text-white text-center">感謝您的參與，<br>我們已收到您的報名與繳費資訊！</div>

    <GeneralButton
        variant="primary"
        @click="goToMyEvents"
        width="150px"
        height="50px"
        font-size="16px"
    >
        查看我的活動
    </GeneralButton>

</main>
    <Thefooter />
  </div>
</template>

