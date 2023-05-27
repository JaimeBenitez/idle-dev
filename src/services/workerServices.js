import { chooseWorkerLanguage, hiredWorkerLanguage } from "./workerLanguagesServices";
import makeWorker from "@/utils/makeWorker";
import { unlockUpgrade } from "./workerUpgradesServices";


const BASE_URL = `http://localhost:8080/trabajadores/`
const POST_URL = `http://localhost:8080/trabajador`


export async function getGameWorkers(user){
    try{
    const response = await fetch(BASE_URL + `${user}`)    
    
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
        let response = await fetch(POST_URL, {
        method: "POST",
        body: JSON.stringify(worker),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },            
        })
        let newWorker = await response.json() 
           // Elegimos sus lenguajes
        await chooseWorkerLanguage(newWorker, techs)
        }catch(error){
            console.log(error)
        }
}

export async function hireWorker(worker,tech){
    try{
        let response = await fetch(POST_URL, {
            method: "POST",
            body: JSON.stringify(worker),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },            
        })
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
