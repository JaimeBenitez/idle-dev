import chooseCompanyLogo from "./chooseCompanyLogo"
import chooseCompanyRequirement from "./chooseCompanyRequirement"
import chooseTechsPerCompany from "./chooseTechsPerCompany"


export default function makeCompaniesFinalList(companies, userCompanies, techs){
    
    let finalCompaniesList = []


    for (let i = 0; i < companies.length; i++){ 
      //Sacamos los stats que dependen del nivel
      const requerimentValues = companies[i].requerimiento_valores.split(",")
      const requirementTechs =  companies[i].requerimiento_lenguajes.split(',')
      const companyLevel = userCompanies[i].nivel_actual
      const companyLogo = chooseCompanyLogo(companyLevel)
      const requirement = chooseCompanyRequirement(requirementTechs, requerimentValues, companyLevel, techs)  
      //Nos aseguramos de que el multiplier nunca sea 0
      let multiplier = 1
      if(userCompanies[i].nivel_actual > 0){
        multiplier = companies[i].multiplica_ganancia * userCompanies[i].nivel_actual
      }else{
        multiplier = 1
      }   
      //Seteamos las tecnologias a las que afecta esta empresa   
      const influencedTechs = chooseTechsPerCompany(companies[i].id)

      finalCompaniesList.push({
        "id" : companies[i].id,
        "name" : companies[i].nombre,
        "logo" : companyLogo,
        "unlocked": userCompanies[i].desbloqueada,
        "level": companyLevel,
        "baseMultiplier": companies[i].multiplica_ganancia,
        "multiplier": multiplier,
        "slots": companies[i].ranuras_base * userCompanies[i].nivel_actual,
        "nextLevelRequirement": requirement,
        "requirementValues": requerimentValues,
        "requirementTechs": requirementTechs,
        "influencedTechs": influencedTechs
      })
    }
    return finalCompaniesList
}