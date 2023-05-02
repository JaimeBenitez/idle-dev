<template>
    <div class="company-detailed__container">
        <span v-if="level != 0" class="company-detailed__name">{{ companyName }}</span>
        <span v-if="level == 0" class="company-detailed__name">?????????????????</span>
        <img :src="logo" class="company-detailed__logo" alt="logo" />
        <span v-if="level != 0" class="company-detailed__level">Nivel {{ level }}</span>
        <span v-if="level != 0" class="company-detailed__bonus-text"> x{{ bonus * level }} PA a sus miembros en: </span>
        <span v-if="level == 0" class="company-detailed__bonus-text"> Aporta un bono de PA para sus miembros en: </span>
        <TechLogoList :techsLogos ="techsLogos" :isWorker="false"/>
        <span class="company-detailed__requirement-title"> Requerimientos nivel {{ level + 1 }}</span>
        <span class="company-detailed__requirement-text">{{ requirement }}</span>
        <GameButton class="company-detailed__button"  text="Trabajadores" />
    </div>
</template>

<script>
import GameButton from './gameButton.vue';
import TechLogoList from './techLogoList.vue';

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
            GameButton,
            TechLogoList
        }
    } 
</script>