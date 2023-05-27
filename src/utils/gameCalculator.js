export default function gameCalculator(techs, moneyPerSecond, quantityToBuy){
    
    let moneyPerClick = 0.5
    for(let i = 0; i < techs.length; i++){
          
        let tech = techs[i]
        
        tech.currentCost = tech.initialCost * ((tech.growthRatio ** tech.quantityOwned * ((tech.growthRatio ** quantityToBuy) - 1)) / (tech.growthRatio - 1))
        //aplicamos el descuento siempre y cuando este exista
        if(tech.upgradeMoneyDiscount != 0){
            let discount = tech.currentCost * tech.upgradeMoneyDiscount
            tech.currentCost -= discount
        }
        tech.totalProfit = tech.profitPerUnit * tech.quantityOwned * tech.companyMultiplier * tech.upgradeMoneyMultiplier
        moneyPerSecond += tech.totalProfit
      }
    if (moneyPerSecond) {
        moneyPerClick = moneyPerSecond * 0.1
    }

    return [ techs, moneyPerClick, moneyPerSecond ]


}