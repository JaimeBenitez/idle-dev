import { BASE_URL } from "./links"


const LOGIN_URL = `${BASE_URL}/login`
const REGISTER_URL = `${BASE_URL}/registro`


export async function login(username, password) {
    const response = await fetch(LOGIN_URL, {
          method: "POST",
          body: JSON.stringify({'nombre': username, 'contrasenia': password}),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },              
    });
    const { token } = await response.json();

    return token
}

export async function register(user){
    const response = await fetch(REGISTER_URL, {
            method: "POST",
            body: JSON.stringify(user),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },              
          });
    const newUser = await response.json();

    return newUser
}