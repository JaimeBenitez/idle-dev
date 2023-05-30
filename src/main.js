import { createApp } from 'vue'
import { createRouter, createWebHashHistory} from 'vue-router'
import App from './App.vue'
import Index from './components/index.vue'
import Contact from './components/contact.vue'
import Register from './components/register.vue'
import Login from './components/login.vue'
import Game from './components/game.vue'
import Edit from './components/edit.vue'

//definimos objeto rutas -- configuracion
//Especificamos un nombre a las rutas para mejor mantenimiento del codigo ya que
//de lo contrario si cambiamos el path por algun motivo tendriamos que ir cambiando uno a uno
const routes = [
    { path:'/', component: Index },
    {  path:'/contact', component: Contact },
    {  path:'/register', component: Register },
    {  path:'/login', component: Login },
    {  path:'/game', component: Game },
    {  path:'/edit', component: Edit }      
]

//creamos el objeto rutas de vue router -- objeto de VR
const router = createRouter({
    history: createWebHashHistory(),
    routes})


//Instancia de la aplicación en Vue
const app = createApp(App)

app.use(router)



app.mount('#app')
