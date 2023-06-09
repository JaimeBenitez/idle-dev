import { executeRequest } from "@/utils/executeRequest"
import { BASE_URL } from "./links"

const ALL_URL = `${BASE_URL}/clasificacion`
const GET_URL = `${BASE_URL}/usuario/`


export async function getUsersData(){
        const response = await executeRequest('GET', ALL_URL)
        let allUsers = await response.json()
        return allUsers
    }

export async function getOneUser(username){
    const response = await executeRequest('GET', GET_URL + username)
    const user = await response.json();
    return user
}

export async function editUser(userId, formData){
    const response = await executeRequest('PUT', GET_URL + userId,formData, true)
        const modifiedUser = await response.json();
        return modifiedUser
}