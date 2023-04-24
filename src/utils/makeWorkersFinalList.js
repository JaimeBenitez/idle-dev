
import { getWorkersLanguages } from "@/services/workerLanguagesServices"
import { chooseWorkerLogo } from "./chooseWorkerLogo";


export default function makeWorkersFinalList(workers){
    
    let finalWorkersList = []

    for (let i = 0; i < workers.length; i++){ 
      //Sacamos los stats que dependen del nivel
      let workerLanguages = []
      // Sacamos los lenguajes de cada trabajador
      for(let i = 0; i < workers.length; i++){
        let workerId = workers[i].id;            
        workerLanguages.push( getWorkersLanguages(workerId));          
      }
      //No nos interesan algunos de los datos como las ids o el nombre del trabajador asi que hacemos una lista con unicamente los datos que queremos
      let finalWorkerLanguagesList = []
      for(let i = 0; i < workerLanguages.length; i++){
        finalWorkerLanguagesList.push({
          "techName": workerLanguages[i].lenguajeNombre,
          "level": workerLanguages[i].nivel,
          "exp": workerLanguages[i].experiencia_lenguaje
        })
      }
      //La empresa, en el caso del 1º trabajador, puede ser nula, asi que hacemos la comprobación
      let companyName = workers[i].empresaNombre == null ? "Freelance" : workers[i].empresaNombre

      //Por ultimo decidiremos el logo según el sexo
      let logo = chooseWorkerLogo(workers[i].sexo)

      finalWorkersList.push({
        "id" : workers[i].id,
        "name" : workers[i].nombre,
        "logo" : logo,
        "languages": finalWorkerLanguagesList,
        "pa": workers[i].generacion_pa,
        "company": companyName
      })
    }
    return finalWorkersList
}