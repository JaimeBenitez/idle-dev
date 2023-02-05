<template>
  <Header />
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
    <section class="principal-score">
      <span class="money">{{ formattedPrincipalMoney }}</span>
      <span class="generation">{{ formattedMoneyPerSecond }}</span>
    </section>
  </div>
</template>

<script>
//Para poder usar las imagenes correctamente como props tenemos que importarlas aqui y usarlas como variable de Data
import Header from './header.vue'
import MultiplierButton from './multiplier-button.vue'
import TechButton from './tech-button.vue'
import HTML from '@/assets/html.svg'
import CSS from '@/assets/css.svg'
import formatNumber from '@/utils/formatters'
//Meter en base de datos principalMoney,unlocked, quantity owned

export default {
  name: 'GamePage',
  components: {
    Header,
    MultiplierButton,
    TechButton
  },
  data() {
    return {
      quantityToBuy: 1,
      principalMoney: 10,
      moneyPerSecond: 0,
      totalProfit: 0,
      techs: [
        {
          "id": 1,
          "name": "Html",
          "logo": HTML,
          "initialCost": 5,
          "profitPerUnit": 5,
          "growthRatio": 1.07,
          "minMoneyToUnlock": 0,
          "unlocked": true,
          "quantityOwned": 0,
          "currentCost": 5,
          "totalProfit": 0,
        },
        {
          "id": 2,
          "name": "Css",
          "logo": CSS,
          "initialCost": 10,
          "profitPerUnit": 10,
          "growthRatio": 1.15,
          "minMoneyToUnlock": 40,
          "unlocked": false,
          "quantityOwned": 0,
          "currentCost": 10,
          "totalProfit": 0,
        }
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
    activeTechs() {
      //Nos dice que tecnologias mostrar con nuestras ganancias actuales
      return this.techs.filter((tech) => tech.unlocked == true)
    }
  },
  methods: {
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
      }
    },
  },
  mounted() {
    this.setMoneyPerSecondInterval();
  }
}
</script>