<script setup>
// --- Script 區塊完全維持不變 ---
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import TheHeader from '@/components/Theheader.vue';
import TheFooter from '@/components/Thefooter.vue';

import userIcon from '@/assets/icon/user.svg';
import fireIcon from '@/assets/icon/smallstar.svg';
import backIcon from '@/assets/icon/smallstar.svg';
import likeIcon from '@/assets/icon/smallstar.svg';
import saveIcon from '@/assets/icon/smallstar.svg';
import shareIcon from '@/assets/icon/smallstar.svg';
import sendIcon from '@/assets/icon/smallstar.svg';
import postImageFile from '@/assets/icon/smallstar.svg';
// import postImageFile from '@/assets/images/post-detail-image.jpg';

const router = useRouter();
const isLiked = ref(false);
const isSaved = ref(false);
const newComment = ref('');

const post = ref({
  author: '使用者名稱',
  title: '【致命冷兵器】',
  content: '冷兵器自古以來就是戰場上的殺戮利器...',
  image: postImageFile,
  likes: 82,
  saves: 24,
});

const comments = ref([
  { id: 1, author: '中壢彭于晏', text: '武器評價文字...', time: '23週', likes: 82 },
  { id: 2, author: '中壢彭于晏', text: '武器評價文字...', time: '23週', likes: 82 },
  { id: 3, author: '中壢彭于晏', text: '武器評價文字...', time: '23週', likes: 82 },
]);

function goBack() {
  router.back();
}

function postComment() {
  if (!newComment.value.trim()) return;
  alert(`留言已送出：${newComment.value}`);
  newComment.value = '';
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#282828]">
    <TheHeader />

    <main class="flex-grow w-full py-4 md:py-12">
      <!-- 
        【關鍵修改】
        - 移除所有 md: 前綴的 class。
        - 加上我們自訂的 'desktop-container' class。
      -->
      <div class="relative w-full bg-white desktop-container">
        
        <button @click="goBack" class="absolute top-4 left-4 p-2">
          <img :src="backIcon" alt="Back" class="w-6 h-6">
        </button>
        <!-- 【關鍵修改】使用自訂的 'desktop-close-btn' class -->
        <button @click="goBack" class="desktop-close-btn">
          <span class="text-white text-2xl font-bold">×</span>
        </button>

        <div class="px-4 pt-16 desktop-content-padding">
          <!-- ... 貼文核心內容 (維持不變) ... -->
          <div class="flex items-center gap-x-3 mb-4">
            <img :src="userIcon" alt="User" class="w-12 h-12">
            <div class="flex items-center gap-x-2">
              <span class="text-xl font-bold">{{ post.author }}</span>
              <img :src="fireIcon" alt="Hot" class="w-6 h-6">
            </div>
          </div>
          <div class="space-y-4 mb-6">
            <h2 class="text-lg font-bold">{{ post.title }}</h2>
            <p class="text-gray-600 leading-relaxed">{{ post.content }}</p>
          </div>
          <img :src="post.image" alt="Post Image" class="w-full rounded-lg object-cover mb-4">
          <div class="flex items-center gap-x-6 text-gray-500 mb-4">
            <div class="flex items-center gap-x-2"><img :src="likeIcon" alt="Likes" class="w-6 h-6"><span>{{ post.likes }}</span></div>
            <div class="flex items-center gap-x-2"><img :src="saveIcon" alt="Saves" class="w-6 h-6"><span>{{ post.saves }}</span></div>
          </div>
          <hr class="my-4">
          <div class="flex justify-around items-center text-gray-600 font-semibold">
            <button @click="isLiked = !isLiked" :class="['flex items-center gap-x-2 p-2 rounded-lg', isLiked ? 'text-orange-500' : '']"><img :src="likeIcon" alt="Like" class="w-6 h-6"><span>讚</span></button>
            <button @click="isSaved = !isSaved" :class="['flex items-center gap-x-2 p-2 rounded-lg', isSaved ? 'text-orange-500' : '']"><img :src="saveIcon" alt="Save" class="w-6 h-6"><span>收藏</span></button>
            <button class="flex items-center gap-x-2 p-2 rounded-lg"><img :src="shareIcon" alt="Share" class="w-6 h-6"><span>分享</span></button>
          </div>
          <hr class="my-4">
          <div class="space-y-6">
            <div class="flex justify-between items-center"><h3 class="font-bold">留言</h3><a href="#" class="text-sm text-gray-500 hover:text-orange-500">顯示全部</a></div>
            <div class="space-y-6">
              <div v-for="comment in comments" :key="comment.id" class="flex items-start gap-x-3">
                <img :src="userIcon" alt="Commenter" class="w-10 h-10 mt-1">
                <div class="flex-grow">
                  <div class="bg-gray-100 rounded-lg p-3"><p class="font-bold">{{ comment.author }}</p><p class="text-gray-700">{{ comment.text }}</p></div>
                  <div class="flex items-center gap-x-4 text-sm text-gray-500 mt-1 px-3"><span>{{ comment.time }}</span><a href="#" class="font-semibold hover:text-orange-500">檢舉</a><div class="flex items-center gap-x-1 ml-auto"><span>{{ comment.likes }}</span><img :src="likeIcon" alt="Like comment" class="w-5 h-5"></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- 【關鍵修改】使用自訂的 'comment-input-container' class -->
    <div class="sticky bottom-0 w-full bg-white p-3 border-t comment-input-container">
      <div class="comment-input-inner">
        <div class="flex items-center gap-x-3">
          <img :src="userIcon" alt="Your avatar" class="w-10 h-10">
          <div class="relative flex-grow">
            <input v-model="newComment" type="text" placeholder="輸入文字" class="w-full bg-gray-100 rounded-full py-2 pl-4 pr-12">
            <button @click="postComment" class="absolute top-1/2 right-2 -translate-y-1/2 p-1"><img :src="sendIcon" alt="Send" class="w-6 h-6"></button>
          </div>
        </div>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<!-- ====================================================== -->
<!-- 【關鍵修改】新增 <style scoped> 區塊來手動實現響應式 -->
<!-- ====================================================== -->
<style scoped>
/* 
  @media (min-width: 768px) 的意思是：
  以下的 CSS 規則，只在螢幕寬度為 768px 或更寬時才生效。
  768px 是 Tailwind 中 'md' 斷點的預設值。
*/
@media (min-width: 768px) {
  .desktop-container {
    max-width: 1280px; /* 等同於 max-w-4xl */
    margin-left: auto;
    margin-right: auto; /* 等同於 mx-auto */
    border-radius: 0.5rem; /* 等同於 rounded-lg */
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); /* 等同於 shadow-lg */
    padding: 2rem; /* 等同於 p-8 */
  }

  .desktop-close-btn {
    display: block; /* 等同於 md:block */
    position: absolute;
    top: -1.25rem; /* -top-5 */
    left: -1.25rem; /* -left-5 */
    background-color: #f97316; /* bg-orange-500 */
    border-radius: 9999px; /* rounded-full */
    padding: 0.5rem; /* p-2 */
  }

  .desktop-content-padding {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0; /* 等同於 md:px-0 md:pt-0 */
  }

  .comment-input-container {
    position: static; /* 等同於 md:static */
    border-top-width: 0; /* 等同於 md:border-t-0 */
    background-color: transparent; /* 等同於 md:bg-transparent */
    padding: 0; /* 等同於 md:p-0 */
  }

  .comment-input-inner {
    max-width: 1280px; /* 等同於 md:max-w-4xl */
    margin-left: auto;
    margin-right: auto; /* 等同於 md:mx-auto */
    padding-left: 2rem;
    padding-right: 2rem; /* 等同於 md:px-8 */
  }
}
</style>