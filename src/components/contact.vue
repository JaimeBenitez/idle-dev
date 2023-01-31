<template>
    <Header/>
    <div class="contact">
      <section class="contact-container">
        <form class="contact-form">
          <h1 class="contact-title">Contacto</h1>
          <textarea cols="30" rows="5" class="textarea contact-input" placeholder="Escríbenos para ayudarnos a mejorar"></textarea>
          <input type="email" class="contact-email contact-input" placeholder="Correo electrónico">
          <button type="submit" class="contact-submit">Enviar</button>
        </form>
      </section>
    </div>
</template>
  
  <script>
  import Header from './header.vue'
  export default {
    name: 'ContactPage',
    components: {
      Header
    }  
  }
  </script>