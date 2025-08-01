<!-- src/components/SocialIcon.vue -->
<script setup>
import { computed } from 'vue';
import IconYoutube from './icons/IconYoutube.vue';
import IconX from './icons/IconX.vue';
import IconInstagram from './icons/IconInstagram.vue';
import IconPodcast from './icons/IconPodcast.vue';
import IconGmail from './icons/IconGmail.vue';
import IconGeneric from './icons/IconGeneric.vue'; // 準備一個通用的圖示，當作預設選項

const props = defineProps({
  platform: {
    type: String,
    required: true
  }
});

const iconComponent = computed(() => {
  // 使用 .toUpperCase() 讓比對時忽略大小寫
  switch (props.platform.toUpperCase()) {
    case 'YOUTUBE':
      return IconYoutube;
    case 'X':
      return IconX;
    case 'INSTAGRAM':
      return IconInstagram;
    case 'PODCAST':
      return IconPodcast;
    case 'GMAIL':
      return IconGmail;
    default:
      return IconGeneric; // 如果找不到對應的平台，就回傳一個預設的通用圖示
  }
});
</script>

<template>
  <!-- Vue 內建的 <component> 標籤，:is 屬性會動態決定要渲染哪個元件 -->
  <component :is="iconComponent" />
</template>