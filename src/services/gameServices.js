const BASE_URL = `http://localhost:8080/partida/`


export async function getGame(user){
    const response = await fetch(BASE_URL + `${user}`)
    let game = await response.json()
    return game
}


export async function saveGameMoney(money, user){

    const userMoney = {
        "dinero": money
    }
    try{
    await fetch(BASE_URL + `${user}`, {
          method: "PUT",
          body: JSON.stringify(userMoney),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    } catch(error){
        console.log(error)
    }
}