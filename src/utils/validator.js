//Funcion que valida los inputs de los formularios
export default function validator(regexp,fieldToValidate){
    const isValid = regexp.test(fieldToValidate)
    if(!isValid){
        return true
    }else{
        return false
    }
}