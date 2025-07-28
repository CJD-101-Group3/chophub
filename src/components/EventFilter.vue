<template>
  <div class="flex flex-col md:flex-row items-center justify-center gap-4 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
    
    <div class="flex flex-col md:flex-row items-center gap-4">
      <label class="font-bold text-gray-200 whitespace-nowrap">活動日期</label>
      
      <div class="flex items-center gap-2 w-full">
        
        <!-- 開始日期：外觀與功能的結合體 -->
        <div class="relative w-full md:w-1/2">
          <!-- 1. 這是給使用者看的、漂亮的「假」輸入框 -->
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
          </div>
          <input 
            :value="formattedStartDate"
            @click="openStartDatePicker"
            type="text" 
            class="bg-zinc-700 border border-zinc-600 text-gray-200 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5 cursor-pointer" 
            placeholder="YYYY-MM-DD"
            readonly 
          >
          <!-- 2. 這是隱藏在後面的「真」日期選擇器 -->
          <input
            ref="hiddenStartDateInput"
            v-model="startDate"
            @change="handleStartDateChange"
            type="date"
            class="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none"
          >
        </div>

        <span class="text-gray-400">-</span>

        <!-- 結束日期：同樣的結構 -->
        <div class="relative w-full md:w-1/2">
           <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
          </div>
          <input 
            :value="formattedEndDate"
            @click="openEndDatePicker"
            type="text" 
            class="bg-zinc-700 border border-zinc-600 text-gray-200 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5 cursor-pointer" 
            placeholder="YYYY-MM-DD"
            readonly
          >
          <input
            ref="hiddenEndDateInput"
            v-model="endDate"
            @change="handleEndDateChange"
            type="date"
            class="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none"
          >
        </div>
      </div>
    </div>

    <button @click="handleFilter" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-8 rounded-md transition-colors duration-300 w-full md:w-[150px]">
      篩選
    </button>
  </div>
</template>

<script setup>

import { ref } from 'vue';

// 儲存真實日期值 (YYYY-MM-DD)，用於篩選邏輯
const startDate = ref('');
const endDate = ref('');

// 儲存格式化後給使用者看的日期 (現在是 YYYY/MM/DD)
const formattedStartDate = ref('');
const formattedEndDate = ref('');

// Template Refs，用來獲取隱藏的 input 元素
const hiddenStartDateInput = ref(null);
const hiddenEndDateInput = ref(null);

const emit = defineEmits(['filter-applied']);

// 點擊「假」輸入框時，打開「真」的選擇器 (這部分不變)
const openStartDatePicker = () => hiddenStartDateInput.value?.showPicker();
const openEndDatePicker = () => hiddenEndDateInput.value?.showPicker();

// 當「真」選擇器的值改變時，更新「假」輸入框的顯示
const handleStartDateChange = () => {
  if (startDate.value) {
    // startDate.value 的格式是 "YYYY-MM-DD"
    // 我們將它直接替換成斜線即可
    formattedStartDate.value = startDate.value.replace(/-/g, '/');
  } else {
    formattedStartDate.value = '';
  }
};

const handleEndDateChange = () => {
  if (endDate.value) {
    // 同樣地，將 "YYYY-MM-DD" 替換成 "YYYY/MM/DD"
    formattedEndDate.value = endDate.value.replace(/-/g, '/');
  } else {
    formattedEndDate.value = '';
  }
};
// --- 修改結束 ---


// 篩選按鈕的邏輯不變，它提交的是真實的、未格式化的日期值
const handleFilter = () => {
  emit('filter-applied', {
    start: startDate.value, // 送出的依然是 "YYYY-MM-DD"
    end: endDate.value,
  });
};

</script>