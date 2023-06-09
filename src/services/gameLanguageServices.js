import { executeRequest } from "@/utils/executeRequest"
import { BASE_URL } from "./links"

const GET_URL = `${BASE_URL}/partida/`
const POST_URL = `${BASE_URL}/lenguaje-partida`


export async function getGameLanguages(user,techs){
    const response = await executeRequest('GET', GET_URL + `${user}/lenguajes`)
    if (response.status == 200){
     //Si nos da un OK seteamos y devolvemos los datos de los lenguajes del jugador
     let allGameLanguages = await response.json()
     return allGameLanguages
    } else {
        //Si no hay relaciones creadas las crea en ese momento, hay que hacerlo con el Status ya que el catch no considera
        //el error 404 como un error
        return postGameLanguages(techs)
    }    
}

async function postGameLanguages(techs) {
   let userLanguages = []
   let userLanguage = {}
   for (let i = 0; i < techs.length; i++){
    
      userLanguage = {
        "lenguajeId": techs[i].id,
        "partidaId": localStorage.getItem("user")
      }
      let response = await executeRequest('POST', POST_URL, JSON.stringify(userLanguage))
      let newUserLanguage = await response.json();
      userLanguages.push(newUserLanguage)
    }
    return userLanguages
}

export async function saveGameLanguages(userTechs, techs){
  //Vamos seteando los cambios en los lenguajes de la partida
  for(let i=0; i< userTechs.length; i++) {
  // Cogemos la id de la relación concreta para poder hacer la llamada
  let dataId = userTechs[i].id
  let newData = {
    "desbloqueado" : techs[i].unlocked,
    "cantidad": techs[i].quantityOwned
  }
  await executeRequest('PUT', POST_URL + `/${dataId}`, JSON.stringify(newData)) 
  }
}