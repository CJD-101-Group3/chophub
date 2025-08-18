<script setup>
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import { ref, computed, onMounted } from 'vue';
import EventInfoCard from '@/components/EventInfoCard.vue';
import RegisterBanner from '@/components/RegisterBanner.vue';
import GeneralButton from '../components/GeneralButton.vue';
import { getPublicImg } from '@/utils/getPublicImg'
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const eventDetails = ref([]);
const loading = ref(true);
const error = ref(null);

const route = useRoute();
const router = useRouter();

const eventId = route.params.id;

const png01 = getPublicImg('events/katana-exhibition.png')

async function fetchEventDetails() {
   loading.value = true;
   error.valie = null;
   try{
      const apiUrl= 'http://localhost:8888/ChopHub-back-end/api/getEventById.php?id=${eventId}';
      console.log("正在請求詳情API:",apiUrl);

      const response = await axios.get(apiUrl);
      console.log("詳情API成功回應", response.data);

      eventDetails.value = response.data.data ||
      response.data;
   } catch (err) {
      console.error("詳情 API 請求失敗:", err);
      error.value = "無法載入活動詳情，請稍後再試。";
   } finally {
      loading.value = false;
   }
}

onMounted(() => {
   fetchEventDetails();
});

const quantity = ref(1);

const increaseQuantity = () => {
   quantity.value++;
};

const decreaseQuantity = () => {
   if (quantity.value > 1) {
      quantity.value--;
   }
};


// 建立一個 computed 屬性來計算總金額
const totalPrice = computed(() => {
      if (eventDetails.value && eventDetails.value.price) {
      return eventDetails.value.price * quantity.value;
   }
   return 0;   
});


const suggestedEvents = ref([
{
      id: 2,
      title: '【虛擬兵器匠】線上設計你的奇幻刀劍',
      type: '線上活動',
      location: '線上',
      date: '2025/8/10(日) 19:00PM',
      rating: 4,
      reviews: 76,
      isFeatured: true,
   },
   {
      id: 3,
      title: '鍛造群俠會 - 刀匠線上交流',
      type: '線上活動',
      location: '線上',
      date: '2025/7/23(三) 10:00AM',
      rating: 4,
      reviews: 82,
      isFeatured: false,
   },
   {
      id: 4,
      title: '匠人現場 - 劍柄木雕實作坊',
      type: '實體活動',
      location: '台中市',
      date: '2025/8/12(二) 13:30PM',
      rating: 4,
      reviews: 64,
      isFeatured: true,
   },
]);

function handleViewDetails(eventId) {
   console.log(`查看 ID 為 ${eventId} 的活動詳情。`);
   // 也可以讓推薦活動也跳轉
   router.push({ name: 'event-detail', params: { id: eventId } });
}

function goToPayment() {
   // 跳轉到付款頁時，可以把 id 和數量一起帶過去
   router.push({
      path: '/EventPayment',
      query: {
         eventId: eventId,
         quantity: quantity.value
      }
   });
}

</script>

<template>
   <div class=" bg-[#282828] text-gray-200 font-sans">
      <Theheader />
         <RegisterBanner :event="eventData" />

      <main class="mx-auto px-6 pb-12">

         <!-- Sections Wrapper -->
         <div class="max-w-4xl mx-auto mt-32 space-y-16">
            <!-- Introduction -->
            <section>
               <h3 class="font-bold text-white mb-6 pb-3 border-b border-gray-500"><span class="text-gray-500 mr-2">|</span>活動介紹</h3>
               <div class="space-y-4 text-gray-300 leading-relaxed">
                  <p>沉入火與鋼交織的夜色，展開一場只屬於藏家的沉浸式體驗。</p>
                  <p>【藏鋒夜宴】為冷兵器收藏愛好者量身打造，限額邀請。由專家親自導覽，帶領參加者近距離欣賞平日難得一見的限定展品與私藏珍品，從歷史淬煉到現代工藝，細細講述每一把兵器背後的故事與靈魂。</p>
                  <p>全程小規模、私密空間，只為讓真正的藏家與愛好者，在溫潤燈火與鋼鐵光澤間，深度對話、品味冷兵器魅力。</p>
                  <p>不只是展覽，更是一場專屬於硬派靈魂的夜宴。</p>
               </div>
            </section>

            <!-- Registration Info -->
            <section>
               <h3 class="font-bold text-white mb-6 pb-3 border-b border-gray-500"><span class="text-gray-500 mr-2">|</span>報名辦法</h3>
               <div class="space-y-6 text-gray-300">
                  <div>
                     <h3 class="font-bold text-white mb-2"><span class="text-[#F2994A] mr-2">|</span>報名費用</h3>
                     <p>新台幣 500 元整。</p>
                  </div>
                  <div>
                     <h3 class="font-bold text-white mb-2"><span class="text-[#F2994A] mr-2">|</span>資料填寫</h3>
                     <p>需填寫真實姓名、Email、手機號碼（報到用）。</p>
                  </div>
                  <div>
                     <h3 class="font-bold text-white mb-2"><span class="text-[#F2994A] mr-2">|</span>年齡限制</h3>
                     <p>限年滿 18 歲以上之民眾參加，現場需出示證件。</p>
                  </div>
                  <div>
                     <h3 class="font-bold text-white mb-2"><span class="text-[#F2994A] mr-2">|</span>報名資格</h3>
                     <p>活動為小規模藏家限定導覽，限對兵器收藏有興趣或收藏經驗者報名（報名表有簡短提問，可說明收藏興趣或經驗）。</p>
                  </div>
                  <div>
                     <h3 class="font-bold text-white mb-2"><span class="text-[#F2994A] mr-2">|</span>名額</h3>
                     <p>僅限開放 12 名，依完成付款順序錄取，額滿即關閉報名。</p>
                  </div>
                  <div>
                     <h3 class="font-bold text-white mb-2"><span class="text-[#F2994A] mr-2">|</span>繳費方式</h3>
                     <p>收到報名成功通知信後，依信中指示於 3 日內完成匯款，逾期視同放棄名額。</p>
                  </div>
                  <div>
                     <h3 class="font-bold text-white mb-2"><span class="text-[#F2994A] mr-2">|</span>報名確認</h3>
                     <p>主辦單位將於收到款項後發送最終確認信，內含活動 QR code報到憑證。</p>
                  </div>
                  <div>
                     <h3 class="font-bold text-white mb-2"><span class="text-[#F2994A] mr-2">|</span>現場報到</h3>
                     <p>活動當日需憑 QR code報到憑證 + 證件入場，建議提早 10 分鐘報到。</p>
                  </div>
                  <div>
                     <h3 class="font-bold text-white mb-2"><span class="text-[#F2994A] mr-2">|</span>退費規則</h3>
                     <p>．活動報名截止前可全額退費</p>
                     <p>．若因主辦單位取消，將全額退費</p>
                  </div>
                  <div>
                     <h3 class="font-bold text-white mb-2"><span class="text-[#F2994A] mr-2">|</span>特殊需求</h3>
                     <p>若有無障礙需求或其他協助，請於報名時備註，以利安排。</p>
                  </div>
                  <div>
                     <h3 class="font-bold text-white mb-2"><span class="text-[#F2994A] mr-2">|</span>個資使用</h3>
                     <p>報名資料僅作活動聯絡與保險用途，依個資法保護，不會對外公開。</p>
                  </div>

               </div>
            </section>

            <!-- Schedule -->
            <section>
               <h3 class="font-bold text-white mb-6 pb-3 border-b border-gray-500">活動時程規劃</h3>
               <div class="space-y-2 text-gray-300">
                  <div class="text-white"><span class="font-mono text-white">18:50-19:00 |</span> 報到與集合</div>
                  <p><span class="font-mono text-white">19:00-19:10 |</span> 活動開場 & 導覽流程說明</p>
                  <p><span class="font-mono text-white">19:10-19:45 |</span> 專家深度導覽：限定展品與私藏珍品</p>
                  <p><span class="font-mono text-white">19:45-20:00 |</span> Q&A 與自由欣賞時間</p>
               </div>
            </section>

            <!-- Contact -->
            <section>
               <h3 class="font-bold text-white mb-6 pb-3 border-b border-gray-500">聯絡我們</h3>
               <div class="text-gray-300 space-y-2">
                  <p>如有任何關於活動內容、報名流程或特殊需求的疑問，歡迎與主辦單位聯繫，我們將誠摯為您解答：</p><br>
                  <p>主辦單位 | 鋼火典藏會 SteelFire Collectors Circle</p>
                  <p>Email: events@steelfire-collectors.com</p>
                  <p>電話: 02-9876-5432 #536</p>
                  <p>聯絡人: 林先生</p>
               </div>
            </section>

            <!-- Ticket Selection -->
            <section class="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
               <!-- 票價與張數區塊 -->
               <div class="flex flex-nowrap justify-around items-center space-x-4">

                  <!-- 票價 -->
                  <div class="flex-1 md:text-center">
                     <div class="flex flex-col items-center">
                        <h4 class="font-bold">票價</h4>
                        <h5 class="text-xl font-bold mt-2">NT$ 500</h5>
                     </div>
                  </div>

                  <!-- 張數選擇器-->
                  <div class="flex-1 md:text-center">
                     <div class="flex flex-col items-center">
                        <h4 class="font-bold">張數</h4>
                        <div class="flex items-center justify-center mt-2 space-x-4">
                           <button @click="decreaseQuantity" :disabled="quantity <= 1"
                              class="bg-gray-200 w-8 h-8 rounded-full font-bold text-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                              -
                           </button>

                           <span class="text-xl font-bold">{{ quantity }}</span>

                           <button @click="increaseQuantity"
                              class="bg-gray-200 w-8 h-8 rounded-full font-bold text-lg hover:bg-gray-300">
                              +
                           </button>
                        </div>
                     </div>
                  </div>
                  <!-- 【新增】總金額區塊 -->
                  <div class="flex-1 md:text-center">
                     <div class="flex flex-col items-center">
                        <h4 class="font-bold">總金額</h4>
                        <!-- 使用 toLocaleString() 可以自動加上千分位，例如 1,500 -->
                        <h5 class="text-xl font-bold mt-2 text-[#F2994A]">NT$ {{ totalPrice.toLocaleString() }}</h5>
                     </div>  
                  </div>              
               </div>

               <!-- 按鈕區塊 -->
            </section>
            <div class="flex justify-center items-center">
               <GeneralButton variant="primary" @click="goToPayment" width="150px" height="50px" font-size="20px">
                  立刻報名
               </GeneralButton>
            </div>
         </div>

         <!-- Suggested Events -->
         <section class="mt-20">
            <h3 class="font-bold text-white text-center mb-10">你可能會有興趣的活動</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


               <EventInfoCard v-for="event in suggestedEvents" :key="event.id" :event="event"
                  @view-details="handleViewDetails" />

            </div>
         </section>
      </main>

      <Thefooter />
   </div>
</template>

<style scoped>
p {
   @apply text-white text-2xl md:text-base leading-relaxed mb-4 font-normal;
}
</style>