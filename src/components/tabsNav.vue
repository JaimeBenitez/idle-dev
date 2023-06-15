<template>
    <nav class="tab-nav">
        <TabButton :img="images[0]" alt="Tecnologías" :isActive="techActive" @click="setTabActive(1)" />
        <TabButton :img="images[1]" alt="Empleados" :isActive="employeesActive" @click="setTabActive(2)"/>
        <TabButton :img="images[2]" alt="Formación" :isActive="learningActive" @click="setTabActive(3)"/>
        <TabButton :img="images[3]" alt="Compañías" :isActive="companiesActive" @click="setTabActive(4)"/>
    </nav>
</template>

<script>
import TabButton from "./tabButton.vue" 
import techs from "../assets/language.svg"
import employees from "../assets/employee.svg"
import learning from "../assets/learning.svg"
import companies from "../assets/company.svg"
    /**
     * @file tabsNav.vue - Barra de navegación de pestañas
     * @author Jaime Benitez
     * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
     */
    /**
     * @vue-data {Array<String>} images - Logos de las diferentes pestañas
     * @vue-data {Boolean} [techActive = true] - Si la pestaña de tecnologias esta activa
     * @vue-data {Boolean} [employeesActive = false] - Si la pestaña de trabajdores esta activa
     * @vue-data {Boolean} [learningActive = false] - Si la pestaña de entrenamiento esta activa
     * @vue-data {Boolean} [companiesActive = false] - Si la pestaña de compañias esta activa
     */
    export default{
        name: "tabsNav",
        components: {
            TabButton
        },
        data(){
            return {
                images: [techs, employees, learning, companies],
                techActive: true,
                employeesActive: false,
                learningActive: false,
                companiesActive: false
            }
        },
        methods: {
            /**
            * Función que gestiona el cambio de pestañas
            * @param {Number} activeTab - pestaña activa
            */
            setTabActive(activeTab){
                this.techActive = false
                this.employeesActive = false
                this.learningActive = false
                this.companiesActive = false
                switch(activeTab){
                    case 1:
                        this.techActive = true
                        this.$emit("tab1")
                        break
                    case 2:
                        this.employeesActive = true
                        this.$emit("tab2")
                        break
                    case 3:
                        this.learningActive = true
                        this.$emit("tab3")
                        break
                    case 4:
                        this.companiesActive = true
                        this.$emit("tab4")
                        break
                }

            }
        }
    }
</script>