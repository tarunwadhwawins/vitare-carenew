<template>
<a-card v-if="title" :title="title" class="common-card">
    <apexchart :type="type" :height="height" :options="options" :series="series" @click="clickHandler4"></apexchart>
</a-card>
<apexchart v-else :type="type" :height="height" :options="options" :series="series" @click="clickHandler4"></apexchart>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
export default {
    props: {
        data: {
            type: Array
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
        listView: {
            type: String
        }
    },

    setup(props) {
        const router = useRouter()
        const store = useStore()

        function clickHandler4(event, chartContext, config) {
            let color = []
            chartContext.opts.colors.map((item)=>{
                   color.push("#0000")
                   console.log(item)
            })
           config.globals.colors = color
           config.globals.fill.colors = color
           config.globals.markers.colors = color
            //chartContext.globals.markers.colors = color
            store.commit('staffSummary', null)
            console.log(config.globals)
            let filter = ''
            if (props.linkTo) {
                if (props.type == "bar" && config.globals.labels[config.dataPointIndex] != undefined) {
                    if (props.data) {
                        // console.log("check",props.data[config.dataPointIndex].referralId)
                        filter = props.data[config.dataPointIndex].id
                        //store.commit("filter", props.data[config.dataPointIndex].id)
                    } else {
                        filter = config.globals.labels[config.dataPointIndex]
                        //store.commit("filter", config.globals.labels[config.dataPointIndex])
                    }
                    if (props.listView) {
                        router.push({
                            name: props.linkTo,
                            query: {
                                view: props.listView,
                                fromDate: store.getters.dateFilter.value ? store.getters.dateFilter.value.fromDate : '',
                                toDate: store.getters.dateFilter.value ? store.getters.dateFilter.value.toDate : '',
                                filter: config.globals.lastXAxis.ids ? config.globals.lastXAxis.ids[config.dataPointIndex] : filter
                            }
                        })
                    } else {
                        router.push({
                            name: props.linkTo,
                            query: {
                                fromDate: store.getters.dateFilter.value.fromDate,
                                toDate: store.getters.dateFilter.value.toDate,
                                filter: filter
                            }
                        })
                    }
                } else if (props.type == "area") {
                    if (props.data) {

                        console.log("check",props.data[config.globals.labels[config.dataPointIndex]-1])

 router.push({
                            name: props.linkTo,
                            query: {
                                view: props.listView ? props.listView : '',
                                fromDate: store.getters.dateFilter.value ? store.getters.dateFilter.value.fromDate : props.data[config.globals.labels[config.dataPointIndex]-1] ? props.data[config.globals.labels[config.dataPointIndex]-1].from : '',
                                toDate: store.getters.dateFilter.value ? store.getters.dateFilter.value.toDate : props.data[config.globals.labels[config.dataPointIndex]-1] ? props.data[config.globals.labels[config.dataPointIndex]-1].today : '',
                                filter: config.globals.seriesNames[config.seriesIndex]
                            }
                        })

                    }else{
 router.push({
                            name: props.linkTo,
                            query: {
                                view: props.listView ? props.listView : '',
                                fromDate: store.getters.dateFilter.value ? store.getters.dateFilter.value.fromDate : '',
                                toDate: store.getters.dateFilter.value ? store.getters.dateFilter.value.toDate : '',
                                filter: config.globals.seriesNames[config.seriesIndex]
                            }
                        })
                    }
                   
                    //console.log(config.globals.labels[config.dataPointIndex], config.globals.seriesNames[config.seriesIndex])
                } else if (props.type == "pie") {
                    if (props.listView) {
                        config.globals.selectedDataPoints.map((item) => {
                            router.push({
                                name: props.linkTo,
                                query: {
                                    view: props.listView,
                                    fromDate: store.getters.dateFilter.value ? store.getters.dateFilter.value.fromDate : '',
                                    toDate: store.getters.dateFilter.value ? store.getters.dateFilter.value.toDate : '',
                                    filter: config.globals.labels[item]
                                }
                            })
                        })
                    } else {
                        config.globals.selectedDataPoints.map((item) => {
                            router.push({
                                name: props.linkTo,
                                query: {

                                    fromDate: store.getters.dateFilter.value ? store.getters.dateFilter.value.fromDate : '',
                                    toDate: store.getters.dateFilter.value ? store.getters.dateFilter.value.toDate : '',
                                    filter: config.globals.labels[item]
                                }
                            })
                        })
                    }

                }
                // else if (props.type == "area") {
                // 	filter = props.data ? props.data[config.dataPointIndex].id : config.globals.seriesNames[config.dataPointIndex]
                // 	if(props.listView) {
                // 		router.push({
                // 		path: props.linkTo,
                // 		query: {
                // 		view: props.listView,
                // 		fromDate: store.getters.dateFilter.value.fromDate,
                // 		toDate: store.getters.dateFilter.value.toDate,
                // 		filter: filter
                // 		}
                // 		})
                // 	}
                // 	else {
                // 		router.push({
                // 		path: props.linkTo
                // 		})
                // 	}
                // }
            } else {
                console.log(event, chartContext, config.globals.labels[config.dataPointIndex])
            }
        }

        return {
            clickHandler4
        }
    },
}
</script>
