<template>
    <button class="company-list__company" @click="details">
        <img :src="logo" class="company-list__company-logo" :alt="level">
        <p class="company-list__company-name">{{ companyName }}</p>
    </button>
</template>

<script>
/**
 * @file companyButton.vue - Componente botón para la pestaña de compañias
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
/**
 * @vue-prop {Number} id - Establece la id de la compañia
 * @vue-prop {String} logo - Establece la ruta al logo de la compañia
 * @vue-prop {String} companyName - Establece el nombre de la compañia
 * @vue-prop {String} level - Establece el nivel actual de la compañia
 */
    export default {
        name: "companyButton",
        props: {
            id: Number,
            logo: String,
            companyName: String,
            level: String
        },
        methods: {
            /**    
            * Funcion que emite la id del trabajador al padre
            */
            details(){
                this.$emit("details",this.id)
            }
        }

    }
</script>