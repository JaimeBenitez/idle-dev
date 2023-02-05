<template>    
    <div class="tech">
        <section class="tech-leftPart">
            <img :src="logo" :alt="techName" class="tech-logo"/>
            <p class="tech-actual-quantity">{{ formattedQuantity }}</p>
        </section>
        <section class="tech-middlePart">
            <span class="techname">{{ techName }}</span>
            <span class="actualProfit">{{ formattedTotalProfit }}</span>
        </section>        
        <button class="tech-addButton" v-on:click = buy() :disabled="!canBuy">
           <span>{{ quantityToBuy }} x {{ formattedTotalCost }}</span> 
           <img src="../assets/sd-card-outline-rounded.svg" alt="mejora" class="improve-logo"/>
        </button>        
    </div>
</template>
<script>
import formatNumber from '@/utils/formatters'

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
  computed:{    
    formattedQuantity(){
      return formatNumber(this.quantity,"", true)      
    },
    formattedTotalProfit(){
      return formatNumber(this.totalProfit,"€/s")      
    },
    formattedTotalCost(){
      return formatNumber(this.currentCost,"€")      
    }
  },   
  methods:{        
    buy(){         
        this.$emit('buy', this.id)                       
    }    
  }  
}
</script>