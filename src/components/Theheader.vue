<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // 1. **修改**: 引入正確的 auth store
import logo from '@/assets/icon/LOGO.png';
import Basebutton from './Basebutton.vue';
import userIcon from '@/assets/icon/user.svg';
import message from '@/assets/icon/message.svg';
import weapon from '@/assets/icon/sword.svg';
import calendar from '@/assets/icon/calendar.svg';
import aboutus from '@/assets/icon/aboutus.svg';
import cross from '@/assets/icon/cross.svg';

const isOpen = ref(false);
const authStore = useAuthStore(); // 2. **修改**: 建立 auth store 的實例
const router = useRouter();

// 關閉動畫
const handleClose = () => {
    isOpen.value = false;
};

// 3. **修改**: 登出函式
const handleLogout = () => {
    // 直接呼叫 store 中的 logoutAction
    // 它會負責清除前後端狀態並跳轉頁面
    authStore.logoutAction();
    handleClose(); // 關閉手機版側邊欄
};

// 預設頭像路徑
const defaultAvatar = '/src/assets/users/userp.png';
</script>

<template>
    <header
        class="w-full h-[74px] bg-[#282828] flex items-center justify-between px-6 border-b-[0.5px] border-gray-700">
        <!-- Logo -->
        <RouterLink to="/">
            <div class="flex items-center space-x-2">
                <img :src="logo" alt="LOGO" class="w-[70px] h-[70px]" />
            </div>
        </RouterLink>
        <!-- 漢堡選單 -->
        <button @click="isOpen = true" class="h2 text-white md:hidden">≡</button>

        <!-- 電腦版導覽連結 -->
        <nav class="hidden md:flex h5 items-center space-x-6 text-white">
            <RouterLink to="/post" class="h5 hover:text-orange-400 transition">貼文區</RouterLink>
            <RouterLink to="/weaponslist" class="h5 hover:text-orange-400 transition">武器展示區</RouterLink>
            <RouterLink to="/EventHomePage" class="h5 hover:text-orange-400 transition">活動專區</RouterLink>
            <RouterLink to="/About" class="h5 hover:text-orange-400 transition">關於我們</RouterLink>

            <!-- 登入狀態判斷 -->
            <div class="flex items-center space-x-2">
                <!-- 如果未登入 -->
                <template v-if="!authStore.isLoggedIn">
                    <RouterLink to="/Register">
                        <Basebutton>SignIn</Basebutton>
                    </RouterLink>
                    <RouterLink to="/Login">
                        <Basebutton variant="outline">LogIn</Basebutton>
                    </RouterLink>
                </template>

                <!-- 如果已登入 -->
                <template v-else>
                    <RouterLink
                        to="/UserProfile"
                        class="flex items-center gap-3 text-white hover:text-orange-400 p-2 rounded-full transition-colors">
                        <!-- 4. **修改**: 動態綁定頭像 -->
                        <!-- <img
                            :src="authStore.currentUser?.avatar_url || defaultAvatar"
                            alt="User Avatar"
                            class="w-10 h-10 rounded-full object-cover border-2 border-orange-400" /> -->
                        <!-- 5. **修改**: 動態綁定使用者名稱 -->
                        <span class="font-semibold text-xl transition-colors">{{ authStore.currentUser?.username }}</span>
                    </RouterLink>
                    <button @click="handleLogout" class="font-medium ml-4 p-2 rounded-[8px] hover:bg-orange-400">
                        登出
                    </button>
                </template>
            </div>
        </nav>
    </header>

    <!-- 手機版側邊欄 -->
    <aside
        v-show="isOpen"
        class="fixed top-0 right-0 h-full w-[80vw] bg-[#F6B94A] z-50 p-6 space-y-7 text-black text-xl transition-transform duration-1000 transform"
        :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }">
        <!-- 關閉按鈕 -->
        <div class="flex justify-end">
            <button @click="handleClose" class="w-12 h-12 flex items-center justify-center transition duration-500">
                <img
                    :src="cross"
                    alt="close"
                    class="w-12 h-12 transition duration-500 hover:rotate-180 hover:brightness-0 hover:invert" />
            </button>
        </div>

        <!-- 手機版的登入狀態判斷 -->
        <!-- 如果未登入 -->
        <RouterLink
            v-if="!authStore.isLoggedIn"
            to="/Login"
            class="group flex items-center space-x-3 pb-3 border-b border-black hover:text-white transition duration-300"
            @click="handleClose">
            <img :src="userIcon" alt="user" class="w-6 h-6 group-hover:brightness-0 group-hover:invert duration-300" />
            <span class="font-bold">點此登入/註冊</span>
        </RouterLink>

        <!-- 如果已登入 -->
        <div v-else class="pb-3 border-b border-black">
            <RouterLink
                to="/UserProfile"
                class="group flex items-center space-x-3 hover:text-white transition duration-300"
                @click="handleClose">
                <img 
                    :src="authStore.currentUser?.avatar_url || defaultAvatar" 
                    alt="Avatar" 
                    class="w-12 h-12 rounded-full object-cover" />
                <span class="font-bold text-2xl">{{ authStore.currentUser?.username }}</span>
            </RouterLink>
            <button
                @click="handleLogout"
                class="mt-4 w-full text-left font-bold hover:text-white transition duration-300">
                登出
            </button>
        </div>

        <!-- 導覽項目 -->
        <RouterLink to="/post" class="group flex items-center space-x-3 hover:text-white transition duration-300" @click="handleClose">
            <img :src="message" alt="message" class="w-6 h-6 group-hover:brightness-0 group-hover:invert duration-300" />
            <span class="font-bold">貼文區</span>
        </RouterLink>
        <RouterLink to="/Weaponslist" class="group flex items-center space-x-3 hover:text-white transition duration-300" @click="handleClose">
            <img :src="weapon" alt="weapon" class="w-6 h-6 group-hover:brightness-0 group-hover:invert duration-300" />
            <span class="font-bold">武器展示區</span>
        </RouterLink>
        <RouterLink to="/EventHomePage" class="group flex items-center space-x-3 hover:text-white transition duration-300" @click="handleClose">
            <img :src="calendar" alt="calendar" class="w-6 h-6 group-hover:brightness-0 group-hover:invert duration-300" />
            <span class="font-bold">活動專區</span>
        </RouterLink>
        <RouterLink to="/About" class="group flex items-center space-x-3 hover:text-white transition duration-300" @click="handleClose">
            <img :src="aboutus" alt="aboutus" class="w-6 h-6 group-hover:brightness-0 group-hover:invert duration-300" />
            <span class="font-bold">關於我們</span>
        </RouterLink>
    </aside>
</template>