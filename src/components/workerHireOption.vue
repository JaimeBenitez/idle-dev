<template>
    <div class="option-container">
        <p class="hireWorker-info"><b>{{ worker.nombre }}</b></p>
        <p class="hireWorker-info"><b>PA:</b> {{ worker.generacion_pa }}/s </p>
        <p class="hireWorker-info"><b>{{ techs.find(tech => tech.id == language.id).name }}</b> - {{ language.nivel }}</p>
        <p class="hireWorker-info"><b>Coste: </b> {{ workerPrice }} €/s</p>
        <GameButton text="Contratar" @click="hire" id="hireButton"/>
    </div>
</template>

<script>
import displayWorkerLanguageHireOption from "@/utils/displayWorkerLanguageHireOption"
import makeWorker from "@/utils/makeWorker"
import { techLevelToNumber } from "@/utils/techLevelToNumber"
import GameButton from "./gameButton.vue"
import { hireWorker } from "@/services/workerServices"

export default {
    name: 'WorkerHireOption',
    props: {        
        gameId: Number,
        techs: Array[Object],
        slotsOcuppied:  Number   
    },
    components: {
        GameButton
    },
    data(){
    return{
        worker: makeWorker(this.gameId),
        language: displayWorkerLanguageHireOption(this.techs),
        workerPrice: 0
        }
    },
    methods: {
        calcPrice(){
            let levelToNumber = techLevelToNumber(this.language.nivel)
            this.workerPrice = (this.language.id + 1) * (levelToNumber * 100) * this.slotsOcuppied
           
        },
        hire(){
            
            hireWorker(this.worker,this.language)
            this.$emit("hired", this.workerPrice)
        }
    },
    mounted(){
        this.calcPrice()
    }

}

</script>