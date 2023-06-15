<template>
    <div class="company-detailed__container">
        <span v-if="level != 0" class="company-detailed__name">{{ companyName }}</span>
        <span v-if="level == 0" class="company-detailed__name">?????????????????</span>
        <img :src="logo" class="company-detailed__logo" alt="logo" />
        <span v-if="level != 0" class="company-detailed__level">Nivel {{ level }}</span>
        <span v-if="level != 0" class="company-detailed__bonus-text"> x{{ bonus }} en dinero y PA en: </span>
        <span v-if="level == 0" class="company-detailed__bonus-text"> Bono de dinero y PA en: </span>
        <div  class="tech-logo--list">
            <img  class="tech-logo" v-for="tech in techsLogos" :key="tech.src" :src="tech.src" :alt="tech.alt" />
        </div>
        <span v-if="level != 5" class="company-detailed__requirement-title"> Requerimientos nivel {{ level + 1 }}</span>
        <span v-if="level == 5" class="company-detailed__requirement-title"> ENHORABUENA</span>
        <span class="company-detailed__requirement-text">{{ requirement }}</span>
    </div>
</template>

<script>
    /**
     * @file companyDetails.vue - Pestaña de detalle de compañia
     * @author Jaime Benitez
     * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
     */
    /**
     * @vue-prop {Number} id - Establece la id de la compañia
     * @vue-prop {String} logo - Establece la ruta al logo de la compañia
     * @vue-prop {Array<Object>} techLogos - Establece las rutas de los logos de las tecnologías a las que la empresa afecta
     * @vue-prop {String} companyName - Establece el nombre de la compañia
     * @vue-prop {String} level - Establece el nivel actual de la compañia
     * @vue-prop {String} requirement - Establece el requisito para la subida de nivel de la compañia
     */
    export default{
        "name": "companyDetails",
        "props": {
            "companyName": String,
            "logo": String,
            "techsLogos": Array[Object],
            "bonus": Number,
            "level": Number,
            "requirement": String
        }
    } 
</script>