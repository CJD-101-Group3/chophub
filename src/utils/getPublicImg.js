export const getPublicImg = (filename) => {
    return `${import.meta.env.BASE_URL}${filename}`
}

// 用法
// <script setup>
// import { getPublicImg } from '@/utils/getPublicImg'

// const window_img_d = getPublicImg('filename')
// const window_img_n = getPublicImg('Home_img/Window_n.png')
// </script>