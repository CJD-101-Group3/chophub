<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import Theheader from "../components/Theheader.vue";
import Thefooter from "../components/Thefooter.vue";

const canvasContainer = ref(null);
// 恢復 activeTab 的 ref，並預設為 'posts' 以便預覽您的新區塊
const activeTab = ref('posts');

// --- 以下為既有的 Three.js 邏輯，保持不變 ---
onMounted(() => {
  if (!canvasContainer.value) return;
  // ... (此處省略所有 Three.js 相關程式碼，與您之前的版本完全相同)
  const container = canvasContainer.value;
  const initialWidth = container.clientWidth;
  const initialHeight = container.clientHeight;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);
  const camera = new THREE.PerspectiveCamera(75, initialWidth / initialHeight, 0.1, 1000);
  camera.position.set(2, 2, 0);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(initialWidth, initialHeight);
  container.appendChild(renderer.domElement);
  const ambientLight = new THREE.AmbientLight(0xffffff, 3);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);
  const floorGeometry = new THREE.PlaneGeometry(20, 20);
  const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, side: THREE.DoubleSide });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 1, 0);
  controls.maxPolarAngle = Math.PI / 2;
  controls.minDistance = 1;
  const loader = new GLTFLoader();
  loader.load('/models/model1.glb', (gltf) => { model = gltf.scene; model.position.set(0, 1, 0); model.rotation.y = Math.PI / 2; scene.add(model); }, undefined, (error) => console.error(error));
  let model;
  const animate = () => { requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera); };
  animate();
  const handleResize = () => { if (canvasContainer.value) { const newWidth = canvasContainer.value.clientWidth; const newHeight = canvasContainer.value.clientHeight; camera.aspect = newWidth / newHeight; camera.updateProjectionMatrix(); renderer.setSize(newWidth, newHeight); } };
  window.addEventListener('resize', handleResize);
  onBeforeUnmount(() => { window.removeEventListener('resize', handleResize); });
});
</script>

<template>
  <!-- 1. 整體頁面佈局 -->
  <div class="grid grid-rows-[auto_1fr_auto] h-screen w-screen overflow-hidden bg-gray-100">
    
    <header>
      <Theheader />
    </header>

    <!-- 2. 主要內容區 -->
    <main class="grid grid-cols-[2fr_1fr]  overflow-hidden">
      
      <!-- 左欄: 3D Canvas -->
      <div ref="canvasContainer" class="w-full h-full overflow-hidden rounded-lg"></div>

      <!-- 右欄: 詳細資訊面板 -->
      <div class="flex flex-col overflow-hidden rounded-xl bg-black">
        
        <!-- Tabs 分頁 (維持您的設定) -->
        <div class="flex flex-shrink-0">
          <button 
            @click="activeTab = 'posts'"
            class="flex-grow py-3 px-4 text-base font-bold cursor-pointer transition-colors duration-300 rounded-tl-xl"
            :class="activeTab === 'posts' ? 'bg-dark-panel text-white' : 'bg-dark-card text-gray-400'">
            貼文內容
          </button>
          <button 
            @click="activeTab = 'features'"
            class="flex-grow py-3 px-4 text-base font-bold cursor-pointer transition-colors duration-300 rounded-tr-xl bg-[#F2994A]"
            :class="activeTab === 'features' ? 'bg-custom-orange text-white' : 'bg-dark-card text-white'">
            特點介紹
          </button>
        </div>

        <!-- 特點介紹 (維持您的設定) -->
        <div v-if="activeTab === 'features'" class="panel-content-features flex-grow overflow-y-auto p-6" :style="{ backgroundColor: '#F2994A' }">
          <div class="flex flex-col gap-6">
            <div v-for="n in 3" :key="n" class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-white text-custom-orange text-xl font-bold flex items-center justify-center">{{ n }}</div>
              <div class="flex-grow bg-white rounded-xl p-5 text-gray-800 text-sm leading-relaxed">
                這是第 {{ n }} 點特色介紹。蝴蝶刀的刀刃採用虛構材質「黑曜鋼」打造，經過高溫鍛造與精密拋光，呈現出深邃黑亮的金屬質感。
              </div>
            </div>
          </div>
        </div>
        
        <!-- 貼文內容 (在其中加入新區塊) -->
        <div v-if="activeTab === 'posts'" class="panel-content-posts flex-grow overflow-y-auto bg-dark-panel p-6 text-gray-200">
          
          <!-- 創作者資訊 (維持您的設定) -->
          <div class="flex items-center gap-3 mb-6 text-white">
            <span>創作者：</span>
            <div class="w-10 h-10 rounded-full bg-custom-yellow"></div>
            <span>蔡依玲</span>
          </div>

          <!-- 創作者貼文 (維持您的設定) -->
          <div class="bg-white rounded-xl p-6 mb-8">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-3xl font-bold" style="color: #F2994A;">蝴蝶刀</h3>
              <span class="text-3xl" style="color: #F0C400;">⭐</span>
            </div>
            <div class="space-y-4 text-gray-800 leading-relaxed">
               <p>刀軸機構部分採用改良式雙軸設計，大幅降低阻力與磨損，讓翻轉手感更順暢...</p>
               <p>除了實用性能外，暗影之翼在視覺美感上也別具匠心...</p>
            </div>
          </div>

          <!-- 留言區 -->
          <div class="flex flex-col gap-4">
            <div v-for="n in 10" :key="n" class="flex items-start gap-3">
              
              <!-- 【唯一修改處】1. 增加 mt-1 使其下移 2. 將背景色改為橘色 -->
              <div class="flex-shrink-0 w-9 h-9 rounded-full bg-[#F2994A] border-2 border-white shadow-sm mt-1"></div>
              
              <!-- 留言卡片 (維持您的設定) -->
              <div class="flex-grow flex flex-col bg-white rounded-xl p-4">
                <span class="font-bold text-sm text-gray-900 mb-1">中壢彭于晏 {{ n }}</span>
                <p class="text-base leading-relaxed mb-4 text-gray-700">這是第 {{ n }} 則留言，用來測試滾動功能。這把刀的設計太棒了，重心恰到好處！</p>
                <div class="flex justify-between items-center text-xs text-gray-500">
                  <span>{{23-n}}週 讚 檢舉</span>
                  <div class="flex items-center gap-2 cursor-pointer">
                    <span>{{82-n*3}}</span><span>👍</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>

    <footer>
      <Thefooter />
    </footer>
  </div>
</template>

<!-- 自訂滾動條樣式 (維持您的設定) -->
<style>
.panel-content-features::-webkit-scrollbar { width: 8px; }
.panel-content-features::-webkit-scrollbar-track { background: transparent; }
.panel-content-features::-webkit-scrollbar-thumb { background-color: #ffffff; border-radius: 4px; }

.panel-content-posts::-webkit-scrollbar { width: 8px; }
.panel-content-posts::-webkit-scrollbar-track { background: transparent; }
.panel-content-posts::-webkit-scrollbar-thumb { background-color: #555; border-radius: 4px; }
</style>