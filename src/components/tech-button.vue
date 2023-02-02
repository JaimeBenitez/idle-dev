<template>    
    <div class="tech">
        <section class="tech-leftPart">
            <img :src="logo" :alt="techName" class="tech-logo"/>
            <p class="tech-actual-quantity">{{ quantityToShow }}</p>
        </section>
        <section class="tech-middlePart">
            <span class="techname">{{ techName }}</span>
            <span class="actualProfit">{{ totalProfit }} €/s</span>
        </section>        
        <button class="tech-addButton" v-on:click = buy(techName,quantityToBuy)>
           <span>{{ quantityToBuy }} x {{ costPerUnit * quantityToBuy }}€</span> 
           <img src="../assets/sd-card-outline-rounded.svg" alt="mejora" class="improve-logo"/>
        </button>
        
    </div>
</template>

<script>


export default {
  name: 'TechButton',
  props: {
    logo: String,
    techName: String, 
    quantityToBuy: Number     
  },
  data(){
    return {      
        
        
        profitPerUnit: 0,
        costPerUnit: 5,
        quantity: 0,
        totalProfit: 0,
        tech: "",
        quantityToShow: "0"
        
    }
  },    
  methods:{
    
       
    calculateProfitPerUnit(techName){
        this.tech = techName
        if(this.tech == "Html"){
            this.profitPerUnit = 5;
        }
    },
    buy(techName, quantity){
        this.calculateProfitPerUnit(techName)
        this.quantity += quantity;
    }
    
  },
  watch:{
    quantity:   function(newValue){
        this.quantityToShow = newValue.toString()
        
        if(this.quantity > 999){

            this.quantityToShow = (this.quantity / 1000).toFixed(2) + "k"
            console.log(this.quantityToShow)
        }
        this.totalProfit = newValue * this.costPerUnit;
        
    }
  }

}
</script>