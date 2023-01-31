<template>
    <header>
        <span class="version">V 0.1</span>
        <RouterLink to="/" ><img src="../assets/idledev-logo.png" alt="logo" class="logo-header"></RouterLink>
        <RouterLink to="/" class="logout"><img src="../assets/arrow-back.svg" class="logout-icon"></RouterLink>
    </header>
  </template>
  
  <script>
  
  export default {
    name: 'HeaderComponent'    
  }
  </script>