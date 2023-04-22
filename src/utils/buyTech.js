export default function buyTech(tech, quantityToBuy, principalMoney, moneyPerSecond){
    //Añadimos la cantidad de la tecnologia concreta
    tech.quantityOwned += quantityToBuy
    //Establecemos la diferencia de ganancia entre antes y despues de la compra
    let profitDiff = (tech.quantityOwned * tech.profitPerUnit) - tech.totalProfit
    //Cantidad total de ganancia
    tech.totalProfit = tech.profitPerUnit * tech.quantityOwned
    //Quitamos del dinero principal el coste actual 
    principalMoney -= tech.currentCost
    //Establecemos el nuevo coste
    tech.currentCost = tech.initialCost * ((tech.growthRatio ** tech.quantityOwned * ((tech.growthRatio ** quantityToBuy) - 1)) / (tech.growthRatio - 1))
    //Añadimos la nueva ganancia a la ganancia/segundo actual
    moneyPerSecond += profitDiff
    let moneyPerClick = moneyPerSecond * 0.1

    return [principalMoney, moneyPerSecond, moneyPerClick ]
}