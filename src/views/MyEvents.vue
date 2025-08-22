<script setup>
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import MyEventItem from '@/components/MyEventItem.vue';
import { getPublicImg } from '@/utils/getPublicImg'
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// --- STATE MANAGEMENT ---

axios.defaults.withCredentials = true;

// 1. 優化 Tabs 的定義，使其更具擴展性
const tabs = ref([
  { key: 'upcoming', name: '即將到來' },
  { key: 'history', name: '歷史活動' },
  { key: 'cancelled', name: '已取消' },
  { key: 'favorites', name: '我的收藏' }
]);

const activeTab = ref('upcoming');


const allActivities = ref([]);
const isLoading = ref(true);
const error = ref(null);

// --- API 呼叫 ---
async function fetchActivities() {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await axios.get('http://localhost:8888/ChopHub-API/api/myEvents.php');
    
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

// --- COMPUTED PROPERTIES ---

// 根據 activeTab 動態過濾活動列表
const filteredActivities = computed(() => {
  switch (activeTab.value) {
    case 'upcoming':
      return allActivities.value.filter(act => act.status === 'upcoming');
    case 'history':
      return allActivities.value.filter(act => act.status === 'past' || act.status === 'reviewed');
    case 'cancelled':
      return allActivities.value.filter(act => act.status === 'cancelled');
    case 'favorites':
      return allActivities.value.filter(act => act.isFavorited);
    default:
      return [];
  }
});

// 6. 修改 handleCancelActivity，使其呼叫 API
async function handleCancelActivity(activityId) {
  try {
    await axios.post(`http://localhost:8888/ChopHub-API/api/cancel-activity.php`, 
    { activityId: activityId }
  );

    // API 成功後，更新前端的狀態以立即反映變化
    const activityToCancel = allActivities.value.find(act => act.id === activityId);
    if (activityToCancel) {
      activityToCancel.status = 'cancelled';
    }
    

  } catch (err) {
    console.error('Failed to cancel activity:', err);
    alert('取消活動失敗，請稍後再試。');
  }
}

//收藏功能也需要呼叫 API
async function handleToggleFavorite(activityId) {
  const activity = allActivities.value.find(act => act.id === activityId);
  if (!activity) return;

  const newFavoriteState = !activity.isFavorited;

function handleWriteReview(activityId) {
  console.log(`準備為活動 ID: ${activityId} 撰寫評論`);

  // 1. 跳轉到一個新的評論頁面
  //    router.push(`/activity/${activityId}/review`);
}

  try {
    const apiUrl = 'http://localhost:8888/ChopHub-API/api/eventToggleFavorite.php';

    await axios.post(apiUrl, {
      activityId: activityId,
      isFavorited: newFavoriteState
    }
  );

    activity.isFavorited = newFavoriteState;
    
  } catch (err) {
    console.error('Failed to toggle favorite:', err);
    alert('更新收藏狀態失敗！');
  }
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
          <!-- 你可以在這裡放一個 loading spinner 動畫 -->
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
