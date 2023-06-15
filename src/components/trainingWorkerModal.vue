<template>
    <section class="modal">
        <div class="trainingModal">
            <div class="training_list">
                <WorkerButton v-for="worker in workers" 
                :key="worker.id" 
                :id="worker.id" 
                :logo="worker.image" 
                :workerName="worker.name" 
                @details="chosen" />              
            </div>   
            <button  @click="closeModal" class="close training-close">Cerrar</button>  
        </div>    
    </section>
</template>
<script>
    import WorkerButton from "./workerButton.vue"

/**
 * @file trainingWorkerModal.vue - Modal de entrenamiento de trabajadores
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
/**
 * @vue-prop {Array<Object>} workers - Todos los trabajdores de la partida
 * @vue-data {Boolean} close - Valor que se emitira al componente padre para decirle cuando debe cerrarse el modal
 * @vue-event {Boolean} close - Emite al padre la señal de cuando el modal debe cerrarse
 * @vue-event {Number} chosen - Emite al padre la id del trabajador elegido
 */
export default {
    name: "trainingWorkerModal",
    props: {        
        workers: Array[Object],   
    },
    components: {
        WorkerButton
    },
    data(){
        return{
            close: true
        }
    },
    methods:{
        closeModal(){
            this.$emit("close")
        },
        chosen(workerId){
            this.$emit("chosen", workerId)
        }
    },
}
</script>