<!-- src/views/WeaponList.vue -->
<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
      
      <!-- 這裡可以放 "最熱門"、"篩選" 等控制項 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">武器展示區</h1>
        <!-- 其他篩選器可以放在這裡 -->
      </div>

      <!-- 響應式網格佈局 -->
      <!-- 預設單欄 (手機) -->
      <!-- sm (640px) 以上變兩欄 -->
      <!-- lg (1024px) 以上變三欄 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="post in posts" :key="post.id">
          <Card :post="post" />
        </div>
      </div>

      <!-- 分頁元件可以放在這裡 -->
      <div class="flex justify-center mt-12">
          <!-- ... 分頁邏輯 ... -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Card from '@/components/Card.vue'; // 根據你的路徑調整，@/components/... 是常見設定

// 模擬從 API 獲取的貼文資料
const posts = ref([
  {
    id: 1,
    user: { name: '使用者名稱' },
    title: '手裡劍',
    description: '四爪對稱手裡劍，結構精準銳利，中心圓孔設計，兼具工藝美感與穩定投擲性能。',
    likes: 82,
    stars: 24,
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80' // 替換成你的圖片路徑
  },
  {
    id: 2,
    user: { name: '鑄劍師' },
    title: '飛燕雙劍',
    description: '輕巧而致命的雙劍，劍身刻有飛燕圖騰，適合快速連續的攻擊，是刺客的首選。',
    likes: 105,
    stars: 45,
    imageUrl: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 3,
    user: { name: '神射手' },
    title: '追風長弓',
    description: '以千年神木製成的長弓，弓身堅韌且充滿彈性，射出的箭矢能追風逐電。',
    likes: 153,
    stars: 76,
    imageUrl: 'https://images.unsplash.com/photo-1554034483-263e1ae3264b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'
  },
  // ...可以增加更多貼文物件
  { id: 4, user: { name: '使用者名稱' }, title: '手裡劍', description: '四爪對稱手裡劍，結構精準銳利...', likes: 82, stars: 24, imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80' },
  { id: 5, user: { name: '使用者名稱' }, title: '手裡劍', description: '四爪對稱手裡劍，結構精準銳利...', likes: 82, stars: 24, imageUrl: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80' },
  { id: 6, user: { name: '使用者名稱' }, title: '手裡劍', description: '四爪對稱手裡劍，結構精準銳利...', likes: 82, stars: 24, imageUrl: 'https://images.unsplash.com/photo-1554034483-264344b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80' },
]);
</script>
