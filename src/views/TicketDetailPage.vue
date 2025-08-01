<template>
    <Theheader/>
    <div class="bg-[#282828] min-h-screen text-white">
        <header class="p-4 flex items-center">
            <!-- 步驟1: 將 router-link 換成普通的 a 標籤，避免 router 錯誤 -->
            <a href="/MyEvents" class="text-white hover:text-[#F2994A]">
                < 返回我的活動
            </a>
        </header>

        <main class="py-8 px-4">
            <!-- 步驟2: 移除 Loading 和 Error 狀態，因為我們現在使用靜態資料 -->
            <!-- Main Content -->
            <div v-if="event" class="max-w-md mx-auto">

                <!-- 1. The Digital Ticket Card -->
                <div class="bg-white text-black rounded-xl shadow-lg p-6 flex flex-col items-center gap-4">
                    <h2 class="text-2xl font-bold text-gray-800">活動入場憑證</h2>

                    <!-- QR Code 元件 -->
                     <QrcodeVue 
                        :value="qrValue" 
                        :size="220" 
                        level="H"
                    />

                    <p class="font-mono bg-gray-100 px-3 py-1 rounded">票號: TICKET-{{ event.id }}-USER-123</p>
                    <p class="text-gray-600 text-center">請於入場時出示此 QR Code 供工作人員掃描</p>
                </div>

                <!-- 2. Event Details Section (這部分維持不變，因為 event 物件現在是靜態的) -->
                <div class="mt-8 space-y-4">
                    <img :src="event.imageUrl" :alt="event.title" class="w-full h-40 object-cover rounded-lg">
                    <h1 class="text-3xl font-bold text-white">{{ event.title }}</h1>
                    <div class="text-xl text-gray-300 space-y-2">
                        <p><strong>時間:</strong> {{ event.dateTime }}</p>
                        <p><strong>票數:</strong> {{ event.ticketCount }} 張</p>
                    </div>
                </div>

                <!-- 3. Action Button Section (這部分維持不變) -->
                <div class="mt-8">
                    <!-- ... 按鈕邏輯維持不變 ... -->
                    <div v-if="event.eventType === '線上活動'" class="text-center">
                        <a href="https://meet.google.com" target="_blank"
                            class="w-full block bg-[#F2994A] hover:bg-orange-500 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors duration-300">
                            進入活動連結
                        </a>
                        <p class="mt-2 text-gray-400">活動將於 Google Meet 進行</p>
                    </div>
                    <div v-else class="text-center">
                        <a href="https://maps.google.com" target="_blank"
                            class="w-full block bg-[#4F4F4F] hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors duration-300">
                            規劃路線 (開啟地圖)
                        </a>
                        <p class="mt-2 text-gray-400">地點: 台北市信義區匠人路123號</p>
                    </div>
                </div>

            </div>
        </main>
    </div>
    <Thefooter/>
</template>

<script setup>
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
import { ref, onMounted, computed } from 'vue';
import QrcodeVue from 'qrcode.vue';

// --- MOCK API ---
const mockEventsDatabase = [
    { id: 1, title: '【鍛造群俠會】刀匠線上交流', dateTime: '2025/7/23(三) 10:00am', imageUrl: '/events/burning-coal.jpg', price: 500, ticketCount: 1, eventType: '線上活動', status: 'upcoming' },
    { id: 2, title: '【匠魂燒鍛】小型鍛刀入門體驗', dateTime: '2024/5/15(五) 14:00pm', imageUrl: '/events/forgingseafood-and-man.png', price: 1200, ticketCount: 2, eventType: '實體工作坊', status: 'upcoming' },
];


// --- COMPONENT LOGIC ---
const isLoading = ref(false); 
const error = ref(null);

const event = ref(mockEventsDatabase[0]); 


const qrValue = computed(() => {
    if (!event.value) return ''; 

    // 建立一個 JSON 字串。這樣掃描 QR Code 的後端就能輕鬆解析出多個資訊
    return JSON.stringify({
        eventId: event.value.id,
        ticketId: `TICKET-${event.value.id}-USER-123`, // 這是模擬的票券ID
        userId: 123 // 這是模擬的使用者ID
    });
});

</script>