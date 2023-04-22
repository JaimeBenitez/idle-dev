const BASE_URL = `http://localhost:8080/partida/`


export async function getGame(user){
    const response = await fetch(BASE_URL + `${user}`)
    let game = await response.json()
    return game
}