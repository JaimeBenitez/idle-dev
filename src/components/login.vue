<template>
    <Header icon="arrow-back.svg" :isGame=false />
    <div class="login">
      <section class="login-container" v-on:submit.prevent="checkUser(username,password)">
        <form class="login-form">
          <h1 class="login-title">Login</h1>
          <input type="text" class="login-username login-input" v-model="username" placeholder="Nombre de usuario">          
          <input type="password" class="login-password login-input" v-model="password" placeholder="Contraseña">  
          <p v-if="loginError" class="error-message username-error">El usuario introducido o la contraseña no es correcta</p>        
          <p class="toRegisterQuestion">¿Aun no tienes una cuenta?</p>
          <RouterLink to="/register" class="toRegister">Registrate</RouterLink>   
          <button v-if="!loading" type="submit" class="login-submit">Entrar</button>
          <button v-if="loading" type="submit" class="login-submit">Cargando...</button>             
        </form>
      </section>
      <Modal v-if="submitted" :msg='modalMsg' buttonMsg="Entrar" redirect="/game" :isGame=false />
    </div>
</template>
  
  <script>
  /**
 * @file login.vue - Página de login
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
  import Header from './header.vue'
  import Modal from './modal.vue'
  import { getOneUser } from '@/services/userServices'
  import { login } from '@/services/publicServices'
  import { checkValidToken } from "@/utils/checkValidToken"
  /**
   * @vue-data {Object}[user = {}] - Guardará los datos del usuario actual
   * @vue-data {Boolean}[loginError = false] - Maneja la aparición de los mensajes de error
   * @vue-data {Boolean}[submitted = false] - Maneja el submit del formulario
   * @vue-data {Boolean}[loading = false] - Maneja el texto del botón de submit cuando está cargando
   * @vue-data {String}[username = ''] - Toma el valor del input de nombre de usuario
   * @vue-data {String}[password = ''] - Toma el valor del input de contraseña
   * @vue-computed {String} ModalMsg - Mensaje que mostrará el modal al loguearte
   */
  export default {
    name: 'LoginPage',
    components: {
      Header,
      Modal
    },
    data(){
      return{        
        user: {},        
        loginError: false,
        submitted: false,
        loading: false,
        username: '',
        password: '',
      }
    },
    computed: {
      modalMsg(){
        return `Login exitoso. Bienvenido de vuelta ${this.username}`
      }
    },
    methods: {
      /**
       * Funcion que comprueba si los datos introducidos coinciden con algun usuario de la base de datos
       * @param {String} username - Nombre de usuario
       * @param {String} password - Contraseña
       */
      async checkUser(username,password){

        try{
          this.loading = true;
          const token = await login(username,password)
          this.loading = false;
          localStorage.setItem("token", token);
          this.user = await getOneUser(username)
          localStorage.setItem("user",this.user.partidaId)
          localStorage.setItem("username", username)
          this.submitted = true;
        
        }catch(error){
          console.log(error)
          this.loginError = true;
        }
      },
      /**
       * Funcion que de estar ya logueado al entrar en la página redirige al juego
       */
       async redirect() {
        const check = await checkValidToken()
        if (check) {
          this.$router.push('/game')
        }
    }  
    },
    watch:{
      username: function(){
      },
      password: function(){
      }
    },
    async mounted(){
      await this.redirect();
    }
   
  }
  </script>