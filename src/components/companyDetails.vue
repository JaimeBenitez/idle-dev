<template>
    <div class="company-detailed__container">
        <span v-if="level != 0" class="company-detailed__name">{{ companyName }}</span>
        <span v-if="level == 0" class="company-detailed__name">?????????????????</span>
        <img :src="logo" class="company-detailed__logo" alt="logo" />
        <span v-if="level != 0" class="company-detailed__level">Nivel {{ level }}</span>
        <span v-if="level != 0" class="company-detailed__bonus-text"> x{{ bonus }} PA a sus miembros en: </span>
        <span v-if="level == 0" class="company-detailed__bonus-text"> Aporta un bono de PA para sus miembros en: </span>
        <div  class="company-detailed__tech-logo--list">
            <img class="company-detailed__tech-logo" v-for="logo in techsLogos" :key="logo.src" :src="logo.src" :alt="logo.alt" />
        </div>
        <span class="company-detailed__requirement-title"> Requerimientos nivel {{ level + 1 }}</span>
        <span class="company-detailed__requirement-text">{{ requirement }}</span>
        <MultiplierButton class="company-detailed__button"  text="Trabajadores" />
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