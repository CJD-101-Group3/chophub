<script setup>
import GeneralButton from './GeneralButton.vue'

// 定義這個元件可以接收一個名為 'event' 的 prop，它的型別是物件
defineProps({
    event: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['request-payment']);

// const router = useRouter();

// function goToPayment() {
//   router.push('/EventPayment');
// }

</script>
<template>
    <section class="w-full bg-white" >
        <div class="mx-auto flex max-w-5xl flex-col items-center px-4 py-12 sm:px-6 md:flex-row lg:px-8">
            <!-- --- 圖片部分 --- -->
            <div class="w-full flex-shrink-0 md:w-1/3">
                <img :src="event.imageUrl" :alt="event.title" class="w-full rounded-lg object-cover shadow-lg" />
            </div>

            <!-- --- 文字內容部分 --- -->
            <div class="mt-8 w-full md:mt-0 md:w-2/3 md:pl-10">
                <h1 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{{ event.title }}</h1>

                <div class="space-y-3 text-lg text-gray-700">
                    <p class="flex items-start">
                        <strong class="inline-block w-24 flex-shrink-0 font-semibold text-gray-900">活動時間</strong>
                        <span>{{ event.time }}</span>
                    </p>
                    <p class="flex items-start">
                        <strong class="inline-block w-24 flex-shrink-0 font-semibold text-gray-900">活動地點</strong>
                        <span>{{ event.location }}</span>
                    </p>
                    <p class="flex items-start">
                        <strong class="inline-block w-24 flex-shrink-0 font-semibold text-gray-900">主辦單位</strong>
                        <span>{{ event.organizer }}</span>
                    </p>
                </div>

                <div class="flex justify-end items-center">
                    <span class="text-xl font-semibold text-[#F2994A] mt-5">尚餘 {{ event.spotsLeft }} 個名額</span>

                    <GeneralButton
                        variant="primary"
                        @click="emit('request-payment')"
                        width="150px"
                        height="50px"
                        font-size="20px"
                        class="mr-18 ml-5 mt-5 md:w-1/4"
                    >
                        立刻報名
                    </GeneralButton>                    
                </div>
            </div>
        </div>
    </section>
</template>