<template>
  <Header />
  <div class="contact">
    <section class="contact-container">
      <form class="contact-form" v-on:submit.prevent="submit">
        <h1 class="contact-title">Contacto</h1>
        <textarea cols="30" rows="5" class="textarea contact-input" v-model="textArea" v-on:blur="validTextArea"
          placeholder="Escríbenos para ayudarnos a mejorar"></textarea>
        <p v-if="textAreaError" class="error-message">Escribe al menos 3 palabras</p>
        <input type="email" class="contact-email contact-input" v-model="email" v-on:blur="validEmail"
          placeholder="Correo electrónico">
        <p v-if="emailError" class="error-message">El email no es valido.</p>
        <button type="submit" class="contact-submit">Enviar</button>
      </form>
    </section>
    <Modal :submitted="submitted" msg="Sugerencia enviada con exito" buttonMsg="Volver" redirect="/" />
  </div>

</template>

<script>
import Header from './header.vue'
import Modal from './modal.vue'
export default {
  name: 'ContactPage',
  components: {
    Header,
    Modal
  },
  data() {
    return {
      textAreaError: false,
      emailError: false,
      textArea: "",
      email: "",
      submitted: false,
    }
  },
  methods: {
    validTextArea() {
      //Esta regexp nos permite establecer que minimo se necesiten 3 palabras para que sea válido el campo
      const suggestionRegexp = new RegExp(/^[\w',]+\s[\w',]+\s[\w',]+/gm);
      const isValid = suggestionRegexp.test(this.textArea);
      if (!isValid) {
        this.textAreaError = true
      } else {
        this.textAreaError = false
      }
    },
    validEmail() {
      /*El email puede tener cualquier caracter en cualquier cantidad siempre y cuando no sea una @, espacio o tabulación en la primera parte
        Luego tendrá una @, luego otro set igual que en la primera parte, un punto y finalmente otro set del mismo tipo*/
      const emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
      const isValid = emailRegexp.test(this.email);
      if (!isValid) {
        this.emailError = true
      } else {
        this.emailError = false
      }
    },
    submit() {
      if (!this.textAreaError && !this.emailError) {
        this.submitted = true;
      }
    }
  },
  /*Estos watcher meten en las variables de data el valor de los input cada vez que estos cambian, pero como no queremos hacer nada
  extra al cambiar dicho valor, sino solo vigilarlo, las funciones se dejan vacias*/
  watch: {
    textArea: function () {
    },
    email: function () {
    },
  }


}
</script>