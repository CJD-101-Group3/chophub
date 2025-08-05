<template>
    <RouterLink to="/EventHomePage">
        <div class="hidden md:block absolute w-[28vw] bottom-[0%] left-1/2 translate-x-[27%] z-30 group">
            <img
                src="/Home_img/Event_board.png"
                alt="活動黑板"
                class="w-full transition duration-300 ease-in-out group-hover:brightness-103 group-hover:drop-shadow-[0_0_25px_rgba(150,255,180,0.8)] hover-sway" />
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
