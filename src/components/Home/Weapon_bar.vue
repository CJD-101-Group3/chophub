<template>
    <RouterLink to="/Weaponslist">
    <div class="hidden md:block absolute w-[40vw] bottom-[12%] translate-x-[5%] z-30 group">
        <img
            src="/Home_img/Weapons.png"
            alt="武器架"
            class="w-full transition duration-400 group-hover:brightness-110 group-hover:drop-shadow-[0_0_20px_rgba(255,220,100,0.8)] hover-sway" />
    </div>
    </RouterLink>
</template>

<style scoped>
@keyframes sway {
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-2px);
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
