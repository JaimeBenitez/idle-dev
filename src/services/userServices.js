const ALL_URL = `http://localhost:8080/clasificacion`
const BASE_URL = `http://localhost:8080/usuario/`


export async function getUsersData(){
        const response = await fetch(ALL_URL)
        let allUsers = await response.json()
        return allUsers
    }

export async function getOneUser(username){
    const response = await fetch(BASE_URL + username)
    const user = await response.json();
    return user
}