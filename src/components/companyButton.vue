<template>
    <button class="company-list__company" @click="details">
        <img :src="logo" class="company-list__company-logo" :alt="level">
        <p class="company-list__company-name">{{ companyName }}</p>
    </button>
</template>

<script>
    export default {
        name: "companyButton",
        props: {
            id: Number,
            logo: String,
            companyName: String,
            level: String
        },
        methods: {
            details(){
                this.$emit("details",this.id)
            }
        }

    }
</script>