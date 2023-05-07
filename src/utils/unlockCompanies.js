import chooseCompanyRequirement from "./chooseCompanyRequirement";
import chooseCompanyLogo from "./chooseCompanyLogo"; 

export default function unlockCompanies(techs, company){
    //Si es de lvl 5 la empresa no subira mas
        if(company.level < 5){
            //Filtramos las tecnologias que afectan al requerimiento de nivel de la empresa
            let requiredTechs = techs.filter((tech) => company.requirementTechs.indexOf(tech.id.toString()) !== -1)
            let unlockNextLevel = true
            for(let j = 0; j < requiredTechs.length && unlockNextLevel; j++){
                //Si no cumple la condicion de subida la funcion no hace nada mas
                if( requiredTechs[j].quantityOwned < company.requirementValues[company.level]){
                    unlockNextLevel = false
                }
            }
            
            if( unlockNextLevel ){
                company.unlocked = true
                company.level += 1
                company.multiplier = company.level * company.baseMultiplier
                company.nextLevelRequirement = chooseCompanyRequirement(company.requirementTechs, company.requirementValues, company.level, techs)
                company.logo = chooseCompanyLogo(company.level)

            }
        }  
        return company
}