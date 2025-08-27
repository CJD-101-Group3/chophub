<script setup>
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import MyEventItem from '@/components/MyEventItem.vue';
import { getPublicImg } from '@/utils/getPublicImg'
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore();
const router = useRouter();

async function toggleFavorite() {
  if (!authStore.isLoggedIn) {
    alert('請先登入才能收藏活動！');
    return;
  }
};

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
    const response = await axios.get(import.meta.env.VITE_API_BASE + `/events/myEvents.php`);

    // ★ 把 isFavorited / isReviewed 轉成布林，並計算 hasRegistration
    allActivities.value = (response.data?.data || []).map(activity => {
      const isFavorited = !!activity.isFavorited;
      const isReviewed = !!activity.isReviewed;

      // 判斷是否有「報名紀錄」：有 quantity 或 payment_status（非 null/undefined）
      // 補強：若狀態為 cancelled 也代表來源是報名紀錄
      const hasRegistration =
        (activity.quantity !== null && activity.quantity !== undefined) ||
        (activity.payment_status !== null && activity.payment_status !== undefined) ||
        activity.status === 'cancelled';

      return {
        ...activity,
        isFavorited,
        isReviewed,
        hasRegistration
      };
    });
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

// ★ 專門用來判斷「只顯示有報名紀錄」
const onlyRegistered = act => act.hasRegistration === true;

const filteredActivities = computed(() => {
  switch (activeTab.value) {
    case 'upcoming':
      // 只顯示「有報名」且狀態為 upcoming
      return allActivities.value.filter(act => onlyRegistered(act) && act.status === 'upcoming');

    case 'history':
      // 只顯示「有報名」且狀態為 past 或 reviewed
      return allActivities.value.filter(
        act => onlyRegistered(act) && (act.status === 'past' || act.status === 'reviewed')
      );

    case 'cancelled':
      // 只顯示「有報名」且狀態為 cancelled
      return allActivities.value.filter(act => onlyRegistered(act) && act.status === 'cancelled');

    case 'favorites':
      // 我的收藏：只看 isFavorited，不管是否報名
      return allActivities.value.filter(act => act.isFavorited === true);

    default:
      return [];
  }
});

// --- 事件處理函式 ---
async function handleCancelActivity(activityId) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_BASE + `/events/cancelEvent.php`,
      { activityId }
    );

    if (response.data && response.data.success) {
      alert('活動取消成功！');
      await fetchActivities(); // 重新載入
      activeTab.value = 'cancelled'; // 跳到已取消頁籤
    } else {
      alert('取消失敗：' + (response.data?.message || '未知錯誤'));
    }
  } catch (err) {
    console.error('Failed to cancel activity:', err);
    alert('取消活動失敗，請稍後再試。' + (err.response?.data?.message || err.message));
  }
}

async function handleToggleFavorite(activityId) {
  const activity = allActivities.value.find(act => act.id === activityId);
  if (!activity) return;

  const newFavoriteState = !activity.isFavorited;

  try {
    const apiUrl = import.meta.env.VITE_API_BASE + `/events/eventToggleFavorite.php`;
    await axios.post(apiUrl, {
      activityId,
      isFavorited: newFavoriteState
    });
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
        </div>

        <!-- 錯誤訊息提示 -->
        <div v-else-if="error" class="text-center text-red-500 py-12">
          <p class="text-xl">{{ error }}</p>
        </div>

        <div v-else>
          <div v-if="filteredActivities.length === 0" class="text-center text-gray-400 py-12">
            <p class="text-xl">這個分類下沒有活動喔！</p>
          </div>

          <MyEventItem
            v-else
            v-for="activity in filteredActivities"
            :key="activity.id"
            v-bind="activity"
            @cancel-activity="handleCancelActivity"
            @toggle-favorite="handleToggleFavorite"
          />
        </div>
      </div>
    </div>
  </main>
  <Thefooter />
</template>