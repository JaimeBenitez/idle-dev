import { executeRequest } from "@/utils/executeRequest"
import { BASE_URL } from "./links"

const GET_URL= `${BASE_URL}/empresa`


export async function getAllCompanies(){
    const response = await executeRequest('GET', GET_URL + 's')
    let companies = await response.json()
    return companies
}

export async function getOneCompany(companyId){
    const response = await executeRequest('GET', GET_URL + '/' + companyId)
    let company = await response.json()
    return company
}
