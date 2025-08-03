<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// 匯入您指定的圖片與 SVG 圖示
import postDetailImage from '@/assets/icon/smalllike.svg';
import smallLikeIcon from '@/assets/icon/smalllike.svg';
import smallLikeActiveIcon from '@/assets/icon/smalllike_h.svg';
import smallStarIcon from '@/assets/icon/smallstar.svg';
import smallStarActiveIcon from '@/assets/icon/smallstar_h.svg';
import messagesIcon from '@/assets/icon/smalllike.svg';
import shareIcon from '@/assets/icon/smalllike.svg';
import sendIcon from '@/assets/icon/smalllike.svg';


// --- STATE MANAGEMENT ---

const router = useRouter();

// Post Data (simulated)
const post = ref({
  id: 1,
  author: {
    name: '中壢彭于晏',
    avatar: 'https://i.pravatar.cc/150?u=pengyuyan'
  },
  title: '【奪命冷兵器】',
  content: '冷兵器自古以來就是戰場上的殺戮利器，無需火藥，僅憑鋼鐵與技巧，便能決定生死。刀劍的鋒芒、長槍的凌厲、戰斧的沉重，每一種武器都蘊含著獨特的戰鬥哲學與歷史痕跡。在冷冽的金屬光澤中，映照出人類智慧與殘酷戰爭的縮影，這就是冷兵器的致命魅力所在。',
  imageUrl: postDetailImage, 
  likes: 82,
  saves: 24, 
});

// --- Interactive State ---
const isLiked = ref(false);
const isSaved = ref(false);

// Comments Data (simulated)
const comments = ref([
    { id: 1, author: { name: '中壢彭于晏', avatar: 'https://i.pravatar.cc/150?u=pengyuyan' }, content: '武器評價文字武器評價文字...', likes: 82, time: '23週' },
    { id: 2, author: { name: '館長', avatar: 'https://i.pravatar.cc/150?u=chang' }, content: '這把看起來不錯！', imageUrl: './input_file_0.png', likes: 150, time: '2週' }
]);

// --- New Comment State ---
const newCommentText = ref('');
const newCommentImage = ref(null);
const fileInput = ref(null);

// --- COMPUTED PROPERTIES ---

const isCommentSubmittable = computed(() => {
  return newCommentText.value.trim() !== '' || newCommentImage.value !== null;
});


// --- METHODS ---

function toggleLike() {
  isLiked.value = !isLiked.value;
  post.value.likes += isLiked.value ? 1 : -1;
}

function toggleSave() {
  isSaved.value = !isSaved.value;
  post.value.saves += isSaved.value ? 1 : -1;
}

function triggerFileInput() {
  fileInput.value.click();
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newCommentImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function postComment() {
  if (!isCommentSubmittable.value) return;

  const newComment = {
    id: Date.now(),
    author: { name: '中壢彭于晏', avatar: 'https://i.pravatar.cc/150?u=pengyuyan' },
    content: newCommentText.value,
    imageUrl: newCommentImage.value,
    likes: 0,
    time: '剛剛'
  };

  comments.value.unshift(newComment);

  newCommentText.value = '';
  newCommentImage.value = null;
  if (fileInput.value) fileInput.value.value = '';
}

</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40">

    <!-- ★★★★★ 主要修改處 ★★★★★ -->
    <!-- 新增 hidden lg:block，讓此按鈕只在網頁版顯示 -->
    <button @click="router.back()" class="hidden lg:block absolute top-4 right-4 text-white z-50 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <div class="w-full h-full lg:h-[90vh] lg:w-[90vw] lg:max-w-[1600px] flex flex-col lg:flex-row shadow-2xl">
      
      <div class="hidden lg:flex lg:w-7/12 bg-black items-center justify-center">
        <img :src="post.imageUrl" alt="Post Image" class="max-h-full max-w-full object-contain">
      </div>

      <div class="w-full h-full lg:w-5/12 flex flex-col bg-white dark:bg-zinc-900">
        
        <!-- 手機版 Header (包含自己的關閉按鈕，lg:hidden 確保只在手機版顯示) -->
        <header class="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 lg:hidden">
          <div class="flex items-center gap-3">
            <img :src="post.author.avatar" alt="Author Avatar" class="w-8 h-8 rounded-full object-cover">
            <span class="font-bold text-zinc-800 dark:text-zinc-100">{{ post.author.name }}</span>
          </div>
          <button @click="router.back()" class="text-zinc-600 dark:text-zinc-300 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        
        <div class="flex-grow overflow-y-auto">
          <div class="p-4 lg:p-6">
            <div class="hidden lg:flex items-center gap-3 mb-4">
              <img :src="post.author.avatar" alt="Author Avatar" class="w-10 h-10 rounded-full object-cover">
              <span class="font-bold text-zinc-800 dark:text-zinc-100">{{ post.author.name }}</span>
            </div>
            
            <div class="aspect-w-4 aspect-h-3 bg-zinc-800 rounded-lg overflow-hidden mb-4 lg:hidden">
              <img :src="post.imageUrl" alt="Post Image" class="w-full h-full object-cover">
            </div>

            <div class="text-zinc-700 dark:text-zinc-300">
              <h2 class="font-bold text-lg text-zinc-800 dark:text-zinc-100">{{ post.title }}</h2>
              <p class="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{{ post.content }}</p>
            </div>
          </div>
          
          <!-- 按讚、收藏和留言數量顯示 -->
          <div class="px-4 lg:px-6 py-3 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700">
            <div class="flex items-center gap-1">
              <img :src="isLiked ? smallLikeActiveIcon : smallLikeIcon" alt="Likes" class="h-5 w-5" />
              <span>{{ post.likes }}</span>
            </div>
            <div class="flex items-center gap-1">
              <img :src="isSaved ? smallStarActiveIcon : smallStarIcon" alt="Saves" class="h-5 w-5" />
              <span>{{ post.saves }}</span>
            </div>
            <div class="flex items-center gap-1">
              <img :src="messagesIcon" alt="Comments" class="h-5 w-5" />
              <span>{{ comments.length }}</span>
            </div>
          </div>

          <!-- 新的橫向按鈕列 -->
          <div class="flex items-center justify-around py-2 border-t border-b border-zinc-200 dark:border-zinc-700">
            <!-- 讚按鈕 -->
            <button @click="toggleLike" class="flex items-center justify-center gap-2 w-1/3 py-2 rounded-lg font-semibold transition-colors" :class="isLiked ? 'text-blue-600' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'">
              <span class="p-2 rounded-full" :class="isLiked ? 'bg-blue-100' : ''">
                <img :src="isLiked ? smallLikeActiveIcon : smallLikeIcon" alt="Like" class="h-6 w-6" />
              </span>
              <span>讚</span>
            </button>
            <!-- 收藏按鈕 -->
            <button @click="toggleSave" class="flex items-center justify-center gap-2 w-1/3 py-2 rounded-lg font-semibold transition-colors" :class="isSaved ? 'text-yellow-600' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'">
              <span class="p-2 rounded-full" :class="isSaved ? 'bg-yellow-100' : ''">
                <img :src="isSaved ? smallStarActiveIcon : smallStarIcon" alt="Save" class="h-6 w-6" />
              </span>
              <span>收藏</span>
            </button>
            <!-- 分享按鈕 -->
            <button class="flex items-center justify-center gap-2 w-1/3 py-2 rounded-lg font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <span class="p-2 rounded-full">
                <img :src="shareIcon" alt="Share" class="h-6 w-6" />
              </span>
              <span>分享</span>
            </button>
          </div>
          
          <!-- Comments List -->
          <div class="p-4 lg:p-6">
            <h3 class="font-bold text-lg text-zinc-800 dark:text-zinc-100 mb-4">留言</h3>
            <div v-for="comment in comments" :key="comment.id" class="flex gap-3 mb-6">
              <img :src="comment.author.avatar" alt="User Avatar" class="w-10 h-10 rounded-full object-cover flex-shrink-0">
              <div class="flex-grow">
                <p class="text-sm">
                  <span class="font-semibold text-zinc-800 dark:text-zinc-100">{{ comment.author.name }}</span>
                  <span class="ml-2 text-zinc-700 dark:text-zinc-300">{{ comment.content }}</span>
                </p>
                <img v-if="comment.imageUrl" :src="comment.imageUrl" class="mt-2 rounded-lg max-w-xs object-cover" alt="Comment image">
                <div class="flex items-center text-xs text-zinc-500 dark:text-zinc-400 mt-2 gap-3">
                  <span>{{ comment.time }}</span>
                  <button class="font-semibold">讚</button>
                  <button class="font-semibold">回覆</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comment Input Area -->
        <div class="p-4 border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <div v-if="newCommentImage" class="relative w-24 h-24 mb-2">
            <img :src="newCommentImage" class="w-full h-full object-cover rounded-lg" alt="Selected image preview">
            <button @click="newCommentImage = null" class="absolute -top-2 -right-2 bg-gray-700 text-white rounded-full p-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div class="flex items-center gap-3">
            <img :src="post.author.avatar" alt="User Avatar" class="w-10 h-10 rounded-full object-cover">
            <div class="flex-grow flex items-center border border-zinc-300 dark:border-zinc-600 rounded-full px-2 py-1">
              <input type="file" ref="fileInput" @change="handleFileSelect" accept="image/*" class="hidden">
              <button @click="triggerFileInput" class="p-2 text-zinc-500 hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </button>
              <input 
                v-model="newCommentText" 
                @keyup.enter="postComment"
                type="text" 
                placeholder="新增留言..." 
                class="flex-grow bg-transparent focus:outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 px-2"
              />
              <button @click="postComment" :disabled="!isCommentSubmittable" class="p-2 rounded-full transition" :class="isCommentSubmittable ? 'opacity-100' : 'opacity-50 cursor-not-allowed'">
                <img :src="sendIcon" alt="Send" class="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* You can add component-specific styles here if needed */
</style>