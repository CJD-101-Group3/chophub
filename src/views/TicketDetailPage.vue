<script setup>
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
import { ref, computed } from 'vue';
import QrcodeVue from 'qrcode.vue';

// --- 1. 模擬資料庫 ---
// 我們不再需要 API，所以直接在前端模擬所有需要的資料。

// 模擬活動資料
const mockEventsDatabase = {
    '1': { id: 1, title: '【鍛造群俠會】刀匠線上交流', dateTime: '2025/7/23(三) 10:00am', imageUrl: '/events/burning-coal.jpg', ticketCount: 1, eventType: '線上活動' },
    '2': { id: 2, title: '【匠魂燒鍛】小型鍛刀入門體驗', dateTime: '2024/5/15(五) 14:00pm', imageUrl: '/events/forgingseafood-and-man.png', ticketCount: 2, eventType: '實體工作坊' },
};

// 模擬已登入的使用者資料 (因為沒有後端，所以也必須模擬)
const mockCurrentUser = {
    id: 123,
    name: '王大明', // 這是用來核對身份證的關鍵欄位！
    email: 'ming.wang@example.com'
};


// --- 2. 元件邏輯 ---
// 假設使用者正在查看活動 ID 為 2 的票券
const event = ref(mockEventsDatabase['1']); 
const user = ref(mockCurrentUser);

// --- 3. 產生 QR Code 的內容 ---
// 這是這個方法的核心！我們將把人類可讀的資訊直接打包成 JSON 字串。
const qrValue = computed(() => {
    // 必須確保 event 和 user 的資料都存在
    if (!event.value || !user.value) return ''; 

    // 建立一個包含所有現場人員需要資訊的 JSON 物件
    const ticketInfo = {
        eventName: event.value.title,
        userName: user.value.name,       // << 關鍵！這是要和身分證比對的姓名
        userId: user.value.id,
        eventId: event.value.id,
    };

    // 將這個物件轉換成 JSON 字串，這就是 QR Code 的內容
    return JSON.stringify(ticketInfo, null, 2); // null, 2 是為了讓掃描結果格式化得好看一點
});

// 用於畫面上顯示的票號 (純粹為了好看)
const displayTicketId = computed(() => {
    if (event.value && user.value) {
        return `TICKET-${event.value.id}-USER-${user.value.id}`;
    }
    return '';
});

</script>

<template>
    <Theheader/>
    <div class="bg-[#282828] min-h-screen text-white">
        <header class="p-4">
            <a href="/MyEvents" class="text-white hover:text-[#F2994A]">< 返回我的活動</a>
        </header>

        <main class="py-8 px-4">
            <!-- 直接顯示內容，因為我們不再有載入或錯誤狀態 -->
            <div v-if="event" class="max-w-md mx-auto">

                <!-- 1. 票券卡片 (邏輯不變，但內容和提示文字改變) -->
                <div class="bg-white text-black rounded-xl shadow-lg p-6 flex flex-col items-center gap-4">
                    
                    <!-- 實體活動 -->
                    <div v-if="event.eventType === '實體工作坊'" class="text-center">
                        <h2 class="text-2xl font-bold text-gray-800">活動入場憑證</h2>
                        <QrcodeVue 
                            :value="qrValue" 
                            :size="220" 
                            level="H"
                            class="my-4 block mx-auto"
                        />
                        <p class="font-mono bg-gray-100 px-3 py-1 rounded">{{ displayTicketId }}</p>
                        <!-- !!! 關鍵：修改給使用者的提示文字 !!! -->
                        <p class="mt-2 text-gray-600 font-bold text-red-600">
                            請於入場時出示此畫面<br>並【配合出示身分證件】供人員核對姓名
                        </p>
                    </div>

                    <!-- 線上活動 -->
                    <div v-else-if="event.eventType === '線上活動'" class="text-center">
                         <h2 class="text-2xl font-bold text-gray-800">線上活動票券</h2>
                         <p class="mt-4 text-gray-600">這是一場線上活動，無需實體票券。</p>
                    </div>
                </div>

                <!-- 2. 活動詳細資訊 (維持不變) -->
                <div class="mt-8 space-y-4">
                    <img :src="event.imageUrl" :alt="event.title" class="w-full h-40 object-cover rounded-lg">
                    <h1 class="text-3xl font-bold text-white">{{ event.title }}</h1>
                    <div class="text-xl text-gray-300 space-y-2">
                        <p><strong>時間:</strong> {{ event.dateTime }}</p>
                    </div>
                </div>

                <!-- 3. 操作按鈕 (維持不變) -->
                <div class="mt-8">
                     <div v-if="event.eventType === '線上活動'" class="text-center">
                        <a href="https://meet.google.com" target="_blank" class="w-full block bg-[#F2994A] hover:bg-orange-500 hover:text-white  text-white font-bold py-4 px-6 rounded-lg text-xl">
                            進入活動連結
                        </a>
                    </div>
                    <div v-else class="text-center">
                        <a href="https://maps.google.com" target="_blank" class="w-full block bg-[#4F4F4F] hover:bg-gray-600 hover:text-white text-white font-bold py-4 px-6 rounded-lg text-xl">
                            規劃路線 (開啟地圖)
                        </a>
                    </div>
                </div>

            </div>
        </main>
    </div>
    <Thefooter/>
</template>