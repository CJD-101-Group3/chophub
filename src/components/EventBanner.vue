<template>
    <section class="bg-white flex flex-col md:flex-row items-center justify-center gap-8">
        
        <div class="w-[500px] md:w-1/3 py-[20px] md:py-[50px]">
        <img :src="imageUrl" 
            :alt="imageAlt" 
            class="rounded-lg object-cover w-full h-full shadow-lg">
        </div>
        
        <div class="w-full md:w-1/2 flex flex-col justify-center">
        <h1 class="h3 font-bold md:h3 text-[#F2994A]">
            {{ title }}
        </h1>
            <div class="mt-5 leading-5">
            <p class="text-[24px] md:text-[24px] text-black mt-2">{{ subtitle }}</p>
            <p class="text-[24px] md:text-[24px] text-black mt-4">{{ dateTime }}</p>
            </div>
        </div>
    </section>
</template>

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