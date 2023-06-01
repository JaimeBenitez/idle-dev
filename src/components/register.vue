<template>
  <Header icon="arrow-back.svg" :isGame=false />
  <div class="register">
    <section class="register-container">
      <form class="register-form" v-on:submit.prevent="submit">
        <h1 class="register-title">Registro</h1>
        <input type="text" class="register-username register-input" v-model="username" v-on:blur="validUsername"
          placeholder="Nombre de usuario">
        <p v-if="usernameError" class="error-message username-error">El nombre debe tener entre 3 y 20 caracteres</p>
        <input type="email" class="register-email register-input" v-model="email" v-on:blur="validEmail"
          placeholder="Correo electrónico">
        <p v-if="emailError" class="error-message">Introduce un email valido</p>
        <input type="password" class="register-password register-input" v-model="password" v-on:blur="validPassword"
          placeholder="Contraseña">
        <p v-if="passwordError" class="error-message password-error">La contraseña debe tener al menos una mayuscula,
          una minuscula, un digito y entre 8 y 16 caracteres</p>
        <input type="password" class="register-password-confirm register-input" v-model="confirmPassword"
          v-on:blur="passwordConfirmed" placeholder="Repite la contraseña">
        <p v-if="passwordConfirmError" class="error-message">Las contraseñas no coinciden</p>
        <div class="register-avatar-container">
          <img v-if="avatar" :src="avatar" alt="hola" class="register-avatar" />
          <div class="register-input-file-container">  
            <input type="file" name="imagen" aria-label="imagen" accept="image/*" @change="onFileChange" />
          </div>
        </div>
        <p class="toLoginQuestion">¿Ya tienes una cuenta?</p>
        <RouterLink to="/login" class="toLogin">Ve al login</RouterLink>
        <button v-if="!loading" type="submit" class="register-submit">Enviar</button>
        <button v-if="loading" type="submit" class="register-submit">Enviar</button>
      </form>
    </section>
    <Modal v-if="submitted" msg="Registro exitoso, haz login de comenzar tu viaje" buttonMsg="Entrar" redirect="/login"
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
  name: 'RegisterPage',
  components: {
    Header,
    Modal
  },
  data() {
    return {
      users: [],
      games: [],
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: null,
      avatarFile: null,
      usernameError: false,
      emailError: false,
      passwordError: false,
      passwordConfirmError: false,
      submitted: false,
      loading: false,
      usernameRegexp: new RegExp(/^[\S]{3,20}$/),
      emailRegexp: new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
      passwordRegexp: new RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
    }
  },
  methods: {
    /**
     * Función que saca de la api todos los usuarios para poder registrar nuevos
     */
    async getAllUsers() {
      try {
        const response = await fetch('http://localhost:8080/usuarios');
        this.users = await response.json();       
      } catch (error) {
        console.error("Error");
      }
    },
    /**
     * Función que saca de la api todas las partidas para poder registrar nuevas
     */
    async getAllGames() {
      try {
        const response = await fetch('http://localhost:8080/clasificacion');
        this.games = await response.json();  
        console.log(this.games)      
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * Función que registra un nuevo usuario en la base de datos
     * @param {Object} user - usuario a registrar
     */
    async postUser(user) {

      let formData = new FormData()

       const json = JSON.stringify(user)
        const blob = new Blob([json], {
            type: 'application/json'
        })
        formData.append('nuevo', blob )
        formData.append('file', this.avatarFile)

      try {
        this.loading = true;
        const response = await fetch("http://localhost:8080/usuario", {
          method: "POST",
          body: formData,                
        });
        const createdUser = await response.json();
        this.loading = false;
        this.users.push(createdUser);
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * Función que registra una nueva partida en la base de datos
     */
    async postGame() {
      try {
        this.loading = true;
        const response = await fetch("http://localhost:8080/partida", {
          method: "POST",
          headers: { 'Content-Type': 'application/json; charset=utf-8' }         
        });
        const createdGame = await response.json();
        this.loading = false;
        this.games.push(createdGame);
        
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
    validPassword() {
      /*La contraseña debera tener al menos una mayuscula, minuscula y digito, permite caracteres especiales y 
      contara de entre 8 y 16 caracteres*/
      this.passwordError = validator(this.passwordRegexp, this.password)      
    },
    /**
     * Función que valida la confirmación de contraseña
     */
    passwordConfirmed() {
      if (this.confirmPassword != this.password) {
        this.passwordConfirmError = true
      } else {
        this.passwordConfirmError = false
      }
    },
    onFileChange(e){
      const file = e.target.files[0]
      this.avatar = URL.createObjectURL(file)
      this.avatarFile = file
    },
    /**
     * Función que, si todos los datos son correctos, encripta la contraseña e invoca a la función que introduce los datos en la BD
     */
    async submit() {
      this.validUsername()
      this.validEmail()
      this.validOldPassword()
      this.validNewPassword()
      if (!this.usernameError && !this.emailError && !this.passwordError && !this.passwordConfirmError) {
        await this.postGame()
        //Sacamos la id del ultimo juego creado para asignarselo al usuario
        let game = this.games[this.games.length - 1].id
        const user = {
          "partidaId" : game,
          "nombre": this.username,
          "email": this.email,
          "contrasenia": sha1(this.password),
          "avatar": this.avatar
        }
        await this.postUser(user)
        this.submitted = true;
      }
    },
    /**
     * Función que, de estar logueado, redirige al juego
     */
    redirect() {
      if (localStorage.getItem("user")) {
        this.$router.push('/game')
      }
    }
  },
  watch: {
    username: function () {
    },
    email: function () {
    },
    password: function () {
    },
    confirmPassword: function () {
    },
  },
  mounted() {
    this.redirect();
    this.getAllUsers();
    this.getAllGames();
  }
}
</script>