export function techLevelToText(level){
    switch(level){
        case 1:
            return 'basico'
        case 2:
            return 'intermedio'
        case 3:
            return 'avanzado'
        case 4 :
            return 'junior'
        case 5 :
            return 'senior'
        case 6 :
            return 'maestro'
        default:
            return 'nulo'
            
    }
}