<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

// --- 靜態資源 ---
import smallLikeIcon from '@/assets/icon/smalllike.svg';
import smallLikeActiveIcon from '@/assets/icon/smalllike_h.svg';
import smallStarIcon from '@/assets/icon/smallstar.svg';
import smallStarActiveIcon from '@/assets/icon/smallstar_h.svg';
import messagesIcon from '@/assets/icon/postshare.svg';
import shareIcon from '@/assets/icon/postshare.svg';
import badge1 from '@/assets/icon/badge1.png';
import badge2 from '@/assets/icon/badge2.png';
import badge3 from '@/assets/icon/badge3.png';
import defaultAvatar from '@/assets/icon/smalluser.svg';

// --- 路由 ---
const route = useRoute();
const router = useRouter();

// --- 響應式狀態 (API驅動) ---
const post = ref(null);
const comments = ref([]);
const isLoading = ref(true);
const error = ref(null);

const currentUser = ref({ id: 1, name: '載入中...', avatar: defaultAvatar });
const currentUserId = currentUser.value.id;
const shareFeedback = ref('');
const newCommentText = ref('');
const showReportModal = ref(false);
const reportReason = ref('');
const showOptionsMenu = ref(false);

// --- Computed 屬性 ---
const isCommentSubmittable = computed(() => newCommentText.value.trim() !== '');
const isAuthor = computed(() => post.value && currentUser.value && post.value.author.id === currentUser.value.id);

// --- API 呼叫 ---
const fetchCurrentUser = async () => {
  try {
    // --- 【重要修改點】 ---
    const apiUrl = `${import.meta.env.VITE_API_BASE}posts/getPostUser.php?user_id=${currentUserId}`;
    const response = await axios.get(apiUrl);
    if (response.data && response.data.status === 'success') {
      currentUser.value = response.data.data;
    }
  } catch (err) {
    console.error('獲取當前使用者資訊失敗:', err);
    currentUser.value.name = '訪客';
  }
};

const fetchPostDetail = async () => {
  const postId = route.params.id;
  if (!postId) { error.value = "無效的貼文 ID。"; isLoading.value = false; return; }
  isLoading.value = true;
  error.value = null;
  try {
    // --- 【重要修改點】 ---
    const apiUrl = `${import.meta.env.VITE_API_BASE}posts/getPostDetail.php?post_id=${postId}&user_id=${currentUserId}`;
    const response = await axios.get(apiUrl);
    if (response.data && response.data.status === 'success') {
      response.data.data.post.author.badges = [badge1, badge2, badge3];
      response.data.data.post.saves = response.data.data.post.stars;
      post.value = response.data.data.post;
      comments.value = response.data.data.comments;
    } else {
      throw new Error(response.data.message || '無法載入貼文。');
    }
  } catch (err) {
    console.error('獲取貼文詳情失敗:', err);
    error.value = err.response?.data?.message || err.message || '發生未知錯誤。';
  } finally {
    isLoading.value = false;
  }
};

// --- 互動函式 ---
async function postComment() {
  if (!isCommentSubmittable.value || !post.value) return;
  try {
    // --- 【重要修改點】 ---
    const apiUrl = `${import.meta.env.VITE_API_BASE}posts/postComment.php`;
    const response = await axios.post(apiUrl, { 
      post_id: post.value.id, 
      user_id: currentUserId,
      content: newCommentText.value 
    });
    if (response.data && response.data.status === 'success') {
      comments.value.unshift(response.data.data);
      newCommentText.value = '';
    } else {
      throw new Error(response.data.message || '無法新增留言。');
    }
  } catch (err) { console.error("新增留言失敗:", err); alert('無法新增留言，請稍後再試。'); }
}

async function deletePost() {
  if (!isAuthor.value) return;
  if (window.confirm('您確定要刪除這篇貼文嗎？此操作無法復原。')) {
    try {
      // --- 【重要修改點】 ---
      const apiUrl = `${import.meta.env.VITE_API_BASE}posts/deletePost.php`;
      const response = await axios.post(apiUrl, {
        post_id: post.value.id,
        user_id: currentUser.value.id
      });
      if (response.data && response.data.status === 'success') {
        alert('貼文已成功刪除！');
        router.back();
      } else {
        throw new Error(response.data.message || '刪除失敗。');
      }
    } catch (err) {
      console.error("刪除貼文失敗:", err);
      alert(err.response?.data?.message || '刪除貼文時發生錯誤，請稍後再試。');
    } finally {
      showOptionsMenu.value = false;
    }
  }
}

// --- 其他函式 ---
async function handleShare() { try { await navigator.clipboard.writeText(window.location.href); shareFeedback.value = '<已複製連結>'; setTimeout(() => { shareFeedback.value = ''; }, 800); } catch (err) { alert('複製連結失敗，請手動複製網址。'); } }
// --- 【重要修改點】(以下多行) ---
async function toggleLike() { if (!post.value) return; post.value.isLikedByUser = !post.value.isLikedByUser; post.value.likes += post.value.isLikedByUser ? 1 : -1; try { await axios.post(`${import.meta.env.VITE_API_BASE}posts/toggleLike.php`, { post_id: post.value.id, user_id: currentUserId }); } catch (err) { post.value.isLikedByUser = !post.value.isLikedByUser; post.value.likes += post.value.isLikedByUser ? 1 : -1; } }
async function toggleSave() { if (!post.value) return; post.value.isFavoritedByUser = !post.value.isFavoritedByUser; post.value.saves += post.value.isFavoritedByUser ? 1 : -1; try { await axios.post(`${import.meta.env.VITE_API_BASE}posts/toggleFavorite.php`, { post_id: post.value.id, user_id: currentUserId }); } catch (err) { post.value.isFavoritedByUser = !post.value.isFavoritedByUser; post.value.saves += post.value.isFavoritedByUser ? 1 : -1; } }
async function toggleCommentLike(comment) { comment.isLikedByUser = !comment.isLikedByUser; comment.likes += comment.isLikedByUser ? 1 : -1; try { await axios.post(`${import.meta.env.VITE_API_BASE}posts/toggleCommentLike.php`, { comment_id: comment.id, user_id: currentUserId }); } catch (err) { comment.isLikedByUser = !comment.isLikedByUser; comment.likes += comment.isLikedByUser ? 1 : -1; } }
function openReportModal() { showOptionsMenu.value = false; showReportModal.value = true; }
function closeReportModal() { showReportModal.value = false; reportReason.value = ''; }
function submitReport() { if (!reportReason.value.trim()) { alert('請輸入檢舉事由。'); return; } try { axios.post(`${import.meta.env.VITE_API_BASE}posts/submitReport.php`, { post_id: post.value.id, user_id: currentUserId, reason: reportReason.value }); alert('檢舉已成功送出，感謝您的回報。'); closeReportModal(); } catch (err) { alert('提交失敗，請稍後再試。'); } }
// --- 修改結束 ---
const inverseScale = ref(1);
const modalStyle = computed(() => ({ transform: `scale(${inverseScale.value})`}));
function detectZoom() { const zoomLevel = window.devicePixelRatio || 1; inverseScale.value = 1 / zoomLevel; }

// --- 生命週期鉤子 ---
onMounted(() => {
  fetchPostDetail();
  fetchCurrentUser();
  detectZoom();
  window.addEventListener('resize', detectZoom);
});
onUnmounted(() => {
  window.removeEventListener('resize', detectZoom);
});
</script>

<template>
  <div @click.self="router.back()" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40 p-0 lg:p-4">
    <button @click="router.back()" class="hidden lg:block absolute top-4 right-4 text-white z-50 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>

    <div v-if="post && !isLoading" class="w-full h-full lg:h-[90vh] lg:w-full lg:max-w-[1600px] flex flex-col lg:flex-row shadow-2xl lg:rounded-2xl overflow-hidden">
      <div class="hidden lg:flex lg:w-7/12 bg-black items-center justify-center">
        <img :src="post.imageUrl" alt="Post Image" class="max-h-full max-w-full object-contain">
      </div>
      
      <div class="w-full h-full lg:w-5/12 flex flex-col bg-white dark:bg-zinc-900 relative">
        <header class="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 lg:hidden">
            <div class="flex items-center gap-3">
                <img :src="post.author.avatar" alt="Author Avatar" class="w-8 h-8 rounded-full object-cover">
                <div class="flex items-center gap-1.5">
                    <span class="font-bold text-zinc-800 dark:text-zinc-100">{{ post.author.name }}</span>
                    <img v-for="(badge, index) in post.author.badges" :key="index" :src="badge" alt="Badge" class="w-5 h-5 object-contain">
                </div>
            </div>
            <div class="flex items-center">
              <div v-if="isAuthor" class="relative">
                <button @click="showOptionsMenu = !showOptionsMenu" class="p-1 text-zinc-600 dark:text-zinc-300">
                  <!-- 【已修改】手機版的 SVG 圖示，由垂直改為水平 -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
              <button @click="router.back()" class="text-zinc-600 dark:text-zinc-300 p-1 ml-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
        </header>

        <div v-if="showOptionsMenu" @click="showOptionsMenu = false" class="fixed inset-0 z-10"></div>
        <ul v-if="isAuthor && showOptionsMenu" class="absolute top-14 right-4 w-36 bg-white dark:bg-zinc-800 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden z-20">
          <li>
            <button @click="deletePost" class="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-semibold flex items-center gap-3 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              <span>刪除貼文</span>
            </button>
          </li>
        </ul>

        <div class="flex-grow overflow-y-auto">
            <div class="p-4 lg:p-6">
                <div class="hidden lg:flex items-center justify-between gap-3 mb-4">
                    <div class="flex items-center gap-3">
                      <img :src="post.author.avatar" alt="Author Avatar" class="w-10 h-10 rounded-full object-cover">
                      <div class="flex items-center gap-1.5">
                          <span class="font-bold text-zinc-800 dark:text-zinc-100">{{ post.author.name }}</span>
                          <img v-for="(badge, index) in post.author.badges" :key="index" :src="badge" alt="Badge" class="w-5 h-5 object-contain">
                      </div>
                    </div>
                    <div v-if="isAuthor" class="relative">
                      <button @click="showOptionsMenu = !showOptionsMenu" class="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                        <!-- 【已修改】電腦版的 SVG 圖示，由垂直改為水平 -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                      </button>
                    </div>
                </div>
                <div class="aspect-w-4 aspect-h-3 bg-zinc-800 rounded-lg overflow-hidden mb-4 lg:hidden"><img :src="post.imageUrl" alt="Post Image" class="w-full h-full object-cover"></div>
                <div class="text-zinc-700 dark:text-zinc-300">
                    <h2 class="font-bold text-lg text-zinc-800 dark:text-zinc-100">{{ post.title }}</h2>
                    <p class="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{{ post.content }}</p>
                </div>
            </div>
            <div class="px-4 lg:px-6 py-3 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700">
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-1"><img :src="post.isLikedByUser ? smallLikeActiveIcon : smallLikeIcon" alt="Likes" class="h-5 w-5" /><span>{{ post.likes }}</span></div>
                    <div class="flex items-center gap-1"><img :src="post.isFavoritedByUser ? smallStarActiveIcon : smallStarIcon" alt="Saves" class="h-5 w-5" /><span>{{ post.saves }}</span></div>
                    <div class="flex items-center gap-1"><img :src="messagesIcon" alt="Comments" class="h-5 w-5" /><span>{{ comments.length }}</span></div>
                </div>
                <button @click="openReportModal" class="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 transition-colors rounded-md p-2 -mr-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg><span class="font-semibold">檢舉</span></button>
            </div>
            <div class="flex items-center justify-around py-2 border-t border-b border-zinc-200 dark:border-zinc-700">
                <button @click="toggleLike" class="flex items-center justify-center gap-2 w-1/3 py-2 rounded-lg font-semibold transition-colors" :class="post.isLikedByUser ? 'text-[#9FB0F2]' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'"><span class="p-2 rounded-full" :class="post.isLikedByUser ? 'bg-[#9FB0F2]/20' : ''"><img :src="post.isLikedByUser ? smallLikeActiveIcon : smallLikeIcon" alt="Like" class="h-6 w-6" /></span><span>讚</span></button>
                <button @click="toggleSave" class="flex items-center justify-center gap-2 w-1/3 py-2 rounded-lg font-semibold transition-colors" :class="post.isFavoritedByUser ? 'text-yellow-600' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'"><span class="p-2 rounded-full" :class="post.isFavoritedByUser ? 'bg-yellow-100' : ''"><img :src="post.isFavoritedByUser ? smallStarActiveIcon : smallStarIcon" alt="Save" class="h-6 w-6" /></span><span>收藏</span></button>
                <div class="relative w-1/3">
                  <button @click="handleShare" class="flex items-center justify-center gap-2 w-full py-2 rounded-lg font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <span class="p-2 rounded-full"><img :src="shareIcon" alt="Share" class="h-6 w-6" /></span>
                    <span>分享</span>
                  </button>
                  <div v-if="shareFeedback" class="absolute inset-0 flex items-center justify-center bg-white dark:bg-zinc-900 text-blue-200 font-bold text-sm pointer-events-none">
                    {{ shareFeedback }}
                  </div>
                </div>
            </div>
            <div class="p-4 lg:p-6">
                <h3 class="font-bold text-lg text-zinc-800 dark:text-zinc-100 mb-4">留言</h3>
                <div v-for="comment in comments" :key="comment.id" class="flex gap-3 mb-6">
                    <img :src="comment.author.avatar" alt="User Avatar" class="w-10 h-10 rounded-full object-cover flex-shrink-0">
                    <div class="flex-grow">
                        <p class="text-sm"><span class="font-semibold text-zinc-800 dark:text-zinc-100">{{ comment.author.name }}</span><span class="ml-2 text-zinc-700 dark:text-zinc-300">{{ comment.content }}</span></p>
                        <img v-if="comment.imageUrl" :src="comment.imageUrl" class="mt-2 rounded-lg max-w-xs object-cover" alt="Comment image">
                        <div class="flex items-center text-xs text-zinc-500 dark:text-zinc-400 mt-2 gap-4">
                            <span>{{ comment.time }}</span>
                            <button @click="toggleCommentLike(comment)" class="flex items-center gap-1 font-semibold transition-colors" :class="comment.isLikedByUser ? 'text-[#9FB0F2]' : 'hover:text-zinc-900 dark:hover:text-zinc-100'"><img :src="comment.isLikedByUser ? smallLikeActiveIcon : smallLikeIcon" class="h-4 w-4" alt="Like" /><span>{{ comment.likes > 0 ? comment.likes : '讚' }}</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-4 border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
            <div class="flex items-center gap-3">
                <img :src="currentUser.avatar" alt="User Avatar" class="w-10 h-10 rounded-full object-cover">
                <div class="flex-grow flex items-center border border-zinc-300 dark:border-zinc-600 rounded-full px-2 py-1">
                    <input v-model="newCommentText" @keyup.enter="postComment" type="text" placeholder="新增留言..." class="flex-grow bg-transparent focus:outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 px-2" />
                    <button @click="postComment" :disabled="!isCommentSubmittable" class="p-2 rounded-full transition-colors" :class="{ 'text-zinc-500 hover:text-blue-500': isCommentSubmittable, 'text-zinc-400 opacity-50 cursor-not-allowed': !isCommentSubmittable }"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/><path d="M0 0h24v24H0z" fill="none"/></svg></button>
                </div>
            </div>
        </div>
      </div>
    </div>
    
    <div v-else-if="isLoading" class="flex items-center justify-center text-white text-2xl font-semibold">正在載入貼文...</div>
    <div v-else-if="error" class="bg-white rounded-lg p-8 max-w-md text-center shadow-lg">
      <h2 class="text-2xl font-bold text-red-600 mb-4">載入失敗</h2>
      <p class="text-gray-700 mb-6">{{ error }}</p>
      <button @click="router.back()" class="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition">返回上一頁</button>
    </div>

    <div v-if="showReportModal" @click.self="closeReportModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity">
      <div :style="modalStyle" class="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl w-full max-w-sm p-6">
        <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">檢舉貼文</h3>
        <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-4">請說明您檢舉此貼文的原因，這將有助於我們進行審核。</p>
        <div>
          <textarea v-model="reportReason" rows="5" maxlength="200" placeholder="請填寫檢舉事由 (200字內)..." class="w-full p-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-zinc-50 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100 transition"></textarea>
          <div class="text-right text-xs mt-1 pr-1" :class="reportReason.length >= 200 ? 'text-red-500' : 'text-zinc-500 dark:text-zinc-400'">{{ reportReason.length }} / 200</div>
        </div>
        <div class="flex justify-end gap-4 mt-6">
          <button @click="closeReportModal" class="px-5 py-2 rounded-lg text-zinc-800 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-600 hover:bg-zinc-300 dark:hover:bg-zinc-500 font-semibold transition-colors">取消</button>
          <button @click="submitReport" class="px-5 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold transition-colors shadow-sm hover:shadow-md">確認送出</button>
        </div>
      </div>
    </div>
  </div>
</template>