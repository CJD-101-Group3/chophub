<template>
    <img
        src="/Home_img/Hand_0.png"
        alt="Smith 手"
        class="absolute bottom-[38%] left-1/2 z-10 w-[28vw] translate-x-[-55%] sm:bottom-[43%] md:bottom-[40%] sm:w-[21vw] md:w-[9vw] md:translate-x-[18%] animate-swing-hand" />
</template>

<style scoped>
@keyframes swingHand {
    0%,
    100% {
        transform: translateX(18%) rotate(0deg);
    }
    10% {
        transform: translateX(18%) rotate(5deg);
    }
    20% {
        transform: translateX(18%) rotate(0deg);
    }
    30% {
        transform: translateX(18%) rotate(7deg);
    }
    40% {
        transform: translateX(18%) rotate(0deg);
    }
    50% {
        transform: translateX(18%) rotate(5deg);
    }
    60% {
        transform: translateX(18%) rotate(0deg);
    }
}

.animate-swing-hand {
    animation: swingHand 4s ease-in-out infinite;
    transform-origin: left bottom;
}
</style>
