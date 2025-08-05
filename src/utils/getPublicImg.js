export const getPublicImg = (filename) => {
    return `${import.meta.env.BASE_URL}${filename}`
}

// 用法
// <script setup>
// import { getPublicImg } from '@/utils/getPublicImg'

// const window_img_d = getPublicAsset('filename')
// const window_img_n = getPublicAsset('Home_img/Window_n.png')
// </script>