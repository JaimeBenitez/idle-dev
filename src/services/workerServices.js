import { chooseWorkerLanguage, hiredWorkerLanguage } from "./workerLanguagesServices";
import makeWorker from "@/utils/makeWorker";
import { unlockUpgrade } from "./workerUpgradesServices";
import { executeRequest } from "@/utils/executeRequest"
import { BASE_URL } from "./links"


const GET_URL = `${BASE_URL}/trabajadores/`
const POST_URL = `${BASE_URL}/trabajador`



export async function getGameWorkers(user){
    try{
    const response = await executeRequest('GET', GET_URL + `${user}`)    
    
    if (response.status == 200){ 
        let userWorkers = await response.json()   
        
        return userWorkers
    }
    }catch(error){
        console.error(error)
    }
}  

export async function postGameWorker(user, techs){
   
        let worker = makeWorker(user)
        
         //Creamos al trabajador
        try{
        let response = await executeRequest('POST', POST_URL, JSON.stringify(worker)) 
        let newWorker = await response.json() 
           // Elegimos sus lenguajes
        await chooseWorkerLanguage(newWorker, techs)
        }catch(error){
            console.log(error)
        }
}

export async function hireWorker(worker,tech){
    try{
        let response = await executeRequest('POST', POST_URL, JSON.stringify(worker))
        let newWorker = await response.json()
        await hiredWorkerLanguage(newWorker, tech)
        //Comprobamos que de salir el nivel avanzado desbloquee la mejora anterior
        if(tech.nivel != "avanzado"){
            await unlockUpgrade(newWorker.id, tech.id, tech.nivel)
        }else{
            await unlockUpgrade(newWorker.id, tech.id, "intermedio")  
        }
        
    }catch(error){
        console.log(error)
    }
}
