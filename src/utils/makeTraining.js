import { getLanguageUpgrades } from "@/services/languageServices"
import { techLevelToNumber } from "./techLevelToNumber"
import chooseNextLevelUpgrade from "./chooseNextLevelUpgrade"
import { techLevelToText } from "./techLevelToText"
import { getExpToNextLevel } from "./getExpToNextLevel"

export async function makeTraining(workerToTrain, techToTrain){
    //Sacamos los datos del trabajador con la tecnologia concreta
    const workerTech = workerToTrain.languages.find((language) => language.languageId == techToTrain.id)
    let techActualLevel = 0
    let techActualExp = 0 
    if(workerTech){
    techActualLevel = workerTech.level
    techActualExp = workerTech.exp
    }
   
    //Si se encuentra un nivel calcula el siguiente, de lo contrario el prox nivel es 1
    let techNextLevel = 1
    if(techActualLevel != 0){
      techNextLevel = techLevelToNumber(techActualLevel) + 1
    }

    console.log(workerToTrain)

    const upgrades = await getLanguageUpgrades(techToTrain.id)
    console.log(upgrades)
    const {description, logo } = chooseNextLevelUpgrade(techNextLevel, upgrades)
    const toNextLevel = getExpToNextLevel(techNextLevel)
    
    const training = {
        "workerId": workerToTrain.id,
        "workerLogo" : workerToTrain.image,
        "workerName": workerToTrain.name,
        "techLogo": techToTrain.logo,
        "techActualLevel": techLevelToText(techActualLevel),
        "techNextLevel": techLevelToText(techNextLevel),
        "upgradeLogo": logo,
        "upgradeDescription": description,
        "pa": workerToTrain.pa,
        "actualExp": techActualExp,
        "expToLevelUp": toNextLevel,
    }
    return training
}