import chooseCompanyLogo from "./chooseCompanyLogo"
import chooseCompanyRequirement from "./chooseCompanyRequirement"


export default function makeCompaniesFinalList(companies, userCompanies){
    
    let finalCompaniesList = []

    for (let i = 0; i < companies.length; i++){ 
      //Sacamos los stats que dependen del nivel
      const companyLogo = chooseCompanyLogo(userCompanies[i].nivel_actual)
      const requirement = chooseCompanyRequirement(companies[i],userCompanies[i].nivel_actual)        

      finalCompaniesList.push({
        "id" : companies[i].id,
        "name" : companies[i].nombre,
        "logo" : companyLogo,
        "unlocked": userCompanies[i].desbloqueada,
        "level": userCompanies[i].nivel_actual,
        "multiplier": companies[i].multiplica_ganancia * userCompanies[i].nivel_actual,
        "slots": companies[i].ranuras_base * userCompanies[i].nivel_actual,
        "nextLevelRequirement": requirement
      })
    }
    return finalCompaniesList
}