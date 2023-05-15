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
 * @file button.vue - Componente modal que aparecerá en las diferentes pantallas
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
/**
 * @vue-prop {String} msg - Establece el mensaje que aparecerá en el modal
 * @vue-prop {String} buttonMsg - Establece el texto del boton de cierre o redirección del modal
 * @vue-prop {String} buttonMsg - Establece el texto del boton de cierre o redirección del modal
 * @vue-prop {String} redirect - Establece la ruta de redirección del botón de cierre del modal, en caso de que la haya
 * @vue-prop {Boolean} isGame - Establece si el modal está o no en la pantalla de juego para modificar su comportamiento
 * @vue-data {Boolean} close - Valor que se emitira al componente padre para decirle cuando debe cerrarse el modal
 * @vue-event {Boolean} close - Emite al padre la señal de cuando el modal debe cerrarse
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