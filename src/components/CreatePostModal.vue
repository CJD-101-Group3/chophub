<!-- src/components/CreatePostModal.vue -->
<script setup>
import { ref } from 'vue';

// --- 1. 引入圖示 (維持不變) ---
import userIcon from '@/assets/icon/smalluser.svg';
import closeIcon from '@/assets/icon/postclose.svg';
import imageIcon from '@/assets/icon/postpicture.svg';
import moreIcon from '@/assets/icon/postmore.svg';

// --- 2. 定義事件 (維持不變) ---
const emit = defineEmits(['close']);

// --- 3. 【修改】新增用於圖片上傳的響應式狀態 ---
const postTitle = ref('');
const postContent = ref('');
const imagePreviewUrl = ref(null); // 用於存放圖片預覽的 URL
const selectedFile = ref(null);    // 用於存放使用者選擇的檔案物件
const fileInput = ref(null);       // 用於獲取隱藏的 file input 元素

// --- 4. 【修改】處理表單和檔案的函式 ---

// 觸發隱藏的 file input 的點擊事件
function triggerFileInput() {
  fileInput.value.click();
}

// 當使用者選擇了檔案後觸發
function handleFileChange(event) {
  const file = event.target.files[0]; // 獲取選擇的第一個檔案
  if (file) {
    selectedFile.value = file; // 保存檔案物件

    // 使用 FileReader 來讀取檔案並生成預覽 URL
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviewUrl.value = e.target.result; // 將結果(base64 URL)賦值給預覽變數
    };
    reader.readAsDataURL(file); // 開始讀取檔案
  }
}

// 處理最終的表單提交
function handleSubmit() {
  // 檢查是否填寫了必要內容
  if (!postTitle.value || !postContent.value) {
    alert('請填寫標題和內文！');
    return;
  }

  console.log('發佈的標題:', postTitle.value);
  console.log('發佈的內文:', postContent.value);
  console.log('發佈的圖片檔案:', selectedFile.value); // 現在我們可以拿到圖片檔案了

  // 在真實專案中，這裡會使用 FormData 將文字和 selectedFile.value 一起送到後端
  
  alert('貼文已發佈！(此為前端範例)');
  emit('close');
}
</script>

<template>
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
        
        <!-- 【新增】圖片預覽區塊 -->
        <!-- 只有當 imagePreviewUrl 有值時，這個區塊才會顯示 -->
        <div v-if="imagePreviewUrl" class="mb-4">
          <img :src="imagePreviewUrl" alt="Image Preview" class="w-full max-h-60 object-cover rounded-lg">
        </div>

        <div class="mb-4">
          <input 
            v-model="postTitle"
            type="text" 
            placeholder="【標題名稱】：請輸入"
            class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
        </div>

        <div class="mb-4">
          <textarea 
            v-model="postContent"
            placeholder="請輸入內文"
            rows="8"
            class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          ></textarea>
        </div>

        <!-- 【新增】一個隱藏的 file input，這是實現功能的關鍵 -->
        <input 
          type="file" 
          ref="fileInput" 
          @change="handleFileChange" 
          accept="image/*" 
          class="hidden"
        >

        <!-- 新增主圖 -->
        <div class="flex justify-between items-center border border-gray-300 rounded-md p-3 mb-6">
          <span class="text-gray-500">新增主圖</span>
          <div class="flex items-center gap-x-4">
            <!-- 【修改】為圖片圖示按鈕加上點擊事件 -->
            <button type="button" @click="triggerFileInput">
              <img :src="imageIcon" alt="Upload Image" class="w-6 h-6">
            </button>
            <button type="button"><img :src="moreIcon" alt="More Options" class="w-6 h-6"></button>
          </div>
        </div>

        <button 
          type="submit"
          class="w-full bg-[#F2994A] text-white font-bold py-3 rounded-lg text-lg hover:brightness-110 transition"
        >
          發佈
        </button>
      </form>
    </div>
  </div>
</template>