export function getExpToNextLevel(level){


    const exp = {
        1: 100,
        2: 200,
        3: 400,
        4: 800,
        5: 1600,
        6: 3200
    }

    const expToNextLevel = exp[level]
    
    return expToNextLevel
}