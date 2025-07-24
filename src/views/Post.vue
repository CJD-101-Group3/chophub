<!-- src/views/Post.vue -->
<template>
  <!-- 背景色和基本邊距 -->
  <div class="bg-gray-50 py-10">
    <div class="container mx-auto px-4">

      <!-- 頁面標題和篩選器區域 (可選) -->
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-extrabold text-gray-800 mb-2">探索武器庫</h1>
        <p class="text-gray-500">瀏覽由社群成員分享的精良武器</p>
      </div>
      
      <!-- 
        響應式網格佈局
        - 手機版 (預設): 單欄 (grid-cols-1)
        - 平板 (md, 768px 以上): 雙欄 (md:grid-cols-2)
        - 電腦版 (lg, 1024px 以上): 三欄 (lg:grid-cols-3)
      -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- 
          v-for 迴圈
          - 遍歷 posts 陣列中的每一個 post 物件
          - :key 是 Vue 為了高效更新列表所必需的，請務必加上
          - :post="post" 將單個 post 物件傳遞給 Card 元件的 'post' prop
        -->
        <div v-for="post in posts" :key="post.id">
          <Card :post="post" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// 1. 引入 Card 元件
import Card from '@/components/Card.vue'

// 2. 準備要顯示的資料陣列 (通常這些資料會來自後端 API)
const posts = ref([
  {
    id: 1,
    user: { name: '使用者名稱' },
    title: '手裡劍',
    description: '四爪對稱手裡劍，結構精準銳利，中心圓孔設計，兼具工藝美感與穩定投擲性能。',
    likes: 82,
    stars: 24,
    // 您可以使用您自己的圖片路徑，例如 '/src/assets/shuriken.png'
    // 為了方便展示，這裡先用網路圖片
    imageUrl: 'https://images.unsplash.com/photo-1588595403336-4a4b38a0536d?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 2,
    user: { name: '鑄劍師' },
    title: '飛燕雙劍',
    description: '輕巧而致命的雙劍，劍身刻有飛燕圖騰，適合快速連續的攻擊，是刺客的首選。',
    likes: 105,
    stars: 45,
    imageUrl: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 3,
    user: { name: '神射手' },
    title: '追風長弓',
    description: '以千年神木製成的長弓，弓身堅韌且充滿彈性，射出的箭矢能追風逐電。',
    likes: 153,
    stars: 76,
    imageUrl: 'https://images.unsplash.com/photo-1554034483-263e1ae3264b?auto=format&fit=crop&w=800&q=60'
  },
  // 為了讓三欄佈局看起來完整，再加三筆資料
  {
    id: 4,
    user: { name: '鐵匠' },
    title: '山崩巨斧',
    description: '沉重無比的巨大戰斧，揮舞時帶有雷霆萬鈞之勢，能夠輕易破開敵人的防線。',
    likes: 98,
    stars: 33,
    imageUrl: 'https://images.unsplash.com/photo-1606124157541-5ce394a43c65?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 5,
    user: { name: '影武者' },
    title: '無影短刀',
    description: '刀身能吸收光線，在黑暗中幾乎無法被察覺，是執行秘密任務的完美武器。',
    likes: 120,
    stars: 61,
    imageUrl: 'https://images.unsplash.com/photo-1561430933-1c4a79cda26a?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 6,
    user: { name: '聖騎士' },
    title: '守護者之盾',
    description: '刻有古老符文的聖盾，不僅能抵擋物理攻擊，更能反彈初階的魔法傷害。',
    likes: 210,
    stars: 95,
    imageUrl: 'https://images.unsplash.com/photo-1508249254148-3e4a83857f53?auto=format&fit=crop&w=800&q=60'
  }
]);
</script>