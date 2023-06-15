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
/**
 * @file workerHireOptions.vue - Opcion de contratación de un trabajador
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
/**
 * @vue-prop {String} gameId - Id de la partida
 * @vue-prop {Array<Object>} techs - Tecnologias
 * @vue-prop {Number} slotsOcuppied - Ranuras de trabajador ocupadas actualmente 
 * @vue-data {Object} worker - Trabajador generado
 * @vue-data {Object} language - Tecnología generada
 * @vue-data {Number} workerPrice - Precio del trabajador
 * @vue-event {Number} hired - Precio del trabajador
 */
export default {
    name: 'WorkerHireOption',
    props: {        
        gameId: Number,
        techs: Array[Object],
        slotsOcuppied: Number   
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
        async hire(){
            
            await hireWorker(this.worker,this.language)
            this.$emit("hired", this.workerPrice)
        }
    },
    mounted(){
        this.calcPrice()
    }

}

</script>