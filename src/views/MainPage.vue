<script setup>
import Theheader from '@/components/Theheader.vue'
import Thefooter from '@/components/Thefooter.vue'
import PageButton from '@/components/PageButton.vue'
import { ref } from 'vue'
const currentPage = ref(1)

const goToPage = (page) => {
    currentPage.value = page
}

import DropDown from '../components/DropDown.vue'
const menuItems = [
    { label: '貼文相關', path: '/UserProfile' },
    { label: '收藏相關', path: '/UserCollections' },
    { label: '我的活動', path: '/MyActivities' },
    { label: '其他設定', path: '/OtherSettings' },
]

const handleSelect = (item) => {
    console.log('你點了：', item.label)
}
</script>

<template>
    <Theheader />
    <h2>222</h2>
    <div class="flex gap-2">
        <PageButton
            v-for="page in 3"
            :key="page"
            :number="page"
            :isActive="currentPage === page"
            @click="goToPage(page)" />
    </div>

    <DropDown title="會員資訊" :items="menuItems" @select="handleSelect" />
    
    <Thefooter />
</template>
