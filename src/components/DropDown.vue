<script setup>
import { ref } from 'vue'
import arrowIcon from '@/assets/icon/wideArrow.svg'
import { RouterLink } from 'vue-router'

const props = defineProps({
    title: {
        type: String,
        default: '選單',
    },
    items: {
        type: Array,
        default: () => [],
    },
})

const emit = defineEmits(['select'])

const isOpen = ref(false)
const toggle = () => {
    isOpen.value = !isOpen.value
}

const handleClick = (item) => {
    if (!item.path) {
        emit('select', item)
        isOpen.value = false
    }
}
</script>

<template>
    <div class="h6 inline-block w-[200px] text-gray-800 font-medium">
        <!-- 主選單按鈕 -->
        <button
            @click="toggle"
            class="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-t-md bg-white">
            {{ title }}
            <img
                :src="arrowIcon"
                alt="arrow"
                class="w-4 h-4 transition-transform duration-300"
                :class="{ 'rotate-180': isOpen }" />
        </button>

        <!-- 選項列表 -->
        <ul v-show="isOpen" class="border border-gray-300 border-t-0 rounded-b-md bg-white overflow-hidden">
            <li v-for="(item, index) in items" :key="index" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <RouterLink v-if="item.path" :to="item.path" class="block w-full h-full" @click="isOpen = false">
                    {{ item.label }}
                </RouterLink>
                <span v-else @click="handleClick(item)">
                    {{ item.label }}
                </span>
            </li>
        </ul>
    </div>
</template>

<!-- 以下是使用說明 -->
<!-- <script setup>
import DropDown from '@/components/DropDown.vue'

const menuItems = [
  { label: '貼文相關', path: '/UserProfile' },
  { label: '收藏相關', path: '/UserCollections' },
  { label: '我的活動', path: '/MyActivities' },
  { label: '其他設定', path: '/OtherSettings' }
]

const handleSelect = (item) => {
  console.log('test', item.label)
}
</script>

<template>
  <DropDown title="會員資訊" :items="menuItems" @select="handleSelect" />
</template> -->
