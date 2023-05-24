import makeWorkerLanguage from "@/utils/makeWorkerLanguage";
import { unlockUpgrade } from "./workerUpgradesServices";

const BASE_URL = `http://localhost:8080/trabajador/`
const POST_URL = `http://localhost:8080/trabajador-lenguaje`

export async function getWorkerLanguages(workerId){
    let response = await fetch(BASE_URL + `${workerId}/lenguajes`)
    let workerLanguages = await response.json();
    return workerLanguages
}

export async function chooseWorkerLanguage(worker,techs){
    let choosenLanguageIndex =  Math.floor(Math.random()*(techs.length - 1))
    let choosenLanguage = techs[choosenLanguageIndex]
    let newWorkerLanguage = makeWorkerLanguage(worker.id, choosenLanguage.id)
    await fetch(POST_URL, {
        method: "POST",
        body: JSON.stringify(newWorkerLanguage),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },            
    }) 
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
    await fetch(POST_URL, {
        method: "POST",
        body: JSON.stringify(finalWorkerLanguage),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },            
    }) 
}

export async function newWorkerLanguage(workerId, techId){
    let newWorkerLanguage = {
        "id_trabajador": workerId,
        "id_lenguaje": techId,
        "nivel": "basico",
        "experiencia_lenguaje": 0
    }
    await fetch(POST_URL, {
        method: "POST",
        body: JSON.stringify(newWorkerLanguage),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },            
    }) 
}

export async function levelUpLanguage(workerId, techId, newLevel, relationId){

    await unlockUpgrade(workerId, techId, newLevel)

    let leveledUpLanguage = {
        "id_trabajador": workerId,
        "id_lenguaje": techId,
        "nivel": newLevel,
        "experiencia_lenguaje": 0
    }
    await fetch(POST_URL + `/${relationId}` , {
        method: "PUT",
        body: JSON.stringify(leveledUpLanguage),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },            
    }) 
}