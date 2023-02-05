<template>
    <Header/>
    <div class="register">
      <section class="register-container">
        <form class="register-form" v-on:submit.prevent="submit">
          <h1 class="register-title">Registro</h1>
          <input type="text" class="register-username register-input" v-model="username" v-on:blur="validUsername" placeholder="Nombre de usuario">
          <p v-if="usernameError" class="error-message">El nombre debe tener entre 3 y 20 caracteres</p>
          <input type="email" class="register-email register-input" v-model="email" v-on:blur="validEmail" placeholder="Correo electrónico">
          <p v-if="emailError" class="error-message">Introduce un email valido</p>
          <input type="password" class="register-password register-input" v-model="password" v-on:blur="validPassword" placeholder="Contraseña">
          <p v-if="passwordError" class="error-message password-error">La contraseña debe tener al menos una mayuscula, una minuscula, un digito y entre 8 y 16 caracteres</p>
          <input type="password" class="register-password-confirm register-input" v-model="confirmPassword" v-on:blur="passwordConfirmed" placeholder="Repite la contraseña">
          <p v-if="passwordConfirmError" class="error-message">Las contraseñas no coinciden</p>
          <p class="toLoginQuestion">¿Ya tienes una cuenta?</p>
          <RouterLink to="/login" class="toLogin">Ve al login</RouterLink>    
          <button type="submit" class="register-submit">Enviar</button>
        </form>
      </section>
      <Modal :submitted="submitted" msg="Registro exitoso, hora de comenzar tu viaje" buttonMsg="Entrar" redirect="/login" />
    </div>
</template>
  
  <script>
  import Header from './header.vue'
  import Modal from './modal.vue'
  export default {
    name: 'RegisterPage',
    components: {
      Header,
      Modal
    },
    data(){
      return{
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
        usernameError: false,
        emailError: false,
        passwordError: false,
        passwordConfirmError: false,
        submitted: false
      }
    },
    methods: {
      validUsername(){
        //El usuario admitirá cualquier caracter pero tendrá entre 3 y 20 caracteres
        const usernameRegexp = new RegExp(/^[\S]{3,20}$/);
        const isValid = usernameRegexp.test(this.username);
        if (!isValid) {
        this.usernameError = true
      } else {
        this.usernameError = false
      }
      },
      validEmail() {
      /*El email puede tener cualquier caracter en cualquier cantidad siempre y cuando no sea una @, espacio o tabulación en la primera parte
        Luego tendrá una @, luego otro set igual que en la primera parte, un punto y finalmente otro set del mismo tipo*/
      const emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
      const isValid = emailRegexp.test(this.email);
      if (!isValid) {
        this.emailError = true
      } else {
        this.emailError = false
      }
    },
    validPassword() {
      /*La contraseña debera tener al menos una mayuscula, minuscula y digito, permite caracteres especiales y 
      contara de entre 8 y 16 caracteres*/
      const passwordRegexp = new RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/);
      const isValid = passwordRegexp.test(this.password);
      if (!isValid) {
        this.passwordError = true
      } else {
        this.passwordError = false
      }
    },
    passwordConfirmed(){      
      if(this.confirmPassword != this.password){
        this.passwordConfirmError = true
        console.log(this.passwordConfirmError)
      }else{
        this.passwordConfirmError = false
      }
    },
    submit(){
      if (!this.usernameError && !this.emailError && !this.passwordError && !this.passwordConfirmError) {
        this.submitted = true;
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
    }
  }
  </script>