<template>
  <Header icon="logout.svg"/>
  <div class="game">
    <section class="tech-container">
      <nav class="multipliers-nav">
        <MultiplierButton text="x1" v-on:click="setQuantityToBuy(1)" />
        <MultiplierButton text="x10" v-on:click="setQuantityToBuy(10)" />
        <MultiplierButton text="x100" v-on:click="setQuantityToBuy(100)" />
      </nav>
      <TechButton v-for="tech in activeTechs" :key="tech.id" :id="tech.id" :logo="tech.logo" :techName="tech.name"
        :totalProfit="tech.totalProfit" :quantity="tech.quantityOwned" :quantityToBuy="quantityToBuy"
        :currentCost="tech.currentCost" @buy="handleBuy" :canBuy="tech.currentCost <= principalMoney" />
    </section>
    <section class="principal">
      <section class="principal-score">
        <span class="money">{{ formattedPrincipalMoney }}</span>
        <span class="generation">{{ formattedMoneyPerSecond }}</span>
        <span class="generation">{{ formattedMoneyPerClick }}<img src='@/assets/hand-click.svg' alt="click" class="click"/></span>        
      </section>
      <button class="computer-button" @click="handleClicks"><img :class="bounce" src="@/assets/ordenador.png" alt="click me" /></button>  
    </section> 
    <Modal v-if="showstartmodal" msg="Bienvenido al fantástico mundo de la programación. Te espera un gran viaje a traves de la historia de la informática.
     Haz click en el ordenador para ganar beneficios y empezar a comprar las tecnologías que irás aprendiendo" buttonMsg="Comencemos" redirect="/game" 
    textClass="modal-game-message" :isGame=true @close="handleStartClose" /> 
  </div>
</template>

<script>
//Para poder usar las imagenes correctamente como props tenemos que importarlas aqui y usarlas como variable de Data
import Header from './header.vue'
import MultiplierButton from './multiplier-button.vue'
import TechButton from './tech-button.vue'
import HTML from '@/assets/html.svg'
import CSS from '@/assets/css.svg'
import JS from '@/assets/js.svg'
import Node from '@/assets/nodejs.svg'
import Java from '@/assets/java.svg'
import PHP from '@/assets/php.svg'
import formatNumber from '@/utils/formatters'
import Modal from './modal.vue'

//Meter en base de datos principalMoney,unlocked, quantity owned

export default {
  name: 'GamePage',
  components: {
    Header,
    MultiplierButton,
    TechButton,
    Modal
  },
  data() {
    return {
      quantityToBuy: 1,
      principalMoney: 0,
      moneyPerSecond: 0,
      moneyPerClick: 0.1,
      totalProfit: 0,      
      bounce: "principal-pc",
      showstartmodal: true,
      techs: [
        {
          "id": 1,
          "name": "Html",
          "logo": HTML,
          "initialCost": 3.7,
          "profitPerUnit": 1.67,
          "growthRatio": 1.07,
          "minMoneyToUnlock": 3.7,
          "unlocked": false,
          "quantityOwned": 0,
          "currentCost": 3.7,
          "totalProfit": 0,
        },
        {
          "id": 2,
          "name": "Css",
          "logo": CSS,
          "initialCost": 60,
          "profitPerUnit": 20,
          "growthRatio": 1.15,
          "minMoneyToUnlock": 60,
          "unlocked": false,
          "quantityOwned": 0,
          "currentCost": 60,
          "totalProfit": 0,
        },
        {
          "id": 3,
          "name": "JavaScript",
          "logo": JS,
          "initialCost": 720,
          "profitPerUnit": 90,
          "growthRatio": 1.14,
          "minMoneyToUnlock": 720,
          "unlocked": false,
          "quantityOwned": 0,
          "currentCost": 720,
          "totalProfit": 0,
        },
        {
          "id": 4,
          "name": "NodeJS",
          "logo": Node,
          "initialCost": 8640,
          "profitPerUnit": 360,
          "growthRatio": 1.13,
          "minMoneyToUnlock": 8640,
          "unlocked": false,
          "quantityOwned": 0,
          "currentCost": 8640,
          "totalProfit": 0,
        },
        {
          "id": 5,
          "name": "Java",
          "logo": Java,
          "initialCost": 103680,
          "profitPerUnit": 2160,
          "growthRatio": 1.12,
          "minMoneyToUnlock": 103680,
          "unlocked": false,
          "quantityOwned": 0,
          "currentCost": 103680,
          "totalProfit": 0,
        },
        {
          "id": 6,
          "name": "PHP",
          "logo": PHP,
          "initialCost": 1244160,
          "profitPerUnit": 6480,
          "growthRatio": 1.11,
          "minMoneyToUnlock": 1244160 ,
          "unlocked": false,
          "quantityOwned": 0,
          "currentCost": 1244160,
          "totalProfit": 0,
        },

      ]
    }
  },
  computed: {
    formattedPrincipalMoney() {
      return formatNumber(this.principalMoney, "€")
    },
    formattedMoneyPerSecond() {
      return formatNumber(this.moneyPerSecond, "€/s")
    },
    formattedMoneyPerClick() {
      return formatNumber(this.moneyPerClick, "€/")
    },
    activeTechs() {
      //Nos dice que tecnologias mostrar con nuestras ganancias actuales
      return this.techs.filter((tech) => tech.unlocked == true)
    }
  },
  methods: {
    handleStartClose(){
      
      this.showstartmodal = false;
    },
    setQuantityToBuy(quantity) {
      //Establecemos la cantidad a comprar y seteamos el coste actual
      this.quantityToBuy = quantity
      for (let i = 0; i < this.techs.length; i++) {
        let tech = this.techs[i]
        tech.currentCost = tech.initialCost * ((tech.growthRatio ** tech.quantityOwned * ((tech.growthRatio ** this.quantityToBuy) - 1)) / (tech.growthRatio - 1))
      }
    },
    handleMoney() {
      //Añadimos a la cantidad principal la ganancia actual por segundo
      this.principalMoney += this.moneyPerSecond
      const lockedTechs = this.techs.filter((tech) => tech.unlocked == false)
      //Establecemos la condición para desbloquear la siguiente tecnologia
      for (let i = 0; i < lockedTechs.length; i++) {
        let tech = lockedTechs[i]
        if (tech.minMoneyToUnlock <= this.principalMoney) {
          tech.unlocked = true
        }
      }
    },    
    setMoneyPerSecondInterval() {
      setInterval(this.handleMoney, 1000);
    },
    handleBuy(techId) {
      const tech = this.techs.find((tech) => tech.id == techId)
      //Solo reacciona si encontramos anteriormente una tecnologia con la ID que buscamos
      if (tech) {
        //Añadimos la cantidad de la tecnologia concreta
        tech.quantityOwned += this.quantityToBuy
        //Establecemos la diferencia de ganancia entre antes y despues de la compra
        let profitDiff = (tech.quantityOwned * tech.profitPerUnit) - tech.totalProfit
        //Cantidad total de ganancia
        tech.totalProfit = tech.profitPerUnit * tech.quantityOwned
        //Quitamos del dinero principal el coste actual 
        this.principalMoney -= tech.currentCost
        //Establecemos el nuevo coste
        tech.currentCost = tech.initialCost * ((tech.growthRatio ** tech.quantityOwned * ((tech.growthRatio ** this.quantityToBuy) - 1)) / (tech.growthRatio - 1))
        //Añadimos la nueva ganancia a la ganancia/segundo actual
        this.moneyPerSecond += profitDiff
        this.moneyPerClick = this.moneyPerSecond * 0.1
      }
    },
    handleClicks(){      
      //Añadimos la animación de rebote y el dinero al principal. Seteamos la perdida de la clase al tiempo que dura la animación y nos queda perfecta
      this.bounce = "principal-pc animated" 
      this.principalMoney += this.moneyPerClick 
      setTimeout(() => {this.bounce = "principal-pc"},500)              
    }
  },
  mounted() {
    this.setMoneyPerSecondInterval();
         
  }
}
</script>