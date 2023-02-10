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
/**
 * @file index.vue - Pagina de inicio
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
import Button from './button.vue'

export default {
  name: 'IndexPage',
  components: {
    Button
  },
  methods: {
    /**
     * Función que, si entramos en la pag estando aun logueados, nos redirige al juego
     */
    redirect() {
      if (localStorage.getItem("user")) {
        this.$router.push('/game')
      }
    }
  },
  mounted() {
    this.redirect()
  }
}
</script>



