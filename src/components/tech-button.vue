<template>
  <div class="tech">
    <section class="tech-leftPart">
      <img :src="logo" :alt="techName" class="tech-logo" />
      <p class="tech-actual-quantity">{{ formattedQuantity }}</p>
    </section>
    <section class="tech-middlePart">
      <span class="techname">{{ techName }}</span>
      <span class="actualProfit">{{ formattedTotalProfit }}</span>
    </section>
    <button class="tech-addButton" v-on:click=buy() :disabled="!canBuy">
      <span>{{ quantityToBuy }} x {{ formattedTotalCost }}</span>
      <img src="../assets/sd-card-outline-rounded.svg" alt="mejora" class="improve-logo" />
    </button>
  </div>
</template>
<script>
/**
 * @file tech-button.vue - Componente de botón de tecnología
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
import formatNumber from '@/utils/formatters'
/**
 * @vue-prop {Number} id - Id de la tecnología
 * @vue-prop {String} logo - Ruta al logo
 * @vue-prop {String} techname - Nombre de la tecnología
 * @vue-prop {Number} quantityToBuy - Cantidad de la tecnología a comprar
 * @vue-prop {Number} currentCost - Coste actual de comprar las unidades especificadas de la tecnología
 * @vue-prop {Number} quanity - Cantidad en posesión actual
 * @vue-prop {Number} totalProfit - Cantidad de dinero que genera esta tecnología con su cantidad total actual
 * @vue-prop {Boolean} canBuy - Controla si se puede o no hacer la compra especificada con la cantidad de dinero actual
 * @vue-computed {String} formattedQuantity - Devuelve la cantidad de producto formateada
 * @vue-computed {String} formattedTotalProfit - Devuelve la generación de dinero de la tecnología formateada
 * @vue-computed {String} formattedTotalCost - Devuelve el coste actual de compra formateado
 * @vue-event {Number} buy - Emite al padre la id de la tecnología que se esta comprando 
 */
export default {
  name: 'TechButton',
  props: {
    id: Number,
    logo: String,
    techName: String,
    quantityToBuy: Number,
    currentCost: Number,
    quantity: Number,
    totalProfit: Number,
    canBuy: Boolean
  },
  computed: {
    formattedQuantity() {
      return formatNumber(this.quantity, "", true)
    },
    formattedTotalProfit() {
      return formatNumber(this.totalProfit, "€/s")
    },
    formattedTotalCost() {
      return formatNumber(this.currentCost, "€")
    }
  },
  methods: {
    buy() {
      this.$emit('buy', this.id)
    }
  }
}
</script>