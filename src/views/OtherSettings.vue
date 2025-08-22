<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { getPublicImg } from '@/utils/getPublicImg';
import Theheader from '../components/Theheader.vue';
import Thefooter from '../components/Thefooter.vue';

// --- 通用佈局相關的資料 ---
const isDropdownOpen = ref(false);
const toggleDropdown = () => isDropdownOpen.value = !isDropdownOpen.value;
const route = useRoute();
const menuItems = ref([
  { name: '會員資訊', href: '/UserProfile' },
  { name: '貼文相關', href: '/PostActivity' },
  { name: '收藏相關', href: '/UserCollections' },
  { name: '其他設定', href: '/OtherSettings' },
]);
const activeTab = computed(() => {
  const currentRoute = menuItems.value.find(item => item.href === route.path);
  return currentRoute ? currentRoute.name : '其他設定';
});
const memberInfo = ref({
  name: '露比匠',
  avatarUrl: getPublicImg('users/userp.png'),
});

// --- API 相關狀態 ---
const loading = ref(true);
const error = ref(null);
const saving = ref(false);

// ******** 新增：編輯模式狀態 ********
const isEditing = ref(false);

// --- 響應式表單資料 ---
const privacySettings = reactive({
  is_collections_public: false,
  is_achievements_public: false,
  is_location_public: false,
});

const userId = 1;

// --- GET 請求，獲取目前的設定 ---
async function fetchPrivacySettings() {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get(`http://localhost:8888/ChopHub-API/api/userProfile.php?user_id=${userId}`);
    if (response.data.status === 'success') {
      const settings = response.data.data;
      privacySettings.is_collections_public = !!parseInt(settings.is_collections_public);
      privacySettings.is_achievements_public = !!parseInt(settings.is_achievements_public);
      privacySettings.is_location_public = !!parseInt(settings.is_location_public);
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    console.error("獲取隱私設定失敗:", err);
    error.value = "無法載入設定，請稍後再試。";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchPrivacySettings);

// --- PATCH 請求，儲存變更 ---
async function handleSave() {
  saving.value = true;
  try {
    const payload = {
      is_collections_public: privacySettings.is_collections_public ? 1 : 0,
      is_achievements_public: privacySettings.is_achievements_public ? 1 : 0,
      is_location_public: privacySettings.is_location_public ? 1 : 0,
    };
    const response = await axios.patch(
      `http://localhost:8888/ChopHub-API/api/userProfile.php?user_id=${userId}`,
      payload
    );
    if (response.data.status === 'success') {
      alert('隱私設定已更新！');
      isEditing.value = false;
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    console.error("儲存失敗:", err);
    alert(`儲存失敗: ${err.response?.data?.message || err.message}`);
    await fetchPrivacySettings();
  } finally {
    saving.value = false;
  }
}

// --- 放棄修改函式 ---
function handleCancel() {
  if (confirm('確定要放棄修改嗎？')) {
    isEditing.value = false;
    fetchPrivacySettings();
  }
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Theheader />
    <div class="flex-1 container mx-auto p-4 lg:flex lg:gap-8 lg:p-8">
      <aside class="hidden lg:block lg:w-72 flex-shrink-0">
        <div class="bg-white p-4 rounded-lg shadow-[0_8px_32px_0_rgba(255,255,255,0.4)] sticky top-24">
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
                'bg-[#F2B94C] text-white hover:text-white': activeTab === item.name,
                'text-gray-600 hover:bg-[#F2994A] hover:text-white': activeTab !== item.name
              }"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </div>
      </aside>
      
      <main class="flex-1">
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
              <router-link v-for="item in menuItems" :key="item.name" :to="item.href" class="block px-4 py-3 text-gray-700 hover:bg-[#F2994A] hover:text-white">{{ item.name }}</router-link>
            </div>
          </transition>
        </div>
        <div class="space-y-8">
          <div class="max-w-4xl mx-auto space-y-8">
            <div class="bg-white p-6 lg:p-8 rounded-lg shadow-[0_8px_32px_0_rgba(255,255,255,0.4)]">
              <h2 class="text-2xl font-bold text-gray-800 mb-6">隱私設定</h2>
              <div v-if="loading" class="text-center py-10">載入中...</div>
              <div v-else-if="error" class="text-center text-red-500 py-10">{{ error }}</div>
              <div v-else class="space-y-5">
                <template v-if="isEditing">
                  <div class="flex justify-between items-center border-b pb-4">
                    <span class="text-gray-700 text-xl">精選收藏是否公開</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="privacySettings.is_collections_public" class="sr-only peer">
                      <div class="w-14 h-8 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#F2994A]"></div>
                    </label>
                  </div>
                  <div class="flex justify-between items-center border-b pb-4">
                    <span class="text-gray-700 text-xl">成就徽章是否公開</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="privacySettings.is_achievements_public" class="sr-only peer">
                      <div class="w-14 h-8 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#F2994A]"></div>
                    </label>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-700 text-xl">是否顯示所在地區</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="privacySettings.is_location_public" class="sr-only peer">
                      <div class="w-14 h-8 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#F2994A]"></div>
                    </label>
                  </div>
                </template>
                <template v-else>
                   <div class="flex justify-between items-center border-b pb-4">
                    <span class="text-gray-700 text-xl">精選收藏是否公開</span>
                    <span :class="privacySettings.is_collections_public ? 'text-green-600' : 'text-gray-500'" class="font-semibold text-xl">{{ privacySettings.is_collections_public ? '公開' : '不公開' }}</span>
                  </div>
                  <div class="flex justify-between items-center border-b pb-4">
                    <span class="text-gray-700 text-xl">成就徽章是否公開</span>
                     <span :class="privacySettings.is_achievements_public ? 'text-green-600' : 'text-gray-500'" class="font-semibold text-xl">{{ privacySettings.is_achievements_public ? '公開' : '不公開' }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-700 text-xl">是否顯示所在地區</span>
                     <span :class="privacySettings.is_location_public ? 'text-green-600' : 'text-gray-500'" class="font-semibold text-xl">{{ privacySettings.is_location_public ? '顯示' : '不顯示' }}</span>
                  </div>
                </template>
                <div class="pt-4">
                  <template v-if="isEditing">
                    <div class="flex gap-4">
                      <button @click="handleSave" :disabled="saving" class="w-full bg-[#F2994A] text-white font-bold py-3 px-4 rounded-lg transition-colors hover:bg-[#E88C3A] disabled:bg-gray-400">
                        {{ saving ? '儲存中...' : '儲存設定' }}
                      </button>
                      <button @click="handleCancel" class="w-full bg-white hover:bg-gray-100 text-gray-700 border border-gray-400 font-bold py-3 px-4 rounded-lg transition-colors">
                        放棄修改
                      </button>
                    </div>
                  </template>
                  <template v-else>
                     <button @click="isEditing = true" class="w-full bg-[#F2994A] text-white font-bold py-3 px-4 rounded-lg transition-colors hover:bg-white hover:text-black border border-[#F2994A]">
                       修改設定
                     </button>
                  </template>
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
</style>```