<script setup>
import { ref, onMounted } from 'vue';
// 確保這兩行 import 是這樣的，不要使用任何 http/https 網址
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// <-- 1. 引入 OrbitControls 控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const canvasContainer = ref(null);

onMounted(() => {
  // --- 場景設定 ---場景圖2D 7/20RESIZE背景2D 圖導入要設定大小/拖曳/放大縮小模型
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  // --- 相機設定 ---
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(1, 1, 0);

  // --- 渲染器設定 ---
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  
  // 安全地附加到 DOM 元素
  if (canvasContainer.value) {
    canvasContainer.value.appendChild( renderer.domElement );
  }

  // --- 加入光源 ---
  const ambientLight = new THREE.AmbientLight(0xffffff, 3);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

    // --- 2. 加入地板 (一個平面) ---
  const floorGeometry = new THREE.PlaneGeometry(20, 20); // 建立一個 20x20 的平面幾何體
  const floorMaterial = new THREE.MeshStandardMaterial({ // 使用能接收光影的標準材質
    color: 0xcccccc, 
    side: THREE.DoubleSide // 讓平面的兩面都可見
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2; // 將平面旋轉90度，讓它平躺在地上
  floor.position.y = 0; // 將地板放在 y=0 的高度
  scene.add(floor);

   // --- 3. 設定滑鼠控制器 (OrbitControls) ---
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 開啟阻尼效果，讓拖曳更有質感
  controls.target.set(0, 1, 0); // 設置控制器的中心點，讓旋轉圍繞著模型中心 (y=1)
  // --- 加入這一行，限制垂直旋轉角度 ---
  controls.maxPolarAngle = Math.PI / 2; // <-- 關鍵程式碼
    // --- 在這裡加入縮放距離限制 ---
  controls.minDistance = 1; // 設定最近縮放距離 (例如 2 個單位)
  // controls.maxDistance = 10; // 設定最遠縮放距離 (例如 10 個單位)

  // --- 載入模型 ---
  // 以後要寫成這種形式，這樣可以根據武器名稱載入不同的模型
  // function loadModel(weapon){
  //   const loader = new GLTFLoader();
  //   loader.load(
  //     `models/${weapon}.glb`, 
  //     function (gltf) {
  //       const model = gltf.scene;
  //       model.position.set(0, 1, 0);
  //       model.rotation.y = Math.PI / 2;
  //       scene.add(model);
  //       console.log('模型載入成功!', gltf);
  //     }, 
  //     undefined, 
  //     function (error) {
  //       console.error('載入模型時發生錯誤:', error);
  //     }
  //   );
  // }
  const loader = new GLTFLoader();

  loader.load(
    '/models/model1.glb', 
    function ( gltf ) {
      const model = gltf.scene;
      model.position.set(0, 1., 0);
      model.rotation.y = Math.PI / 2;
      scene.add(model);
      console.log('模型載入成功!', gltf);
    }, 
    undefined, 
    function ( error ) {
      console.error('載入模型時發生錯誤:', error );
    } 
  );

  // --- 動畫循環 ---
  function animate() {
    requestAnimationFrame(animate);

    // <-- 4. 在動畫循環中更新控制器
    controls.update(); 

    renderer.render(scene, camera);
  }
  animate();

  // --- 視窗自適應 ---
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
</script>

<template>
  <div ref="canvasContainer" class="container"></div>
</template>

<style>
/* 移除 scoped，讓樣式套用到全域，確保 canvas 正常顯示 */
/* 這組 CSS 是比較穩健的寫法，可以確保 canvas 填滿畫面且沒有滾動條 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; /* 強制隱藏滾動條 */
}

canvas {
  display: block;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.container {
  overflow: hidden;
}

</style>