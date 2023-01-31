<template>
  <div class="logo-index-container">
    <img src="../assets/idledev-logo.png" alt="logo" class="logo">
  </div>
  <nav class="button-nav">
    <Button direction="register" text="Registrarse" />
    <Button direction="login" text="Login" />
    <Button direction="contact" text="Contacto" />    
  </nav>
</template>

<script>
import Button from './button.vue'
export default {
  name: 'IndexPage',
  components: {
    Button
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

