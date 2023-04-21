export default function makeLanguagesFinalList(techs, userLanguages, logos){
    let finalTechsList = []
    for (let i = 0; i < techs.length; i++){
        finalTechsList.push({
          "id" : techs[i].id,
          "name" : techs[i].nombre,
          "logo" : logos[i],
          "initialCost" : techs[i].dinero_desbloqueo,
          "profitPerUnit" : techs[i].beneficio_base,
          "growthRatio": techs[i].ratio_incremento,
          "minMoneyToUnlock" : techs[i].dinero_desbloqueo,
          "unlocked" : userLanguages[i].desbloqueado,
          "quantityOwned" : userLanguages[i].cantidad,
          "currentCost": 0,
          "totalProfit": 0,
          "msg": techs[i].mensaje
        })
      }
    return finalTechsList
}