export async function executeRequest(method, url, body = null , isMultipart = false) {

   

    const token = localStorage.getItem('token');
    let options = {
        method: method,
        headers:{ Authorization: 'Bearer ' + token },     
    }
    if(!isMultipart){
        options.headers['Content-Type'] = 'application/json; charset=UTF-8'
    }
    if(body){
        options.body = body
    }
    

    return await fetch(url, options);
   
}