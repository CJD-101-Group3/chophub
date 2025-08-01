<!-- src/components/DropDownFilter.vue -->
<template>
    <div class="relative inline-block text-left w-29 md:w-48">
        <!-- 下拉選單按鈕 -->
        <div>
            <button type="button"
                class="inline-flex justify-between w-full rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-[#282828] text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none"
                @click="isOpen = !isOpen">
                <!-- 顯示當前選中的標籤，如果沒有，則顯示預設標題 -->
                {{ selectedLabel }}
                <!-- 向下的箭頭圖示 -->
                <svg class="-mr-1 ml-2 h-5 w-5 transition-transform duration-200"
                    :class="{ 'transform rotate-180': isOpen }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </div>

        <!-- 下拉選單的內容 -->
        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <div v-if="isOpen"
                class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                role="menu" aria-orientation="vertical">
                <div class="py-1" role="none">
                    <!-- 使用 v-for 迴圈產生選項 -->
                    <button v-for="item in items" :key="item.value" @click="selectItem(item)"
                        class="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem">
                        {{ item.label }}
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 1. 定義元件接收的 props (來自父層的資料)
const props = defineProps({
    // v-model 會自動綁定到這個 prop
    modelValue: {
        type: [String, Number],
        required: true
    },
    // 下拉選單的預設標題
    title: {
        type: String,
        default: '請選擇'
    },
    // 選項列表
    items: {
        type: Array,
        required: true,
        validator: (items) => items.every(item => 'label' in item && 'value' in item)
    }
});

// 2. 定義元件要觸發的事件 (通知父層更新)
const emit = defineEmits(['update:modelValue']);

// 3. 元件自身的內部狀態
const isOpen = ref(false);

// 4. 當選擇一個項目時要執行的函式
const selectItem = (item) => {
    emit('update:modelValue', item.value);
    isOpen.value = false;
};

// 5. 計算屬性，用來顯示在按鈕上的文字
const selectedLabel = computed(() => {
    const selectedItem = props.items.find(item => item.value === props.modelValue);
    return selectedItem ? selectedItem.label : props.title;
});

</script>

