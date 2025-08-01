<script setup>
import { ref } from 'vue';
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';

// --- 通用佈局相關的資料 ---
const isDropdownOpen = ref(false);
const toggleDropdown = () => isDropdownOpen.value = !isDropdownOpen.value;

const activeTab = ref('貼文相關');
const menuItems = ref([
  { name: '會員資訊', href: '/UserProfile' },
  { name: '貼文相關', href: '/PostActivity' },
  { name: '收藏相關', href: '/UserCollections' },
  { name: '我的活動', href: '/MyActivities' },
  { name: '其他設定', href: '/OtherSettings' },
]);

const memberInfo = ref({
  name: '露比匠',
  avatarUrl: '/src/assets/users/userp.png',
});

// --- 此頁面專用的模擬資料 ---
const postStats = ref({
  posts: 36,
  replies: 128,
  collections: 2789,
  latestPost: '「鍛造入門心得」',
});

const myPosts = ref([
  { id: 1, title: '【鋼火與水氣】一把刀的靈魂在什麼時候誕生？', status: '20則留言/50個讚', date: '2025/07/12', link: '/posts/1' },
  { id: 2, title: '【心得】新手磨刀石推薦', status: '5則留言/12個讚', date: '2025/07/11', link: '/posts/2' },
  { id: 3, title: '【分享】我的第一把手工小刀', status: '33則留言/88個讚', date: '2025/07/10', link: '/posts/3' },
]);

const myReplies = ref([
  { id: 1, date: '2025/07/12', postTitle: '鍛刀失敗案例討論', content: '這個情況其實我之前也很常遇到，主要是因為', link: '/posts/4' },
  { id: 2, date: '2025/07/11', postTitle: '關於大馬士革鋼的迷思', content: '沒錯，很多人都以為花紋越複雜越好，但其實...', link: '/posts/5' },
  { id: 3, date: '2025/07/10', postTitle: '新手磨刀石推薦', content: '我個人推薦#1000和#3000的組合，對新手來說...', link: '/posts/2' },
]);

const myCollectedPosts = ref([
  { id: 1, category: '【心得】', title: '【鋼火與水氣】一把刀的靈魂在什麼時候誕生？', date: '2025/07/12', link: '/posts/1' },
  { id: 2, category: '【分享】', title: '專訪日本國寶級刀匠：一生一刃', date: '2025/07/11', link: '/posts/6' },
]);

const reportedRecords = ref([
  { id: 1, date: '2025/07/17', type: '貼文', reason: '這個問題根本不配來問！內容空泛且態度不佳。', result: '警告一次' },
  { id: 2, date: '2025/07/16', type: '留言', reason: '涉及人身攻擊', result: '刪除留言' },
]);

const myReports = ref([
  { id: 1, date: '2025/07/17', type: '貼文', reason: '「這篇好廢，回覆好嗆」', result: '待審核' },
  { id: 2, date: '2025/07/15', type: '留言', reason: '「廣告連結」', result: '已處理' },
]);

</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Theheader />

    <div class="flex-1 container mx-auto p-4 lg:flex lg:gap-8 lg:p-8">
      <!-- 左側邊欄 -->
      <aside class="hidden lg:block lg:w-72 flex-shrink-0">
        <div class="bg-white p-4 rounded-lg shadow-md sticky top-24">
          <div class="flex flex-col items-center text-center border-b pb-4 mb-4">
            <img :src="memberInfo.avatarUrl" alt="Avatar" class="w-40 h-40 rounded-full object-cover mb-3"/>
            <h2 class="text-xl font-bold text-gray-800">{{ memberInfo.name }}</h2>
          </div>
          <nav class="flex flex-col space-y-2">
            <router-link
              v-for="item in menuItems"
              :key="item.name"
              :to="item.href"
              class="px-4 py-3 text-center rounded-md font-semibold transition-colors duration-200"
              :class="{
                /* 【修改處】修正了 active 和 inactive 狀態的 hover 樣式 */
                'bg-[#F2994A] text-white hover:text-white': activeTab === item.name,
                'text-gray-600 hover:bg-[#F2994A] hover:text-white': activeTab !== item.name
              }"
              @click="activeTab = item.name"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </div>
      </aside>

      <!-- 右側主內容區 -->
      <main class="flex-1">
        
        <!-- 手機版下拉式選單 -->
        <div class="relative lg:hidden mb-6">
          <button @click="toggleDropdown" class="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-md shadow-sm">
            <div class="flex items-center">
              <img :src="memberInfo.avatarUrl" alt="Avatar" class="w-8 h-8 rounded-full object-cover mr-3"/>
              <span class="font-semibold">{{ memberInfo.name }}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 transition-transform" :class="{'rotate-180': isDropdownOpen}"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
          </button>
          <transition name="fade">
            <div v-if="isDropdownOpen" class="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg">
              <a v-for="item in menuItems" :key="item.name" :href="item.href" class="block px-4 py-3 text-gray-700 hover:bg-[#F2994A] hover:text-white">{{ item.name }}</a>
            </div>
          </transition>
        </div>

        <!-- 主內容 -->
        <div class="space-y-8">
          
          <div class="text-center lg:text-left">
            <h1 class="text-3xl font-bold text-gray-800">{{ memberInfo.name }}，</h1>
            <p class="text-lg text-gray-600">因為有你的分享，ChopHub更加精采！</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-4 border-b pb-3">貼文相關紀錄</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>發文篇數：<span class="font-semibold text-gray-800">{{ postStats.posts }}</span></div>
              <div>回覆總數：<span class="font-semibold text-gray-800">{{ postStats.replies }}</span></div>
              <div>收藏總數：<span class="font-semibold text-gray-800">{{ postStats.collections }}</span></div>
              <div class="truncate">最新發表貼文：<span class="font-semibold text-gray-800">{{ postStats.latestPost }}</span></div>
            </div>
          </div>

          <!-- 我的貼文 -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-4">我的貼文</h2>
            <!-- 電腦版表格 -->
            <table class="w-full text-left hidden lg:table">
              <colgroup><col class="w-7/12"><col class="w-3/12"><col class="w-2/12"></colgroup>
              <thead><tr class="border-b-2"><th class="py-2">文章標題</th><th class="py-2">狀態</th><th class="py-2 text-right">發表日期</th></tr></thead>
              <tbody>
                <tr v-for="post in myPosts" :key="post.id" class="border-b last:border-b-0 hover:bg-gray-50">
                  <td class="py-3 truncate">
                    <a :href="post.link" class="hover:text-[#F2994A] transition-colors">{{ post.title }}</a>
                  </td>
                  <td>{{ post.status }}</td>
                  <td class="text-right">{{ post.date }}</td>
                </tr>
              </tbody>
            </table>
            <!-- 手機版卡片 -->
            <div class="space-y-4 lg:hidden">
              <a v-for="post in myPosts" :key="post.id" :href="post.link" class="block bg-[#E2E9EF] p-4 rounded-md hover:bg-gray-300 transition-colors">
                <p class="font-semibold truncate">{{ post.title }}</p>
                <div class="flex justify-between text-sm text-gray-600 mt-2"><p>狀態：{{ post.status }}</p><p>發表日期：{{ post.date }}</p></div>
              </a>
            </div>
          </div>

          <!-- 我的回覆摘要 -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-4">我的回覆摘要</h2>
            <table class="w-full text-left hidden lg:table">
              <colgroup><col class="w-[15%]"><col class="w-[30%]"><col class="w-[55%]"></colgroup>
              <thead><tr class="border-b-2"><th class="py-2">回覆日期</th><th class="py-2">貼文標題</th><th class="py-2">回覆內容摘要</th></tr></thead>
              <tbody>
                <tr v-for="reply in myReplies" :key="reply.id" class="border-b last:border-b-0 hover:bg-gray-50">
                  <td class="py-3">{{ reply.date }}</td>
                  <td class="truncate">
                     <a :href="reply.link" class="hover:text-[#F2994A] transition-colors">{{ reply.postTitle }}</a>
                  </td>
                  <td class="truncate">{{ reply.content }}</td>
                </tr>
              </tbody>
            </table>
            <div class="space-y-4 lg:hidden">
              <a v-for="reply in myReplies" :key="reply.id" :href="reply.link" class="block bg-[#E2E9EF] p-4 rounded-md hover:bg-gray-300 transition-colors">
                <div class="flex justify-between items-center mb-2"><span class="font-semibold truncate">{{ reply.postTitle }}</span><span class="text-sm text-gray-500 flex-shrink-0 ml-2">{{ reply.date }}</span></div>
                <p class="text-sm text-gray-700 truncate">{{ reply.content }}</p>
              </a>
            </div>
          </div>

          <!-- 我的收藏貼文 -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-4">我的收藏貼文</h2>
            <table class="w-full text-left hidden lg:table">
               <colgroup><col class="w-10/12"><col class="w-2/12"></colgroup>
              <thead><tr class="border-b-2"><th class="py-2">收藏文章標題</th><th class="py-2 text-right">收藏日期</th></tr></thead>
              <tbody>
                <tr v-for="post in myCollectedPosts" :key="post.id" class="border-b last:border-b-0 hover:bg-gray-50">
                  <td class="py-3 truncate">
                    <a :href="post.link" class="hover:text-[#F2994A] transition-colors">
                      <span class="text-gray-500">{{ post.category }}</span> {{ post.title }}
                    </a>
                  </td>
                  <td class="text-right">{{ post.date }}</td>
                </tr>
              </tbody>
            </table>
            <div class="space-y-4 lg:hidden">
              <a v-for="post in myCollectedPosts" :key="post.id" :href="post.link" class="block bg-[#E2E9EF] p-4 rounded-md hover:bg-gray-300 transition-colors">
                <p class="font-semibold truncate"><span class="text-gray-500">{{ post.category }}</span> {{ post.title }}</p>
                <p class="text-sm text-gray-600 mt-2 text-right">收藏日期：{{ post.date }}</p>
              </a>
            </div>
          </div>

          <!-- 檢舉專區 -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-4">檢舉專區 - 被檢舉紀錄</h2>
            <table class="w-full text-left hidden lg:table">
              <colgroup><col class="w-[15%]"><col class="w-[10%]"><col class="w-[60%]"><col class="w-[15%]"></colgroup>
              <thead><tr class="border-b-2"><th class="py-2">日期</th><th class="py-2">類型</th><th class="py-2">內容摘要</th><th class="py-2 text-right">結果</th></tr></thead>
              <tbody><tr v-for="record in reportedRecords" :key="record.id" class="border-b last:border-b-0"><td class="py-3">{{ record.date }}</td><td>{{ record.type }}</td><td class="truncate">{{ record.reason }}</td><td class="text-right">{{ record.result }}</td></tr></tbody>
            </table>
            <div class="space-y-4 lg:hidden">
              <div v-for="record in reportedRecords" :key="record.id" class="bg-[#E2E9EF] p-4 rounded-md">
                <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <span class="text-gray-500">日期</span><span>{{ record.date }}</span>
                  <span class="text-gray-500">類型</span><span>{{ record.type }}</span>
                  <span class="text-gray-500">內容摘要</span><span class="truncate">{{ record.reason }}</span>
                  <span class="text-gray-500">結果</span><span class="font-semibold">{{ record.result }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-4">檢舉專- 舉發紀錄</h2>
            <table class="w-full text-left hidden lg:table">
              <colgroup><col class="w-[15%]"><col class="w-[10%]"><col class="w-[60%]"><col class="w-[15%]"></colgroup>
              <thead><tr class="border-b-2"><th class="py-2">日期</th><th class="py-2">類型</th><th class="py-2">內容摘要</th><th class="py-2 text-right">結果</th></tr></thead>
              <tbody><tr v-for="report in myReports" :key="report.id" class="border-b last:border-b-0"><td class="py-3">{{ report.date }}</td><td>{{ report.type }}</td><td class="truncate">{{ report.reason }}</td><td class="text-right">{{ report.result }}</td></tr></tbody>
            </table>
            <div class="space-y-4 lg:hidden">
               <div v-for="report in myReports" :key="report.id" class="bg-[#E2E9EF] p-4 rounded-md">
                <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <span class="text-gray-500">日期</span><span>{{ report.date }}</span>
                  <span class="text-gray-500">類型</span><span>{{ report.type }}</span>
                  <span class="text-gray-500">內容摘要</span><span class="truncate">{{ report.reason }}</span>
                  <span class="text-gray-500">結果</span><span class="font-semibold">{{ report.result }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>

    <Thefooter />
  </div>
</template>

<style scoped>
/* 既有樣式 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.sticky {
  position: -webkit-sticky;
  position: sticky;
}
</style>