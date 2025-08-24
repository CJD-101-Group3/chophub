<script setup>
import Theheader from '@/components/Theheader.vue'
import Thefooter from '@/components/Thefooter.vue'
import { getPublicImg } from '@/utils/getPublicImg'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Linepay_icon from '@/assets/icon/LINE-Pay.png'

// ---- 價格與表單 ----
const quantity = ref(1)

const nameRef = ref('')
const emailRef = ref('')
const phoneRef = ref('')
const messageRef = ref('')

const route = useRoute()

// 小工具：把 query/param 轉數字（支援陣列/不存在）
const toNum = (v, fallback = 0) => {
    const one = Array.isArray(v) ? v[0] : v
    const n = Number(one)
    return Number.isFinite(n) ? n : fallback
}

// 先看 params.id，沒有就看 query.eventId
const eventId = computed(() => toNum(route.params.id ?? route.query.eventId, 0))

// 若網址有 ?quantity=...，同步到本地的 quantity（只在初始化時執行一次）
onMounted(() => {
    const q = toNum(route.query.quantity, quantity.value || 1)
    quantity.value = Math.min(99, Math.max(1, q))
})

// 抓活動資料
const eventData = ref(null)
const loading = ref(false)
const error = ref(null)

// 動態獲取活動圖片和價格
const eventImage = computed(() => eventData.value?.imageUrl || getPublicImg('events/Khukuri.png'))
const price = computed(() => eventData.value?.price || 500)

//返回上一頁
const backToEventPath = computed(() => {
    return eventId.value ? `/event/${eventId.value}` : '/EventHomePage'
})

// 顯示用總金額
const totalAmount = computed(() => (price.value * quantity.value).toLocaleString('en-US'))

onMounted(async () => {
    if (!eventId.value) {
        error.value = '找不到活動 ID'
        return
    }

    loading.value = true
    error.value = null

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE}api/getEventById.php?id=${eventId.value}`)
        const text = await response.text()

        let data
        try {
            data = JSON.parse(text)
        } catch {
            console.error('API 回傳內容:', text)
            error.value = '伺服器回傳格式錯誤'
            return
        }

        // 根據你的 PHP API，success 狀態是 "success"
        if (data?.status === 'success' && data.data) {
            eventData.value = data.data
        } else {
            error.value = data?.message || '載入活動失敗'
            console.error('API 錯誤:', data)
        }
    } catch (e) {
        console.error('載入活動失敗:', e)
        error.value = '網路連線錯誤'
    } finally {
        loading.value = false
    }
})

// 可選：數量調整
function increment() {
    console.log('Before increment:', quantity.value)
    if (quantity.value < 99) {
        quantity.value++
    }
    console.log('After increment:', quantity.value)
}
function decrement() {
    console.log('Before decrement:', quantity.value)
    if (quantity.value > 1) {
        quantity.value--
    }
    console.log('After decrement:', quantity.value)
}
function handleQuantityInput(e) {
    let v = parseInt(e.target.value, 10)
    if (isNaN(v) || v < 1) {
        v = 1
    } else if (v > 99) {
        v = 99
    }
    quantity.value = v
}

// ---- 送出付款 ----
async function handlePay() {
    if (!nameRef.value || !emailRef.value || !phoneRef.value) {
        alert('請填寫姓名、Email、電話')
        return
    }
    if (!eventId.value) {
        alert('找不到活動 ID')
        return
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE}linepay/checkout_payment.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event_id: eventId.value,
                name: nameRef.value,
                email: emailRef.value,
                phone: phoneRef.value,
                message: messageRef.value || '',
                quantity: quantity.value,
            }),
        })

        const text = await response.text()
        console.log('伺服器回傳原始內容:', text)

        let data
        try {
            data = JSON.parse(text)
        } catch {
            alert('後端回傳不是 JSON，請看 console')
            return
        }

        if (!response.ok || !data.ok) {
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
</script>

<template>
    <Theheader />
    <main
        class="bg-[#F8F9FA] min-h-screen w-full flex items-center justify-center py-8 md:py-12 xl:py-16 px-4 md:px-6 xl:px-8">
        <div class="w-full max-w-7xl bg-[#F8F9FA] p-8 sm:p-12">
            <h3 class="h3 font-bold text-center mb-8">確認與繳費</h3>
            <form @submit.prevent="handlePay" class="space-y-4 text-xl">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 items-center">
                    <div class="space-y-4">
                        <div>
                            <label>參加者姓名：</label>
                            <br />
                            <input
                                v-model="nameRef"
                                type="text"
                                placeholder="請輸入姓名"
                                class="w-full p-3 border border-gray-300 rounded-md resize-y" />
                        </div>
                        <div>
                            <label>電子郵件：</label>
                            <br />
                            <input
                                v-model="emailRef"
                                type="email"
                                placeholder="請輸入電子郵件"
                                class="w-full p-3 border border-gray-300 rounded-md resize-y" />
                        </div>
                        <div>
                            <label>連絡電話：</label>
                            <br />
                            <input
                                v-model="phoneRef"
                                type="tel"
                                placeholder="0912-345-678"
                                class="w-full p-3 border border-gray-300 rounded-md resize-y" />
                        </div>
                    </div>

                    <div class="hidden md:flex items-center justify-center p-4">
                        <img
                            :src="eventImage"
                            alt="尼泊爾彎刀"
                            class="w-full h-auto object-cover rounded-md max-h-[250px] opacity-90 shadow-md" />
                    </div>
                </div>

                <hr class="!my-6" />

                <div>
                    <label>想對我們說的話</label>
                    <textarea
                        v-model="messageRef"
                        placeholder="請留下對本次活動的期待，或想對我們說的話！"
                        rows="5"
                        class="w-full p-3 border border-gray-300 rounded-md resize-y"></textarea>
                </div>

                <div class="mt-1 p-4 border border-gray-300 bg-white rounded-md space-y-3">
                    <div class="flex justify-between items-center">
                        <div>
                            <span class="font-bold">付款項目</span>
                            <span class="ml-2 text-gray-600">(單價 NT$ {{ price }})</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <button
                                type="button"
                                @click="decrement"
                                :disabled="quantity <= 1"
                                class="w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-xl font-bold flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                -
                            </button>
                            <input
                                type="number"
                                v-model.number="quantity"
                                min="1"
                                max="99"
                                class="w-16 text-center border border-gray-300 rounded-md p-1"
                                aria-label="票券數量" />
                            <button
                                type="button"
                                @click="increment"
                                :disabled="quantity >= 99"
                                class="w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-xl font-bold flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                +
                            </button>
                        </div>
                    </div>

                    <hr />

                    <div class="text-right">
                        <span class="font-bold">總金額：</span>
                        <span class="text-red-600 font-bold text-2xl">NT$ {{ totalAmount }}</span>
                    </div>
                </div>

                <div class="flex flex-row items-center justify-center gap-16 pt-5">
                    <router-link :to="backToEventPath" class="text-xl font-bold">返回上一頁</router-link>
                    <div>
                        <button
                            @click.prevent="handlePay"
                            class="text-xl font-bold flex flex-row items-center gap-2 w-[160px] h-[40px] px-3 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300">
                            <img :src="Linepay_icon" alt="icon" class="h-[24px] object-contain" />
                            付款
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </main>
    <Thefooter />
</template>
