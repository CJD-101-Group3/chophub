<script setup>
import Theheader from '@/components/Theheader.vue'
import { getPublicImg } from '@/utils/getPublicImg'
import { ref, computed } from 'vue'

const price = 500
const quantity = ref(1)

const nameRef = ref('')
const emailRef = ref('')
const phoneRef = ref('')
const messageRef = ref('')


// 你可以把 eventId 寫死或從路由/頁面帶入
const eventId = 1 // ← TODO: 改成實際活動ID

const totalAmount = computed(() => (price * quantity.value).toLocaleString('en-US'))

function increment(){ if(quantity.value<99) quantity.value++ }
function decrement(){ if(quantity.value>1) quantity.value-- }
function handleQuantityInput(e){
  let v = parseInt(e.target.value,10)
  if(isNaN(v)||v<1) v=1
  if(v>99) v=99
  quantity.value = v
}

async function handlePay(){
  // 簡單必填驗證
  if(!nameRef.value || !emailRef.value || !phoneRef.value){
    alert('請填寫姓名、Email、電話'); return
  }

  try {
  const r = await fetch(`${import.meta.env.VITE_API_BASE}api/getAllEvents.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_id: eventId,
      name: nameRef.value,
      email: emailRef.value,
      phone: phoneRef.value,
      message: messageRef.value || '',
      quantity: quantity.value
    })
  })

  // 🔍 Debug: 先拿原始文字，避免 JSON.parse 失敗
  const text = await r.text()
  console.log("伺服器回傳原始內容:", text)

  let data
  try {
    data = JSON.parse(text)
  } catch (e) {
    alert("後端回傳不是 JSON，請看 console")
    return
  }

  // 以下再進行判斷
  if (!r.ok || !data.ok) {
    console.error(data)
    alert('建立付款失敗：' + (data?.response?.returnMessage || data?.message || '未知錯誤'))
    return
  }

  const url = data?.response?.info?.paymentUrl?.web
  if (url) {
    window.location.href = url
  } else {
    alert('未取得付款網址')
  }
} catch (err) {
  console.error(err)
  alert('網路或伺服器錯誤')
}
}

const png1 = getPublicImg('events/Khukuri.png')
</script>

<template>
  <Theheader />
  <main class="bg-[#F8F9FA] min-h-screen w-full flex items-center justify-center py-8 md:py-12 xl:py-16 px-4 md:px-6 xl:px-8">
    <div class="w-full max-w-7xl bg-[#F8F9FA] p-8 sm:p-12">
      <h3 class="h3 font-bold text-center mb-8">確認與繳費</h3>
      <form @submit.prevent="handlePay" class="space-y-4 text-xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 items-center">
          <div class="space-y-4">
            <div>
              <label>參加者姓名：</label><br>
              <input v-model="nameRef" type="text" placeholder="請輸入姓名" class="w-full p-3 border border-gray-300 rounded-md resize-y">
            </div>
            <div>
              <label>電子郵件：</label><br>
              <input v-model="emailRef" type="email" placeholder="請輸入電子郵件" class="w-full p-3 border border-gray-300 rounded-md resize-y">
            </div>
            <div>
              <label>連絡電話：</label><br>
              <input v-model="phoneRef" type="tel" placeholder="0912-345-678" class="w-full p-3 border border-gray-300 rounded-md resize-y">
            </div>
          </div>

          <div class="hidden md:flex items-center justify-center p-4">
            <img :src="png1" alt="尼泊爾彎刀" class="w-full h-auto object-cover rounded-md max-h-[250px] opacity-90 shadow-md">
          </div>
        </div>

        <hr class="!my-6">

        <div>
          <label>想對我們說的話</label>
          <textarea v-model="messageRef" placeholder="請留下對本次活動的期待，或想對我們說的話！" rows="5" class="w-full p-3 border border-gray-300 rounded-md resize-y"></textarea>
        </div>

        <div class="mt-1 p-4 border border-gray-300 bg-white rounded-md space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="font-bold">付款項目</span>
              <span class="ml-2 text-gray-600">(單價 NT$ {{ price }})</span>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" @click="decrement" class="w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-xl font-bold flex items-center justify-center hover:bg-gray-300">-</button>
              <input type="number" :value="quantity" @input="handleQuantityInput" min="1" max="99" class="w-16 text-center border border-gray-300 rounded-md p-1" aria-label="票券數量">
              <button type="button" @click="increment" class="w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-xl font-bold flex items-center justify-center hover:bg-gray-300">+</button>
            </div>
          </div>

          <hr>

          <div class="text-right">
            <span class="font-bold">總金額：</span>
            <span class="text-red-600 font-bold text-2xl">NT$ {{ totalAmount }}</span>
          </div>
        </div>

        <div class="flex flex-row items-center justify-center gap-5 pt-5">
          <router-link to="/EventDetail" class="text-xl font-bold">返回上一頁</router-link>
          <div>
            <button variant="primary" @click.prevent="handlePay" width="150px" height="50px" font-size="20px">
              LINE PAY付款
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
  <Thefooter />
</template>
