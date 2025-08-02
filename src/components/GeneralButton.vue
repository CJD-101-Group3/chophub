<template>
    <button
        class="rounded-[8px] font-bold transition duration-300 flex items-center justify-center"
        :class="variantClass"
        :style="customStyle"
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
    width: {
        type: String,
        default: '83px',
    },
    height: {
        type: String,
        default: '40px',
    },
    fontSize: {
        type: String,
        default: '14px', // Tailwind 的 text-sm 預設是 14px
    },
})

// 根據 variant prop 來決定按鈕的顏色樣式
const variantClass = computed(() => {
    switch (props.variant) {
        case 'outline':
            return 'bg-white text-black border-2 border-[#F2994A] hover:bg-[#F2994A] hover:text-white'
        case 'primary':
        default:
            return 'bg-[#F2994A] text-white hover:brightness-110 hover:bg-white hover:text-black'
    }
})

// 根據 props 來動態生成 style
const customStyle = computed(() => ({
    width: props.width,
    height: props.height,
    fontSize: props.fontSize,
}))
</script>

<!--使用說明

<script setup>
import GeneralButton from '../components/GeneralButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 4. 定義一個函式，當按鈕被點擊時會執行
function goToMyEvents() {
  router.push('/MyEvents');
}
</script>

<template>
    <!-- 這是在模板中實際使用 GeneralButton 的地方
         [屬性] variant: 按鈕的樣式。
        - 'primary': 主要樣式 (橘色背景，白色文字)。
        - 'outline': 外框樣式 (白色背景，橘色邊框和文字)。 -->
        
 <!--  <GeneralButton
        variant="primary"
        @click="goToMyEvents"
        width="150px"
        height="50px"
        font-size="16px"
    >
        查看我的活動
    </GeneralButton>
</template>-->