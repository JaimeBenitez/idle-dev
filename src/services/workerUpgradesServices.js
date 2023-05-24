import unlockedUpgrade from "@/utils/unlockedUpgrade";

const BASE_URL = `http://localhost:8080/trabajador/`
const POST_URL = "http://localhost:8080/trabajador-mejora"


export async function getWorkerUpgrades(workerId){
    let response = await fetch(BASE_URL + `${workerId}/mejoras`)
    let workerLanguages = await response.json();
    return workerLanguages
}

export async function unlockUpgrade(workerId, techId, newLevel){

    console.log(techId)

    let upgradeId = unlockedUpgrade(techId, newLevel)
    console.log("Upgrade ID:" + upgradeId)
    if(upgradeId){
        const newUpgrade = {
            "id_trabajador" : workerId,
            "id_mejora": upgradeId
        }
        await fetch(POST_URL, {
            method: "POST",
            body: JSON.stringify(newUpgrade),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },            
        }) 
    }
}