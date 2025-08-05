<script setup>
import { defineProps, defineEmits } from 'vue';

// --- 匯入評分星星圖示 (維持不變) ---
import filledStarIcon from '@/assets/icon/starevaluate1.svg';
import emptyStarIcon from '@/assets/icon/starevaluate2.svg';

defineProps({
    event: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['view-details']);

// 建立一個函式，當按鈕被點擊時，它會發出事件並將 event 的 id 一併傳出去
function handleDetailsClick() {
    emit('view-details', event.id);
}
</script>

<template>
    <div
        class="flex flex-col w-full bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

        <!-- 內容區塊 -->
        <div class="flex flex-col flex-grow p-6">
            <div v-if="event.isFeatured" class="mb-3">
                <span class="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                    精選活動
                </span>
            </div>

            <h2 class="text-gray-800 text-2xl font-bold leading-tight mb-2 h-20 overflow-hidden text-ellipsis"
                :title="event.title">
                {{ event.title }}
            </h2>

            <!-- 日期與類型區塊-->
            <div class="text-gray-600 text-base mb-4 space-y-1">
                <p>{{ event.type }}</p>
                <p>{{ event.date }}</p>
            </div>

            <!-- 評分區塊 (維持不變) -->
            <div class="flex items-center gap-x-2 text-base text-gray-600 mb-6">
                <div class="flex items-center">
                    <template v-for="i in 5" :key="i">
                        <img :src="i <= event.rating ? filledStarIcon : emptyStarIcon" alt="star" class="w-5 h-5" />
                    </template>
                </div>
                <span>{{ event.reviews }} reviews</span>
            </div>

            <div class="flex-grow"></div>

            <button @click="handleDetailsClick" class="mt-4 w-full bg-[#F2994A] text-white font-semibold rounded-lg text-lg h-14 flex items-center justify-center 
            transition-colors duration-200 ease-in-out
            hover:bg-orange-500 
            focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75">
                了解詳情
            </button>
        </div>
    </div>
</template>


<style scoped></style>