<template>
    <div class="worker-detailed__container">
        <span class="worker-detailed__workerName">{{ workerName }}</span>
        <span class="worker-detailed__companyName">{{ companyName }}</span>
        <span class="worker-detailed__PA">{{ PA }} PA</span>
        <img class="worker-detailed__image" :src="image" alt="" />

        <span class="company-detailed__name">Niveles ({{ totalLevel }}/30)</span>
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
            "techs": Array[Object]
        },
        
        // Las tecnologias iran en la data del trabajador sacandolas de la BD
    } 
</script>