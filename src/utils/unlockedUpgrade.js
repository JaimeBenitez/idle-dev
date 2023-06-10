export default function unlockedUpgrade(techId, newLevel){  
    
    //Conectamos las ids de las tecnologias con las ids de sus correspondientes mejoras
    const intermediateUpgradeIds = {
        1: 1,
        2: 4,
        3: 7,
        4: 10,
        5: 13,
        6: 16,
        7: 19,
        8: 22,
        9: 25,
        10: 28,
        11: 31,
        12: 34,
        13: 37,
        14: 40
    } 
    const juniorUpgradeIds = {
        1: 2,
        2: 5,
        3: 8,
        4: 11,
        5: 14,
        6: 17,
        7: 20,
        8: 23,
        9: 26,
        10: 29,
        11: 32,
        12: 35,
        13: 38,
        14: 41
    }
    const seniorUpgradeIds = {
        1: 3,
        2: 6,
        3: 9,
        4: 12,
        5: 15,
        6: 18,
        7: 21,
        8: 24,
        9: 27,
        10: 30,
        11: 33,
        12: 36,
        13: 39,
        14: 42
    }
    const levels = {
        intermedio : intermediateUpgradeIds,
        junior: juniorUpgradeIds,
        senior: seniorUpgradeIds
    }
    
    const actualLevel = levels[newLevel] || {}

    const finalId = actualLevel[techId] || null
    

    return finalId
}