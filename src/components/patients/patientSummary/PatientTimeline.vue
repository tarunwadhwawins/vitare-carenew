<template>
<div :class="className">
    <a-checkbox-group v-model:value="tab" @change="chnageTab('change')">
        <a-checkbox v-for="timeline in timeLineType" :key="timeline.id" :value="timeline.id">{{timeline.name}}</a-checkbox>
        <a-tooltip v-if="value1.length>0" placement="bottom">
        <template #title>
          <span>Flag Submit</span>
        </template>
        <a class="icons" @click="showAddFlagModal">
          <CheckCircleOutlined /></a>
      </a-tooltip>
        <a-tooltip v-if="visibleRemoveAll" placement="bottom">
            <template #title>
                <span>Unselect All</span>
            </template>
            <a class="icons close" @click="chnageTab('remove')">
                <CloseCircleOutlined /></a>
        </a-tooltip>
    </a-checkbox-group>

    <a-timeline class="defaultTimeline">
        <TableLoader />
        <div v-if="patientTimeline && (patientTimeline != null && patientTimeline.length > 0)">
    <a-checkbox-group v-model:value="value1" style="width: 100%">
            <template v-for="timeline in patientTimeline" :key="timeline.id">
                <a-timeline-item color="blue">
                    <template #dot>
                        <BellOutlined class="yellowIcon" v-if="timeline.type==1" />
                        <ClockCircleOutlined class="orangeIcon" v-if="timeline.type==2" />
                        <HeatMapOutlined class="brownIcon" v-if="timeline.type==3" />
                        <FolderOpenOutlined class="mustardIcon" v-if="timeline.type==4" />
                        <FilePdfOutlined class="tealIcon" v-if="timeline.type==5" />
                        <FileTextOutlined class="blueIcon" v-if="timeline.type==6" />
                        <FlagOutlined class="redIcon" v-if="timeline.type==7" />
                        <PushpinOutlined class="greenIcon" v-if="timeline.type==8" />
                        <MessageOutlined class="messageIcon" v-if="timeline.type==9" />
                        <!-- <InfoCircleOutlined class="messageIcon" /> -->
                    </template>
                    <div class="timelineInner">
                        <div class="timelineHeader">
                            <div class="title">
                                <h4>{{ timeline.heading }}</h4>
                                <span class="time">{{ moment(dateFormat(timeline.createdAt)).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY') ? moment(dateFormat(timeline.createdAt)).format('hh:mm A') : moment(dateFormat(timeline.createdAt)).format('MMM DD,yyyy hh:mm A')}}</span>
                            </div>
                            
                               
<a-checkbox v-model:value="timeline.entity.data.id" v-if="timeline.type==7 && timeline.entity.data" @click="checkBox"></a-checkbox>
                              
                            
                        </div>
                        <div class="timelineBody">
                            <div class="content">
                                <p class="timeline-float timeline-title"><span v-html="timeline.title"></span></p>
                            </div>
                        </div>
                    </div>
                </a-timeline-item>
            </template>
           </a-checkbox-group>
        </div>
        <div v-else class="noData">
            No Data
        </div>
    </a-timeline>
</div>
<PatientFlagsModal v-model:visible="flagsModalVisible" :patientId="patientDetails.id" @closeModal="handleOk" :flags="flagsRecord"/>
</template>

<script>
import {
  FolderOpenOutlined,
  FilePdfOutlined,
  BellOutlined,
  HeatMapOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  PushpinOutlined,
  MessageOutlined,
  // InfoCircleOutlined,
  FlagOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined
} from "@ant-design/icons-vue";
import {
  dateFormat,
} from '@/commonMethods/commonMethod';
import { computed, ref, onMounted, reactive, toRefs, watchEffect,defineAsyncComponent} from 'vue-demi';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import TableLoader from "@/components/loader/TableLoader";
import moment from "moment"
export default {
    components: {
        FolderOpenOutlined,
        FilePdfOutlined,
        BellOutlined,
        HeatMapOutlined,
        ClockCircleOutlined,
        FileTextOutlined,
        PushpinOutlined,
        MessageOutlined,
        // InfoCircleOutlined,
        FlagOutlined,
        CloseCircleOutlined,
        TableLoader,
        CheckCircleOutlined,
        PatientFlagsModal: defineAsyncComponent(()=>import("@/components/modals/PatientFlagsModal")),
    },
    props: {
        className: {
            type: String
        },
        profileId: {
            type: String
        },
    },
    setup(props) {
        const custom = ref(false);
        const visibleRemoveAll = ref(false);
        const store = useStore();
        const route = useRoute();
        const router = useRouter()
        const pId = ref(props.profileId)
       const flagsModalVisible =ref(false)
       const patientDetails = computed(() => {
      return store.state.patients.patientDetails
    })
        const tabvalue = reactive({
            tab: []
        });
        const state = reactive({
          value1:[]
        })
        watchEffect(() => {
            if (store.state.patients.tabvalue.length>0) {
                tabvalue.tab = store.state.patients.tabvalue
               
            }
        })
        onMounted(() => {
            if (route.name == 'PatientSummary') {
                store.dispatch('timeLineType').then(() => {
                    if (route.query.filter) {
store.state.patients.tabvalue = [4, 7]
                        tabvalue.tab = store.state.patients.tabvalue
                        store.dispatch('patientTimeline', {
                            id: route.params.udid ? route.params.udid : pId.value,
                            type: store.state.patients.tabvalue.join(",")
                        }).then(() => {
                            visibleRemoveAll.value = tabvalue.tab.length > 0 ? true : false
                            store.commit('loadingTableStatus', false)
                        })
                    } else {
                        store.dispatch('patientTimeline', {
                            id: route.params.udid,
                            type: ''
                        });
                    }
                })

            } else if (route.name == 'videoCall') {
                store.dispatch('timeLineType')
                store.dispatch('patientTimeline', {
                    id: pId.value,
                    type: ''
                });
            }

        })
        //const check = ref(true)
        const patientTimeline = computed(() => {
            return store.state.patients.patientTimeline;
        })

        const showModalCustom = () => {
            custom.value = true;
        };

        function chnageTab(value) {
            store.state.patients.tabvalue=[]
            store.commit('loadingTableStatus', true)
            var type = ''
            if (value == 'change') {
                type = tabvalue.tab.length == 0 ? '' : tabvalue.tab.join(",")
                store.state.patients.tabvalue = tabvalue.tab
            } else {
                router.replace({
                    query: {}
                })

                tabvalue.tab.length = 0
            }

            getTimeline(type)
        }

        function getTimeline(type) {
            store.dispatch('patientTimeline', {
                id: route.params.udid ? route.params.udid : pId.value,
                type: type
            }).then(() => {
                visibleRemoveAll.value = tabvalue.tab.length > 0 ? true : false
                store.commit('loadingTableStatus', false)
            })
        }
        const flagsRecord = ref([])
 function showAddFlagModal(){
  flagsRecord.value = state.value1
  flagsModalVisible.value = true
  

 }
  const handleOk = ({modal, value}) => {
      flagsModalVisible.value = value
      if(value==false){
        state.value1=[]
      }
      console.log(modal)


        
      }
        return {
          handleOk,
          showAddFlagModal,
            pId,
            showModalCustom,
            custom,
            patientTimeline,
            timeLineType: store.getters.timeLineType,
            chnageTab,
            ...toRefs(tabvalue),
            moment,
            dateFormat,
            visibleRemoveAll,
            ...toRefs(state),
            
            flagsRecord,
            flagsModalVisible,
            patientDetails
        }
    }
}
</script>

<style scoped>
p.timeline-float {
    display: inline-block;
}

.timelineBody .content {
    width: 100%;
}

p.timeline-float.timeline-title {
    width: 90%;
}

.close {
    position: relative;
    float: right;
    top: -4px;
    left: -20px;
    font-size: 25px;
}

.noData.ant-timeline-item-last {
    position: relative;
    left: -20px !important;
    background-color: #fff;
    padding: 15px;
    border-radius: 5px;
}
</style>
