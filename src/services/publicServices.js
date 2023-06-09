import { BASE_URL } from "./links"


const LOGIN_URL = `${BASE_URL}/login`


export async function login(username, password) {
    const response = await fetch(LOGIN_URL, {
          method: "POST",
          body: JSON.stringify({'nombre': username, 'contrasenia': password}),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },              
    });
    const { token } = await response.json();

    return token
}

