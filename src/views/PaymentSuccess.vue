<script setup>
import Theheader from '@/components/Theheader.vue'
import Thefooter from '@/components/Thefooter.vue'
import GeneralButton from '@/components/GeneralButton.vue'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 小工具：安全組 URL（避免重複斜線）
const joinUrl = (base, path) => {
  const b = String(base || '').replace(/\/+$/, '')
  const p = String(path || '').replace(/^\/+/, '')
  return `${b}/${p}`
}

// UI 狀態
const loading = ref(true)
const state = ref('pending') // 'pending' | 'success' | 'already' | 'missing' | 'error'
const serverMessage = ref('')
const registrationId = ref(null)

// 行為
function goToMyEvents() {
  router.push('/MyEvents')
}
function goHome() {
  router.push('/')
}

onMounted(async () => {
  // 從網址取參數
const getQueryString = (key) => {
  const v = route.query[key]
  return Array.isArray(v) ? (v[0] ?? null) : (typeof v === 'string' ? v : null)
}
const rid = getQueryString('registration_id')
const txId = getQueryString('transactionId')
  registrationId.value = rid

  // 若缺參數，顯示通用成功訊息（不做 confirm）
  if (!rid || !txId) {
    state.value = 'missing'
    loading.value = false
    return
  }

  try {
    const api = joinUrl(import.meta.env.VITE_API_BASE, `/linepay/confirm_payment.php`)
    const url = `${api}?registration_id=${encodeURIComponent(rid)}&transactionId=${encodeURIComponent(txId)}`
    const res = await fetch(url)
    const data = await res.json().catch(() => null)

    if (!res.ok || !data) {
      state.value = 'error'
      serverMessage.value = '伺服器回應錯誤，請稍後再試'
      return
    }

    // 後端可能回：{ ok:true, paid:true } 或 { ok:true, paid:true, message:'此報名已付款' }
    if (data.ok) {
      if (data.paid) {
        // 已付款（第一次或重複確認）
        state.value = (data.message && /已付款/.test(String(data.message))) ? 'already' : 'success'
        serverMessage.value = data.message || ''
      } else {
        // 少見，但後端 ok 且未標 paid
        state.value = 'success'
      }
    } else {
      state.value = 'error'
      serverMessage.value = data.message || data.response?.returnMessage || '付款確認失敗'
    }
  } catch (e) {
    console.error(e)
    state.value = 'error'
    serverMessage.value = '網路或系統異常'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Theheader />

    <main class="bg-[#282828] flex-1 flex flex-col items-center justify-center px-4 space-y-5 md:space-y-6 text-white text-center">
      <!-- 確認中 -->
      <template v-if="loading">
        <div class="h3 font-bold">正在確認付款…</div>
        <div class="opacity-80">請稍候 1–2 秒完成核銷</div>
      </template>

      <!-- 確認成功（首次成功） -->
      <template v-else-if="state === 'success'">
        <div class="h3 font-bold">報名成功！</div>
        <div class="h4 font-bold">感謝您的參與，我們已收到您的報名與繳費資訊。</div>
        <div v-if="registrationId" class="opacity-80">報名編號：{{ registrationId }}</div>

        <GeneralButton
          variant="primary"
          @click="goToMyEvents"
          width="150px"
          height="50px"
          font-size="16px"
        >
          查看我的活動
        </GeneralButton>
      </template>

      <!-- 已付款（冪等再次回到成功頁） -->
      <template v-else-if="state === 'already'">
        <div class="h3 font-bold">您已完成付款</div>
        <div class="opacity-90">系統已記錄本筆報名。{{ serverMessage }}</div>
        <div v-if="registrationId" class="opacity-80">報名編號：{{ registrationId }}</div>

        <GeneralButton
          variant="primary"
          @click="goToMyEvents"
          width="150px"
          height="50px"
          font-size="16px"
        >
          查看我的活動
        </GeneralButton>
      </template>

      <!-- 缺參數：不做確認，顯示通用成功畫面 -->
      <template v-else-if="state === 'missing'">
        <div class="h3 font-bold">報名成功！</div>
        <div class="h4 font-bold">感謝您的參與，我們已收到您的報名與繳費資訊！</div>
        <div class="opacity-80">（提醒：網址缺少必要參數，未進行後端確認）</div>

        <GeneralButton
          variant="primary"
          @click="goToMyEvents"
          width="150px"
          height="50px"
          font-size="16px"
        >
          查看我的活動
        </GeneralButton>
      </template>

      <!-- 失敗 -->
      <template v-else-if="state === 'error'">
        <div class="h3 font-bold text-red-300">付款確認失敗</div>
        <div class="opacity-90">原因：{{ serverMessage || '未知錯誤' }}</div>

        <div class="flex gap-3 justify-center mt-2">
          <GeneralButton
            variant="primary"
            @click="goToMyEvents"
            width="150px"
            height="50px"
            font-size="16px"
          >
            查看我的活動
          </GeneralButton>
          <GeneralButton
            variant="secondary"
            @click="goHome"
            width="150px"
            height="50px"
            font-size="16px"
          >
            回首頁
          </GeneralButton>
        </div>
      </template>
    </main>

    <Thefooter />
  </div>
</template>