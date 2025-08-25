<script setup>
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import MyEventItem from '@/components/MyEventItem.vue';
import { getPublicImg } from '@/utils/getPublicImg'
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth'


const authStore = useAuthStore(); 

async function toggleFavorite() {
  if (!authStore.isLoggedIn) {
    alert('請先登入才能收藏活動！');
    // 可選：跳轉到登入頁面
    // router.push('/login'); 
    return;
  }};

axios.defaults.withCredentials = true;

const tabs = ref([
  { key: 'upcoming', name: '即將到來' },
  { key: 'history', name: '歷史活動' },
  { key: 'cancelled', name: '已取消' },
  { key: 'favorites', name: '我的收藏' }
]);
const route = useRoute();

const activeTab = ref(route.query.tab || 'upcoming');

const allActivities = ref([]);
const isLoading = ref(true);
const error = ref(null);

// --- API 呼叫 ---
async function fetchActivities() {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await axios.get(import.meta.env.VITE_API_BASE + `events/myEvents.php`);
    allActivities.value = response.data.data || [];
  } catch (err) {
    console.error('Failed to fetch activities:', err);
    error.value = '無法載入活動資料，請稍後再試。';
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchActivities();
});

const filteredActivities = computed(() => {
  // 'upcoming', 'past', 'cancelled'
  switch (activeTab.value) {
    case 'upcoming':
      return allActivities.value.filter(act => act.status === 'upcoming');
    case 'history':
      return allActivities.value.filter(act => act.status === 'past');
    case 'cancelled':
      return allActivities.value.filter(act => act.status === 'cancelled');
    case 'favorites':
      return allActivities.value.filter(act => act.isFavorited);
    default:
      return [];
  }
});

// --- 事件處理函式 ---
async function handleCancelActivity(activityId) {
  try {
     const response = await axios.post(import.meta.env.VITE_API_BASE + `events/cancelEvent.php`, { id: activityId });
    if (response.data && response.data.success) { 
        const activityToCancel = allActivities.value.find(act => act.id === activityId);
        if (activityToCancel) {
          activityToCancel.status = 'cancelled';
        }
    } else {
        alert('取消失敗：' + (response.data.message || '未知錯誤'));
    }
  } catch (err) {
    console.error('Failed to cancel activity:', err);
    alert('取消活動失敗，請稍後再試。');
  }
}

async function handleToggleFavorite(activityId) {
  const activity = allActivities.value.find(act => act.id === activityId);
  if (!activity) return;

  const newFavoriteState = !activity.isFavorited;

  try {
    const apiUrl = import.meta.env.VITE_API_BASE + `events/eventToggleFavorite.php`;
    await axios.post(apiUrl, {
      activityId: activityId,
      isFavorited: newFavoriteState
    });
    activity.isFavorited = newFavoriteState;
  } catch (err) {
    console.error('Failed to toggle favorite:', err);
    alert('更新收藏狀態失敗！');
  }
}

// 修正：將 handleWriteReview 移到這裡，成為一個獨立的函式
function handleWriteReview(activityId) {
  console.log(`準備為活動 ID: ${activityId} 撰寫評論`);
  // 在這裡加入跳轉到評論頁面的邏輯，例如使用 Vue Router
  // router.push(`/activity/${activityId}/review`);
}
</script>

<template>
  <main class="bg-[#282828] pb-16 flex flex-col min-h-screen">
    <Theheader />
    <div>
      <div class="text-white h3 font-bold text-center py-9 md:h2">我的活動</div>

      <div class="mx-auto max-w-5xl space-y-4">

        <!-- 1. Tabs Navigation-->
        <div class="border-b-2 border-[#4F4F4F] px-4">
          <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key" :class="[
            'px-6 py-3 text-lg font-medium transition-colors duration-300 rounded-none',
            { 'border-b-4 border-b-[#F2994A] text-white': activeTab === tab.key },
            { 'text-gray-400 hover:text-white': activeTab !== tab.key }
          ]">
            {{ tab.name }}
          </button>
        </div>

        <!-- 載入中提示 -->
        <div v-if="isLoading" class="text-center text-gray-400 py-12">
          <p class="text-xl">活動載入中...</p>
        </div>

        <!-- 錯誤訊息提示 -->
        <div v-else-if="error" class="text-center text-red-500 py-12">
          <p class="text-xl">{{ error }}</p>
        </div>
        
        <!-- 現有內容，用 v-else 包起來 -->
        <div v-else>
          <!-- 如果沒有任何活動，顯示提示訊息 -->
          <div v-if="filteredActivities.length === 0" class="text-center text-gray-400 py-12">
            <p class="text-xl">這個分類下沒有活動喔！</p>
          </div>

        <!-- 3. Dynamic List Rendering based on the active tab -->
        <MyEventItem v-else v-for="activity in filteredActivities" :key="activity.id" v-bind="activity"
          @write-review="handleWriteReview" @cancel-activity="handleCancelActivity" />
      </div>
      </div>
    </div>
  </main>
  <Thefooter />
</template>
