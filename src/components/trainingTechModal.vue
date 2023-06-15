<template>
    <section class="modal">
        <div class="trainingModal">
            <div class="training_list">
                <TechTrainingButton v-for="tech in techs" 
                :key="tech.id" 
                :id="tech.id" 
                :logo="tech.logo" 
                :workerTechs="workerTechs" 
                @choose="chosen" />              
            </div>   
            <button  @click="closeModal" class="close training-close">Cerrar</button>  
        </div>    
    </section>
</template>
<script>
    import TechTrainingButton from "./techTrainingButton.vue"

/**
 * @file trainingTechModal.vue - Modal de elección de tecnología a entrenar
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
/**
 * @vue-prop {Array<Object>} workerTechs - Tecnologias del trabajador
 * @vue-prop {Array<Object>} techs- Todas las tecnologias 
 * @vue-data {Boolean} close - Valor que se emitira al componente padre para decirle cuando debe cerrarse el modal
 * @vue-event {Boolean} close - Emite al padre la señal de cuando el modal debe cerrarse
 * @vue-event {Number} chosen - Emite al padre la id de la tecnología elegida
 */
export default {
    name: "trainingWorkerModal",
    props: {        
        workerTechs: Array[Object],
        techs: Array[Object]   
    },
    components: {
        TechTrainingButton
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
        chosen(techId){
            this.$emit("chosen", techId)
        }
    },
}
</script>