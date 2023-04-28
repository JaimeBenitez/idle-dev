
import { getWorkersLanguages } from "@/services/workerLanguagesServices"
import { techLevelToNumber } from "./techLevelToNumber";



export default async function makeWorkersFinalList(workers){
    console.log(workers)
    let finalWorkersList = []
    
    for (let i = 0; i < workers.length; i++){ 
      // Sacamos los lenguajes de cada trabajador
      let workerId = workers[i].id;  
      let workerLanguages = await getWorkersLanguages(workerId)        
      //No nos interesan algunos de los datos como las ids o el nombre del trabajador asi que hacemos una lista con unicamente los datos que queremos
      let finalWorkerLanguagesList = []
      let totalLevel = 0
      for(let i = 0; i < workerLanguages.length; i++){
        finalWorkerLanguagesList.push({
          "techName": workerLanguages[i].lenguajeNombre,
          "level": workerLanguages[i].nivel,
          "exp": workerLanguages[i].experiencia_lenguaje
        })
        //El nivel total del trabajador sera la suma total de los niveles de todas sus tecnologias pasadas a valor numerico
        totalLevel += techLevelToNumber(workerLanguages[i].nivel)
      }
      //La empresa, en el caso del 1º trabajador, puede ser nula, asi que hacemos la comprobación
      let companyName = workers[i].empresaNombre == null ? "Freelance" : workers[i].empresaNombre

     

      finalWorkersList.push({
        "id" : workers[i].id,
        "name" : workers[i].nombre,
        "image" : workers[i].imagen,
        "languages": finalWorkerLanguagesList,
        "pa": workers[i].generacion_pa,
        "company": companyName,
        "totalLevel": totalLevel
      })
    }
    return finalWorkersList
}