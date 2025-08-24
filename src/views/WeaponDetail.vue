<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { getPublicImg } from '@/utils/getPublicImg';
import Theheader from "../components/Theheader.vue";
import Thefooter from "../components/Thefooter.vue";
import axios from 'axios';

// --- 路由與狀態 ---
const route = useRoute();
const canvasContainer = ref(null);
const activeTab = ref('posts');
const weapons_comment = ref([]);
const newCommentText = ref('');
const weaponDetail = ref(null);
const loading = ref(false);
const currentUserId = 1;

// --- Three.js 相關 ---
let scene, camera, renderer, controls, model;

// 依 weapon_id 回傳對應模型路徑
function getWeaponModel(weapon_id) {
  switch (weapon_id) {
    case '1': return getPublicImg('models/model1.glb')
    case '2': return getPublicImg('models/model2.glb')
    case '3': return getPublicImg('models/model1.glb')
    default: return getPublicImg('models/model2.glb') // 預設
  }
}

// 初始化 Three.js
function initThree() {
  if (!canvasContainer.value) return;
  const container = canvasContainer.value;
  const width = container.clientWidth;
  const height = container.clientHeight;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(2, 2, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 3);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0xcccccc, side: THREE.DoubleSide })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 1, 0);
  controls.maxPolarAngle = Math.PI / 2;
  controls.minDistance = 1;

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  window.addEventListener('resize', handleResize);
}

// 處理 Three.js canvas resize
function handleResize() {
  if (!canvasContainer.value) return;
  const width = canvasContainer.value.clientWidth;
  const height = canvasContainer.value.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// 載入模型
function loadModel(weaponId) {
  const modelPath = getWeaponModel(weaponId);
  const loader = new GLTFLoader();

  // 移除舊模型
  if (model) {
    scene.remove(model);
    model.traverse((child) => {
      if (child.isMesh) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
    model = null;
  }

  loader.load(
    modelPath,
    (gltf) => {
      model = gltf.scene;
      model.position.set(0, 1, 0);
      model.rotation.y = Math.PI / 2;
      scene.add(model);
    },
    undefined,
    (error) => console.error(error)
  );
}

// --- API 相關 ---
async function loadWeaponDetail(weaponId) {
  if (!weaponId) return;
  try {
    const res = await axios.get(`http://localhost:8888/ChopHub-API/api/weapon/getWeapon.php?weapon_id=${weaponId}`);
    if (res.data.status === 'success') {
      weaponDetail.value = res.data.data;
    } else {
      console.error(res.data.message);
    }
  } catch (err) {
    console.error('載入武器資料失敗:', err);
  }
}

async function loadComments(weaponId) {
  if (!weaponId) return;
  loading.value = true;
  weapons_comment.value = [];
  try {
    const res = await axios.get(`http://localhost:8888/ChopHub-API/api/weapon/getComments.php?weapon_id=${weaponId}`);
    if (res.data.status === 'success') weapons_comment.value = res.data.data;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function addComment() {
  if (!newCommentText.value.trim()) return alert('請輸入留言內容');
  loading.value = true;
  const weaponId = route.params.weapon_id;
  try {
    await axios.post('http://localhost:8888/ChopHub-API/api/weapon/weaponsComment.php', {
      user_id: currentUserId,
      weapon_id: weaponId,
      comment_content: newCommentText.value.trim()
    }, { headers: { 'Content-Type': 'application/json' } });
    newCommentText.value = '';
    await loadComments(weaponId);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

// --- 工具函式 ---
function formatTimeAgo(timestamp) {
  const now = new Date();
  const commentTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now - commentTime) / 1000);
  if (diffInSeconds < 60) return '剛剛';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} 分鐘前`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} 小時前`;
  return `${Math.floor(diffInSeconds / 86400)} 天前`;
}

function handleKeyPress(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    addComment();
  }
}

// --- 生命週期 ---
onMounted(() => {
  initThree();
  const weaponId = route.params.weapon_id;
  loadModel(weaponId);
  loadWeaponDetail(weaponId);
  loadComments(weaponId);
});

watch(() => route.params.weapon_id, (newId) => {
  loadModel(newId);
  loadWeaponDetail(newId);
  loadComments(newId);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (renderer) renderer.dispose();
});
</script>

<template>
  <div class="flex flex-col h-screen w-screen overflow-hidden bg-gray-100">
    <Theheader class="flex-shrink-0" />

    <!-- 
      **【RWD 修改】** 
      - 預設為單欄(垂直)，在大螢幕(lg)以上變為雙欄
      - 在手機上 main 區塊允許滾動
    -->
    <main class="flex-1 lg:grid lg:grid-cols-[2fr_1fr] overflow-y-auto lg:overflow-hidden">
      
      <!-- 
        **【RWD 修改】** 
        - 手機上設定固定高度，例如 h-96
        - 移除圓角，使其在大螢幕上能填滿左側
      -->
      <div ref="canvasContainer" class="w-full h-96 lg:h-full flex-shrink-0"></div>

      <!-- 右欄: 詳細資訊面板 -->
      <div class="flex flex-col bg-black overflow-hidden">
        
        <div class="flex flex-shrink-0">
          <button 
            @click="activeTab = 'posts'"
            class="flex-1 py-3 px-4 text-base font-bold transition-colors duration-300 rounded-none rounded-tl-lg rounded-tr-lg"
            :class="activeTab === 'posts' ? 'bg-[#282828] text-white' : 'bg-[#1a1a1a] text-gray-400'">
            貼文內容
          </button>
          <button 
            @click="activeTab = 'features'"
            class="flex-1 py-3 px-4 text-base font-bold transition-colors duration-300 rounded-none rounded-tl-lg rounded-tr-lg"
            :class="activeTab === 'features' ? 'bg-black text-white' : 'bg-[#1a1a1a] text-white'">
            特點介紹
          </button>
        </div>

        <!-- 面板內容 (所有內容都放在這個滾動容器中) -->
        <div class="flex-1 overflow-y-auto">
          <!-- 特點介紹 -->
          <div v-if="activeTab === 'features'" class="p-6 bg-black">
            <div class="flex flex-col gap-6">
              <div v-for="n in 3" :key="n" class="flex items-start gap-4 ">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-white text-black text-xl font-bold flex items-center justify-center">{{ n }}</div>
                <div class="flex-grow bg-white rounded-xl p-5 text-gray-800 text-sm leading-relaxed">
                  這是第 {{ n }} 點特色介紹。蝴蝶刀的刀刃採用虛構材質「黑曜鋼」打造，經過高溫鍛造與精密拋光，呈現出深邃黑亮的金屬質感。
                </div>
              </div>
            </div>
          </div>
          
          <!-- 貼文內容 -->
          <div v-if="activeTab === 'posts'" class="p-6 bg-[#282828] text-gray-200">
            <div class="flex items-center gap-3 mb-6 text-white">
              <span>創作者：</span>
              <div class="w-10 h-10 rounded-full bg-[#F2994A]"></div>
              <span>使用者</span>
            </div>

            <div class="bg-white rounded-xl p-6 mb-8" v-if="weaponDetail">
                    <div class="flex justify-between items-center mb-4">
                      <h3 class="text-3xl font-bold text-[#F2994A]">{{ weaponDetail.title }}</h3>
                      <span class="text-3xl text-yellow-400"></span>
                    </div>
                    <div class="space-y-4 text-gray-800 leading-relaxed">
                      <p>{{ weaponDetail.description }}</p>
                    </div>
            </div>

            <!-- 留言區 -->
<div class="flex flex-col gap-4">
  <!-- 載入狀態 -->
  <div v-if="loading" class="text-center py-4 text-gray-400">
    載入留言中...
  </div>

  <!-- 空狀態 -->
  <div v-else-if="weapons_comment.length === 0" class="text-center py-8 text-gray-400">
    還沒有留言，成為第一個留言的人吧！
  </div>

  <!-- 留言列表 -->
  <div v-else v-for="comment in weapons_comment" :key="comment.id" class="flex items-start gap-3">
    <!-- 頭像 -->
    <div class="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm mt-1 bg-[#F2994A] flex items-center justify-center">
      <img 
        v-if="comment.author.avatar" 
        :src="comment.author.avatar" 
        :alt="comment.author.name"
        class="w-full h-full object-cover"
        @error="$event.target.style.display = 'none'"
      />
      <span v-if="!comment.author.avatar" class="text-white text-sm font-bold">
        {{ comment.author.name ? comment.author.name.charAt(0).toUpperCase() : '?' }}
      </span>
    </div>

                        <!-- 留言內容 -->
                        <div class="flex-grow flex flex-col bg-white rounded-xl p-4">
                          <span class="font-bold text-sm text-gray-900 mb-1">
                            {{ comment.author.name || '匿名用戶' }}
                          </span>
                          <p class="text-base leading-relaxed mb-4 text-gray-700">
                            {{ comment.content }}
                          </p>
                          <div class="flex justify-between items-center text-xs text-gray-500">
                            <span>{{ formatTimeAgo(comment.time) }} 讚 檢舉</span>
                            <div class="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors">
                              <span>{{ comment.likes }}</span>
                              <span>{{ comment.isLikedByUser ? '👍' : '👍' }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
          </div>
        </div>
        
        <!-- 
          **【RWD 新增】** 
          - 留言輸入框，使用 sticky 定位使其吸附在底部
        -->
        <!-- 留言輸入框 -->
        <div class="flex-shrink-0 sticky bottom-0 p-4 bg-[#282828] border-t border-gray-700">
          <div class="flex items-center gap-3 bg-white rounded-full p-2">
            <div class="w-9 h-9 rounded-full bg-gray-300 flex-shrink-0"></div>
            <input 
              type="text" 
              v-model="newCommentText"
              @keypress="handleKeyPress"
              placeholder="輸入文字..." 
              class="flex-1 bg-transparent text-gray-800 focus:outline-none"
              :disabled="loading"
            >
            <button 
              @click="addComment"
              :disabled="loading || !newCommentText.trim()"
              class="w-9 h-9 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
              <!-- 載入圖示 -->
              <div v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <!-- 發送圖示 -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-white">
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.533l4.852-1.617a.75.75 0 010 1.352l-4.852-1.617a.75.75 0 00-.95.533l-1.414 4.949a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.118A28.897 28.897 0 003.105 2.29z" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </main>
    
    <Thefooter class="hidden lg:flex" />
  </div>
</template>

<style>
/* ... 自訂滾動條樣式保持不變 ... */
</style>