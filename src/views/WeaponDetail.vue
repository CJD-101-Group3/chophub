<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { getPublicImg } from '@/utils/getPublicImg'
const Karambit = getPublicImg('models/model1.glb');

import Theheader from "../components/Theheader.vue";
import Thefooter from "../components/Thefooter.vue";
// 1. 引入 Basebutton
import Basebutton from '../components/Basebutton.vue';

const canvasContainer = ref(null);
const activeTab = ref('posts');

// --- Three.js 邏輯 ---
onMounted(() => {
  if (!canvasContainer.value) return;
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
  loader.load(Karambit, (gltf) => { model = gltf.scene; model.position.set(0, 1, 0); model.rotation.y = Math.PI / 2; scene.add(model); }, undefined, (error) => console.error(error));
  let model;
  const animate = () => { requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera); };
  animate();

  window.addEventListener('resize', handleResize);
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    if (renderer) {
      renderer.dispose();
    }
  });
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
            class="flex-1 py-3 px-4 text-base font-bold transition-colors duration-300"
            :class="activeTab === 'posts' ? 'bg-[#282828] text-white' : 'bg-[#1a1a1a] text-gray-400'">
            貼文內容
          </button>
          <button 
            @click="activeTab = 'features'"
            class="flex-1 py-3 px-4 text-base font-bold transition-colors duration-300"
            :class="activeTab === 'features' ? 'bg-[#F2994A] text-white' : 'bg-[#1a1a1a] text-white'">
            特點介紹
          </button>
        </div>

        <!-- 面板內容 (所有內容都放在這個滾動容器中) -->
        <div class="flex-1 overflow-y-auto">
          <!-- 特點介紹 -->
          <div v-if="activeTab === 'features'" class="p-6 bg-[#F2994A]">
            <div class="flex flex-col gap-6">
              <div v-for="n in 3" :key="n" class="flex items-start gap-4">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-white text-[#F2994A] text-xl font-bold flex items-center justify-center">{{ n }}</div>
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
              <span>蔡依玲</span>
            </div>

            <div class="bg-white rounded-xl p-6 mb-8">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-3xl font-bold text-[#F2994A]">蝴蝶刀</h3>
                <span class="text-3xl text-yellow-400">⭐</span>
              </div>
              <div class="space-y-4 text-gray-800 leading-relaxed">
                 <p>刀軸機構部分採用改良式雙軸設計，大幅降低阻力與磨損，讓翻轉手感更順暢...</p>
                 <p>除了實用性能外，暗影之翼在視覺美感上也別具匠心...</p>
              </div>
            </div>

            <!-- 留言區 -->
            <div class="flex flex-col gap-4">
              <div v-for="n in 10" :key="n" class="flex items-start gap-3">
                <div class="flex-shrink-0 w-9 h-9 rounded-full bg-[#F2994A] border-2 border-white shadow-sm mt-1"></div>
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
        
        <!-- 
          **【RWD 新增】** 
          - 留言輸入框，使用 sticky 定位使其吸附在底部
        -->
        <div class="flex-shrink-0 sticky bottom-0 p-4 bg-[#282828] border-t border-gray-700">
          <div class="flex items-center gap-3 bg-white rounded-full p-2">
            <div class="w-9 h-9 rounded-full bg-gray-300 flex-shrink-0"></div>
            <input type="text" placeholder="輸入文字..." class="flex-1 bg-transparent text-gray-800 focus:outline-none">
            <button class="w-9 h-9 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center">
              <!-- 這是發送的 Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-white"><path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.533l4.852-1.617a.75.75 0 010 1.352l-4.852-1.617a.75.75 0 00-.95.533l-1.414 4.949a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.118A28.897 28.897 0 003.105 2.29z" /></svg>
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