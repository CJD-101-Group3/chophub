<template>
    <RouterLink to="/post">
    <div class="hidden md:block absolute w-[24vw] bottom-[34%] left-1/2 translate-x-[85%] z-30 group">
        <img
            src="/Home_img/Board.png"
            alt="留言板"
            class="w-full transition duration-300 ease-in-out group-hover:brightness-103 group-hover:drop-shadow-[0_0_25px_rgba(100,200,255,0.7)] hover-sway" />
    </div>
    </RouterLink>
</template>

<style scoped>
@keyframes sway {
    0% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(-2px);
    }
    50% {
        transform: translateX(2px);
    }
    75% {
        transform: translateX(-1px);
    }
    100% {
        transform: translateX(0);
    }
}

.hover-sway:hover {
    animation: sway 0.4s ease-in-out;
}
</style>
