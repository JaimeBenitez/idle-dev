export default function makeWorkerLanguage(workerId, languageId){

    const levels = ["basico", "intermedio", "avanzado", "junior"]

    //Saca un numero entero entre el 0 y el 3
    var index = Math.floor(Math.random()*3)

    let workerLanguage = {
        "id_trabajador": workerId,
        "id_lenguaje": languageId,
        "nivel": levels[index],
        "experiencia_lenguaje": 0  
      }

      return workerLanguage;
}