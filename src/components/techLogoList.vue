<template>
    <div  class="tech-logo--list">
            <img class="tech-logo" v-for="logo in techsLogos" :key="logo.src" :src="logo.src" :alt="logo.alt" />
            <div class="techLevels" v-if="isWorker">
                <p  v-for="logo in techsLogos" :key="logo.src">{{ logo.alt }}</p>
            </div>
    </div>
</template>

<script>
    export default{
        name: 'techLogoList',
        props: {
            techsLogos: Array[Object],
            isWorker: Boolean
            
        }

    }
</script>