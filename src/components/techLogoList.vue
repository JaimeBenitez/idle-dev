<template>
    <div>
        <div v-if="!isWorker" class="tech-logo--list">
                <img  class="tech-logo" v-for="tech in companyTechs" :key="tech.src" :src="tech.src" :alt="tech.alt" />
        </div>
        <div class="techLevels" v-if="isWorker" >
            <div v-for="tech in workerTechs" :key="tech.techName">
                <img class="tech-logo"  :src="tech.logo" :alt="tech.techName" />
                <p  class="tech-level">{{ tech.level }}</p>
            </div>
        </div>
    </div>
    
</template>

<script>
    export default{
        name: 'techLogoList',
        props: {
            techs: Array[Object],
            isWorker: Boolean
            
        },
        data (){
            return {
                companyTechs: [],
                workerTechs: [],
            }
        },
        methods: {
            chooseTechList(){
                if(this.isWorker){
                    this.workerTechs = this.techs
                }else{
                    this.companyTechs = this.techs
                }
            }
        },
        mounted(){
            this.chooseTechList()
        }
        
    }
</script>