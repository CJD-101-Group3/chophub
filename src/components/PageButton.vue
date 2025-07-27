<script setup>
import { computed } from 'vue'

const props = defineProps({
    number: Number,
    isActive: Boolean,
})

const buttonClass = computed(() => {
    return props.isActive
        ? 'bg-[#AEBDFE] text-white' // 被選中
        : 'bg-white  rounded-[8px] text-gray-400 hover:bg-[#F2994A] hover:text-white border border-gray-400'
})
</script>

<template>
    <button
        :class="`h6 w-10 h-10 rounded-[8px] font-bold transition duration-300 ${buttonClass}`"
        @click="$emit('click')">
        {{ number }}
    </button>
</template>

<!-- 以下是用法 -->
<!-- <script setup>
import PageButton from '@/components/PageButton.vue'
import { ref } from 'vue'

const currentPage = ref(1)

const goToPage = (page) => {
currentPage.value = page
}
</script>

<template>
<div class="flex gap-2">
    <PageButton
    v-for="page in 3"
    :key="page"
    :number="page"
    :isActive="currentPage === page"
    @click="goToPage(page)"
    />
</div>
</template> -->
