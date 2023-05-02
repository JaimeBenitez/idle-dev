<template>
    <button class="game-tab"><img :src="img" :alt="alt" class="tab-img" v-bind:class="{active: isActive }"/></button>
</template>

<script>
    export default{
        name: "tabButton",
        props: {
            img: String,
            alt: String,
            isActive: Boolean
        },
    }
</script>