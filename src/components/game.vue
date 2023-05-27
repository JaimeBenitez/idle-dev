<template>
  <Header icon="logout.svg" :isGame=true />
  <div class="game">
    <div class="principal-menu">
      <TabNav @tab1="handleTabs(1)" @tab2="handleTabs(2)" @tab3="handleTabs(3)" @tab4="handleTabs(4)" ></TabNav>
      <div class="principal-container">      
        <nav v-if="actualTab == 1" class="multipliers-nav">
          <GameButton text="x1" v-on:click="setQuantityToBuy(1)" />
          <GameButton text="x10" v-on:click="setQuantityToBuy(10)" />
          <GameButton text="x100" v-on:click="setQuantityToBuy(100)" />
        </nav>
        <div v-if="actualTab == 1" class="technologies_list">
          <TechButton v-for="tech in activeTechs" 
          :key="tech.id" 
          :id="tech.id" 
          :logo="tech.logo" 
          :techName="tech.name"
          :totalProfit="tech.totalProfit" 
          :quantity="tech.quantityOwned" 
          :quantityToBuy="quantityToBuy"
          :currentCost="tech.currentCost" 
          @buy="handleBuy" 
          :canBuy="tech.currentCost <= principalMoney" />
        </div>
        <div v-if="actualTab == 2" class="workers-tab">
          <div class="workers_list">
            <WorkerButton v-for="worker in workers" 
            :key="worker.id" 
            :id="worker.id" 
            :logo="worker.image" 
            :workerName="worker.name" 
            @details="handleWorkerDetails" />
          </div>
          <GameButton text="Contratar" class="hire-button" @click ="handleHireModal()" />
        </div>
        <div v-if="actualTab == 3" class="training-tab">
          <div class="training-list">
            <div v-if="inTraining.length == 0" class="no-training">
              <p class="no-training-text">No hay trabajadores formandose</p>
            </div>
            <div v-if="inTraining.length != 0" class="training-list">
              <TrainingInfo v-for="training in inTraining" :key="training.workerId" :training=training
              />
            </div>
            
          </div>
          <GameButton text="Entrenar" class="training-button" @click ="handleTrainingWorkerModal()" />
        </div>
        <div v-if="actualTab == 4" class="companies_list">
          <CompanyButton v-for="company in companies" 
          :key="company.id" 
          :id="company.id" 
          :logo="company.logo" 
          :companyName="company.level == 0 ? '?????????' : company.name" 
          :level="'Nivel' + company.level" 
          @details="handleDetails" />
        </div>
        <CompanyDetails v-if="actualTab == 5" 
        :companyName="companyDetailed.name" 
        :logo="companyDetailed.logo" 
        :level="companyDetailed.level"
        :bonus="companyDetailed.multiplier" 
        :techsLogos="techsPerCompany" 
        :requirement="companyDetailed.nextLevelRequirement" />
        <WorkerDetails v-if="actualTab == 6"  
        :companyName="workerDetailed.company" 
        :workerName="workerDetailed.name" 
        :image="workerDetailed.image" 
        :totalLevel="workerDetailed.totalLevel"
        :PA="workerDetailed.pa" 
        :techs="workerDetailed.languages"
        :upgrades="workerDetailed.upgrades" />
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
    <HireModal v-if="actualTab == 7" :gameId="parseInt(user)" :techs="techs" :slotsOcuppied="slotsOccupied"
      @close="handleHireClose" @hired="hiredWorker"/>
    <TrainingWorkerModal v-if="actualTab == 8"  :workers="workers" 
      @close="handleTrainingClose" @chosen="handleTrainingTechModal"/>
    <TrainingTechModal v-if="actualTab == 9"  :techs="techs" :workerTechs="workerToTrain.languages"
      @close="handleTrainingClose" @chosen="handleChosenTraining"/>
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
import GameButton from './gameButton.vue'
import TechButton from './techButton.vue'
import CompanyButton from './companyButton.vue'
import formatNumber from '@/utils/formatters'
import Modal from './modal.vue'
import TabNav from './tabsNav.vue'
import CompanyDetails from './companyDetails.vue'
import { getGameWorkers, postGameWorker } from '@/services/workerServices'
import { getUsersData } from '@/services/userServices'
import { getAllLanguages } from '@/services/languageServices'
import { getGameLanguages, saveGameLanguages } from '@/services/gameLanguageServices'
import makeLanguagesFinalList from '@/utils/makeLanguagesFinalList'
import { getAllCompanies } from '@/services/companyServices'
import { getGameCompanies, saveGameCompanies } from '@/services/gameCompanyServices'
import makeCompaniesFinalList from '@/utils/makeCompaniesFinalList'
import chooseTechsPerCompany from '@/utils/chooseTechsPerCompany'
import { getGame, saveGameMoney } from '@/services/gameServices'
import gameCalculator from '@/utils/gameCalculator'
import buyTech from '@/utils/buyTech'
import makeWorkersFinalList from '@/utils/makeWorkersFinalList'
import WorkerButton from './workerButton.vue'
import WorkerDetails from './workerDetails.vue'
import unlockCompanies from '@/utils/unlockCompanies'
import HireModal from './hireModal.vue'
import TrainingWorkerModal from './trainingWorkerModal.vue'
import TrainingTechModal from './trainingTechModal.vue'
import { makeTraining } from '@/utils/makeTraining'
import TrainingInfo from './trainingInfo.vue'
import { newWorkerLanguage, levelUpLanguage } from '@/services/workerLanguagesServices'
import calcUpgradeBonus from '@/utils/calcUpgradeBonus'
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
    GameButton,
    CompanyButton,
    TechButton,
    Modal,
    TabNav,
    CompanyDetails,
    WorkerButton,
    WorkerDetails,
    HireModal,
    TrainingWorkerModal,
    TrainingTechModal,
    TrainingInfo
    
},
  data() {
    return {
      user: localStorage.getItem("user"),
      userData: {},
      allUsersData: [],
      userLanguages: [],
      userCompanies: [],
      userWorkers: [],
      workerSlots: 1,
      slotsOccupied: 1,
      actualTab: 1,
      companyDetailed: {},
      workerDetailed: {},
      techsPerCompany: [],
      quantityToBuy: 1,
      principalMoney: 0,
      moneyPerSecond: 0,
      moneyPerClick: 0.1,
      bounce: "principal-pc",
      modalmsg: '',
      loading: false,
      saving: false,
      techs: [],
      companies: [],
      workers: [],
      workerToTrain: {},
      techToTrain: {},
      inTraining: [],
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
        this.allUsersData = await getUsersData()
      } catch (error) {
        this.modalmsg = "Ha ocurrido un error y los datos no se han cargado"
      }
    },
    /**
     * Funcíon que coge de la API los datos de los lenguajes de la partida actual
     * @param {Number} user - La id del usuario actual
     */
     async getLanguages(user) {
      try {  
        const techs = await getAllLanguages()
        try {
          //Cogemos los datos sobre los lenguajes que tiene la partida del jugador
          this.userLanguages =  await getGameLanguages(user, techs)
        } catch (error) {
          this.modalmsg = "Ha ocurrido un error y los datos de lenguajes del usuario no se guardaron correctamente"
        }
        //Si todo va bien vamos creando la lista definitiva de tecnologias con los datos de ambas tablas
          this.techs = makeLanguagesFinalList(techs, this.userLanguages)       
      } catch (error) {
        this.modalmsg = "Ha ocurrido un error y los datos de los lenguajes no se han cargado"
      }
    },
    /**
     * Funcíon que coge de la API los datos de las compañias de la partida actual
     * @param {Number} user - La id del usuario actual
     */
     async getCompanies(user) {
      try {
        const companies = await getAllCompanies()
        try {
          //Cogemos los datos sobre las empresas que tiene la partida del jugador
          this.userCompanies =  await getGameCompanies(user,companies) || []
        } catch(error) {
          this.modalmsg = "Ha ocurrido un error y los datos de empresas del usuario no se han cargado"
        }
        this.companies = makeCompaniesFinalList(companies, this.userCompanies, this.techs)         
      } catch (error) {
        console.log(error)
        this.modalmsg = "Ha ocurrido un error y los datos de las empresas no se han cargado"
      }
    },
    async getWorkers(user) {

        try { 
          let workersData =  await getGameWorkers(user)
          if(!workersData){
            //Si no encuentra datos de trabajadores en la partida actual crea el primero y vuelve a llamar a la api
            await postGameWorker(user, this.techs)
            workersData = await getGameWorkers(user)        
          }
          //Seteamos la info sobre los trabajadores del usuario
          this.userWorkers = workersData
          this.workers = await makeWorkersFinalList(this.userWorkers)
        } catch (error) {
          this.modalmsg = "Ha ocurrido un error y los datos de trabajadores no se guardaron correctamente"
        }
        //Si todo va bien vamos creando la lista definitiva de empresas con los datos de ambas tablas
        
      },
    getWorkerSlots(){
      let workerSlots = 0
      for(let i = 0; i < this.companies.length ; i++){
      
        workerSlots += this.companies[i].slots
      }
      this.workerSlots = workerSlots
    },
    async hiredWorker(workerPrice){
      this.moneyPerSecond -= workerPrice
      this.moneyPerClick = this.moneyPerSecond * 0.1
      this.slotsOccupied += 1
      this.actualTab = 2
      await this.getWorkers(this.user)
      this.modalmsg= 'Trabajador contratado'
    
    },
    handleDetails(companyId){
      this.actualTab = 5
      this.companyDetailed = this.companies.find((company) => company.id == companyId)
      this.techsPerCompany = chooseTechsPerCompany(companyId)
    },
    handleWorkerDetails(workerId){
      this.actualTab = 6
      this.workerDetailed = this.workers.find((worker) => worker.id == workerId) 
    },
    handleHireModal(){
      if(this.workerSlots > this.slotsOccupied){
      this.actualTab = 7
      } else {
        this.modalmsg = "No tienes hueco para mas trabajadores"
      }
    },
    handleTrainingWorkerModal(){
      this.actualTab = 8
    },
    handleTrainingTechModal(workerId){
      this.workerToTrain = this.workers.find((worker) => worker.id == workerId)
      let isInTraining = this.inTraining.find((training) => training.workerId == workerId)
      if(isInTraining){
        this.actualTab = 3
        this.modalmsg = "Este trabajador ya se está entrenando"
      }
      else if(this.workerToTrain.totalLevel == 30){
        this.actualTab = 3
        this.modalmsg = "Este trabajador ha llegado a su limite de aprendizaje"
      }
      else{
      this.actualTab = 9
      }
    },
    async handleChosenTraining(techId){
      this.techToTrain = this.techs.find((tech) => tech.id == techId)
      this.actualTab = 3
      let newTraining = await makeTraining(this.workerToTrain, this.techToTrain)
      //Creamos el intervalo concreto
      newTraining.intervalID = setInterval(this.handleTrainingTimer, 1000, newTraining.workerId)
      this.inTraining.push(newTraining)
    },
    handleIntervalID(intervalID, workerID){
      let trainingIndex = this.inTraining.findIndex((training) => training.workerId == workerID)
      this.inTraining[trainingIndex].intervalID = intervalID
    },
    handleClearInterval(workerID){
      let trainingIndex = this.inTraining.findIndex((training) => training.workerId == workerID)
      this.inTraining[trainingIndex].intervalID = null
    },
    handleTrainingTimer(workerID){
      let trainingIndex = this.inTraining.findIndex((training) => training.workerId == workerID)
      if(this.inTraining[trainingIndex].actualExp < this.inTraining[trainingIndex].expToLevelUp){
        this.inTraining[trainingIndex].actualExp += parseInt(this.inTraining[trainingIndex].pa.toFixed(0));
      } else{
          clearInterval(this.inTraining[trainingIndex].intervalID)
          this.handleLevelUp(workerID)
          }
      },
    async handleLevelUp(workerId){
     let trainingIndex = this.inTraining.findIndex((training) => training.workerId == workerId)
     let training = this.inTraining[trainingIndex]
     
      try{
        if(training.relationId){
          await levelUpLanguage(training.workerId, training.techId, training.techNextLevel, training.relationId)

        }else{
          await newWorkerLanguage(training.workerId, training.techId)
        }
        this.inTraining.splice(trainingIndex, 1)
        this.modalmsg=`${training.workerName} subio su nivel de ${training.techName} a ${training.techNextLevel} y has desbloqueado ${training.upgradeDescription}`
        await this.getData()
      }catch(error){
        console.log(error)
        this.modalmsg="Ocurrio un error y no se pudo actualizar el lenguaje"
      }
      
    },
    /**
     * Función que coge de la API los datos de juego del usuario registrado. 
     */
    async getData() {
      try {
        this.loading = true      
        this.userData = await getGame(this.user)
        //Seteamos el dinero con la información de la api
        this.principalMoney = this.userData.dinero
        this.modalmsg = ''
        //Como necesitamos la lista que genera la función, usamos await para esperar a que esta termine antes del for
        await this.getLanguages(this.user)
        await this.getCompanies(this.user)
        this.getWorkerSlots()
        await this.getWorkers(this.user)
        this.companies.forEach(company => this.handleCompanyBonus(company))
        this.techs.forEach(tech => this.handleUpgradeBonus(tech.id))
        //Volvemos a hacer los calculos necesarios usando la info de la api y los vamos seteando a sus respectivas variables      
        let gameData = gameCalculator(this.techs, this.moneyPerSecond, this.quantityToBuy)
        this.techs = gameData[0]
        this.moneyPerClick = gameData[1] 
        this.moneyPerSecond = gameData[2] 
        this.slotsOccupied = this.workers.length
        this.loading = false
        if (this.principalMoney == 0){
          this.modalmsg = "Bienvenido al fantástico mundo de la programación. Te espera un gran viaje a traves de la historia de la informática. Haz click en el ordenador para ganar beneficios y empezar a comprar las tecnologías que irás aprendiendo"
        }  
      } catch (error) {
        this.modalmsg = "Ha ocurrido un error y los datos no se cargaron correctamente"        
      }
    },
    /**
     * Función que gestiona el cambio de tabs
     * @param {Number} tab - La tab elegida
     */
     handleTabs(tab) {
      this.actualTab = tab;
    },
    /**
     * Función que le dice a los modales cuando cerrarse
     */
    handleClose() {
      this.modalmsg = '';
    },
    handleHireClose() {
      this.actualTab = 2;
    },
    handleTrainingClose(){
      this.actualTab = 3;
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
      let tech = this.techs.find((tech) => tech.id == techId)
      //Solo reacciona si encontramos anteriormente una tecnologia con la ID que buscamos
      if (tech) {
        let buy =  buyTech(tech,this.quantityToBuy,this.principalMoney,this.moneyPerSecond)
        this.principalMoney = buy[0]
        this.moneyPerSecond = buy[1] 
        this.moneyPerClick = buy[2] 
      }
      for (let i = 0; i < this.companies.length; i++) {
        let previousCompanyLevel = this.companies[i].level
        this.companies[i] = unlockCompanies(this.techs, this.companies[i])
        if(this.companies[i].level != previousCompanyLevel){
          this.modalmsg = `${this.companies[i].name} subió al nivel ${this.companies[i].level}`
          this.handleCompanyBonus(this.companies[i])
        }
      }
      let gameData = gameCalculator(this.techs, this.moneyPerSecond, this.quantityToBuy)
      this.techs = gameData[0]
      this.moneyPerClick = gameData[1] 
      this.moneyPerSecond = gameData[2] 
      
    },
    handleCompanyBonus(companyToChange){
      let companyIndex = this.companies.findIndex((company) => company.id == companyToChange.id)
      //Recorremos la lista de lenguajes a los que la compañia afecta
      for(let i = 0; i < this.companies[companyIndex].influencedTechs.length; i++){
        let techIndex = this.techs.findIndex((tech) => tech.id == this.companies[companyIndex].influencedTechs[i].id)

        this.techs[techIndex].companyMultiplier += this.companies[companyIndex].baseMultiplier
        
      }
    },
    handleUpgradeBonus(techId){
      let techIndex = this.techs.findIndex((tech) => tech.id == techId)
      //Filtramos los trabajadores que tengan conocimiento de ese lenguaje
      let filteredWorkers = []
      for(let i = 0 ; i < this.workers.length; i++){
        if(this.workers[i].languages.findIndex((language) => language.languageId == techId) != -1){
          filteredWorkers.push(this.workers[i])
        }
      }
      const {totalMoneyBonus, totalPaBonus, totalDiscountBonus } = calcUpgradeBonus(filteredWorkers, this.techs[techIndex].name)
      
      this.techs[techIndex].upgradeMoneyMultiplier += totalMoneyBonus
      this.techs[techIndex].upgradePAMultiplier += totalPaBonus
      this.techs[techIndex].upgradeMoneyDiscount = totalDiscountBonus
      
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
      //Guardamos el dinero principal
      try {
        this.saving = true
        await saveGameMoney(this.principalMoney, user)
        //Guardamos los cambios en los lenguajes de la partida
        try{
          await saveGameLanguages(this.userLanguages, this.techs)
        }
        catch{
          this.modalmsg = "Ha ocurrido un error y los datos de lenguajes no se guardaron correctamente"
        }
        try{
          await saveGameCompanies(this.userCompanies, this.companies)
        }
        catch{
          this.modalmsg = "Ha ocurrido un error y los datos de las empresas no se guardaron correctamente"
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