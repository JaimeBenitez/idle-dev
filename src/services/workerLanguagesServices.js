import makeWorkerLanguage from "@/utils/makeWorkerLanguage";
import { unlockUpgrade } from "./workerUpgradesServices";
import { executeRequest } from "@/utils/executeRequest"
import { BASE_URL } from "./links"

const GET_URL = `${BASE_URL}/trabajador/`
const POST_URL = `${BASE_URL}/trabajador-lenguaje`

export async function getWorkerLanguages(workerId){
    let response = await executeRequest('GET', GET_URL + `${workerId}/lenguajes`)
    let workerLanguages = await response.json();
    return workerLanguages
}

export async function chooseWorkerLanguage(worker,techs){
    let choosenLanguageIndex =  Math.floor(Math.random()*(techs.length - 1))
    let choosenLanguage = techs[choosenLanguageIndex]
    let newWorkerLanguage = makeWorkerLanguage(worker.id, choosenLanguage.id)
    await executeRequest('POST', POST_URL, JSON.stringify(newWorkerLanguage))
    //Comprobamos que de salir el nivel avanzado desbloquee la mejora anterior
    if(newWorkerLanguage.nivel != "avanzado"){
        await unlockUpgrade(worker.id, choosenLanguage.id, newWorkerLanguage.nivel)
    }else{
        await unlockUpgrade(worker.id, choosenLanguage.id, "intermedio")
    }
}

export async function hiredWorkerLanguage(worker, tech){
    let finalWorkerLanguage = {
        "id_trabajador": worker.id,
        "id_lenguaje": tech.id,
        "nivel": tech.nivel,
        "experiencia_lenguaje": 0
    } 
    await executeRequest('POST', POST_URL, JSON.stringify(finalWorkerLanguage)) 
}

export async function newWorkerLanguage(workerId, techId){
    let newWorkerLanguage = {
        "id_trabajador": workerId,
        "id_lenguaje": techId,
        "nivel": "basico",
        "experiencia_lenguaje": 0
    }
    await executeRequest('POST', POST_URL, JSON.stringify(newWorkerLanguage))
}

export async function levelUpLanguage(workerId, techId, newLevel, relationId){

    await unlockUpgrade(workerId, techId, newLevel)

    let leveledUpLanguage = {
        "id_trabajador": workerId,
        "id_lenguaje": techId,
        "nivel": newLevel,
        "experiencia_lenguaje": 0
    }
    await executeRequest('PUT', POST_URL + `/${relationId}`, JSON.stringify(leveledUpLanguage))
}