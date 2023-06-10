import unlockedUpgrade from "@/utils/unlockedUpgrade";
import { executeRequest } from "@/utils/executeRequest"
import { BASE_URL } from "./links"

const GET_URL = `${BASE_URL}/trabajador/`
const POST_URL = `${BASE_URL}/trabajador-mejora`


export async function getWorkerUpgrades(workerId){
    let response = await executeRequest('GET', GET_URL + `${workerId}/mejoras`)
    let workerLanguages = await response.json();
    return workerLanguages
}

export async function unlockUpgrade(workerId, techId, newLevel){

    console.log(newLevel)

    let upgradeId = unlockedUpgrade(techId, newLevel)
    if(upgradeId){
        const newUpgrade = {
            "id_trabajador" : workerId,
            "id_mejora": upgradeId
        }
        await executeRequest('POST', POST_URL, JSON.stringify(newUpgrade))
    }
}