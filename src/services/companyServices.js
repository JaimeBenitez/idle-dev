const BASE_URL= `http://localhost:8080/empresas`


export async function getAllCompanies(){
    const response = await fetch(BASE_URL)
    let companies = await response.json()
    return companies
}