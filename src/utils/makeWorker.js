import nameGenerator from './nameGenerator.js';

export default function makeWorker(gameId){
    const generator = nameGenerator()
    let firstWorker = {
        "nombre": generator[0],
        "partidaId": gameId,
        //Cogemos un valor aleatorio con 2 decimales entre 1 y 5
        "generacion_pa": (Math.random()*(5 - 1)+1).toFixed(2),
        "sexo": generator[1]
      }

      return firstWorker;
}