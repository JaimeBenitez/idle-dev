

const BASE_URL = `http://localhost:8080/trabajador/`


export async function getWorkerUpgrades(workerId){
    let response = await fetch(BASE_URL + `${workerId}/mejoras`)
    let workerLanguages = await response.json();
    return workerLanguages
}

