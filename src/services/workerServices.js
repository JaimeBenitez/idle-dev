import { getWorkersLanguages, chooseFirstWorkerLanguage } from "./workerLanguagesServices";
import makeWorker from "@/utils/makeWorker";


const BASE_URL = `http://localhost:8080/trabajadores/`
const POST_URL = `http://localhost:8080/trabajador`


export async function getGameWorkers(user){
    try{
    const response = await fetch(BASE_URL + `${user}`)
    console.log(response.status)
    
    let workerLanguages = []
    if (response.status == 200){ 
        let userWorkers = await response.json()   
        for(let i = 0; i < userWorkers.length; i++){
            let workerId = userWorkers[i].id;            
            workerLanguages.push(await getWorkersLanguages(workerId));          
          }
        return [userWorkers, workerLanguages]
    }
    }catch(error){
        console.error(error)
    }
}  

export async function postFirstGameWorker(user, techs){
   
        let firstWorker = makeWorker(user)
         //Creamos el primer trabajador de la partida
        let response = await fetch(POST_URL, {
        method: "POST",
        body: JSON.stringify(firstWorker),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },            
        })
        let worker = await response.json() 
        // Elegimos sus lenguajes
        chooseFirstWorkerLanguage(worker, techs)

 
        
     
}
