import { executeRequest } from "@/utils/executeRequest"
import { BASE_URL } from "./links"


const GET_URL = `${BASE_URL}/partida/`


export async function getGame(user){
    const response = await executeRequest('GET',GET_URL + `${user}`)
    let game = await response.json()
    return game
}


export async function saveGameMoney(money, user){

    const userMoney = {
        "dinero": money
    }
    try{
    await executeRequest('PUT', GET_URL + `${user}`, JSON.stringify(userMoney))
    } catch(error){
        console.log(error)
    }
}