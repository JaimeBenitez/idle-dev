<template>
    <header>
        <span class="version">V 0.1</span>
        <RouterLink to="/" ><img src="../assets/idledev-logo.png" alt="logo" class="logo-header"></RouterLink>
        <RouterLink to="/" class="logout" @click="logout"><img :src="require(`@/assets/${icon}`)" class="logout-icon"></RouterLink>
    </header>
  </template>
  
  <script>
  
  export default {
    name: 'HeaderComponent',
    props:{
      icon: String,
      isGame: Boolean,
    },
    methods:{
      logout(){
        //Solo lo haremos en el caso de que pulsemos el boton desde la pantalla de juego, esto evitara que desde el contacto, al pulsar atras nos desloguee
        if(this.isGame)
        localStorage.removeItem('user')
      }
    }    
  }
  </script>