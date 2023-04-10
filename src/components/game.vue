<template>
  <Header icon="logout.svg" :isGame=true />
  <div class="game">
    <div class="principal-menu">
      <TabNav />
      <div class="principal-container">      
        <nav class="multipliers-nav">
          <MultiplierButton text="x1" v-on:click="setQuantityToBuy(1)" />
          <MultiplierButton text="x10" v-on:click="setQuantityToBuy(10)" />
          <MultiplierButton text="x100" v-on:click="setQuantityToBuy(100)" />
        </nav>
        <TechButton v-for="tech in activeTechs" :key="tech.id" :id="tech.id" :logo="tech.logo" :techName="tech.name"
          :totalProfit="tech.totalProfit" :quantity="tech.quantityOwned" :quantityToBuy="quantityToBuy"
          :currentCost="tech.currentCost" @buy="handleBuy" :canBuy="tech.currentCost <= principalMoney" />
      </div>
    </div>
    <section class="principal-resources">
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
import TabNav from './tabs-nav.vue'
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
    TabNav
  },
  data() {
    return {
      userData: {},
      allUsersData: [],
      userLanguages: [],
      logos: [HTML,CSS,JS,Node,Java,PHP],
      quantityToBuy: 1,
      principalMoney: 0,
      moneyPerSecond: 0,
      moneyPerClick: 0.1,
      bounce: "principal-pc",
      modalmsg: '',
      loading: false,
      saving: false,
      techs: []
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
        const response = await fetch(`http://localhost:8080/clasificacion`)
        this.allUsersData = await response.json();
      } catch (error) {
        this.modalmsg = "Ha ocurrido un error y los datos no se han cargado"
      }
    },
    /**
     * Funcíon que coge de la API los datos de los lenguajes de la partida actual
     */
     async getLanguages(user) {
      try {
        const response = await fetch(`http://localhost:8080/lenguajes`)
        const techs = await response.json();
        try {
          //Cogemos los datos sobre los lenguajes que tiene la partida del jugador
          const userDataResponse = await fetch(`http://localhost:8080/partida/${user}/lenguajes`)
          if (userDataResponse.status == 200) {
            //Si nos da un OK seteamos los datos de los lenguajes del jugador
            this.userLanguages =  await userDataResponse.json();   
                  
          }else{
            //Si no hay relaciones creadas las crea en ese momento, hay que hacerlo con el Status ya que el catch no considera
            //el error 404 como un error
            let userLanguage = {}
            for (let i = 0; i < techs.length; i++){
              try{
                userLanguage = {
                  "lenguajeId": techs[i].id,
                  "partidaId": localStorage.getItem("user")
                }
                let response = await fetch(`http://localhost:8080/lenguaje-partida`, {
                method: "POST",
                body: JSON.stringify(userLanguage),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },            
                }) 
                let newUserLanguage = await response.json();
                this.userLanguages.push(newUserLanguage);
              } catch(error) {
                this.modalmsg = "Ha ocurrido un error y los datos de lenguajes del usuario no se han cargado"
              }
            }
          }
        } catch (error) {
          this.modalmsg = "Ha ocurrido un error y los datos de lenguajes no se guardaron correctamente"
        }
        //Si todo va bien vamos creando la lista definitiva de tecnologias con los datos de ambas tablas
        for (let i = 0; i < techs.length; i++){
          this.techs.push({
            "id" : techs[i].id,
            "name" : techs[i].nombre,
            "logo" : this.logos[i],
            "initialCost" : techs[i].dinero_desbloqueo,
            "profitPerUnit" : techs[i].beneficio_base,
            "growthRatio": techs[i].ratio_incremento,
            "minMoneyToUnlock" : techs[i].dinero_desbloqueo,
            "unlocked" : this.userLanguages[i].desbloqueado,
            "quantityOwned" : this.userLanguages[i].cantidad,
            "currentCost": 0,
            "totalProfit": 0,
            "msg": techs[i].mensaje
          })
        }
      } catch (error) {
        this.modalmsg = "Ha ocurrido un error y los datos de los lenguajes no se han cargado"
      }
    },
    /**
     * Función que coge de la API los datos de juego del usuario registrado. 
     */
    async getData() {
      const user = localStorage.getItem("user")
      try {
        this.loading = true
        const gameResponse = await fetch(`http://localhost:8080/partida/${user}`)        
        this.userData = await gameResponse.json()
        
        //Seteamos el dinero con la información de la api
        this.principalMoney = this.userData.dinero
        this.modalmsg = ''
        //Como necesitamos la lista que genera la función, usamos await para esperar a que esta termine antes del for
        await this.getLanguages(user)
        //Volvemos a hacer los calculos necesarios usando la info de la api        
        for(let i = 0; i < this.techs.length; i++){
          
          let tech = this.techs[i]
          tech.currentCost = tech.initialCost * ((tech.growthRatio ** tech.quantityOwned * ((tech.growthRatio ** this.quantityToBuy) - 1)) / (tech.growthRatio - 1))
          tech.totalProfit = tech.profitPerUnit * tech.quantityOwned
          this.moneyPerSecond += tech.totalProfit
        }
        if (this.moneyPerSecond) {
          this.moneyPerClick = this.moneyPerSecond * 0.1
        }
        this.loading = false
        if (this.principalMoney == 0){
          this.modalmsg = "Bienvenido al fantástico mundo de la programación. Te espera un gran viaje a traves de la historia de la informática. Haz click en el ordenador para ganar beneficios y empezar a comprar las tecnologías que irás aprendiendo"
        }
        
      } catch (error) {
        this.modalmsg = "Ha ocurrido un error y los datos no se guardaron correctamente"        
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
      const user = localStorage.getItem("user")
      //Cogemos los datos que queremos guardar
      const userMoney= {
        "dinero": this.principalMoney
      }
      
      //Guardamos el dinero principal
      try {
        this.saving = true
        await fetch(`http://localhost:8080/partida/${user}`, {
          method: "PUT",
          body: JSON.stringify(userMoney),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
        //Vamos seteando los cambios en los lenguajes de la partida
        for(let i=0; i< this.userLanguages.length; i++) {
          // Cogemos la id de la relación concreta para poder hacer la llamada
          let dataId = this.userLanguages[i].id
          let newData = {
            "desbloqueado" : this.techs[i].unlocked,
            "cantidad": this.techs[i].quantityOwned
          }
          try{
            await fetch(`http://localhost:8080/lenguaje-partida/${dataId}`, {
            method: "PUT",
            body: JSON.stringify(newData),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
          })
          }
          catch{
            this.modalmsg = "Ha ocurrido un error y los datos de lenguajes no se guardaron correctamente"
          }
        }
        this.saving = false
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