<template>
  <Header icon="arrow-back.svg" :isGame=false />
  <div class="contact">
    <section class="contact-container">
      <form class="contact-form" ref="form" v-on:submit.prevent="submit">
        <h1 class="contact-title">Contacto</h1>
        <textarea cols="30" rows="5" name="message" class="textarea contact-input" v-model="textArea" v-on:blur="validTextArea"
          placeholder="Escríbenos para ayudarnos a mejorar"></textarea>
        <p v-if="textAreaError" class="error-message">Escribe al menos 3 palabras</p>
        <input type="text" name="user_name" class="contact-name contact-input" v-model="name" v-on:blur="validName"
          placeholder="Nombre de usuario">
        <p v-if="nameError" class="error-message">El nombre debe tener entre 3 y 20 caracteres.</p>
        <input type="email" name="user_email" class="contact-email contact-input" v-model="email" v-on:blur="validEmail"
          placeholder="Correo electrónico">
        <p v-if="emailError" class="error-message">Introduce un email valido.</p>
        <button type="submit" class="contact-submit">Enviar</button>
      </form>
    </section>
    <Modal v-if="submitted" msg="Sugerencia enviada con exito" buttonMsg="Volver" redirect="/" :isGame=false />
  </div>

</template>

<script>
/**
 * @file contact.vue - Pagina de contacto
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */


import Header from './header.vue'
import Modal from './modal.vue'
import validator from '@/utils/validator'
import emailjs from '@emailjs/browser'
/**
 * @vue-data {Boolean} [textAreaError = false]  - Establece si el error en el campo del textArea se muestra o no
 * @vue-data {Boolean} [emailError = false] - Establece si el error en el campo email se muestra o no
 * @vue-data {String} [textArea = ""] - Campo que toma el valor del input textArea
 * @vue-data {String} [email = ""] - Campo que toma el valor del input email
 * @vue-data {Boolean} [submitted = false] - Establece cuando se valida el formulario
 * @vue-data {String} [suggestionRegexp = new RegExp(/^[\w,]+\s[\w,]+\s[\w,]+/gm)] - Expresion regular que testea si el campo textArea tiene al menos 3 palabras. 
 * @vue-data {String} [emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)] - Expresion regular que testea si el campo email es valido (por ejemplo ejemplo@test.com)
 */
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
      nameError: false,
      textArea: "",
      email: "",
      name: "",
      submitted: false,
      suggestionRegexp: new RegExp(/^[\w',]+\s[\w',]+\s[\w',]+/gm),
      emailRegexp: new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
      nameRegexp: new RegExp(/^[\S]{3,20}$/)

    }
  },
  methods: {
    /**    
     * Funcion que valida el textArea
     */
    validTextArea() {
      //Esta regexp nos permite establecer que minimo se necesiten 3 palabras para que sea válido el campo      
      this.textAreaError = validator(this.suggestionRegexp, this.textArea)
    },
    /**    
     * Funcion que valida el email
     */
    validEmail() {
      /*El email puede tener cualquier caracter en cualquier cantidad siempre y cuando no sea una @, espacio o tabulación en la primera parte
        Luego tendrá una @, luego otro set igual que en la primera parte, un punto y finalmente otro set del mismo tipo*/
      this.emailError = validator(this.emailRegexp, this.email)
    },
    /**
     * Función que valida el nombre de usuario
     */
     validName() {
      //El usuario admitirá cualquier caracter pero tendrá entre 3 y 20 caracteres     
      this.nameError = validator(this.nameRegexp, this.name)
    },
    /**    
     * Funcion que controla que cuando todo sea válido, se haga el submit y se envie un mensaje a mi correo
     */
    submit() {
      if (!this.textAreaError && !this.emailError && !this.nameError) {
        emailjs.sendForm('service_eifxgyp', 'template_3ugrigt', this.$refs.form, 'LUxtrFSYPmdgvJjpP')
        .then((result) => {
            console.log('SUCCESS!', result.text);
        }, (error) => {
            console.log('FAILED...', error.text);
        });
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
    name: function () {
    }
  }
}
</script>