import { executeRequest } from "@/utils/executeRequest"
import { BASE_URL } from "./links"



const GET_URL= `${BASE_URL}/lenguaje`

export async function getAllLanguages(){
    const response = await executeRequest('GET', GET_URL + 's')
    let allLanguages = await response.json()
    return allLanguages
}

export async function getLanguageUpgrades(techId){
    const response = await executeRequest('GET', GET_URL + `/${techId}/mejoras`)
    let upgrades = await response.json()
    return upgrades
}