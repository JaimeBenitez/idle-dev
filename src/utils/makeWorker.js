import nameGenerator from './nameGenerator.js';

export default function makeWorker(gameId){
    let firstWorker = {
        "nombre": nameGenerator(),
        "partidaId": gameId,
        //Cogemos un valor aleatorio con 2 decimales entre 1 y 5
        "generacion_pa": (Math.random()*(5 - 1)+1).toFixed(2)
      }

      return firstWorker;
}