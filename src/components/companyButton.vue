<template>
    <button class="company" @click="details">
        <img :src="logo" class="company-logo" :alt="level">
        <p class="companyName">{{ companyName }}</p>
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