<script setup>
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
import { getPublicImg } from '@/utils/getPublicImg'
import { ref, computed } from 'vue';
import QrcodeVue from 'qrcode.vue';
import { useRoute } from 'vue-router';

// --- 1. 模擬資料庫 ---
// 我們不再需要 API，所以直接在前端模擬所有需要的資料。

const eimg1 = getPublicImg('events/burning-coal.jpg')
const eimg2 = getPublicImg('events/forgingseafood-and-man.png')
const image3 = getPublicImg('events/katana-exhibition.png')
const image4 = getPublicImg('events/forgingman.png')
const image5 = getPublicImg('events/dark-stithy-workshop-with-hammer-anvil-firs-plan-fire-stove-background.jpg')


const mockEventsDatabase = {
    '1': { id: 1, title: '【鍛造群俠會】刀匠線上交流', dateTime: '2025/7/23(三) 10:00am', imageUrl: eimg1, ticketCount: 1, eventType: '線上活動' },
    '2': { id: 2, title: '【匠魂燒鍛】小型鍛刀入門體驗', dateTime: '2024/5/15(五) 14:00pm', imageUrl: eimg2, ticketCount: 2, eventType: '實體工作坊' },
    '3': { id: 3, title: '【工藝知識講堂】冷兵器構造全解析', dateTime: '2024/4/01(一) 19:30pm', imageUrl: image3, price: 500, ticketCount: 1, eventType: '線上課程'},
    '4': { id: 4, title: '【刀劍研磨所】親手拋光你的第一把刀', dateTime: '2025/9/01(一) 19:30pm', imageUrl: image4, price: 1100, ticketCount: 1, eventType: '實體工作坊'},
    '5': { id: 5, title: '匠人現場 - 劍柄木雕實作坊', dateTime: '2025/8/12(二) 13:30PM', imageUrl: image5, price: 2800, ticketCount: 1, eventType: '實體活動'},
};

const mockCurrentUser = {
    id: 123,
    name: '王大明',
    email: 'ming.wang@example.com'
};


// --- 2. 【核心修改】元件邏輯 ---
// 2.1. 獲取當前的路由資訊
const route = useRoute(import.meta.env.url);

// 2.2. 從路由的參數中，動態地讀取 'id'。
// 如果 URL 是 /TicketDetailPage/5, route.params.id 的值就是 '5'
const eventId = route.params.id;

// 2.3. 使用這個從 URL 拿到的動態 eventId 來查找資料
const event = ref(mockEventsDatabase[eventId]); // 不再寫死 '1'

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
    <Theheader />
    <div class="bg-[#282828] min-h-screen text-white">
        <header class="p-4">
            <a href="/MyEvents" class="text-white hover:text-[#F2994A]">
                < 返回我的活動</a>
        </header>

        <main class="py-8 px-4">
            <!-- 【保護層】只有在 event 物件成功找到時，才渲染所有內容 -->
            <div v-if="event" class="max-w-6xl mx-auto">

                <!-- 
                  【新增】主佈局容器 
                  - flex: 啟用 Flexbox
                  - flex-col: 在手機上預設為垂直排列
                  - lg:flex-row: 在大螢幕 (lg) 上變為水平排列
                  - gap-12: 在欄位之間增加間距
                -->
                <div class="flex flex-col lg:flex-row gap-12">


                    <!-- 活動資訊區域 -->
                    <!-- lg:w-7/12: 在大螢幕上佔據 7/12 的寬度 -->
                    <div class="lg:w-7/12">                        
                        <!-- 3. 活動圖片 (從外面移到這裡) -->
                        <img :src="event.imageUrl" :alt="event.title" class="w-full h-64 object-cover rounded-lg shadow-lg">
                        
                        <!-- 4. 活動詳細文字 (從外面移到這裡) -->
                        <div class="mt-6">
                            <h1 class="text-3xl font-bold text-white">{{ event.title }}</h1>
                            <div class="mt-4 text-xl text-gray-300 space-y-2">
                                <p><strong>活動類型:</strong> {{ event.eventType }}</p>
                                <p><strong>時間:</strong> {{ event.dateTime }}</p>
                            </div>
                        </div>
                    </div>


                    <!-- 票券區域 -->
                    <!-- lg:w-5/12: 在大螢幕上佔據 5/12 的寬度 -->
                    <div class="lg:w-5/12">
                        <!-- 1. 票券卡片 (我們把它從外面移到這裡) -->
                        <div class="bg-white text-black rounded-xl shadow-lg p-6 flex flex-col items-center gap-4">
                            <!-- 判斷所有非線上活動 -->
                            <div v-if="event.eventType !== '線上活動' && event.eventType !== '線上課程'" class="text-center">
                                <h2 class="text-2xl font-bold text-gray-800">活動入場憑證</h2>
                                <QrcodeVue :value="qrValue" :size="220" level="H" class="my-4 block mx-auto" />
                                <p class="font-mono bg-gray-100 px-3 py-1 rounded">{{ displayTicketId }}</p>
                                <p class="mt-2 font-bold text-red-600">
                                    請於入場時出示此畫面<br>並【配合出示身分證件】供人員核對姓名
                                </p>
                            </div>
                            <!-- 判斷所有線上活動 -->
                            <div v-else class="w-[220px] aspect-square flex flex-col justify-center items-center">
                                <h2 class="text-2xl font-bold text-gray-800">線上活動票券</h2>
                                <p class="mt-4 text-gray-600">這是一場線上活動，無需實體票券。</p>
                            </div>
                        </div>

                        <!-- 2. 操作按鈕 (我們也把它移到左欄，跟票券放在一起) -->
                        <div class="mt-8">
                            <div v-if="event.eventType === '線上活動' || event.eventType === '線上課程'" class="text-center">
                                <a href="https://meet.google.com" target="_blank" class="w-full block bg-[#F2994A] hover:bg-orange-500 hover:text-white text-white font-bold py-4 px-6 rounded-lg text-xl">
                                    進入活動連結
                                </a>
                            </div>
                            <div v-else class="text-center">
                                <a href="https://maps.app.goo.gl/mnR8fnye6uwmS9Ch6" target="_blank" class="w-full block bg-[#F2994A] hover:bg-orange-500 hover:text-white text-white font-bold py-4 px-6 rounded-lg text-xl">
                                    規劃路線 (開啟地圖)
                                </a>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
            <!-- 如果 event 不存在，顯示錯誤訊息 -->
            <div v-else class="text-center py-20">
                <h1 class="text-2xl font-bold text-yellow-500">哎呀！找不到活動資訊</h1>
                <p class="mt-2 text-gray-400">您想找的活動可能不存在或已被移除。</p>
            </div>
        </main>
    </div>
    <Thefooter />
</template>