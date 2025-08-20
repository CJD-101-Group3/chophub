<script setup>
import { ref } from 'vue';
import axios from 'axios'; // 【新增】引入 axios

import userIcon from '@/assets/icon/smalluser.svg';
import closeIcon from '@/assets/icon/postclose.svg';
import imageIcon from '@/assets/icon/postpicture.svg';

// 【修改】定義 emits，增加 'post-success' 事件
const emit = defineEmits(['close', 'post-success']);

// --- 響應式狀態 (與您原始碼相同，但增加了 loading 和 error) ---
const postTitle = ref('');
const postContent = ref('');
const imagePreviewUrl = ref(null);
const selectedFile = ref(null);
const fileInput = ref(null);
const isLoading = ref(false); // 【新增】載入狀態
const errorMessage = ref(''); // 【新增】錯誤訊息
const currentUserId = 1; // 假設的當前使用者 ID

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

// --- 【關鍵修改】將 handleSubmit 函式替換為真實的 API 呼叫 ---
async function handleSubmit() {
  if (!postTitle.value.trim() || !postContent.value.trim()) {
    alert('請填寫標題和內文！');
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  // 使用 FormData 來傳送包含檔案的表單
  const formData = new FormData();
  formData.append('user_id', currentUserId);
  formData.append('title', postTitle.value);
  formData.append('content', postContent.value);
  if (selectedFile.value) {
    formData.append('image', selectedFile.value);
  }

  try {
    const apiUrl = 'http://localhost:8888/ChopHub-API/api/createPost.php';
    const response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    if (response.data && response.data.status === 'success') {
      // 發送成功事件給父元件
      emit('post-success');
      // 關閉彈窗
      emit('close');
    } else {
      throw new Error(response.data.message || '發布失敗');
    }
  } catch (err) {
    console.error('發布貼文失敗:', err);
    // 將錯誤訊息顯示在畫面上
    errorMessage.value = err.response?.data?.message || err.message || '發生未知錯誤。';
    alert(`發布失敗: ${errorMessage.value}`); // 也可以用 alert 提示
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <!-- Template 內容完全是您提供的原始碼，沒有做任何修改 -->
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
          </div>
        </div>
        <button type="submit" :disabled="isLoading" class="w-full bg-[#F2994A] text-white font-bold py-3 rounded-lg text-lg hover:brightness-110 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
          {{ isLoading ? '發布中...' : '發佈' }}
        </button>
      </form>
    </div>
  </div>
</template>