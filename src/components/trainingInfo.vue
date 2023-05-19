<template>
    <div class="trainingContainer">
        <section class="training__section">
            <img class="training__workerLogo" :src="training.workerLogo" alt=""/>
            <p class="training__text">{{ training.workerName  }}</p>
        </section>
        <section class="training__section">
            <img class="training__techLogo" :src="training.techLogo" alt=""/>
            <p class="training__text">{{ training.techActualLevel }}</p>
            <img class="training-arrow" alt="a" :src="require('@/assets/arrow-down.svg')"/>
            <p class="training__text">{{ training.techNextLevel }}</p>
        </section>
        <section class="training__section">
            <p class="training__text">Proximo nivel</p>
            <img v-if='training.upgradeLogo != "" ' class="training__upgradeLogo" :src="training.upgradeLogo" alt=""/>
            <p class="training__text"><b>{{ training.upgradeDescription }}</b></p>
        </section> 
        <section class="training__section">
            <p class="training__text">{{ training.pa }} <img :src="require('@/assets/bulb.svg')"/>/s</p>
            <p class="training__text">{{ actualExp }}/{{ training.expToLevelUp }}</p>
            <!-- timer -->
            <p class="training__text">{{ timeToLevelUp }} segs</p>

        </section>   
    </div>
</template>

<script>
    export default {
        name: "TrainingInfo",
        props: {
            training: Object
        },
        data(){
            return{
                actualExp: this.training.actualExp,
                timeToLevelUp: 0
            }  
        },
        methods: {
            handleTimer(){
                
                this.actualExp += parseInt(this.training.pa.toFixed(0));
                this.timeToLevelUp = ((this.training.expToLevelUp - this.actualExp)/this.training.pa).toFixed(0)
            },
            setTimerInterval(){
                setInterval(this.handleTimer, 1000)
            }
        },
        mounted(){
            this.setTimerInterval()
        }
        
    }
</script>

