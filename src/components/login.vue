<template>
    <Header/>
    <div class="login">
      <section class="login-container">
        <form class="login-form">
          <h1 class="login-title">Login</h1>
          <input type="text" class="login-username register-input" placeholder="Nombre de usuario">          
          <input type="password" class="login-password register-input" placeholder="Contraseña">          
          <p class="toRegisterQuestion">¿Aun no tienes una cuenta?</p>
          <RouterLink to="/register" class="toRegister">Registrate</RouterLink>    
          <RouterLink to="/game" class="login-submit">Entrar</RouterLink>
        </form>
      </section>
    </div>
</template>
  
  <script>
  import Header from './header.vue'
  export default {
    name: 'LoginPage',
    components: {
      Header
    }  
  }
  </script>