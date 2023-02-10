<template>
    <Header icon="arrow-back.svg" :isGame=false />
    <div class="register">
      <section class="register-container">
        <form class="register-form" v-on:submit.prevent="submit">
          <h1 class="register-title">Registro</h1>
          <input type="text" class="register-username register-input" v-model="username" v-on:blur="validUsername" placeholder="Nombre de usuario">
          <p v-if="usernameError" class="error-message username-error">El nombre debe tener entre 3 y 20 caracteres</p>
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
      <Modal v-if="submitted" msg="Registro exitoso, haz login de comenzar tu viaje" buttonMsg="Entrar" redirect="/login" :isGame=false />
    </div>
</template>
  
  <script>
  import Header from './header.vue'
  import Modal from './modal.vue'  
  import validator from '@/utils/validator'
  export default {
    name: 'RegisterPage',
    components: {
      Header,
      Modal
    },
    data(){
      return{
        users: [],
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
        usernameError: false,
        emailError: false,
        passwordError: false,
        passwordConfirmError: false,
        submitted: false,
        usernameRegexp: new RegExp(/^[\S]{3,20}$/),
        emailRegexp: new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
        passwordRegexp: new RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
      }
    },
    methods: {
      async getAllUsers(){
        try {
          const response = await fetch('http://localhost:3001/api/V1/users');
          this.users = await response.json();
          console.log(this.users)
        } catch (error) {
          console.error(error);
        }
      },
      async postUser(user){
        try {
          const response = await fetch("http://localhost:3001/api/V1/users", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json; charset=utf-8'},
          });
          const createdUser = await response.json();
          this.users = [...this.users, createdUser]
        } catch(error){
          console.log(error)
        }
      },
      validUsername(){
        //El usuario admitirá cualquier caracter pero tendrá entre 3 y 20 caracteres     
        this.usernameError = validator(this.usernameRegexp, this.username)
      },
      validEmail() {
      /*El email puede tener cualquier caracter en cualquier cantidad siempre y cuando no sea una @, espacio o tabulación en la primera parte
        Luego tendrá una @, luego otro set igual que en la primera parte, un punto y finalmente otro set del mismo tipo*/      
      this.emailError = validator(this.emailRegexp, this.email)
      },
      validPassword() {
        /*La contraseña debera tener al menos una mayuscula, minuscula y digito, permite caracteres especiales y 
        contara de entre 8 y 16 caracteres*/     
       this.passwordError = validator(this.passwordRegexp, this.password)
      },
      passwordConfirmed(){      
        if(this.confirmPassword != this.password){
          this.passwordConfirmError = true          
        }else{
          this.passwordConfirmError = false
        }
    },
    submit(){
      if (!this.usernameError && !this.emailError && !this.passwordError && !this.passwordConfirmError) {
        const user = {
            "username": this.username,
            "email": this.email,
            "password": this.password 
        }
        this.postUser(user)
        this.submitted = true;
      }
    },
    redirect(){
      if(localStorage.getItem("user")){
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
    mounted(){
      this.redirect()
      this.getAllUsers();      
    }
  }
  </script>