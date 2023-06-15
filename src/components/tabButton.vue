<template>
    <button class="game-tab"><img :src="img" :alt="alt" class="tab-img" v-bind:class="{active: isActive }"/></button>
</template>

<script>
    /**
     * @file tabButton.vue - Componente botón para las diferentes pestañas
     * @author Jaime Benitez
     * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
     */
    /**
     * @vue-prop {String} img - Logo de la pestaña
     * @vue-prop {String} alt - Texto alternativo
     * @vue-prop {Boolean} isActive - Establece si la pestaña está activa o no
     * @vue-prop {String} level - Establece el nivel actual de la compañia
     */
    export default{
        name: "tabButton",
        props: {
            img: String,
            alt: String,
            isActive: Boolean
        },
    }
</script>