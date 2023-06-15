<template>
    <li class="worker-detailed__upgrade"><img class="worker-detailed__upgrade-logo" :src="logo" alt=""/>
    <span class="upgrade-name">{{ name }}</span> <span class="upgrade-description">{{ description }}</span></li> 
</template>

<script>
/**
 * @file workerUpgrade.vue - Mejora de un trabajador dentro de la lista de mejoras del detalle del trabajador
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
/**
 * @vue-prop {String} logo - Imagen de la mejora
 * @vue-prop {String} name - Nombre de la mejora
 * @vue-prop {String} description - Descripción de la mejora
 */
export default{
        "name": "workerUpgrade",
        "props": {
            "logo": String,
            "name": String,
            "description": String
        },
    } 
</script>