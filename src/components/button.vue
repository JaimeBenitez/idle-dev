<template>    
      <RouterLink :to=direction class="button">{{ text }}</RouterLink>
</template>
  
<script>
  export default {
    name: 'ButtonComponent',
    props: {
      direction: String,
      text: String
    }
  }
</script>