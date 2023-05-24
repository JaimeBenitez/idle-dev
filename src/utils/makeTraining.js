import { getLanguageUpgrades } from "@/services/languageServices"
import { techLevelToNumber } from "./techLevelToNumber"
import chooseNextLevelUpgrade from "./chooseNextLevelUpgrade"
import { techLevelToText } from "./techLevelToText"
import { getExpToNextLevel } from "./getExpToNextLevel"

export async function makeTraining(workerToTrain, techToTrain){
    //Sacamos los datos del trabajador con la tecnologia concreta
    const workerTech = workerToTrain.languages.find((language) => language.languageId == techToTrain.id)
    let relationId = null
    let techActualLevel = 0
    let techActualExp = 0 
    if(workerTech){
    relationId = workerTech.relationId
    techActualLevel = techLevelToNumber(workerTech.level)
    techActualExp = workerTech.exp
    }
   
    //Si se encuentra un nivel calcula el siguiente, de lo contrario el prox nivel es 1
    let techNextLevel = 1
    if(techActualLevel != 0){
      techNextLevel = techActualLevel + 1
    }

   
    const upgrades = await getLanguageUpgrades(techToTrain.id)
    const {description, logo } = chooseNextLevelUpgrade(techNextLevel, upgrades)
    const toNextLevel = getExpToNextLevel(techNextLevel)
    
    const training = {
        "workerId": workerToTrain.id,
        "techId": techToTrain.id,
        "relationId": relationId,
        "workerLogo" : workerToTrain.image,
        "workerName": workerToTrain.name,
        "techLogo": techToTrain.logo,
        "techName": techToTrain.name,
        "techActualLevel": techLevelToText(techActualLevel),
        "techNextLevel": techLevelToText(techNextLevel),
        "upgradeLogo": logo,
        "upgradeDescription": description,
        "pa": workerToTrain.pa * techToTrain.multiplier,
        "actualExp": techActualExp,
        "expToLevelUp": toNextLevel,
        "intervalID": null
    }
    return training
}