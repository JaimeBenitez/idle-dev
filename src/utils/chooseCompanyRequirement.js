export default function chooseCompanyRequirement(requirementTechs, requirementValues, level, techs){
 
  //Filtramos las tecnologias que necesita como requerimientos la empresa y le damos el formato adecuado
  const techNames = techs.filter((tech) => requirementTechs.indexOf(tech.id.toString()) !== -1).map((tech) => tech.name).join(', ')
  if(level == 5){
    return "Nivel maximo"
  }else{
    return requirementValues[level] + " en " + techNames
  }
}