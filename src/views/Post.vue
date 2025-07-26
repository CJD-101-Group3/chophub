<script setup>
import { ref } from 'vue';

// 1. 匯入你的 PostCard 元件
// @ 是 Vite 或 Vue CLI 專案中預設的 'src' 資料夾路徑別名
import PostCard from '@/components/PostCard.vue';

// 2. 準備要傳遞給卡片元件的資料
// 你可以從 API 獲取這些資料，或者先在本地定義好
// 為了示範，我們創建一個 ref 物件來存放卡片資料
const myPost = ref({
  postImage: 'https://images.unsplash.com/photo-1596701062353-33201d95c527?q=80&w=3270&auto=format&fit=crop', // 找一張範例圖片
  isFeatured: true,
  userName: '創意摺紙大師',
  postTitle: '光影手裡劍',
  isHot: true,
  description: '這是一段從父元件傳遞到子元件的動態描述文字。學習元件化是掌握 Vue 的關鍵一步！',
  likes: 199,
  stars: 76,
});

// 示範：如何顯示多張卡片
const anotherPost = ref({
  postImage: 'https://images.unsplash.com/photo-1599395359339-a035d7946b6a?q=80&w=3175&auto=format&fit=crop',
  isFeatured: false,
  userName: '新手小明',
  postTitle: '我的第一個作品',
  isHot: false,
  description: '雖然不完美，但是是我的第一次嘗試，請大家多多指教！',
  likes: 15,
  stars: 3,
});
</script>

<template>
  <!-- 建立一個外層容器來排列卡片 -->
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-4xl font-bold mb-8 text-center">最新貼文</h1>
    
    <div class="flex flex-wrap justify-center gap-8">
      
      <!-- 3. 在模板中使用 PostCard 元件 -->
      <!--
        我們使用 v-bind 指令，它可以一次性地將整個物件的所有屬性都綁定到 PostCard 的 props 上。
        :postImage="myPost.postImage"
        :isFeatured="myPost.isFeatured"
        ...
        的縮寫形式就是 v-bind="myPost"
      -->
      <PostCard v-bind="myPost" />
      
      <!-- 你也可以顯示第二張、第三張...卡片 -->
      <PostCard v-bind="anotherPost" />
      
      <!-- 甚至可以直接在標籤上寫死資料 (但不建議，因為失去了動態性) -->
      <PostCard
        postImage="https://images.unsplash.com/photo-1599282928503-f3c54c867a13?q=80&w=3270&auto=format&fit=crop"
        userName="硬核玩家"
        :likes="500"
        :stars="120"
      />
      
    </div>
  </div>
</template>

