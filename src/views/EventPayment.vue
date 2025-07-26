<template>
  <!-- HTML 模板 -->
  <Theheader />
  <main class="bg-[#F8F9FA] min-h-screen w-full flex items-center justify-center py-8 md:py-12 xl:py-16 px-4 md:px-6 xl:px-8">

    <div class="w-full max-w-7xl bg-[#F8F9FA] p-8 sm:p-12">
      <h3 class="h3 font-bold text-center">確認與繳費</h3>
      <form action="" class="space-y-4">

        <div>
          <label for="name">參加者姓名：</label><br>
          <input type="text" placeholder="請輸入姓名" class="w-full md:w-1/2 p-3 border border-gray-300 rounded-md resize-y">
        </div>

        <div>
          <labe for="email">電子郵件：</labe><br>
          <input type="email" placeholder="請輸入電子郵件" class="w-full md:w-1/2 p-3 border border-gray-300 rounded-md resize-y">
        </div>

        <div>
        <label for="phone">連絡電話：</label><br>
        <input type="tel" placeholder="0912-345-678" class="w-full md:w-1/2 p-3 border border-gray-300 rounded-md resize-y">
        </div>

        <hr>

        <div>
          <label for="message">想對我們說的話</label>
          <hr>
          <textarea placeholder="請留下對本次活動的期待，或想對我們說的話！" rows="4"
                      class="w-full p-3 border border-gray-300 rounded-md resize-y">
          </textarea>
        </div>

        <div class="mt-1 p-3 border border-gray-300 rounded-md">
          <span>付款金額</span>
          <span class="ml-2 text-red-600">NT$ 500</span>
        </div>

        <div>
          <label for="card-number">信用卡號碼</label>
          <input type="text" placeholder="1234 1234 1234 1234" class="w-full p-3 border border-gray-300 rounded-md resize-y">
        </div>
        
        <div class="w-full">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label for="expire-day">到期日</label>
              <input type="text" placeholder="MM/YY" class="w-full p-3 border border-gray-300 rounded-md resize-y">
            </div>

            <div>
              <label for="cvc">授權碼</label>
              <input type="text" placeholder="CVC" class="w-full p-3 border border-gray-300 rounded-md resize-y">
            </div>
          </div>
        </div>

        <div>
          <label for="card-holder">持卡人姓名(英文拼音)</label>
          <input type="text" placeholder="請與護照相同" class="w-full p-3 border border-gray-300 rounded-md resize-y">
        </div>
        <div class="flex justify-center">
          <!-- 
            直接把 "儲存並繼續" 這段文字放在 <basebutton> 的中間
            Vue 會自動把這段文字放到元件 <slot> 的位置 
          -->
          <basebutton type="submit" class="mt-2">
            儲存並繼續
          </basebutton>
        </div>



      </form>
    </div>
  </main>
  <Thefooter />
</template>

<script setup>
// JavaScript 邏輯
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';
import basebutton from '../components/Basebutton.vue';

// export default {
//   name: 'EventPayment',
  
//   // 步驟 3.3: 註冊元件
//   components: {
//     TheHeader,
//     // AppFooter
//     }}
</script>

<style>
/* CSS 樣式 */
</style>