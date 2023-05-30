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
            <p class="training__text">{{ training.pa.toFixed(2) }} <img :src="require('@/assets/bulb.svg')"/>/s</p>
            <!-- Hacemos estas comprobaciones para evitar que visualmente se vea que se pasa de los esperado el temporizador -->
            <p class="training__text">{{ training.actualExp <= training.expToLevelUp ? training.actualExp : training.expToLevelUp }}/{{ training.expToLevelUp }}</p>     
            <p class="training__text">{{ timeToLevelUp >= 0 ? timeToLevelUp : 0 }} segs</p>

        </section>   
    </div>
</template>

<script>
    export default {
        name: "TrainingInfo",
        props: {
            training: Object,
        },
        computed: {
            timeToLevelUp() {
                return parseInt(((this.training.expToLevelUp - this.training.actualExp)/this.training.pa).toFixed(0))
             }
        }
    }   
</script>

