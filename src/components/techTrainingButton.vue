<template>
    <button class="tech-list__tech" @click="choose">
       <img :src="logo" class="tech-list__tech-logo" alt="">
       <p class="tech-list__tech-level">{{ techLevel }}</p>
   </button>
</template>

<script>
    /**
     * @file techTrainingButton.vue - Botón que aparece en el modal de elegir tecnología a entrenar
     * @author Jaime Benitez
     * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
     */
    /**
     * @vue-prop {Number} id - Id de la tecnología concreta
     * @vue-prop {Array<Object>} workerTechs - Tecnologias del trabajador concreto
     * @vue-prop {String} logo - Logo de la tecnología
     */
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