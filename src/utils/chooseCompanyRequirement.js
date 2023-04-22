export default function chooseCompanyRequirement(company, level){

  switch (level) {
    case 0:
      return company.requerimiento_1              
    case 1: 
      return company.requerimiento_2
    case 2: 
      return company.requerimiento_3
    case 3:
      return company.requerimiento_4
    case 4: 
      return company.requerimiento_5
    case 5:
      return "Nivel máximo" 

      }
}