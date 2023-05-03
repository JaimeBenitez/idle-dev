<template>
    <div class="worker-detailed__container">
        <span class="worker-detailed__name">{{ workerName }}</span>
        <section class="worker-detailed__principal-info">
            <div class="worker-detailed__principal-info--description">
                <span class="worker-detailed__companyName">{{ companyName }}</span>
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
        <span class="worker-detailed__upgrades">Mejoras</span>
        <ul>
            <li v-if="upgrades[0]" class="worker-detailed__upgrade"><img :src="upgrades[0].logo" alt=""/><span>{{ upgrades[0].nombre }}</span> <span>{{ upgrades[0].descripcion }}</span></li>
            <li v-if="!upgrades[0]" class="worker-detailed__no-upgrade">Hueco libre</li>
            <li v-if="upgrades[1]" class="worker-detailed__upgrade"><img :src="upgrades[1].logo" alt=""/><span>{{ upgrades[1].nombre }}</span> <span>{{ upgrades[1].descripcion }}</span></li>
            <li v-if="!upgrades[1]" class="worker-detailed__no-upgrade">Hueco libre</li>
            <li v-if="upgrades[2]" class="worker-detailed__upgrade"><img :src="upgrades[2].logo" alt=""/><span>{{ upgrades[2].nombre }}</span> <span>{{ upgrades[2].descripcion }}</span></li>
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