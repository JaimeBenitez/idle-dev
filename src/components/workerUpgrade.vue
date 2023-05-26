<template>
    <li  class="worker-detailed__upgrade"><img class="worker-detailed__upgrade-logo" :src="logo" alt=""/><span class="upgrade-name">{{ name }}</span> <span class="upgrade-description">{{ description }}</span></li> 
</template>

<script>

export default{
        "name": "workerUpgrade",
        "props": {
            "logo": String,
            "name": String,
            "description": String
        },
    } 
</script>