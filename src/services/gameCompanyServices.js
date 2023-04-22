const BASE_URL = `http://localhost:8080/partida/`
const POST_URL = `http://localhost:8080/empresa-partida`


export async function getGameCompanies(user,companies){
    const response = await fetch(BASE_URL + `${user}/empresas`)
    if (response.status == 200){
     //Si nos da un OK seteamos y devolvemos los datos de las empresas del jugador
     let allGameCompanies = await response.json()
     return allGameCompanies
    } else {
        //Si no hay relaciones creadas las crea en ese momento, hay que hacerlo con el Status ya que el catch no considera
        //el error 404 como un error
        postGameCompanies(companies)
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
      let response = await fetch(POST_URL, {
      method: "POST",
      body: JSON.stringify(userCompany),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },            
      })
      let newUserCompany = await response.json();
      userCompanies.push(newUserCompany)
    }
    return userCompanies
}