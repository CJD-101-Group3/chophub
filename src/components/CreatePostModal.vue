<!-- src/components/CreatePostModal.vue -->
<script setup>
import { ref } from 'vue';
// --- 【1. 引入 useRouter】 ---
import { useRouter } from 'vue-router';

import userIcon from '@/assets/icon/smalluser.svg';
import closeIcon from '@/assets/icon/postclose.svg';
import imageIcon from '@/assets/icon/postpicture.svg';
import moreIcon from '@/assets/icon/postmore.svg';

const emit = defineEmits(['close']);

// --- 【2. 獲取 router 實例】 ---
const router = useRouter();

const postTitle = ref('');
const postContent = ref('');
const imagePreviewUrl = ref(null);
const selectedFile = ref(null);
const fileInput = ref(null);

function triggerFileInput() {
  fileInput.value.click();
}

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviewUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function handleSubmit() {
  if (!postTitle.value || !postContent.value) {
    alert('請填寫標題和內文！');
    return;
  }

  // --- 【3. 執行跳轉】 ---
  // 假設發佈成功後，後端會回傳一個新貼文的 id，例如 99
  const newPostId = 99; 

  // 關閉彈窗
  emit('close');

  // 使用 router.push() 進行頁面跳轉
  router.push(`/post/${newPostId}`);
}
</script>

<template>
  <!-- Template 內容完全不需要修改 -->
  <div 
    class="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
    @click.self="emit('close')"
  >
    <div class="bg-white rounded-lg shadow-xl p-6 relative w-full max-w-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-orange-500">新增貼文</h2>
        <button @click="emit('close')" class="p-1 rounded-full hover:bg-gray-200">
          <img :src="closeIcon" alt="Close" class="w-6 h-6">
        </button>
      </div>
      <div class="flex items-center gap-x-3 mb-4">
        <img :src="userIcon" alt="User" class="w-10 h-10" />
        <span class="text-lg font-semibold text-gray-700">使用者名稱</span>
      </div>
      <form @submit.prevent="handleSubmit">
        <div v-if="imagePreviewUrl" class="mb-4">
          <img :src="imagePreviewUrl" alt="Image Preview" class="w-full max-h-60 object-cover rounded-lg">
        </div>
        <div class="mb-4">
          <input v-model="postTitle" type="text" placeholder="【標題名稱】：請輸入" class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-400">
        </div>
        <div class="mb-4">
          <textarea v-model="postContent" placeholder="請輸入內文" rows="8" class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"></textarea>
        </div>
        <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" class="hidden">
        <div class="flex justify-between items-center border border-gray-300 rounded-md p-3 mb-6">
          <span class="text-gray-500">新增主圖</span>
          <div class="flex items-center gap-x-4">
            <button type="button" @click="triggerFileInput"><img :src="imageIcon" alt="Upload Image" class="w-6 h-6"></button>
            <button type="button"><img :src="moreIcon" alt="More Options" class="w-6 h-6"></button>
          </div>
        </div>
        <button type="submit" class="w-full bg-[#F2994A] text-white font-bold py-3 rounded-lg text-lg hover:brightness-110 transition">
          發佈
        </button>
      </form>
    </div>
  </div>
</template>