<template>
    <button class="tech-list__tech" @click="choose">
       <img :src="logo" class="tech-list__tech-logo" alt="">
       <p class="tech-list__tech-level">{{ techLevel }}</p>
   </button>
</template>

<script>
   export default {
       name: "workerButton",
       props: {
           id: Number,
           workerTechs: Array[Object],
           logo: String
       },
       data(){
        return({
            techLevel: ""
        })
       },
       methods: {
            getTechLevel(){
                console.log(this.workerTechs)
                console.log(this.id)
                let actualTech = this.workerTechs.find((tech) => (tech.languageId == this.id ))
                if(actualTech){
                    this.techLevel = actualTech.level
                }else{
                    this.techLevel = "nulo"
                }
            },
           choose(){
               this.$emit("choose",this.id)
           }
       },
       mounted(){
        this.getTechLevel()
       }
   }
</script>