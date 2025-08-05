<script setup>
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import GeneralButton from '../components/GeneralButton.vue'
import { getPublicImg } from '@/utils/getPublicImg'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const router = useRouter();

function goToPayment() {
  router.push('/PaymentSuccess');
}

// --- 新增的響應式資料和函式 ---

const price = 500; // 設定單價
const quantity = ref(1); // 設定初始數量為 1

// 使用 computed 自動計算總金額
const totalAmount = computed(() => {
  const amount = price * quantity.value;
  return amount.toLocaleString('en-US'); // 將數字轉為帶有千分位的字串
});

// 增加數量的函式
function increment() {
  if (quantity.value < 99) { // 確保數量不超過 99
    quantity.value++;
  }
}

// 減少數量的函式
function decrement() {
  if (quantity.value > 1) { // 確保數量不小於 1
    quantity.value--;
  }
}

// 處理手動輸入，確保數值在 1-99 之間
function handleQuantityInput(event) {
  let value = parseInt(event.target.value, 10);
  if (isNaN(value) || value < 1) {
    quantity.value = 1;
  } else if (value > 99) {
    quantity.value = 99;
  } else {
    quantity.value = value;
  }
}

const png1 = getPublicImg('events/Khukuri.png')

</script>

<template>
  <Theheader />
  <main
    class="bg-[#F8F9FA] min-h-screen w-full flex items-center justify-center py-8 md:py-12 xl:py-16 px-4 md:px-6 xl:px-8">

    <div class="w-full max-w-7xl bg-[#F8F9FA] p-8 sm:p-12">
      <h3 class="h3 font-bold text-center mb-8">確認與繳費</h3>
      <form action="" class="space-y-4 text-xl">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 items-center">

          <!--三個輸入框的容器 -->
          <div class="space-y-4">
            <div>
              <label for="name">參加者姓名：</label><br>
              <input type="text" placeholder="請輸入姓名" class="w-full p-3 border border-gray-300 rounded-md resize-y">
            </div>

            <div>
              <labe for="email">電子郵件：</labe><br>
              <input type="email" placeholder="請輸入電子郵件" class="w-full p-3 border border-gray-300 rounded-md resize-y">
            </div>

            <div>
              <label for="phone">連絡電話：</label><br>
              <input type="tel" placeholder="0912-345-678"
                class="w-full p-3 border border-gray-300 rounded-md resize-y">
            </div>
          </div>

          <!-- 圖片容器 -->
          <div class="hidden md:flex items-center justify-center p-4">
            <img :src="png1" alt="尼泊爾彎刀"
              class="w-full h-auto object-cover rounded-md max-h-[250px] opacity-90 shadow-md">
          </div>
        </div>

        <hr class="!my-6">

        <div>
          <label for="message">想對我們說的話</label>
          <textarea placeholder="請留下對本次活動的期待，或想對我們說的話！" rows="5"
            class="w-full p-3 border border-gray-300 rounded-md resize-y"></textarea>
        </div>

        <!-- 付款金額區塊 (已修改) -->
        <div class="mt-1 p-4 border border-gray-300 bg-white rounded-md space-y-3">
          <!-- 上半部：標題和數量選擇器 -->
          <div class="flex justify-between items-center">
            <div>
              <span class="font-bold">付款項目</span>
              <span class="ml-2 text-gray-600">(單價 NT$ {{ price }})</span>
            </div>

            <div class="flex items-center gap-2">
              <button type="button" @click="decrement"
                class="w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-xl font-bold flex items-center justify-center hover:bg-gray-300 transition-colors">-</button>
              <input type="number" :value="quantity" @input="handleQuantityInput" min="1" max="99"
                class="w-16 text-center border border-gray-300 rounded-md p-1" aria-label="票券數量">
              <button type="button" @click="increment"
                class="w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-xl font-bold flex items-center justify-center hover:bg-gray-300 transition-colors">+</button>
            </div>
          </div>

          <hr>

          <!-- 下半部：總金額 -->
          <div class="text-right">
            <span class="font-bold">總金額：</span>
            <span class="text-red-600 font-bold text-2xl">NT$ {{ totalAmount }}</span>
          </div>
        </div>

        <div>
          <label for="card-number">信用卡號碼</label>
          <input type="text" placeholder="1234 1234 1234 1234"
            class="w-full p-3 border border-gray-300 rounded-md resize-y">
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

        <div class="flex flex-row items-center justify-center gap-5 pt-5">

          <router-link to="/EventDetail" class="text-xl font-bold">
            返回上一頁
          </router-link>

          <div>
            <GeneralButton variant="primary" @click="goToPayment" width="150px" height="50px" font-size="20px">
              儲存並繼續
            </GeneralButton>
          </div>
        </div>



      </form>
    </div>
  </main>
  <Thefooter />
</template>

<style>
/* 讓 number input 隱藏上下箭頭 (在 Chrome, Safari, Edge, Opera) */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* 讓 number input 隱藏上下箭頭 (在 Firefox) */
input[type=number] {
  -moz-appearance: textfield;
}
</style>