import chooseCompanyLogo from "./chooseCompanyLogo"
import chooseCompanyRequirement from "./chooseCompanyRequirement"


export default function makeCompaniesFinalList(companies, userCompanies, techs){
    
    let finalCompaniesList = []


    for (let i = 0; i < companies.length; i++){ 
      //Sacamos los stats que dependen del nivel
      const requerimentValues = companies[i].requerimiento_valores.split(",")
      const requirementTechs =  companies[i].requerimiento_lenguajes.split(',')
      const companyLevel = userCompanies[i].nivel_actual
      const companyLogo = chooseCompanyLogo(companyLevel)
      const requirement = chooseCompanyRequirement(requirementTechs, requerimentValues, companyLevel, techs)        

      finalCompaniesList.push({
        "id" : companies[i].id,
        "name" : companies[i].nombre,
        "logo" : companyLogo,
        "unlocked": userCompanies[i].desbloqueada,
        "level": companyLevel,
        "baseMultiplier": companies[i].multiplica_ganancia,
        "multiplier": companies[i].multiplica_ganancia * userCompanies[i].nivel_actual,
        "slots": companies[i].ranuras_base * userCompanies[i].nivel_actual,
        "nextLevelRequirement": requirement,
        "requirementValues": requerimentValues,
        "requirementTechs": requirementTechs
      })
    }
    return finalCompaniesList
}