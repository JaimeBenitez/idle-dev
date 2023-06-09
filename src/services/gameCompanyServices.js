import { executeRequest } from "@/utils/executeRequest"
import { BASE_URL } from "./links"


const GET_URL = `${BASE_URL}/partida/`
const POST_URL = `${BASE_URL}/empresa-partida`


export async function getGameCompanies(user,companies){
    const response = await executeRequest('GET', GET_URL + `${user}/empresas`)
    if (response.status == 200){
     //Si nos da un OK seteamos y devolvemos los datos de las empresas del jugador
     let allGameCompanies = await response.json()
     return allGameCompanies
    } else {
        //Si no hay relaciones creadas las crea en ese momento, hay que hacerlo con el Status ya que el catch no considera
        //el error 404 como un error
        return postGameCompanies(companies)
    }    
}
async function postGameCompanies(companies) {
   let userCompanies = []
   let userCompany = {}
   for (let i = 0; i < companies.length; i++){
    
      userCompany = {
        "empresaId": companies[i].id,
        "partidaId": localStorage.getItem("user")
      }
      let response = await executeRequest('POST', POST_URL, JSON.stringify(userCompany))
      let newUserCompany = await response.json();
      userCompanies.push(newUserCompany)
    }
    return userCompanies
}

export async function saveGameCompanies(userCompanies, companies){
  //Vamos seteando los cambios en las empresas de la partida
  for(let i=0; i< userCompanies.length; i++) {
  // Cogemos la id de la relación concreta para poder hacer la llamada
  let dataId = userCompanies[i].id
  let newData = {
    "desbloqueada" : companies[i].unlocked,
    "nivel": companies[i].level
  }
  await executeRequest('PUT', POST_URL + `/${dataId}`, JSON.stringify(newData)) 
  }
}