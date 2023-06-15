<template>
    <section class="modal">
        <div class="hiremodal-container">
            <div class="hireOptions-container">
                <WorkerHireOption :gameId="gameId" :techs="techs" :slotsOcuppied="slotsOcuppied" @hired="hired" /> 
                <WorkerHireOption :gameId="gameId" :techs="techs" :slotsOcuppied="slotsOcuppied" @hired="hired" /> 
                <WorkerHireOption :gameId="gameId" :techs="techs" :slotsOcuppied="slotsOcuppied" @hired="hired" /> 
            </div>          
            <button  @click="closeModal" class="close">Cerrar</button>
        </div>
    </section>
</template>
<script>
    import WorkerHireOption from "./workerHireOption.vue"

/**
 * @file hireModal.vue - Componente modal de contratación
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
/**
 * @vue-prop {Number} gameId - Id de la partida
 * @vue-prop {Array<Object>} techs - Lista de tecnologias
 * @vue-prop {Number} slotsOccupied - Ranuras de trabajador ocupadas actualmente
 */
export default {
    name: "HireModal",
    props: {        
        gameId: Number,
        techs: Array[Object],
        slotsOcuppied: Number   
    },
    components: {
        WorkerHireOption
    },
    data(){
        return{
            close: true
        }
    },
    methods:{
        /**
        * Función que le dice al modal cuando cerrarse
        */
        closeModal(){
            this.$emit("close")
        },
        /**
         * Función que emite que se ha contratado un trabajador
         * @param {Number} workerPrice - precio del trabajador
         */
        hired(workerPrice){
            this.$emit("hired", workerPrice)
        }
    },
}
</script>