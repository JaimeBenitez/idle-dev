<template>    
      <RouterLink :to="direction" class="button">{{ text }}</RouterLink>
</template>
  
<script>
/**
 * @file button.vue - Componente botón para la página principal
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
/**
 * @vue-prop {String} direction - Establece la dirección del enlace
 * @vue-prop {String} text - Establece el texto del boton
 */
  export default {
    name: 'ButtonComponent',
    props: {
      direction: String,
      text: String
    }
  }
</script>