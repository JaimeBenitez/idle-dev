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
        <ul v-if="upgrades.length > 0" class="worker-detailed__upgrades">
            <WorkerUpgrade v-for="upgrade in upgrades" 
            :key="upgrade.name" 
            :logo="upgrade.logo" 
            :name="upgrade.name" 
            :description="upgrade.description" />
        </ul>
        <p v-if="upgrades.length == 0" class="worker-detailed__no-upgrade">No hay mejoras</p>
    </div>
</template>

<script>
    
    import WorkerUpgrade from "./workerUpgrade.vue"

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
        components: {
            WorkerUpgrade
        }
    } 
</script>