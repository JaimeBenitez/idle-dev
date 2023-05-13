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
        closeModal(){
            this.$emit("close")
        },
        hired(workerPrice){
            this.$emit("hired", workerPrice)
        }
    },
}
</script>