const BASE_URL= `http://localhost:8080/lenguaje`

export async function getAllLanguages(){
    const response = await fetch(BASE_URL + 's')
    let allLanguages = await response.json()
    return allLanguages
}

export async function getLanguageUpgrades(techId){
    const response = await fetch(BASE_URL + `/${techId}/mejoras`)
    let upgrades = await response.json()
    return upgrades
}