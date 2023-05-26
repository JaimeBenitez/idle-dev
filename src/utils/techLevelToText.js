export function techLevelToText(level){


    const defaultText = 'nulo'

    const textLevels = {
        1: 'basico',
        2: 'intermedio',
        3: 'avanzado',
        4: 'junior',
        5: 'senior',
        6: 'maestro'
    }

    const convertedLevel = textLevels[level] || defaultText
   
    return convertedLevel
}