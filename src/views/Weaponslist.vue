<template>
    <h1>這是貼文區</h1>
    <div class="p-6">
        <PostCard :post="samplePost" />
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    // 1. 引入 Card 元件
    import Card from '../components/PostCard.vue'

</script>
