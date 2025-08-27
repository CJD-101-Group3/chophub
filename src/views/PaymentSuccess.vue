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

  // 在 console 中記錄接收到的參數，方便除錯
  console.log('PaymentSuccess 接收參數:', { 
    registration_id: rid, 
    transactionId: txId,
    全部參數: route.query 
  })

  // 若缺參數，顯示通用成功訊息（不做 confirm）
  if (!rid || !txId) {
    console.warn('缺少必要參數，跳過後端確認')
    state.value = 'missing'
    loading.value = false
    return
  }

  try {
    // 呼叫後端確認付款 - 使用 POST 方法更穩定
    const api = joinUrl(import.meta.env.VITE_API_BASE, '/linepay/confirm_payment.php')
    
    console.log('呼叫確認 API:', api)
    
    const res = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registration_id: parseInt(rid),
        transactionId: txId
      })
    })

    const text = await res.text()
    console.log('後端原始回應:', text)

    let data
    try {
      data = JSON.parse(text)
    } catch (parseError) {
      console.error('JSON 解析失敗:', parseError)
      throw new Error('伺服器回應格式錯誤')
    }

    console.log('解析後的回應:', data)

    if (!res.ok || !data) {
      state.value = 'error'
      serverMessage.value = data?.message || '伺服器回應錯誤，請稍後再試'
      return
    }

    // 後端回應處理
    if (data.ok) {
      if (data.paid) {
        // 判斷是首次成功還是重複確認
        const isAlreadyPaid = data.message && /已付款/.test(String(data.message))
        state.value = isAlreadyPaid ? 'already' : 'success'
        serverMessage.value = data.message || ''
        
        // 更新 registration_id（以防後端回傳的更準確）
        if (data.registration_id) {
          registrationId.value = data.registration_id
        }
      } else {
        // 少見，但後端 ok 且未標 paid
        state.value = 'success'
      }
    } else {
      state.value = 'error'
      serverMessage.value = data.message || data.response?.returnMessage || '付款確認失敗'
    }
    
  } catch (e) {
    console.error('確認付款時發生錯誤:', e)
    state.value = 'error'
    serverMessage.value = e.message || '網路或系統異常'
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
        <div class="animate-pulse">
          <div class="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 animate-bounce"></div>
        </div>
        <div class="h3 font-bold">正在確認付款狀態…</div>
        <div class="opacity-80">請稍候，系統正在處理您的付款資訊</div>
      </template>

      <!-- 確認成功（首次成功） -->
      <template v-else-if="state === 'success'">
        <div class="text-6xl mb-4">🎉</div>
        <div class="h3 font-bold text-green-400">付款成功！報名完成！</div>
        <div class="h4 font-bold">感謝您的參與，我們已收到您的報名與繳費資訊。</div>
        <div v-if="registrationId" class="opacity-80 bg-gray-700 px-4 py-2 rounded">
          報名編號：<span class="font-mono text-yellow-300">{{ registrationId }}</span>
        </div>
        <div class="text-sm opacity-70">
          您將收到確認email，活動相關資訊將另行通知
        </div>

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
        <div class="text-6xl mb-4">✅</div>
        <div class="h3 font-bold text-blue-400">您已完成付款</div>
        <div class="opacity-90">系統已記錄本筆報名。{{ serverMessage }}</div>
        <div v-if="registrationId" class="opacity-80 bg-gray-700 px-4 py-2 rounded">
          報名編號：<span class="font-mono text-yellow-300">{{ registrationId }}</span>
        </div>

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
        <div class="text-6xl mb-4">⚠️</div>
        <div class="h3 font-bold text-yellow-400">付款處理中</div>
        <div class="h4 font-bold">感謝您的參與！</div>
        <div class="opacity-80 text-sm bg-yellow-900 px-4 py-2 rounded">
          系統參數不完整，請確認您的報名狀態
        </div>

        <div class="flex gap-3 justify-center mt-4">
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
            width="120px"
            height="50px"
            font-size="16px"
          >
            回首頁
          </GeneralButton>
        </div>
      </template>

      <!-- 失敗 -->
      <template v-else-if="state === 'error'">
        <div class="text-6xl mb-4">❌</div>
        <div class="h3 font-bold text-red-400">付款確認失敗</div>
        <div class="opacity-90 max-w-md">{{ serverMessage || '未知錯誤，請聯絡客服或稍後再試' }}</div>
        <div v-if="registrationId" class="text-sm opacity-70">
          報名編號：{{ registrationId }}
        </div>

        <div class="flex gap-3 justify-center mt-4">
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
            width="120px"
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

<style scoped>
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -15px, 0);
  }
  70% {
    transform: translate3d(0, -7px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}
</style>