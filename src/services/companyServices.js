const BASE_URL= `http://localhost:8080/empresa`


export async function getAllCompanies(){
    const response = await fetch(BASE_URL + 's')
    let companies = await response.json()
    return companies
}

export async function getOneCompany(companyId){
    const response = await fetch(BASE_URL + '/' + companyId)
    let company = await response.json()
    return company
}
