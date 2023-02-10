<template>
    <section class="modal">
        <div class="modal-container">
            <p class="modal-message">{{ msg }}</p>
            <RouterLink v-if="!isGame" :to="redirect" class="redirect">{{ buttonMsg }}</RouterLink>
            <button v-if="isGame" @click="closeModal" class="close">{{ buttonMsg }}</button>
        </div>
    </section>
</template>
<script>
export default {
    name: "ModalComponent",
    props: {        
        msg: String,
        buttonMsg: String,
        redirect: String,        
        isGame: Boolean,
    },
    data(){
        return{
            close: true
        }
    },
    methods:{
        closeModal(){
            this.$emit("close")
        }
    }
}
</script>