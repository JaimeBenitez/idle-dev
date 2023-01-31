<template>
    <Header/>
    <div class="register">
      <section class="register-container">
        <form class="register-form">
          <h1 class="register-title">Registro</h1>
          <input type="text" class="register-username register-input" placeholder="Nombre de usuario">
          <input type="email" class="register-email register-input" placeholder="Correo electrónico">
          <input type="password" class="register-password register-input" placeholder="Contraseña">
          <input type="password" class="register-password-confirm register-input" placeholder="Repite la contraseña">
          <p class="toLoginQuestion">¿Ya tienes una cuenta?</p>
          <RouterLink to="/login" class="toLogin">Ve al login</RouterLink>
    
          <RouterLink to="/game" class="register-submit">Enviar</RouterLink>
        </form>
      </section>
    </div>
</template>
  
  <script>
  import Header from './header.vue'
  export default {
    name: 'RegisterPage',
    components: {
      Header
    }  
  }
  </script>