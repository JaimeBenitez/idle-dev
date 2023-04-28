export function techLevelToNumber(level){
    switch(level){
        case 'basico':
            return 1
        case 'intermedio':
            return 2
        case 'avanzado':
            return 3
        case 'junior':
            return 4
        case 'senior':
            return 5
        case 'maestro':
            return 6
        default:
            return 0
            
    }
}