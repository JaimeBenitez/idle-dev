import makeWorkerLanguage from "@/utils/makeWorkerLanguage";

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
    console.log(newWorkerLanguage)
    await fetch(POST_URL, {
        method: "POST",
        body: JSON.stringify(newWorkerLanguage),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },            
    }) 
        
}