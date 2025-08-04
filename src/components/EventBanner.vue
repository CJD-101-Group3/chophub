<script setup>
defineProps({
    imageUrl: {
        type: String,
        required: true
    },
    imageAlt: {
        type: String,
        default: 'Event Banner'
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    }
});
</script>

<template>
    <section class="bg-white flex flex-col md:flex-row items-center justify-center gap-8 py-5 px-5 ">
        
        <div class="w-full max-w-lg mx-auto md:w-1/3 md:mx-0 md:py-[50px]">
        <img :src="imageUrl" 
            :alt="imageAlt" 
            class="rounded-lg object-cover w-full h-full shadow-lg">
        </div>
        
        <div class="w-full md:w-1/2 flex flex-col justify-center">
        <h1 class="h3 font-bold md:h3 text-[#F2994A]">
            {{ title }}
        </h1>
            <div class="mt-5 leading-5">
            <p class="text-[20px] md:text-[24px] text-black mt-2">{{ subtitle }}</p>
            <p class="text-[20px] md:text-[24px] text-black mt-4">{{ dateTime }}</p>
            </div>
        </div>
    </section>
</template>