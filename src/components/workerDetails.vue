<template>
    <div class="worker-detailed__container">
        <span class="worker-detailed__name">{{ workerName }}</span>
        <section class="worker-detailed__principal-info">
            <div class="worker-detailed__principal-info--description">
                <span class="worker-detailed__capacity">Capacidad</span>
                <span class="worker-detailed__PA">{{ PA }} PA/s</span>
            </div>
            <img class="worker-detailed__image" :src="image" alt="" />
        </section>
        <span class="worker-detailed__levels">Niveles ({{ totalLevel }}/30)</span>
        <div class="worker-detailed__tech-levels">
            <div v-for="tech in techs" :key="tech.techName" class="worker-detailed__tech-levels--list">
                <img class="worker-detailed__tech-logo"  :src="tech.logo" :alt="tech.techName" />
                <p  class="tech-level">{{ tech.level }}</p>
            </div>
        </div>
        <span class="worker-detailed__upgrades-title">Mejoras</span>
        <ul class="worker-detailed__upgrades">
            <li v-if="upgrades[0]" class="worker-detailed__upgrade"><img class="worker-detailed__upgrade-logo" :src="upgrades[0].logo" alt=""/><span class="upgrade-name">{{ upgrades[0].name }}</span> <span class="upgrade-description">{{ upgrades[0].description }}</span></li> 
            <li v-if="upgrades[1]" class="worker-detailed__upgrade"><img class="worker-detailed__upgrade-logo" :src="upgrades[1].logo" alt=""/><span class="upgrade-name">{{ upgrades[1].name }}</span> <span class="upgrade-description">{{ upgrades[1].description }}</span></li>           
            <li v-if="upgrades[2]" class="worker-detailed__upgrade"><img class="worker-detailed__upgrade-logo" :src="upgrades[2].logo" alt=""/><span class="upgrade-name">{{ upgrades[2].name }}</span> <span class="upgrade-description">{{ upgrades[2].description }}</span></li>
            <li v-if="!upgrades[0]" class="worker-detailed__no-upgrade">Hueco libre</li>
            <li v-if="!upgrades[1]" class="worker-detailed__no-upgrade">Hueco libre</li>
            <li v-if="!upgrades[2]" class="worker-detailed__no-upgrade">Hueco libre</li>
        </ul>
    </div>
</template>

<script>
  

    export default{
        "name": "workerDetails",
        "props": {
            "workerName": String,
            "image": String,
            "companyName": String,
            "totalLevel": Number,
            "PA": Number,
            "techs": Array[Object],
            "upgrades": Array[Object]
        },
       
        
        
        // Las tecnologias iran en la data del trabajador sacandolas de la BD
    } 
</script>