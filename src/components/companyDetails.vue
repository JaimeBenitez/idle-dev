<template>
    <div>
        <span class="name">{{ companyName }}</span>
        <img :src="logo" class="company-detailed__logo" alt="logo" />
        <span class="company-detailed__level">Nivel {{ level }}</span>
        <span> x{{ bonus }} PA a sus miembros en: </span>
        <img v-for="logo in techsLogos" :key="logo.src" :src="logo.src" :alt="logo.alt" />
        <span> Requerimientos nivel {{ level }}</span>
        <span>{{ requirement }}</span>
        <MultiplierButton text="Trabajadores" />
    </div>
</template>

<script>
import MultiplierButton from './multiplier-button.vue';

    export default{
        "name": "companyDetails",
        "props": {
            "companyName": String,
            "logo": String,
            "techsLogos": Array[Object],
            "bonus": Number,
            "level": Number,
            "requirement": String
        },
        components: {
    MultiplierButton,
    
}
    } 
</script>