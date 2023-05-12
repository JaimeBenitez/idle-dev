<template>
    <div>
        <p> {{ worker.nombre }}</p>
        <p> {{ techs.find(tech => tech.id == language.id).name }}</p>
        <p> {{ language.nivel }}</p>
    </div>
</template>

<script>
import displayWorkerLanguageHireOption from "@/utils/displayWorkerLanguageHireOption"
import makeWorker from "@/utils/makeWorker"

export default {
    name: 'WorkerHireOption',
    props: {        
        gameId: Number,
        techs: Array[Object]   
    },
    data(){
    return{
        worker: makeWorker(this.gameId),
        language: displayWorkerLanguageHireOption(this.techs)
        }
    },
    mounted(){
        // this.worker, this.language = displayWorkerHireOption(this.gameId, this.techs)
    }
}

</script>