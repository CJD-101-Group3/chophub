export const getPublicImg = (filename) => {
    return `${import.meta.env.BASE_URL}${filename}`
}

// 用法
// <script setup>
// import { getPublicImg } from '@/utils/getPublicImg'

// const 變數 = getPublicAsset('filename')
// </script>