export function techLevelToNumber(level){

    const defaultNumber = 0

    const numberLevels = {
        basico: 1,
        intermedio: 2,
        avanzado: 3,
        junior: 4,
        senior: 5,
        maestro: 6
    }

    const convertedLevel = numberLevels[level] || defaultNumber

    
    return convertedLevel
    
}