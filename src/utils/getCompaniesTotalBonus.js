export default function(companies){
    let total = 1 
    for(let i=0; i<companies.length; i++){
        total += companies[i].multiplier
    }
    return total
}