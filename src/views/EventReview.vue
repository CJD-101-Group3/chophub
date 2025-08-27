<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import EventBanner from '@/components/EventBanner.vue';
import FeedbackForm from '@/components/FeedbackForm.vue';
import axios from 'axios';

const route = useRoute();

const eventDetails = ref(null);
const isLoading = ref(true);
const error = ref(null);

axios.defaults.withCredentials = true;

// --- API 呼叫：獲取單一活動的詳情 ---
async function fetchEventDetails(id) {
  isLoading.value = true;
  error.value = null;
  try {
    const apiUrl = import.meta.env.VITE_API_BASE + `/events/EventReview.php?event_id=${id}`;
    const response = await axios.get(apiUrl);

    if (response.data && response.data.status === 'success' && response.data.data) {
      eventDetails.value = response.data.data;
    } else {
      error.value = response.data.message || '未能成功獲取活動詳情。';
    }
  } catch (err) {
    console.error('Failed to fetch event details for EventReview:', err);
    error.value = '無法載入活動詳情，請稍後再試。';
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  const eventId = route.params.id;
  if (eventId) {
    fetchEventDetails(eventId);
  } else {
    error.value = '缺少活動 ID，無法顯示詳情。';
    isLoading.value = false;
  }
});
</script>

<template>
  <div>
    <Theheader />
    <main class="items-center justify-center bg-[#282828] pb-16 min-h-screen">
      <div class="text-white h3 font-bold text-center py-9 md:h2">活動問卷</div>

      <!-- 載入中提示 -->
      <div v-if="isLoading" class="text-center text-gray-400 py-12">
        <p class="text-xl">活動詳情載入中...</p>
      </div>

      <!-- 錯誤訊息提示 -->
      <div v-else-if="error" class="text-center text-red-500 py-12">
        <p class="text-xl">{{ error }}</p>
      </div>

      <!-- 當 eventDetails 成功載入後才渲染內容 -->
      <div v-else-if="eventDetails">
        <EventBanner
          :image-url="eventDetails.imageUrl"
          :image-alt="eventDetails.imageAlt"
          :title="eventDetails.title"
          :subtitle="eventDetails.category_name"
          :date-time="eventDetails.time"
        />

        <!-- 確保 FeedbackForm 接收 event-id -->
        <div class="mx-auto max-w-5xl px-4 mt-8"> 
          <FeedbackForm :event-id="eventDetails.id" />
        </div>
      </div>

      <!-- 沒有找到活動詳情 -->
      <div v-else class="text-center text-gray-400 py-12">
        <p class="text-xl">沒有找到活動詳情。</p>
      </div>
    </main>
    <Thefooter />
  </div>
</template>