<template>
<a-card v-if="title" :title="title" class="common-card">
    <apexchart :type="type" :height="height" :options="options" :series="series" @click="clickHandler4">
    </apexchart>
</a-card>
<apexchart v-else :type="type" :height="height" :options="options" :series="series" @click="clickHandler4">
</apexchart>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
export default {
    props: {
        data:{
type:Array
        },
        linkTo: {
            type: String,
        },
        title: {
            type: String,
        },
        type: {
            type: String,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        options: {
            type: Object,
            required: true
        },
        series: {
            type: Array,
            required: true
        },
    },

    setup(props) {
        const router = useRouter()
       const store = useStore()

        function clickHandler4(event, chartContext, config) {
            

           //console.log(event, chartContext, config.globals.labels[config.dataPointIndex])
            if (props.linkTo) {
                if (props.type == "bar" && config.globals.labels[config.dataPointIndex] != undefined) {
                    if(props.data.length>0){
                       // console.log("check",props.data[config.dataPointIndex].referralId)
store.commit("filter", props.data[config.dataPointIndex].referralId)
                    }else{
                        
                       store.commit("filter", config.globals.labels[config.dataPointIndex]) 
                    }
                   
                    router.push({
                        path: props.linkTo
                    });
                } else if (props.type == "pie") {
                    router.push({path: props.linkTo})
                }
            }else{
              console.log(event, chartContext, config.globals.labels[config.dataPointIndex])
            }
        }
        return {
            clickHandler4
        }
    },
}
</script>
