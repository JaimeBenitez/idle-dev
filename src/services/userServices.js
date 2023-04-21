const BASE_URL = `http://localhost:8080/clasificacion`


export async function getUsersData(){
        const response = await fetch(BASE_URL)
        let allUsers = await response.json()
        return allUsers
    }
