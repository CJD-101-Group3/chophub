<template>
    <button
        class="w-[83px] h-[40px] rounded-[8px] text-sm font-bold transition duration-300"
        :class="variantClass"
        @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    variant: {
        type: String,
        default: 'primary', // 'primary' = Signup樣式, 'outline' = Login樣式
    },
})

const variantClass = computed(() => {
    switch (props.variant) {
        case 'outline':
            return 'bg-white text-black border-2 border-[#F2994A] hover:bg-[#F2994A] hover:text-white'
        case 'primary':
        default:
            return 'bg-[#F2994A] text-white hover:brightness-110 hover:bg-white hover:text-black'
    }
})
</script>
