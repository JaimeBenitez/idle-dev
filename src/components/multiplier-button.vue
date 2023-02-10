<template>    
    <button class="multiplier-button">{{ text }}</button>
</template>

<script>
/**
 * @file multiplier-button.vue - Componente Boton para establecer la cantidad de recurso a comprar
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
/**
 * @vue-prop {String} text - El texto del interior del botón
 */
export default {
  name: 'MultiplierButton',
  props: {    
    text: String
  }
}
</script>