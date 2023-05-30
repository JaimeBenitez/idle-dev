<template>
  <Header icon="arrow-back.svg" :isGame=false />
  <div class="register">
    <section class="register-container">
      <form class="register-form" v-on:submit.prevent="submit" enctype="multipart/form-data">
        <h1 class="register-title">Editar usuario</h1>
        <input type="text" class="register-username register-input" v-model="username" v-on:blur="validUsername"
          placeholder="Nombre de usuario">
        <p v-if="usernameError" class="error-message username-error">El nombre debe tener entre 3 y 20 caracteres</p>
        <input type="email" class="register-email register-input" v-model="email" v-on:blur="validEmail"
          placeholder="Correo electrónico">
        <p v-if="emailError" class="error-message">Introduce un email valido</p>
        <input type="password" class="register-password register-input" v-model="oldPassword" v-on:blur="validOldPassword"
          placeholder="Antigua contraseña">
        <p v-if="oldPasswordError" class="error-message password-error">La contraseña debe coincidir con la actual para poder hacer cambios</p>
        <input type="password" class="register-password-confirm register-input" v-model="newPassword"
          v-on:blur="validNewPassword" placeholder="Nueva contraseña">
        <p v-if="newPasswordError" class="error-message">La contraseña debe tener al menos una mayuscula,
          una minuscula, un digito y entre 8 y 16 caracteres</p>
        <div class="register-avatar-container">
          <img v-if="avatar" :src="avatar" alt="hola" class="register-avatar" />
          <div class="register-input-file-container">  
            <input type="file" name="imagen" aria-label="imagen" @change="onFileChange" />
          </div>
        </div>
        <button v-if="!loading" type="submit" class="register-submit">Enviar</button>
        <button v-if="loading" type="submit" class="register-submit">Enviar</button>
        
      </form>
    </section>
    <Modal v-if="submitted" msg="Cambio realizado con exito" buttonMsg="Volver" redirect="/game"
      :isGame=false />
  </div>
</template>

<script>
/**
 * @file register.vue - Pagina de registro
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
import Header from './header.vue'
import Modal from './modal.vue'
import validator from '@/utils/validator'
import sha1 from '@/utils/hash1.js'
import { getUsersData, getOneUser } from '@/services/userServices'

/**
 * @vue-data {Array<Object>} [users = []] - Lista de usuarios registrados
 * @vue-data {String} [username = ""] - Toma el valor del input de nombre de usuario
 * @vue-data {String} [email = ""] - Toma el valor del input de email
 * @vue-data {String} [password = ""] - Toma el valor del input de contraseña
 * @vue-data {String} [confirmPassword = ""] - Toma el valor del input de confirmar contraseña
 * @vue-data {Boolean} [usernameError = false] - Controla cuando aparece el error de nombre de usuario
 * @vue-data {Boolean} [emailError = false] - Controla cuando aparece el error de email
 * @vue-data {Boolean} [passwordError = false] - Controla cuando aparece el error de contraseña
 * @vue-data {Boolean} [passwordConfirmError = false] - Controla cuando aparece el error de confirmación de contraseña
 * @vue-data {Boolean} [submitted = false] - Controla cuando se hace submit en el formulario
 * @vue-data {Boolean}[loading = false] - Maneja el texto del boton de submit del formulario durante la carga de la API
 * @vue-data {String} [usernameRegexp = new RegExp(/^[\S]{3,20}$/)] - Regex para validar nombre de usuario
 * @vue-data {String} [emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)] - Regex para validar el email
 * @vue-data {String} [passwordRegexp = new RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)]  - Regex para validar la contraseña
 */
export default {
  name: 'EditPage',
  components: {
    Header,
    Modal
  },
  data() {
    return {
      users: [],
      user: {},
      username: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      avatar: null,
      usernameError: false,
      emailError: false,
      oldPasswordError: false,
      newPasswordError: false,
      submitted: false,
      loading: false,
      usernameRegexp: new RegExp(/^[\S]{3,20}$/),
      emailRegexp: new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
      passwordRegexp: new RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
    }
  },
  methods: {
    /**
     * Función que saca de la api todos los usuarios para poder encontrar el actual 
     */
    async getAllUsers() {
      try {
        this.users = await getUsersData();      
      } catch (error) {
        console.error("Error");
      }
    },
    async getUser(){
      const actualUser = this.users.find((user) => user.id == localStorage.getItem('user'))
      try {
        this.user = await getOneUser(actualUser.usuarioNombre);     
        this.username =  this.user.nombre
        this.email = this.user.email 
        this.avatar = this.user.avatar
         
      } catch (error) {
        console.error("Error");
      }
    },
    /**
     * Función que registra un nuevo usuario en la base de datos
     * @param {Object} user - usuario a registrar
     */
    async putUser(user, userId) {
      try {
        this.loading = true;
        const response = await fetch(`http://localhost:8080/usuario/${userId}`, {
          method: "PUT",
          body: JSON.stringify(user),
          headers: { 'Content-Type': 'application/json; charset=utf-8' }         
        });
        const modifiedUser = await response.json();
        this.loading = false;
        this.users.push(modifiedUser);
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * Función que valida el nombre de usuario
     */
    validUsername() {
      //El usuario admitirá cualquier caracter pero tendrá entre 3 y 20 caracteres     
      this.usernameError = validator(this.usernameRegexp, this.username)
    },
    /**
     * Función que valida el email
     */
    validEmail() {
      /*El email puede tener cualquier caracter en cualquier cantidad siempre y cuando no sea una @, espacio o tabulación en la primera parte
        Luego tendrá una @, luego otro set igual que en la primera parte, un punto y finalmente otro set del mismo tipo*/
      this.emailError = validator(this.emailRegexp, this.email)
    },
    /**
     * Función que valida la contraseña
     */
    validOldPassword() {
      if(sha1(this.oldPassword) != this.user.contrasenia){
        this.oldPasswordError = true
      }else{
        this.oldPasswordError = false
      }  
    },
    /**
     * Función que valida la confirmación de contraseña
     */
    validNewPassword() {
      this.newPasswordError = validator(this.passwordRegexp, this.newPassword) 
      if(this.newPassword == ''){
        this.newPasswordError = false
      }
    },
    onFileChange(e){
      const file = e.target.files[0]
      this.avatar = URL.createObjectURL(file)
    },
    /**
     * Función que, si todos los datos son correctos, encripta la contraseña e invoca a la función que introduce los datos en la BD
     */
    async submit() {
      //Volvemos aqui a hacer las validaciones para comprobar si los campos están vacios
      this.validUsername()
      this.validEmail()
      this.validOldPassword()
      this.validNewPassword()
      if (!this.usernameError && !this.emailError && !this.oldPasswordError && !this.newPasswordError) {
        if(this.newPassword == ''){
          //En el caso de que la contraseña esté vacia la que se pasa al put es la que ya tenia
        this.newPassword = this.user.contrasenia
        }else{
          this.newPassword = sha1(this.newPassword)
        }
        const putUser = {
          "nombre": this.username,
          "email": this.email,
          "contrasenia": this.newPassword,
          "avatar": this.avatar
        }
        console.log(putUser)
        await this.putUser(putUser, this.user.id)
        this.submitted = true;
      }
    },
  },
  watch: {
    username: function () {
    },
    email: function () {
    },
    oldPassword: function () {
    },
    newPassword: function () {
    },
  },
  async mounted() {
    await this.getAllUsers();
    await this.getUser()
  }
}
</script>