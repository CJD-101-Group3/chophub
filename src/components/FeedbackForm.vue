<script setup>
import { ref } from 'vue';
import basebutton from '../components/Basebutton.vue';

// 表單數據綁定
const satisfaction = ref(0); // 星星評分，0表示未評分
const expectations = ref('');
const flow = ref('');
const speakerPerformance = ref('');
const favoritePart = ref('');
const improvementSuggestions = ref('');
const willAttendAgain = ref('');
const futureEvents = ref('');

// 提交表單的處理函式
const handleSubmit = () => {
  if (satisfaction.value === 0 || !expectations.value || !flow.value || !speakerPerformance.value || !willAttendAgain.value) {
    alert('請完成所有必填選項！');
    return;
  }
  
  const formData = {
    satisfaction: satisfaction.value,
    expectations: expectations.value,
    flow: flow.value,
    speakerPerformance: speakerPerformance.value,
    favoritePart: favoritePart.value,
    improvementSuggestions: improvementSuggestions.value,
    willAttendAgain: willAttendAgain.value,
    futureEvents: futureEvents.value
  };
  
  console.log('Form Submitted!', formData);
  
  alert('感謝您的回饋！');
  
  // 使用 fetch() 或 axios可將 formData 發送到您的後端伺服器
};
</script>

<template>
  <div class="bg-[#282828] text-white p-8 md:mx-[50px] lg:mx-[250px]" >
    <h2 class="h3 font-bold text-center mt-8 mb-8 md:h2">活動回饋評論填寫</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-8">
      
      <!-- 1. 整體滿意度 -->
      <div class="space-y-7 mb-10">
        <label class="text-lg font-medium text-white mb-">整體滿意度</label>
        <div class="flex items-center space-x-2">
          <svg 
            v-for="star in 5" 
            :key="star" 
            @click="satisfaction = star"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            stroke-width="1.5"
            stroke="currentColor"
            :fill="star <= satisfaction ? 'currentColor' : 'none'"
            class="w-8 h-8 cursor-pointer transition-colors"
            :class="star <= satisfaction ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-300'"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>
        </div>
      </div>

      <!-- 2. 內容符合期待 -->
      <div class="space-y-7 mb-10">
        <label class="text-lg font-medium text-white">活動內容是否符合期待</label>
        <div class="flex flex-col md:flex-row flex-wrap gap-x-6 gap-y-2">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" v-model="expectations" value="very-satisfied" name="expectations" class="hidden peer">
            <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
            <span>非常符合</span>
          </label>
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" v-model="expectations" value="satisfied" name="expectations" class="hidden peer">
            <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
            <span>符合</span>
          </label>
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" v-model="expectations" value="neutral" name="expectations" class="hidden peer">
            <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
            <span>普通</span>
          </label>
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" v-model="expectations" value="unsatisfied" name="expectations" class="hidden peer">
            <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
            <span>不太符合</span>
          </label>
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" v-model="expectations" value="very-unsatisfied" name="expectations" class="hidden peer">
            <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
            <span>完全不符</span>
          </label>
        </div>
      </div>
      
      <!-- 3. 流程順暢度 -->
      <div class="space-y-7 mb-10">
        <label class="text-lg font-medium text-white">活動流程順暢度 (1為最低分, 5為最高分)</label>
        <div class="flex flex-col md:flex-row flex-wrap gap-x-6 gap-y-2">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" v-model="flow" value="5" name="flow" class="hidden peer">
              <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
              <span>5分</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" v-model="flow" value="4" name="flow" class="hidden peer">
              <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
              <span>4分</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" v-model="flow" value="3" name="flow" class="hidden peer">
              <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
              <span>3分</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" v-model="flow" value="2" name="flow" class="hidden peer">
              <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
              <span>2分</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" v-model="flow" value="1" name="flow" class="hidden peer">
              <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
              <span>1分</span>
            </label>
        </div>
      </div>

      <!-- 4. 講師表現 -->
      <div class="space-y-7 mb-10">
        <label class="text-lg font-medium text-white">對講師/刀匠表現的評價 (1為最低分, 5為最高分)</label>
        <div class="flex flex-col md:flex-row flex-wrap gap-x-6 gap-y-2">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" v-model="speakerPerformance" value="5" name="speaker" class="hidden peer">
              <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
              <span>5分</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" v-model="speakerPerformance" value="4" name="speaker" class="hidden peer">
              <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
              <span>4分</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" v-model="speakerPerformance" value="3" name="speaker" class="hidden peer">
              <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
              <span>3分</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" v-model="speakerPerformance" value="2" name="speaker" class="hidden peer">
              <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
              <span>2分</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" v-model="speakerPerformance" value="1" name="speaker" class="hidden peer">
              <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
              <span>1分</span>
            </label>
        </div>
      </div>

      <!-- 5. 最喜歡的部分 -->
      <div class="space-y-7 mb-10">
        <label for="favorite-part" class="text-lg font-medium text-white">最喜歡的部分：</label>
        <textarea 
          id="favorite-part"
          v-model="favoritePart"
          placeholder="告訴我們您最喜歡的部分～"
          rows="4" 
          class="w-full bg-[#282828] border border-gray-600 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        ></textarea>
      </div>
      
      <!-- 6. 建議改進的地方 -->
      <div class="space-y-7 mb-10">
        <label for="improvements" class="text-lg font-medium text-white">建議改進的地方：</label>
        <textarea 
          id="improvements"
          v-model="improvementSuggestions"
          placeholder="告訴我們您建議改進的地方～"
          rows="4" 
          class="w-full bg-[#282828] border border-gray-600 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        ></textarea>
      </div>
      
      <!-- 7. 再次參加 -->
      <div class="space-y-7 mb-10">
        <label class="text-lg font-medium text-white">是否願意再次參加</label>
        <div class="flex flex-wrap gap-x-6 gap-y-2">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" v-model="willAttendAgain" value="yes" name="attend" class="hidden peer">
            <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
            <span>是</span>
          </label>
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" v-model="willAttendAgain" value="no" name="attend" class="hidden peer">
            <span class="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></span>
            <span>否</span>
          </label>
        </div>
      </div>

      <!-- 8. 希望活動 -->
      <div class="space-y-7 mb-10">
        <label for="future-events" class="text-lg font-medium text-white">還希望我們舉辦什麼活動呢？</label>
        <textarea 
          id="future-events"
          v-model="futureEvents"
          placeholder="告訴我們您還想參加怎樣的活動，團隊評估可行性後就有機會舉辦喔！"
          rows="4" 
          class="w-full bg-[#282828] border border-gray-600 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        ></textarea>
      </div>

      <!-- 提交按鈕 -->
        <div class="flex items-center justify-center py-5 mb-10">
          <basebutton class="w-[150px]">提交評論</basebutton>
      </div>

      
      <!-- 免責聲明 -->
      <p class="text-left flex justify-center pt-2 mb-10">
        感謝您參加本次活動！<br>本問卷僅用於活動內容優化與品質提升，不會對外公開您的個人資料或評論內容。<br>您的意見將幫助我們設計更適合您的活動與體驗，謝謝支持！
      </p>

    </form>
  </div>
</template>

