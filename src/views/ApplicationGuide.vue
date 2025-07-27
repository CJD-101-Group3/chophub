<script setup>
import { useRouter } from 'vue-router';
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';

// 引入 Vue Router 的 useRouter，用於實現「回上一頁」功能
const router = useRouter();

// 定義一個返回上一頁的函數
const goBack = () => {
  router.back();
};

</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <!-- 頁首 -->
    <Theheader />

    <!-- 
      主要內容區
      - flex-1: 填滿剩餘空間
      - flex, items-center, justify-center: 讓內容卡片在垂直和水平方向置中
      - p-4: 在手機上提供內邊距
    -->
    <main class="flex-1 flex items-center justify-center p-4">
      
      <!-- 內容資訊卡片 -->
      <div class="w-full max-w-2xl mx-auto  bg-[#E2E9EF] p-6 lg:p-10 rounded-xl shadow-sm">
        
        <!-- 標題：新增 justify-center 來讓內容水平置中 -->
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-800 flex items-center justify-center gap-3 mb-6 lg:mb-8">
          刀匠申請須知
          <!-- 小鎚子 圖標 -->
          <img src="@/assets/users/hammericon.png" alt="鎚子圖標" class="w-10 h-10">
        </h1>
        
        <!-- 說明文字 -->
        <div class="space-y-5 text-gray-700 leading-relaxed text-lg">
          <p>親愛的使用者您好：</p>
          
          <p>若您為冷兵器創作者、鍛造職人，並希望於本平台申請刀匠認證，</p>

          <p>
            請透過 <strong class="font-semibold text-gray-800">電子郵件</strong> 寄信至官方信箱，信件內容需包含以下資訊：
          </p>

          <!-- 申請項目列表 -->
          <ul class="list-disc list-inside space-y-2 pl-2 text-gray-800">
            <li>真實姓名 (chophub網站暱稱)</li>
            <li>聯絡方式 (Email / 手機號碼)</li>
            <li>個人簡介與創作背景</li>
            <li>作品介紹</li>
            <li>各部件介紹</li>
            <li>至少三張能代表您鍛造/創作風格的作品照片</li>
            <li>詳細內容依照表單各項目提供壓縮檔案即可</li>
          </ul>

          <!-- 官方信箱 -->
          <p class="font-semibold text-gray-800 !mt-6">
            官方信箱：chophub@gmail.com
          </p>

          <p>
            若5個工作天內未收到您的來信，申請將會自動取消。
            我們收到您的來信後，將於 5 個工作天內與您聯繫進行進一步審核。
          </p>

          <p>
            感謝您的熱情與支持，讓我們一同打造專業而具溫度的冷兵器社群！
          </p>

          <!-- 範例表格下載 -->
          <p class="!mt-8">
            範例表格可下載：
            <!-- 
              TODO: 請將 href 替換為您實際的表單下載路徑 
              download 屬性會提示瀏覽器下載該文件
            -->
            <a href="/files/ChopHub-Application-Form.pdf" download class="text-red-600 hover:text-red-700 font-semibold underline">
              刀匠申請表單
            </a>
          </p>
        </div>

        <!-- 回上一頁 按鈕 -->
        <div class="text-center mt-10">
          <button 
            @click="goBack"
            class="w-full sm:w-auto bg-[#F2994A] hover:bg-[#E88C3A] text-white font-bold py-3 px-12 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E87A3A]"
          >
            回上一頁
          </button>
        </div>

      </div>
    </main>

    <!-- 頁尾 -->
    <Thefooter />
  </div>
</template>

<style scoped>
/* 可以在這裡添加一些僅限此頁面的額外樣式，目前暫時不需要 */
</style>