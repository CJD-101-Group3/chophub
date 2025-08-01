<template>
  <img
    src="/Home_img/Hand_0.png"
    alt="Smith 手"
    class="absolute w-[13vw] bottom-[35%] left-1/2 translate-x-[-9%] origin-bottom-left z-10 animate-swing-hand" />
</template>

<style scoped>
@keyframes swingHand {
  0%, 100% {
    transform: translateX(-8%) rotate(0deg);
  }
  10% {
    transform: translateX(-8%) rotate(5deg);
  }
  20% {
    transform: translateX(-8%) rotate(0deg);
  }
  30% {
    transform: translateX(-8%) rotate(7deg);
  }
  40% {
    transform: translateX(-8%) rotate(0deg);
  }
  50% {
    transform: translateX(-8%) rotate(5deg);
  }
  60% {
    transform: translateX(-8%) rotate(0deg);
  }
  /* 60%~100% 空白等待時間 (約2秒) */
}

.animate-swing-hand {
  animation: swingHand 4s ease-in-out infinite;
}

img {
  transform-origin: left bottom;
}
</style>