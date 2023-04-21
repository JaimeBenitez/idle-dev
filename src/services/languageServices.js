const BASE_URL= `http://localhost:8080/lenguajes`

export async function getAllLanguages(){
    const response = await fetch(BASE_URL)
    let allLanguages = await response.json()
    return allLanguages
}