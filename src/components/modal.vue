<template>
    <section class="modal" v-if="submitted">
        <div class="modal-container">
            <p class="modal-message">{{ msg }}</p>
            <RouterLink :to="redirect" class="redirect">{{ buttonMsg }}</RouterLink>
        </div>
    </section>
</template>
<script>

export default {
    name: "ModalComponent",
    props: {
        submitted: Boolean,
        msg: String,
        buttonMsg: String,
        redirect: String,
    }

}
</script>