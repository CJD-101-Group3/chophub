<script setup>
import { ref } from 'vue';

const props = defineProps({
  id: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    validator: (value) => ['upcoming', 'past', 'reviewed', 'cancelled'].includes(value),
  },
  title: { type: String, required: true },
  eventType: { type: String, default: '線上活動' },
  dateTime: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  ticketCount: { type: Number, required: true },
});

// --- NEW: 定義元件要發送的事件 ---
const emit = defineEmits(['cancel-activity']);

// --- NEW: 控制彈窗顯示的狀態 ---
const isModalVisible = ref(false);

function openModal() {
  isModalVisible.value = true;
}

function closeModal() {
  isModalVisible.value = false;
}

function confirmCancellation() {
  // 發送一個名為 'cancel-activity' 的事件，並附上活動的 ID
  emit('cancel-activity', props.id);
  closeModal(); // 關閉彈窗
}
</script>

<template>
  <!-- Main Card Container-->
  <div
    class="flex flex-col mx-5 md:mx-auto bg-white rounded-lg overflow-hidden shadow-[8px_8px_15px_rgba(255,255,255,0.6)]">

    <!-- Top section with details -->
    <div class="flex flex-col md:flex-row items-center gap-6 p-4">
      <!-- 1. Image Section -->
      <div class="flex-shrink-0 w-full md:w-64 rounded-md overflow-hidden">
        <div class="aspect-[16/10]">
          <img :src="imageUrl" :alt="title" class="w-full h-full object-cover">
        </div>
      </div>

      <!-- 2. Activity Details Section-->
      <div class="flex-grow w-full">
        <h3 class="text-2xl font-bold text-[#F2994A]">{{ title }}</h3>
        <p class="mt-2 text-lg text-gray-400">{{ eventType }}</p>
        <p class="mt-1 text-xl text-[#4F4F4F]">{{ dateTime }}</p>
      </div>

      <!-- 3. Buttons Section-->
      <div class="flex flex-shrink-0 gap-4">
        <div class="flex flex-col items-center justify-center bg-[#F2994A] px-3 py-3 text-white w-36 h-36">
          <span class="text-[20px] md:text-[24px]">訂單金額</span>
          <span class="text-[20px] font-bold md:text-[24px]">NT$ {{ price }}</span>
        </div>
        <div class="flex flex-col items-center justify-center bg-[#F2994A] px-3 py-3 text-white w-36 h-36">
          <span class="text-[20px] md:text-[24px]">有效票券</span>
          <span class="text-[20px] font-bold md:text-[24px]">{{ ticketCount }} 張</span>
        </div>
      </div>
    </div>

    <!-- 4. Action Bar-->
    <div class="border-t border-gray-200 p-4 flex justify-end items-center gap-4">

      <!-- 情況一：活動已結束，等待評論 -->
      <div v-if="status === 'past'" class="flex justify-end items-center gap-4">
        <a :href="`/EventReview`"
          class="bg-[#F2994A] hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">
          填寫活動問卷
        </a>
      </div>

      <!-- 情況二：活動已評論完成-->
      <div v-if="status === 'reviewed'" class="flex items-center gap-2">
        <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-gray-700 font-semibold">已完成評論</span>
      </div>

      <!-- --- CHANGED: 情況三現在包含兩個按鈕 --- -->
      <div v-if="status === 'upcoming'" class="flex items-center justify-end gap-4">
        <!-- 退票按鈕 -->
        <button @click="openModal"
          class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg transition-colors duration-300">
          申請退票
        </button>
        <!-- 查看票券按鈕 -->
        <a :href="`/TicketDetailPage/${id}`"
          class="bg-[#F2994A] hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 hover:text-white">
          查看票券詳情
        </a>
      </div>
      <!-- 情況四：活動已取消 -->
      <div v-if="status === 'cancelled'" class="flex items-center gap-2">
        <span class="text-gray-500 font-semibold text-lg">活動已取消</span>
      </div>
    </div>
  </div>

  <!-- --- NEW: 退票確認彈窗 --- -->
  <transition name="modal-fade">
    <div v-if="isModalVisible"
      class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
        <p class="text-xl font-bold text-yellow-600 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clip-rule="evenodd" />
          </svg>
          您確定要取消這場活動報名嗎？
        </p>
        <div class="mt-2 text-sm text-gray-600 bg-gray-100 p-3 rounded-md">
          <p class="font-semibold">{{ title }}</p>
          <p>{{ dateTime }}</p>
        </div>
        <p class="mt-4 text-base text-gray-500">取消後將無法再次參加本次活動，因您已過報名截止日取消，本次收費將無法退款，謝謝您。</p>
        <div class="mt-6 flex gap-4">
          <button @click="confirmCancellation"
            class="flex-1 bg-[#D96570] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors">確認退票</button>
          <button @click="closeModal"
            class="flex-1 bg-white hover:bg-gray-200 text-gray-700 border border-gray-400 font-bold py-2 px-4 rounded-md transition-colors">返回</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* --- NEW: 彈窗的淡入淡出效果 --- */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>