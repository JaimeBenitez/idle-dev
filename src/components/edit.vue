<template>
  <Header icon="logout.svg" :avatar="avatar" :isGame=true  />
  <div class="register">
    <section class="edit-container">
      <form class="register-form" v-on:submit.prevent="submit" method="PUT" enctype="multipart/form-data">
        <h1 class="register-title">Editar usuario</h1>
        <input type="text" class="register-username register-input" v-model="username" v-on:blur="validUsername"
          placeholder="Nombre de usuario" disabled>
        <p v-if="usernameError" class="error-message username-error">El nombre debe tener entre 3 y 20 caracteres</p>
        <input type="email" class="register-email register-input" v-model="email" v-on:blur="validEmail"
          placeholder="Correo electrónico">
        <p v-if="emailError" class="error-message">Introduce un email valido</p>
        <input type="password" class="register-password-confirm register-input" v-model="newPassword"
          v-on:blur="validNewPassword" placeholder="Nueva contraseña">
        <p v-if="newPasswordError" class="error-message">La contraseña debe tener al menos una mayuscula,
          una minuscula, un digito y entre 8 y 16 caracteres</p>
        <div class="register-avatar-container">
          <img v-if="avatar" :src="avatar" alt="hola" class="register-avatar" />
          <div class="register-input-file-container">  
            <input type="file" name="imagen" aria-label="imagen" accept="image/*" @change="onFileChange( $event )" />
          </div>
        </div>
        <button v-if="!loading" type="submit" class="register-submit">Guardar</button>
        <button v-if="loading" type="submit" class="register-submit">Guardando...</button>
        
      </form>
    </section>
    <Modal v-if="submitted" msg="Cambio realizado con exito" buttonMsg="Volver" redirect="/game"
      :isGame=false />
    <Modal v-if="submittedError" msg="Ha ocurrido un error y los datos no se han guardado" buttonMsg="Volver" redirect="/game"
      :isGame=false />
  </div>
</template>

<script>
/**
 * @file edit.vue - Pagina de edición de usuario
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
import Header from './header.vue'
import Modal from './modal.vue'
import validator from '@/utils/validator'
import { getUsersData, getOneUser, editUser } from '@/services/userServices'
import { checkValidToken } from "@/utils/checkValidToken"

/**
 * @vue-data {Array<Object>} [users = []] - Lista de usuarios registrados
 * @vue-data {Object} [user = {}] - usuario logueado en este momento
 * @vue-data {String} [username = ""] - Toma el valor del input de nombre de usuario
 * @vue-data {String} [email = ""] - Toma el valor del input de email
 * @vue-data {String} [newPassword = ""] - Toma el valor del input de nueva contraseña
 * @vue-data {String} [avatar = null] - Ruta a la imagen de avatar del usuario
 * @vue-data {File} [avatarFile = null] - Archivo de la imagen de avatar del usuario
 * @vue-data {Boolean} [usernameError = false] - Controla cuando aparece el error de nombre de usuario
 * @vue-data {Boolean} [emailError = false] - Controla cuando aparece el error de email
 * @vue-data {Boolean} [newPasswordError = false] - Controla cuando aparece el error de nueva contraseña
 * @vue-data {Boolean} [submitted = false] - Controla cuando se hace submit en el formulario
 * @vue-data {Boolean} [submittedError = false] - Controla cuando aparece el error al hacer submit
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
      newPassword: "",
      avatar: null,
      avatarFile: null,
      usernameError: false,
      emailError: false,
      newPasswordError: false,
      submitted: false,
      submittedError: false,
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
    /**
     * Función que saca un usuario de la base de datos usando el localStorage
     * @param {Object} user - usuario a registrar
     */
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
     * Función que actualiza usuario en la base de datos
     * @param {Object} user - usuario a registrar
     */
    async putUser(userData, userId) {
       //IMPORTANTE: hay que pasar el objeto a tipo archivo usando el BLob, de lo contrario no lo aceptara
       let formData = new FormData()

       const json = JSON.stringify(userData)
        const blob = new Blob([json], {
            type: 'application/json'
        })
        formData.append('nuevo', blob )
        formData.append('file', this.avatarFile)
      //Importante en los multipart NO pasar headers
      try {
        this.loading = true;
        const modifiedUser = await editUser(userId,formData)
        this.loading = false;
        this.submitted = true
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
     * Función que valida la confirmación de contraseña
     */
    validNewPassword() {
      this.newPasswordError = validator(this.passwordRegexp, this.newPassword) 
      if(this.newPassword == ''){
        this.newPasswordError = false
      }
    },
    /**
     * Función que permite mostrar la previsualización del avatar en el formulario
     * @param {Event} e - Evento, en este caso, la elección de un archivo
     */
    onFileChange(e){
      const file = e.target.files[0]
      this.avatar = URL.createObjectURL(file)
      this.avatarFile = file
    },
    /**
     * Función que, si todos los datos son correctos, encripta la contraseña e invoca a la función que introduce los datos en la BD
     */
    async submit() {
      //Volvemos aqui a hacer las validaciones para comprobar si los campos están vacios
      this.validUsername()
      this.validEmail()
      this.validNewPassword()
      if (!this.usernameError && !this.emailError && !this.newPasswordError) {
        const putUser = {
          "nombre": this.username,
          "email": this.email,
          "contrasenia": this.newPassword,
        }
        localStorage.setItem("username", this.username)
        await this.putUser(putUser, this.user.id)
        
      }
    },
    /**
     * Función que, de no tener token válido, redirecciona a la pantalla inicial
     */
    async redirect() {
        const check = await checkValidToken()
        if (!check) {
          this.$router.push('/')
        }
    }  
  },
  watch: {
    username: function () {
    },
    email: function () {
    },
    newPassword: function () {
    },
  },
  async mounted() {
    await this.getAllUsers();
    await this.getUser();
    await this.redirect()
  }
}
</script>