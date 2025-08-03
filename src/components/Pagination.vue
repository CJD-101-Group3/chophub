<template>
    <div class="flex justify-center items-center mt-5 mb-5 space-x-2 col-span-full">
        <!-- 上一頁按鈕 -->
        <button @click="goToPage(currentPage - 5)" :disabled="currentPage === 1" :class="arrowClass"
            class="disabled:opacity-50 disabled:cursor-not-allowed">
            < </button>

                <!-- 頁碼按鈕/省略號迴圈 -->
                <template v-for="(page, index) in pagesToDisplay" :key="index">
                    <button v-if="typeof page === 'number'" @click="goToPage(page)" :class="[
                        'w-10 h-10 rounded-lg font-bold transition-colors',
                        currentPage === page
                            ? 'bg-[#F2994A] text-white'
                            : 'bg-[#282828] text-gray-400 hover:bg-gray-600',
                    ]">
                        {{ page }}
                    </button>
                    <!-- 如果 page 是 '...'，就顯示為文字 -->
                    <span v-else class="w-10 h-10 flex items-center justify-center text-gray-400 font-bold">
                        ...
                    </span>
                </template>

<!-- 下一頁按鈕 -->
<button @click="goToPage(currentPage + 5)" :disabled="currentPage === totalPages" :class="arrowClass"
    class="disabled:opacity-50 disabled:cursor-not-allowed">
    >
</button>
</div>
</template>

<script setup>
import { computed } from 'vue';

// --- Props & Emits ---
// Props 用於從父層接收資料
const props = defineProps({
    totalPages: {
        type: Number,
        required: true,
    },
    currentPage: {
        type: Number,
        required: true,
    },
    // 可見頁碼的數量，預設為5 (例如: 1 ... 4 5 6 ... 10)
    visibleLimit: {
        type: Number,
        default: 5
    }
});

// Emits 用於通知父層資料已變更 (實現 v-model)
const emit = defineEmits(['update:currentPage']);


// --- Computed Properties ---
// 計算要顯示的頁碼陣列 (核心邏輯)
const pagesToDisplay = computed(() => {
    const pages = [];
    const { totalPages, currentPage, visibleLimit } = props;

    if (totalPages <= 4) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }

    const showEllipsis = '...';
    pages.push(1);

    let startPage, endPage;

    if (currentPage <= 2) {
        startPage = 2;
        endPage = 3;
    } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
        endPage = totalPages - 1;
    } else {
        startPage = currentPage - 1;
        endPage = currentPage;
    }

    if (startPage > 2) {
        pages.push(showEllipsis);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    if (endPage < totalPages - 1) {
        pages.push(showEllipsis);
    }

    pages.push(totalPages);

    return pages;
});

const arrowClass = computed(() => 'w-10 h-10 rounded-lg font-bold transition-colors bg-[#282828] text-gray-400 hover:bg-gray-600');


// --- Methods ---
// 前往指定頁面
function goToPage(page) {
    if (page >= 1 && page <= props.totalPages) {
        emit('update:currentPage', page);
    }
}
</script>


<!-- 使用說明
<template>
    <div>
        <Pagination :total-pages="mockTotalPages" v-model:currentPage="currentPage" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Pagination from '@/components/Pagination.vue';

// --- 模擬資料 ---
// 在實際應用中，totalPages 應該來自後端 API
const mockTotalPages = ref(20); 
const currentPage = ref(1);

</script> -->