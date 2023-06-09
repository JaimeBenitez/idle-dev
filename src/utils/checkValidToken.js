import { BASE_URL } from "@/services/links"
import { executeRequest } from "@/utils/executeRequest"


export async function checkValidToken(){
    let isValid = false
    if(localStorage.getItem("token")){
        const response = await executeRequest('GET', `${BASE_URL}/empresas`)
            if (response.status != 401) {
             isValid = true
            }
        }
    if(!isValid){
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("user")
    }
    return isValid
}