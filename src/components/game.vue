<template>
    <Header/>
    <div class="game">
      <section class="tech-container">
        <nav class="multipliers-nav">
          <MultiplierButton text="x1" v-on:click="setQuantityToBuy(1)"/>
          <MultiplierButton text="x10" v-on:click="setQuantityToBuy(10)"/>
          <MultiplierButton text="x100" v-on:click="setQuantityToBuy(100)"/>
        </nav>
        <TechButton :logo="html" techName="Html" :quantityToBuy="quantityToBuy" />
      </section>
    </div>
</template>
  
  <script>
  //Para poder usar las imagenes correctamente como props tenemos que importarlas aqui y usarlas como variable de Data
  import Header from './header.vue'
  import MultiplierButton from './multiplier-button.vue'
  import TechButton from './tech-button.vue'
  import HTML from '@/assets/html.svg'  
  export default {
    name: 'GamePage',
    components: {
      Header,
      MultiplierButton,
      TechButton      
    },
    data(){
      return{
        html: HTML,
        quantityToBuy: 1
      }
    },  
    methods: {
      setQuantityToBuy(quantity){
        this.quantityToBuy = quantity
      }
    }
  }
  </script>