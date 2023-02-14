<template>
  <Header icon="logout.svg" :isGame=true />
  <div class="game">
    <section class="tech-container">
      <nav class="multipliers-nav">
        <MultiplierButton text="x1" v-on:click="setQuantityToBuy(1)" />
        <MultiplierButton text="x10" v-on:click="setQuantityToBuy(10)" />
        <MultiplierButton text="x100" v-on:click="setQuantityToBuy(100)" />
      </nav>
      <TechButton v-for="tech in activeTechs" :key="tech.id" :id="tech.id" :logo="tech.logo" :techName="tech.name"
        :totalProfit="tech.totalProfit" :quantity="tech.quantityOwned" :quantityToBuy="quantityToBuy"
        :currentCost="tech.currentCost" @buy="handleBuy" :canBuy="tech.currentCost <= principalMoney" />
    </section>
    <section class="principal">
      <section class="principal-score">
        <span class="money">{{ formattedPrincipalMoney }}</span>
        <span class="generation">{{ formattedMoneyPerSecond }}</span>
        <span class="generation">{{ formattedMoneyPerClick }}<img src='@/assets/hand-click.svg' alt="click"
            class="click" /></span>
      </section>
      <button class="computer-button" @click="handleClicks"><img :class="bounce" src="@/assets/ordenador.png"
          alt="click me" /></button>
      <button v-if="!saving" class="button save-button" @click="saveData">Guardar</button>
      <button v-if="saving" class="button save-button" @click="saveData">Guardando...</button>
    </section>
    <Modal v-if="modalmsg != ''" :msg="modalmsg" buttonMsg="Continuar" textClass="modal-game-message" :isGame=true
      @close="handleClose" />
      <!-- Modal que se mostrará mientras cargan los datos de partida -->
    <section v-if="loading" class="modal">
        <div class="modal-container">
            <p class="modal-message">Cargando partida</p>            
        </div>
    </section>
  </div>
</template>

<script>
/**
 * @file game.vue - Pagina de juego
 * @author Jaime Benitez
 * @see <a href="https://jaimebenitez.com" target="_blank">Jaime Benitez </a>
 */
//Para poder usar las imagenes correctamente como props tenemos que importarlas aqui y usarlas como variable de Data
import Header from './header.vue'
import MultiplierButton from './multiplier-button.vue'
import TechButton from './tech-button.vue'
import HTML from '@/assets/html.svg'
import CSS from '@/assets/css.svg'
import JS from '@/assets/js.svg'
import Node from '@/assets/nodejs.svg'
import Java from '@/assets/java.svg'
import PHP from '@/assets/php.svg'
import formatNumber from '@/utils/formatters'
import Modal from './modal.vue'
/**
 * @vue-data {Object} [userData = {}] -  Almacenara los datos de partida del usuario actual
 * @vue-data {Array<Object>} [allUsersData = []] -  Almacenara los datos de partida de todos los jugadores registrados, para poder guardar partida
 * @vue-data {Number} [quantityToBuy = 1] - Establece la cantidad de recurso a comprar
 * @vue-data {Number} [principalMoney = 0] - Establece la cantidad de dinero actual del jugador
 * @vue-data {Number} [moneyPerSecond = 0] - Establece la generación de dinero por segundo
 * @vue-data {Number} [moneyPerClick = 0.1] - Establece la generación de dinero por click
 * @vue-data {String} [bounce = "principal-pc"] - Establece el cambio de clase necesaria para la animación de rebote del pc
 * @vue-data {String} [modalMsg = ''] - Establece el mensaje que se mostrará en el modal. Tambien sirve para controlar cuando este aparece y desaparece
 * @vue-data {Boolean} [loading = false] - Controla lo que se mostrará mientras cargan los datos de la api
 * @vue-data {Boolean} [saving = false] - Controla lo que se mostrará mientras se guardan los datos en la api
 * @vue-data {Array<Object>} techs - Contiene los datos de las diferentes tecnologías. Registra los siguientes campos: <br>
 * <strong>id</strong> - Id del lenguaje <br>
 * <strong>name</strong> - Nombre del lenguaje <br>
 * <strong>logo</strong> - Ruta al logo <br>
 * <strong>initialCost</strong> - Coste inicial del lenguaje. Irá incrementando a medida que se compre <br>
 * <strong>profitPerUnit</strong> - La cantidad de beneficios que aporta cada unidad <br>
 * <strong>growthRatio</strong> - El ratio de aumento del coste por compra de la unidad <br>
 * <strong>minMoneyToUnlock</strong> - El minimo necesario de dinero para poder desbloquear el lenguaje por primera vez <br>
 * <strong>unlocked</strong> - Si el lenguaje esta o no desbloqueado <br>
 * <strong>quantityOwned</strong> - La contidad actual de tecnologia obtenida <br>
 * <strong>currentCost</strong> - El coste actual del lenguaje <br>
 * <strong>totalProfit</strong> - El beneficio actual que reporta el total de unidades de esta tecnología <br>
 * <strong>msg</strong> - El mensaje que se mostrará en el modal al ser desbloqueada por primera vez 
 * @vue-computed {String} formattedPrincipalMoney - Devuelve el dinero principal formateado
 * @vue-computed {String} formattedMoneyPerSecond - Devuelve el dinero por segundo formateado
 * @vue-computed {String} formattedMoneyPerClick - Devuelve el dinero por click formateado
 * @vue-computed {Array<Object>} activeTechs - Devuleve las tecnologias activas actualmente
 */
export default {
  name: 'GamePage',
  components: {
    Header,
    MultiplierButton,
    TechButton,
    Modal,
  },
  data() {
    return {
      userData: {},
      allUsersData: [],
      quantityToBuy: 1,
      principalMoney: 0,
      moneyPerSecond: 0,
      moneyPerClick: 0.1,
      bounce: "principal-pc",
      modalmsg: '',
      loading: false,
      saving: false,
      techs: [
        {
          "id": 1,
          "name": "Html",
          "logo": HTML,
          "initialCost": 3.7,
          "profitPerUnit": 1.67,
          "growthRatio": 1.07,
          "minMoneyToUnlock": 3.7,
          "unlocked": false,
          "quantityOwned": 0,
          "currentCost": 3.7,
          "totalProfit": 0,
          "msg": "HTML es el lenguaje esqueleto de cualquier web, con el podrás comenzar a construir la estructura de una web"
        },
        {
          "id": 2,
          "name": "Css",
          "logo": CSS,
          "initialCost": 60,
          "profitPerUnit": 20,
          "growthRatio": 1.15,
          "minMoneyToUnlock": 60,
          "unlocked": false,
          "quantityOwned": 0,
          "currentCost": 60,
          "totalProfit": 0,
          "msg": "CSS te permitirá dotar de estilos a tu web. Hazla brillar e impresiona a todo el mundo con tus animaciones"
        },
        {
          "id": 3,
          "name": "JavaScript",
          "logo": JS,
          "initialCost": 720,
          "profitPerUnit": 90,
          "growthRatio": 1.14,
          "minMoneyToUnlock": 720,
          "unlocked": false,
          "quantityOwned": 0,
          "currentCost": 720,
          "totalProfit": 0,
          "msg": "JS es el nucleo duro de toda página web. Con el podras dotar a tu web de interactividad."
        },
        {
          "id": 4,
          "name": "NodeJS",
          "logo": Node,
          "initialCost": 8640,
          "profitPerUnit": 360,
          "growthRatio": 1.13,
          "minMoneyToUnlock": 8640,
          "unlocked": false,
          "quantityOwned": 0,
          "currentCost": 8640,
          "totalProfit": 0,
          "msg": "¿Por que no montar nuestro servidor usando también JS? Node lo hará posible"
        },
        {
          "id": 5,
          "name": "Java",
          "logo": Java,
          "initialCost": 103680,
          "profitPerUnit": 2160,
          "growthRatio": 1.12,
          "minMoneyToUnlock": 103680,
          "unlocked": false,
          "quantityOwned": 0,
          "currentCost": 103680,
          "totalProfit": 0,
          "msg": "Java fue durante mucho tiempo uno de los lenguajes mas usados del mundo y aún hoy se usa mucho. Piensa, hasta minecraft está hecho en Java"
        },
        {
          "id": 6,
          "name": "PHP",
          "logo": PHP,
          "initialCost": 1244160,
          "profitPerUnit": 6480,
          "growthRatio": 1.11,
          "minMoneyToUnlock": 1244160,
          "unlocked": false,
          "quantityOwned": 0,
          "currentCost": 1244160,
          "totalProfit": 0,
          "msg": "PHP es un lenguaje ampliamente usado en web desde la parte del servidor ¿Te gusta concatenar con un punto? Con PHP tienes la oportunidad"
        },

      ]
    }
  },
  computed: {
    formattedPrincipalMoney() {
      return formatNumber(this.principalMoney, "€")
    },
    formattedMoneyPerSecond() {
      return formatNumber(this.moneyPerSecond, "€/s")
    },
    formattedMoneyPerClick() {
      return formatNumber(this.moneyPerClick, "€/")
    },
    activeTechs() {
      //Nos dice que tecnologias mostrar con nuestras ganancias actuales
      return this.techs.filter((tech) => tech.unlocked == true)
    }
  },
  methods: {
    /**
     * Funcíon que coge de la API los datos de juego de todos los usuarios
     */
    async getAllUsersData() {
      try {
        const response = await fetch(`https://idle-dev-apirest.onrender.com/api/V1/gameData`)
        this.allUsersData = await response.json();
      } catch (error) {
        this.modalmsg = "Ha ocurrido un error y los datos no se han cargado"
      }
    },
    /**
     * Función que coge de la API los datos de juego del usuario registrado. En caso de no existir los crea con los parametros base
     */
    async getData() {
      const user = localStorage.getItem("user")
      try {
        this.loading = true
        const response = await fetch(`https://idle-dev-apirest.onrender.com/api/V1/gameData/${user}`)

        this.userData = await response.json()
        this.loading = false
        //Seteamos las variables que necesitamos con la información de la api

        this.principalMoney = this.userData.principalMoney
        this.techs[0].quantityOwned = this.userData.HTMLAmount
        this.techs[0].unlocked = this.userData.HTMLUnlocked
        this.techs[1].quantityOwned = this.userData.CSSAmount
        this.techs[1].unlocked = this.userData.CSSUnlocked
        this.techs[2].quantityOwned = this.userData.JSAmount
        this.techs[2].unlocked = this.userData.JSUnlocked
        this.techs[3].quantityOwned = this.userData.NodeAmount
        this.techs[3].unlocked = this.userData.NodeUnlocked
        this.techs[4].quantityOwned = this.userData.JavaAmount
        this.techs[4].unlocked = this.userData.JavaUnlocked
        this.techs[4].quantityOwned = this.userData.PHPAmount
        this.techs[4].unlocked = this.userData.PHPUnlocked
        this.modalmsg = ''
        //Volvemos a hacer los calculos necesarios usando la info de la api        
        for (let i = 0; i < this.techs.length; i++) {
          let tech = this.techs[i]
          tech.currentCost = tech.initialCost * ((tech.growthRatio ** tech.quantityOwned * ((tech.growthRatio ** this.quantityToBuy) - 1)) / (tech.growthRatio - 1))
          tech.totalProfit = tech.profitPerUnit * tech.quantityOwned
          this.moneyPerSecond += tech.totalProfit
        }
        if (this.moneyPerSecond) {
          this.moneyPerClick = this.moneyPerSecond * 0.1
        }

      } catch (error) {
        //Si no encuentra datos de partida simplemente se considera que inicia una nueva partida y se crean los datos de partida,
        //haremos las mismas comprobaciones que con el PUT
        const userData = {
          "playerName": localStorage.getItem("user"),
          "principalMoney": this.principalMoney,
          "HTMLAmount": this.techs[0].quantityOwned,
          "HTMLUnlocked": this.techs[0].unlocked,
          "CSSAmount": this.techs[1].quantityOwned,
          "CSSUnlocked": this.techs[1].unlocked,
          "JSAmount": this.techs[2].quantityOwned,
          "JSUnlocked": this.techs[2].unlocked,
          "NodeAmount": this.techs[3].quantityOwned,
          "NodeUnlocked": this.techs[3].unlocked,
          "JavaAmount": this.techs[4].quantityOwned,
          "JavaUnlocked": this.techs[4].unlocked,
          "PHPAmount": this.techs[5].quantityOwned,
          "PHPUnlocked": this.techs[5].unlocked,
        }
        try {
          this.loading = true
          const response = await fetch(`https://idle-dev-apirest.onrender.com/api/V1/gameData`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },            
          });
          const createdUser = await response.json()
          this.loading = false;
          const createdKeys = Object.keys(createdUser);
          const inputKeys = Object.keys(userData);

          if (createdKeys.length !== inputKeys.length) {
            this.modalmsg = "Ha ocurrido un error y los datos no se guardaron correctamente"
            return false
          }
          for (let key of createdKeys) {
            if (createdUser[key] !== userData[key]) {
              this.modalmsg = "Ha ocurrido un error y los datos no se guardaron correctamente"
              return false
            }
          }
        } catch (error) {
          this.modalmsg = "Ha ocurrido un error y los datos no se guardaron correctamente"
        }
        this.modalmsg = "Bienvenido al fantástico mundo de la programación. Te espera un gran viaje a traves de la historia de la informática. Haz click en el ordenador para ganar beneficios y empezar a comprar las tecnologías que irás aprendiendo"
      }
    },
    /**
     * Función que le dice a los modales cuando cerrarse
     */
    handleClose() {
      this.modalmsg = '';
    },
    /**
     * Función que setea la cantidad que queremos comprar y su coste. Se activa con los botones de cantidad
     * @param {Number} quantity - Cantidad a comprar
     */
    setQuantityToBuy(quantity) {
      //Establecemos la cantidad a comprar y seteamos el coste actual
      this.quantityToBuy = quantity
      for (let i = 0; i < this.techs.length; i++) {
        let tech = this.techs[i]
        tech.currentCost = tech.initialCost * ((tech.growthRatio ** tech.quantityOwned * ((tech.growthRatio ** this.quantityToBuy) - 1)) / (tech.growthRatio - 1))
      }
    },
    /**
     * Función que va añadiendo al dinero principal el dinero por segundo y establece cuando las tecnologias se desbloquean, mostrando el modal necesario en cada ocasion.<br>
     * Se activa cada segundo
     */
    handleMoney() {
      //Añadimos a la cantidad principal la ganancia actual por segundo
      this.principalMoney += this.moneyPerSecond
      const lockedTechs = this.techs.filter((tech) => tech.unlocked == false)
      //Establecemos la condición para desbloquear la siguiente tecnologia
      for (let i = 0; i < lockedTechs.length; i++) {
        let tech = lockedTechs[i]
        if (tech.minMoneyToUnlock <= this.principalMoney && tech.unlocked == false) {
          tech.unlocked = true
          this.modalmsg = tech.msg
        }
      }
    },
    /**
     * Función que activa la función handleMoney a cada segundo
     */
    setMoneyPerSecondInterval() {
      setInterval(this.handleMoney, 1000);
    },
    /**
     * Función que gestiona toda la compra de tecnologias y setea todos los valores de ganancias acorde a la tecnologia comprada
     * @param {Number} techId - id de la tecnología a comprar
     */
    handleBuy(techId) {
      const tech = this.techs.find((tech) => tech.id == techId)
      //Solo reacciona si encontramos anteriormente una tecnologia con la ID que buscamos
      if (tech) {
        //Añadimos la cantidad de la tecnologia concreta
        tech.quantityOwned += this.quantityToBuy
        //Establecemos la diferencia de ganancia entre antes y despues de la compra
        let profitDiff = (tech.quantityOwned * tech.profitPerUnit) - tech.totalProfit
        //Cantidad total de ganancia
        tech.totalProfit = tech.profitPerUnit * tech.quantityOwned
        //Quitamos del dinero principal el coste actual 
        this.principalMoney -= tech.currentCost
        //Establecemos el nuevo coste
        tech.currentCost = tech.initialCost * ((tech.growthRatio ** tech.quantityOwned * ((tech.growthRatio ** this.quantityToBuy) - 1)) / (tech.growthRatio - 1))
        //Añadimos la nueva ganancia a la ganancia/segundo actual
        this.moneyPerSecond += profitDiff
        this.moneyPerClick = this.moneyPerSecond * 0.1
      }
    },
    /**
     * Función que causa el rebote del pc cuando se hace click y añade el dinero por click al dinero total
     */
    handleClicks() {
      //Añadimos la animación de rebote y el dinero al principal. Seteamos la perdida de la clase al tiempo que dura la animación y nos queda perfecta
      this.bounce = "principal-pc animated"
      this.principalMoney += this.moneyPerClick
      setTimeout(() => { this.bounce = "principal-pc" }, 500)
    },
    /**
     * Función que guarda la partida en la base de datos
     */
    async saveData() {
      //Cogemos los datos que queremos guardar
      const userData = {
        "playerName": localStorage.getItem("user"),
        "principalMoney": this.principalMoney,
        "HTMLAmount": this.techs[0].quantityOwned,
        "HTMLUnlocked": this.techs[0].unlocked,
        "CSSAmount": this.techs[1].quantityOwned,
        "CSSUnlocked": this.techs[1].unlocked,
        "JSAmount": this.techs[2].quantityOwned,
        "JSUnlocked": this.techs[2].unlocked,
        "NodeAmount": this.techs[3].quantityOwned,
        "NodeUnlocked": this.techs[3].unlocked,
        "JavaAmount": this.techs[4].quantityOwned,
        "JavaUnlocked": this.techs[4].unlocked,
        "PHPAmount": this.techs[5].quantityOwned,
        "PHPUnlocked": this.techs[5].unlocked,
      }

      try {
        this.saving = true
        const response = await fetch(`https://idle-dev-apirest.onrender.com/api/V1/gameData/${userData.playerName}`, {
          method: "PUT",
          body: JSON.stringify(userData),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })

        const updatedUser = await response.json();
        this.saving = false
        //Como no podemos comparar directamente dos objetos usaremos sus keys para hacer las comprobaciones
        const updatedKeys = Object.keys(updatedUser);
        const inputKeys = Object.keys(userData);

        if (updatedKeys.length !== inputKeys.length) {
          this.modalmsg = "Ha ocurrido un error y los datos no se guardaron correctamente"
          return false
        }
        for (let key of updatedKeys) {
          if (updatedUser[key] !== userData[key]) {
            this.modalmsg = "Ha ocurrido un error y los datos no se guardaron correctamente"
            return false
          }
        }
        this.modalmsg = "Partida guardada correctamente"
      } catch (error) {
        this.modalmsg = "Ha ocurrido un error y los datos no se guardaron correctamente"
      }
    },
    /**
     * Función que redirecciona al index si no estamos logueados
     */
    redirect() {
      if (!localStorage.getItem("user")) {
        this.$router.push('/')
      }
    }
  },
  mounted() {
    this.redirect();
    this.setMoneyPerSecondInterval();
    this.getAllUsersData()
    this.getData()
  }
}
</script>