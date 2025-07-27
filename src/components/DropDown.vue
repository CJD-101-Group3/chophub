<script setup>
import { ref } from 'vue'
import arrowIcon from '@/assets/icon/wideArrow.svg'

const isOpen = ref(false)

const toggle = () => {
    isOpen.value = !isOpen.value
}
</script>

<template>
    <div class="inline-block w-[200px] text-gray-800 text-base font-medium">
        <!-- 主按鈕 -->
        <button
            @click="toggle"
            class="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-t-md bg-white">
            會員資訊
            <img
                :src="arrowIcon"
                alt="arrow"
                class="w-4 h-4 transition-transform duration-300"
                :class="{ 'rotate-180': isOpen }" />
        </button>

        <!-- 下拉內容 -->
        <ul v-show="isOpen" class="border border-gray-300 border-t-0 rounded-b-md bg-white overflow-hidden">
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">貼文相關</li>
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">收藏相關</li>
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">我的活動</li>
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">其他設定</li>
        </ul>
    </div>
</template>
