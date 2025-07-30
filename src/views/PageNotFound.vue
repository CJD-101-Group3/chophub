<script>
export default {
    data(){
        return {
            ironImages: [
                '/img/iron.png',
                '/img/4.png',
                '/img/40.png',
                '/img/404.png'
            ],
            currentIndex: 0,
            halfTimer: null,
            swingDuration: 2000,
            ironScales:[
                1.5,
                1.4,
                1.4,
                1.4
            ],
            irondx:[
                0,
                50,
                50,
                50
            ]
        }
    },
    computed: {
        ironSrc(){
            return this.ironImages[this.currentIndex]
        },
        ironStyle(){
            const s = this.ironScales[this.currentIndex] || 1;
            const d = this.irondx[this.currentIndex] || 0;
            return {
                transform: `scale(${s}) translateY(-20px) translateX(${d}px)`
            }
        }
    },
    methods: {
        onSwingCycleStart(){
            if (this.halfTimer) clearTimeout(this.halfTimer);

            this.halfTimer = setTimeout(()=>{
                if (this.currentIndex < this.ironImages.length -1){
                    this.currentIndex++;
                }
            }, this.swingDuration / 2)
        }
    },
    beforeUnmount() {
        if (this.halfTimer) clearTimeout(this.halfTimer);
    },
}
</script>
<template>
    <!-- 鐵匠敲鐵塊 -->
    <div class="forge">
        <img src="/img/body.png" alt="" id="body">
        <img src="/img/arm.png" alt="" id="arm" @animationiteration="onSwingCycleStart" @animationstart="onSwingCycleStart">
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
        <img :src="ironSrc" alt="" id="iron" :style="ironStyle">
    </div>

    <div id="slogan">
        <h1>Looks like You're Lost Here</h1>
    </div>
    <router-link to="/post">
            <div id="returnBtn">
                <h6>Let Me Take You Home</h6>
            </div>
    </router-link>
</template>

<style scoped>
    .forge{
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(-350px) translateY(-70px) scale(1.2);
    }
    .forge::after{
        content: "";
        display: block;
        background-color: #313131;
        width: 1000px;
        height: 75px;
        border-radius: 100%;
        transform: translateY(110px) translateX(350px);
        z-index: -1;

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
        animation: spark 2s ease infinite;
    }

    .sparks span:nth-child(4n+1){
        position: absolute;
        width: 20px; height: 20px;
        background: rgb(255, 221, 0);
        /* border-radius: 50%; */
        opacity: 0;
        animation: spark 2s ease infinite;
    }

    #iron{
        position: absolute;
        right: 14%;
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

    @keyframes awray {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }

    #slogan{
        position: absolute;
        right: 30%;
        top: 65%;
        font-weight: 600;
        animation: awray 2s ease;
    }

    #returnBtn {
        position: absolute;
        top: 80%;
        right: 38%;
        display: inline-block;
        padding: 30px 60px;
        background-color: #ff8b4c;
        border-radius: 40px;
        box-shadow: 0 12px 0 #979797;
        transition: transform 0.1s ease, box-shadow 0.1s ease;
        cursor: pointer;
        user-select: none;
        width: auto;
        height: auto;
    }

    
    #returnBtn h6 {
        margin: 0;
        /* font-size: 1rem; */
        color: #fff;
        text-align: center;
        font-size: 28px;
    }

    #returnBtn:hover {
        transform: translateY(2px);
        box-shadow: 0 6px 0 #909090;
    }

    #returnBtn:active {
        transform: translateY(8px);
        box-shadow: 0 0 0 #707070;
    }
</style>