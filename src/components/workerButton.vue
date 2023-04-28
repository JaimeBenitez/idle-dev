<template>
     <button class="worker-list__worker" @click="details">
        <img :src="logo" class="worker-list__worker-logo" alt="">
        <p class="worker-list__worker-name">{{ workerName }}</p>
    </button>
</template>

<script>
    export default {
        name: "workerButton",
        props: {
            id: Number,
            workerName: String,
            logo: String
        },
        methods: {
            details(){
                this.$emit("details",this.id)
            }
        }
    }
</script>