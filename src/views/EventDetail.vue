<script setup>
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import { ref, computed, onMounted, watch } from 'vue';
import EventInfoCard from '@/components/EventInfoCard.vue';
import RegisterBanner from '@/components/RegisterBanner.vue';
import GeneralButton from '../components/GeneralButton.vue';
import { getPublicImg } from '@/utils/getPublicImg'
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

// --- State ---
const eventDetails = ref(null);
const loading = ref(true);
const error = ref(null);
const suggestedEvents = ref([]);
const suggestedEventsLoading = ref(true);
const suggestedEventsError = ref(null);

const route = useRoute();
const router = useRouter();

// --- API 函式 ---
async function fetchEventDetails(id) {
   loading.value = true;
   error.value = null;
   try {
      const apiUrl = import.meta.env.VITE_API_BASE + `/api/events/getEventById.php?id=${id}`;
      const response = await axios.get(apiUrl);
      eventDetails.value = response.data.data || response.data;
   } catch (err) {
      error.value = "無法載入活動詳情，請稍後再試。";
   } finally {
      loading.value = false;
   }
}

// 【已修正】讓此函式接收一個要排除的 ID
async function fetchSuggestedEvents(idToExclude) {
   suggestedEventsLoading.value = true;
   suggestedEventsError.value = null;
   try {
      // 【已修正】使用傳入的 idToExclude 變數
      const apiUrl = import.meta.env.VITE_API_BASE + `/api/events/getSuggestedEvents.php?limit=3&excludeId=${idToExclude}`;
      const response = await axios.get(apiUrl);
      suggestedEvents.value = response.data.data || response.data;
   } catch (err) {
      suggestedEventsError.value = "無法載入推薦活動，請稍後再試。";
   } finally {
      suggestedEventsLoading.value = false;
   }
}

// --- 路由監聽 ---
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      fetchEventDetails(newId);
      // 【已修正】呼叫時傳入新的 ID
      fetchSuggestedEvents(newId); 
      window.scrollTo(0, 0);
    }
  }
);

// --- 生命週期鉤子 ---
onMounted(() => {
   fetchEventDetails(route.params.id);
   // 【已修正】呼叫時傳入當前的 ID
   fetchSuggestedEvents(route.params.id);
});

// --- 頁面邏輯 ---
const quantity = ref(1);

const increaseQuantity = () => {
   quantity.value++;
};

const decreaseQuantity = () => {
   if (quantity.value > 1) {
      quantity.value--;
   }
};

const totalPrice = computed(() => {
   if (eventDetails.value?.price) {
      return eventDetails.value.price * quantity.value;
   }
   return 0;
});

// --- 導航函式 ---
function handleViewDetails(eventId) {
   router.push({ name: 'event-detail', params: { id: eventId } });
}

// 【已修正】修正 eventId 變數來源
function goToPayment() {
   router.push({
      path: '/EventPayment',
      query: {
         eventId: route.params.id, // 從 route.params 獲取當前頁面的 ID
         quantity: quantity.value
      }
   });
}
</script>

<template>
   <div class=" bg-[#282828] text-gray-200 font-sans">
      <Theheader />
      <!-- 1. 正在載入中 -->
      <div v-if="loading" class="text-center py-40">
         <p class="text-xl text-gray-400">活動詳情載入中，請稍候...</p>
      </div>

      <!-- 2. 載入發生錯誤 -->
      <div v-else-if="error" class="text-center py-40">
         <p class="text-xl text-red-400">錯誤：{{ error }}</p>
         <GeneralButton variant="primary" @click="fetchEventDetails" class="mt-4">
            重試
         </GeneralButton>
      </div>

      <!-- 3. 載入成功且有資料 -->
      <div v-else-if="eventDetails">

         <!-- Banner (現在可以安全地傳遞 eventDetails) -->
         <RegisterBanner 
         :event="eventDetails"
         @request-payment="goToPayment" />

         <main class="mx-auto px-6 pb-12">
            <!-- Sections Wrapper -->
            <div class="max-w-4xl mx-auto mt-32 space-y-16">
               <!-- Introduction -->
               <section>
                  <h3 class="font-bold text-white mb-6 pb-3 border-b border-gray-500"><span
                        class="text-gray-500 mr-2">|</span>活動介紹</h3>
                  <!-- 建議將這裡的靜態文字改為從 eventDetails.description 讀取 -->
                  <div class="space-y-4 text-gray-300 leading-relaxed whitespace-pre-line">
                     <p>{{ eventDetails.description || '暫無詳細介紹。' }}</p>
                  </div>
               </section>

               <!-- Registration Info -->
               <section>
                  <h3 class="font-bold text-white mb-6 pb-3 border-b border-gray-500"><span
                        class="text-gray-500 mr-2">|</span>報名辦法</h3>
                  <!-- 以下內容如果每個活動都一樣，可以保留；否則也應從 API 獲取 -->
                  <div class="space-y-6 text-gray-300">
                     <div>
                        <h3 class="font-bold text-white mb-2"><span class="text-[#F2994A] mr-2">|</span>報名費用</h3>
                        <!-- 動態綁定價格 -->
                        <p>新台幣 {{ eventDetails.price }} 元整。</p>
                     </div>
                     <div>
                        <h3 class="font-bold text-white mb-2"><span class="text-[#F2994A] mr-2">|</span>年齡限制</h3>
                        <p>限年滿 18 歲以上之民眾參加，現場需出示證件。</p>
                     </div>
                     <!-- ... 其他靜態規則 ... -->
                  </div>
               </section>

               <!-- Schedule -->
               <section>
                  <h3 class="font-bold text-white mb-6 pb-3 border-b border-gray-500">活動時程規劃</h3>
                  <div class="space-y-2 text-gray-300">
                     <div class="text-white"><span class="font-mono text-white">18:50-19:00 |</span> 報到與集合</div>
                     <p><span class="font-mono text-white">19:00-19:10 |</span> 活動開場 & 導覽流程說明</p>
                     <p><span class="font-mono text-white">19:10-19:45 |</span> 專家深度導覽：限定展品與私藏珍品</p>
                     <p><span class="font-mono text-white">19:45-20:00 |</span> Q&A 與自由欣賞時間</p>
                  </div>
               </section>

               <!-- Contact -->
               <section>
                  <h3 class="font-bold text-white mb-6 pb-3 border-b border-gray-500">聯絡我們</h3>
                  <div class="text-gray-300 space-y-2">
                     <p>如有任何關於活動內容、報名流程或特殊需求的疑問，歡迎與主辦單位聯繫，我們將誠摯為您解答：</p><br>
                     <p>主辦單位 | 鋼火典藏會 SteelFire Collectors Circle</p>
                     <p>Email: events@steelfire-collectors.com</p>
                     <p>電話: 02-9876-5432 #536</p>
                     <p>聯絡人: 林先生</p>
                  </div>
               </section>

               <!-- Ticket Selection -->
               <section class="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
                  <div class="flex flex-nowrap justify-around items-center space-x-4">
                     <!-- 票價 -->
                     <div class="flex-1 md:text-center">
                        <div class="flex flex-col items-center">
                           <h4 class="font-bold">票價</h4>
                           <!-- 動態綁定價格 -->
                           <h5 class="text-xl font-bold mt-2">NT$ {{ eventDetails.price }}</h5>
                        </div>
                     </div>
                     <!-- 張數選擇器-->
                     <div class="flex-1 md:text-center">
                        <div class="flex flex-col items-center">
                           <h4 class="font-bold">張數</h4>
                           <div class="flex items-center justify-center mt-2 space-x-4">
                              <button @click="decreaseQuantity" :disabled="quantity <= 1"
                                 class="bg-gray-200 w-8 h-8 rounded-full font-bold text-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">-</button>
                              <span class="text-xl font-bold">{{ quantity }}</span>
                              <button @click="increaseQuantity"
                                 class="bg-gray-200 w-8 h-8 rounded-full font-bold text-lg hover:bg-gray-300">+</button>
                           </div>
                        </div>
                     </div>
                     <!-- 總金額區塊 -->
                     <div class="flex-1 md:text-center">
                        <div class="flex flex-col items-center">
                           <h4 class="font-bold">總金額</h4>
                           <h5 class="text-xl font-bold mt-2 text-[#F2994A]">NT$ {{ totalPrice.toLocaleString() }}</h5>
                        </div>
                     </div>
                  </div>
               </section>

               <div class="flex justify-center items-center">
                  <GeneralButton variant="primary" @click="goToPayment" width="150px" height="50px" font-size="20px">
                     立刻報名
                  </GeneralButton>
               </div>
            </div>

            <!-- =============================================================== -->
            <!-- Suggested Events (推薦活動區)                                 -->
            <!-- =============================================================== -->
            <section class="mt-20">
               <h3 class="font-bold text-white text-center mb-10">你可能會有興趣的活動</h3>

               <!-- 推薦活動的載入中提示 -->
               <div v-if="suggestedEventsLoading" class="text-center text-gray-400">
                  正在載入推薦活動...
               </div>

               <!-- 推薦活動的錯誤提示 -->
               <div v-else-if="suggestedEventsError" class="text-center text-red-400">
                  {{ suggestedEventsError }}
               </div>

               <!-- 推薦活動成功載入，且有資料 -->
               <div v-else-if="suggestedEvents && suggestedEvents.length > 0"
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <EventInfoCard v-for="event in suggestedEvents" :key="event.id" :event="event"
                     @view-details="handleViewDetails" />
               </div>

               <!-- 推薦活動成功載入，但沒有資料 -->
               <div v-else class="text-center text-gray-500">
                  目前沒有其他推薦活動。
               </div>
            </section>
         </main>
      </div>

      <Thefooter />
   </div>
</template>

<style scoped>
p {
   @apply text-white text-2xl md:text-base leading-relaxed mb-4 font-normal;
}

/* 讓從 API 來的 description 欄位可以正確換行 */
.whitespace-pre-line {
   white-space: pre-line;
}
</style>
