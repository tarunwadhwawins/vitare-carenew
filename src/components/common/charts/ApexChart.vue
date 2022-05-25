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
        listView:{
            type:String
        }
    },

    setup(props) {
        const router = useRouter()
       const store = useStore()

        function clickHandler4(event, chartContext, config) {
            

           //console.log(event, chartContext, config.globals.labels[config.dataPointIndex])
           let filter = ''
            if (props.linkTo) {
                if (props.type == "bar" && config.globals.labels[config.dataPointIndex] != undefined) {
                    if(props.data){
                       // console.log("check",props.data[config.dataPointIndex].referralId)
                       filter = props.data[config.dataPointIndex].id
    //store.commit("filter", props.data[config.dataPointIndex].id)
                    }else{
                        filter = config.globals.labels[config.dataPointIndex]
                       //store.commit("filter", config.globals.labels[config.dataPointIndex]) 
                    }
                   if(props.listView){
                    router.push({
                        name: props.linkTo,
                       
                        query:{view:props.listView,fromDate:store.getters.dateFilter.value.fromDate,toDate:store.getters.dateFilter.value.toDate,filter:filter}

                    })
                    }else{
                             router.push({
                        name: props.linkTo,
                       
                        query:{fromDate:store.getters.dateFilter.value.fromDate,toDate:store.getters.dateFilter.value.toDate,filter:filter}

                    })
                    }
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
