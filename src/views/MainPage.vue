<script setup>
import Theheader from '@/components/Theheader.vue'
import Thefooter from '@/components/Thefooter.vue'
import PageButton from '@/components/PageButton.vue'
import { ref } from 'vue'
import DropDown from '../components/DropDown.vue'

const currentPage = ref(1)

const goToPage = (page) => {
    currentPage.value = page
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
    <DropDown/>
    <Thefooter />
</template>
