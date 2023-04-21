const BASE_URL = `http://localhost:8080/partida/`
const POST_URL = `http://localhost:8080/lenguaje-partida`


export async function getGameLanguages(user,techs){
    let allGameLanguages = {}
    const response = await fetch(BASE_URL + `${user}/lenguajes`)
    if (response.status == 200){
     //Si nos da un OK seteamos y devolvemos los datos de los lenguajes del jugador
     allGameLanguages = await response.json()
     return allGameLanguages
    } else {
        //Si no hay relaciones creadas las crea en ese momento, hay que hacerlo con el Status ya que el catch no considera
        //el error 404 como un error
        postGameLanguages(techs)
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
      let response = await fetch(POST_URL, {
      method: "POST",
      body: JSON.stringify(userLanguage),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },            
      })
      let newUserLanguage = await response.json();
      userLanguages.push(newUserLanguage)
    }
    return userLanguages
}