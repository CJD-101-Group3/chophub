
<template>
    <!-- 鐵匠敲鐵塊 -->
    <div class="forge">
        <img src="/img/body.png" alt="" id="body">
        <img src="/img/arm.png" alt="" id="arm">
        <div class="sparks">
        <!-- 5 颗火花，各自飞散方向不同 -->
            <span style="--dx: 40px; --dy: -20px;"></span>
            <span style="--dx: 30px; --dy: -10px;"></span>
            <span style="--dx: 50px; --dy:   0px;"></span>
            <span style="--dx: 45px; --dy:  15px;"></span>
            <span style="--dx: 35px; --dy:   5px;"></span>
            <span style="--dx: 35px; --dy:   5px;"></span>
            <span style="--dx: 45px; --dy:   5px;"></span>
            <span style="--dx: 55px; --dy:   5px;"></span>
            <span style="--dx: 55px; --dy:   15px;"></span>
            <span style="--dx: 55px; --dy:   7px;"></span>
            <span style="--dx: 55px; --dy:   8px;"></span>
            <span style="--dx: 55px; --dy:   2px;"></span>

        </div>
    </div>
</template>

<style scoped>
    .forge{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #body{
        position: absolute;
        z-index: 2;
        -webkit-user-drag: none;
        /* border: 1px solid blue; */
    }
    #arm{
        position: absolute;
        transform-origin: center center;
        animation: swing 2s ease-in-out infinite;
        -webkit-user-drag: none;

        /* border: 1px solid red; */
        --arm-h-deviation: -32px;
        --arm-v-deviation: -10px;
    }

    .sparks{
        position: absolute;
        z-index: 3;
        /* border: 1px solid red; */
        transform: translate(120px, -80px);
    }

    .sparks span {
        position: absolute;
        width: 8px; height: 8px;
        background: rgb(249, 174, 0);
        /* border-radius: 50%; */
        opacity: 0;
        /* 同步用 2s 无限循环 */
        animation: spark 2s ease infinite;
    }

    .sparks span:nth-child(4n+1){
        position: absolute;
        width: 20px; height: 20px;
        background: rgb(255, 221, 0);
        /* border-radius: 50%; */
        opacity: 0;
        /* 同步用 2s 无限循环 */
        animation: spark 2s ease infinite;
    }
        
    @keyframes spark {
        0%, 34%, 51%, 70%, 100% {
            opacity: 0;
            transform: translate(0, 0) scale(1);
        }
        35% {
            opacity: 1;
        }
        50% {
            opacity: 1;
            transform: translate(var(--dx), var(--dy)) scale(0.3);
        }
        
    }
    

    @keyframes swing {
        0%{

            transform: translateX(var(--arm-h-deviation)) translateY(var(--arm-v-deviation)) rotate(20deg);
        }
        35%{
            transform: translateX(var(--arm-h-deviation)) translateY(var(--arm-v-deviation)) rotate(50deg);
        }
        70%{
            transform: translateX(var(--arm-h-deviation)) translateY(var(--arm-v-deviation)) rotate(50deg);
        }
        100%{
            transform: translateX(var(--arm-h-deviation)) translateY(var(--arm-v-deviation)) rotate(20deg);
        }
    }


</style>