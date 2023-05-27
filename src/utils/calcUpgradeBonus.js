import { techLevelToNumber } from "./techLevelToNumber"

export default function calcUpgradeBonus(workers, techName){
    let moneyBonus = 0
    let paBonus = 0
    let discount = 0
    let moneyExtraBonus = 0
    for(let i = 0; i < workers.length; i++){
        //Filtramos las mejoras que pertenezcan a la tecnología concreta
        let filteredUpgrades = []
        for(let j = 0; j < workers[i].upgrades.length; j++){
            if(workers[i].upgrades[j].techName == techName){
                filteredUpgrades.push(workers[i].upgrades[j])
            }
        }
        for(let k = 0; k < filteredUpgrades.length; k++){
            let workerUpgrade = filteredUpgrades[k]
            if(workerUpgrade.moneyBonus){
                moneyBonus += 1
            }
            else if(workerUpgrade.paBonus){
                paBonus += 1
            }
            else if(workerUpgrade.discount){
                discount += 1
            }
        }
        for(let l = 0; l < workers[i].languages.length; l++){
            if(workers[i].languages[l].techName == techName){
                let languageLevel = techLevelToNumber(workers[i].languages[l].level)
                if(languageLevel == 6){
                    moneyExtraBonus += 0.8
                }
                else if(languageLevel >= 3){
                    moneyExtraBonus += 0.3
                }
                else if(languageLevel >= 1){
                    moneyExtraBonus += 0.15
                }
                
            }
        }
    }
    
    const totalMoneyBonus = parseFloat(((moneyBonus * 0.2) + moneyExtraBonus).toFixed(2))
    const totalPaBonus = parseFloat((paBonus * 0.2).toFixed(2))
    const totalDiscountBonus = parseFloat((discount * 0.05).toFixed(2))

    return { totalMoneyBonus, totalPaBonus, totalDiscountBonus }
}