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
import { checkValidToken } from "@/utils/checkValidToken"

export default {
  name: 'IndexPage',
  components: {
    Button
  },
  methods: {
    /**
     * Función que, si entramos en la pag estando aun logueados, nos redirige al juego.
     * Realizamos una consulta privada de prueba para ver si el token es valido
     */
     async redirect() {
        const check = await checkValidToken()
        if (check) {
          this.$router.push('/game')
        }
    }  
  },
  async mounted() {
    await this.redirect()
  }
}
</script>



