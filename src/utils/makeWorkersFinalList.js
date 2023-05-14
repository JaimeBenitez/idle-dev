
import { getWorkerLanguages } from "@/services/workerLanguagesServices"
import { techLevelToNumber } from "./techLevelToNumber";
import { getWorkerUpgrades } from "@/services/workerUpgradesServices"


export default async function makeWorkersFinalList(workers){
    let finalWorkersList = []
    
    for (let i = 0; i < workers.length; i++){ 
      // Sacamos los lenguajes de cada trabajador
      let workerId = workers[i].id;  
      let workerLanguages = await getWorkerLanguages(workerId)        
      //No nos interesan algunos de los datos como las ids o el nombre del trabajador asi que hacemos una lista con unicamente los datos que queremos
      let finalWorkerLanguagesList = []
      let totalLevel = 0
      for(let i = 0; i < workerLanguages.length; i++){
        finalWorkerLanguagesList.push({
          "techName": workerLanguages[i].lenguajeNombre,
          "level": workerLanguages[i].nivel,
          "exp": workerLanguages[i].experiencia_lenguaje,
          "logo": workerLanguages[i].lenguajeLogo
        })
        //El nivel total del trabajador sera la suma total de los niveles de todas sus tecnologias pasadas a valor numerico
        totalLevel += techLevelToNumber(workerLanguages[i].nivel)
      }
      let workerUpgrades = await getWorkerUpgrades(workerId)
      let finalWorkerUpgradesList = []
      for(let i = 0; i < workerUpgrades.length; i++){
        finalWorkerUpgradesList.push({
          "logo": workerUpgrades[i].mejoraLogo,
          "name": workerUpgrades[i].mejoraNombre,
          "description": workerUpgrades[i].mejoraDescripcion
        })
      }
      
      finalWorkersList.push({
        "id" : workers[i].id,
        "name" : workers[i].nombre,
        "image" : workers[i].imagen,
        "languages": finalWorkerLanguagesList,
        "upgrades": finalWorkerUpgradesList,
        "pa": workers[i].generacion_pa,
        "totalLevel": totalLevel
      })
    }
    return finalWorkersList
}