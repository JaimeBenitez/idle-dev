<template>
    <section class="modal">
        <div class="modal-container">
            <p class="modal-message">{{ msg }}</p>
            <RouterLink v-if="!isGame" :to="redirect" class="redirect">{{ buttonMsg }}</RouterLink>
            <button v-if="isGame" @click="closeModal" class="close">{{ buttonMsg }}</button>
        </div>
    </section>
</template>
<script>
/**
 * @file modal.vue - Componente modal que aparecerá en las diferentes pantallas
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
/**
 * @vue-prop {String} msg - Establece el mensaje que aparecerá en el modal
 * @vue-prop {String} buttonMsg - Establece el texto del boton de cierre o redirección del modal
 * @vue-prop {String} redirect - Establece la ruta de redirección del botón de cierre del modal, en caso de que la haya
 * @vue-prop {Boolean} isGame - Establece si el modal está o no en la pantalla de juego para modificar su comportamiento
 * @vue-data {Boolean} close - Valor que se emitira al componente padre para decirle cuando debe cerrarse el modal
 * @vue-event {Boolean} close - Emite al padre la señal de cuando el modal debe cerrarse
 */
export default {
    name: "ModalComponent",
    props: {        
        msg: String,
        buttonMsg: String,
        redirect: String,        
        isGame: Boolean,
    },
    data(){
        return{
            close: true
        }
    },
    methods:{
        closeModal(){
            this.$emit("close")
        }
    }
}
</script>