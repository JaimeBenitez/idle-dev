export default function chooseNextLevelUpgrade(level, upgrades){
    let logo = ""
    let description = ""
    switch(level){
        case 1:
            description = "+50% Producción"
            break
        case 2:
            logo = upgrades[0].logo
            description = upgrades[0].nombre
            break
        case 3:
            description = "+50% Producción"
            break
        case 4: 
            logo = upgrades[1].logo
            description = upgrades[1].nombre
            break
        case 5:
            logo = upgrades[2].logo
            description = upgrades[2].nombre
            break
        case 6:
            description = "+100% Producción"
            break
    }

    return { description, logo }

}