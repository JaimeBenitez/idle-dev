<template>    
    <button class="multiplier-button">{{ text }}</button>
</template>

<script>
export default {
  name: 'MultiplierButton',
  props: {    
    text: String
  }
}
</script>