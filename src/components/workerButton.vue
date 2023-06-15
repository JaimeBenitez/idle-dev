<template>
     <button class="worker-list__worker" @click="details">
        <img :src="logo" class="worker-list__worker-logo" alt="">
        <p class="worker-list__worker-name">{{ workerName }}</p>
    </button>
</template>

<script>
    /**
     * @file workerButton.vue - Botón de trabajador
     * @author Jaime Benitez
     * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
     */
    /**
     * @vue-prop {Number} id - Id del trabajador
     * @vue-prop {String} workerName - Nombre del trabajador
     * @vue-prop {Boolean} logo - Imagen del trabajdor
     * @vue-event {Number} details - Emite al padre la id del trabajador elegido
     */
    export default {
        name: "workerButton",
        props: {
            id: Number,
            workerName: String,
            logo: String
        },
        methods: {
            details(){
                this.$emit("details",this.id)
            }
        }
    }
</script>