

export default function displayWorkerLanguageHireOption(techs){
    const levels = ["basico", "intermedio", "avanzado", "junior"]

    let levelIndex = Math.floor(Math.random()*3)
    
    let choosenLanguageIndex =  Math.floor(Math.random()*(techs.length - 1))
    let choosenLanguage = techs[choosenLanguageIndex]

    

    let workerLanguage = {
        "id": choosenLanguage.id,
        "nivel": levels[levelIndex]
    }

    return workerLanguage
}