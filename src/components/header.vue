<template>
  <header>
    <RouterLink v-if="user" to="/edit" class="user-container">
      <img v-if="avatar == null" class="icon user-button" :src="require('@/assets/user-outline.svg')" />
      <img v-else class="user-button" :src="avatar" />
    </RouterLink>
    <span v-if="!user" class="version">V 0.5</span>
    <RouterLink to="/"><img src="../assets/idledev-logo.png" alt="logo" class="logo-header"></RouterLink>
    <nav class="header-nav">
      <RouterLink to="/contact" class="header-button" v-if="isGame"><img :src="require('@/assets/contact.svg')"
          class="icon" alt="A contacto" /> </RouterLink>
      <RouterLink to="/" class="header-button" @click="logout"><img :src="require(`@/assets/${icon}`)" class="icon"
          alt="Logout"></RouterLink>
    </nav>
  </header>
</template>

<script>
/**
 * @file header.vue - Componente Header
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
/**
* @vue-prop {String} icon - Establece la ruta del icono a usar en el boton de logout
* @vue-prop {Boolean} isGame - Le dice al header si estamos en la pantalla de juego para adaptar su comportamiento a dicha pantalla
*/
export default {
  name: 'HeaderComponent',
  props: {
    icon: String,
    isGame: Boolean,
    avatar: String
  },
  data(){
    return {
      user: localStorage.getItem('user') 
    }
  },
  methods: {
    /**
     * Si estamos en la pantalla de juego quita al usuario del localStorage lo que causará el logout del mismo
     */
    logout() {
      //Solo lo haremos en el caso de que pulsemos el boton desde la pantalla de juego, esto evitara que desde el contacto, al pulsar atras nos desloguee
      if (this.isGame)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
    }
  }
}
</script>