export default function makeFirstWorkerLanguage(workerId, languageId){

    const levels = ["basico", "intermedio", "avanzado", "junior"]

    //Saca un numero entero entre el 0 y el 5
    var index = Math.floor(Math.random()*3)

    let workerLanguage = {
        "id_trabajador": workerId,
        "id_lenguaje": languageId,
        "nivel": levels[index],
        "experiencia_lenguaje": 0  
      }

      return workerLanguage;
}