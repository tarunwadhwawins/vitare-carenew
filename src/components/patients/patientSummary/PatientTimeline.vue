<template>
  <div :class="className">
    <a-checkbox-group v-model:value="tab" @change="chnageTab()">
      <a-checkbox v-for="timeline in timeLineType" :key="timeline.id"  :value="timeline.id" >{{timeline.name}}</a-checkbox>
    
    </a-checkbox-group>
     
    <a-timeline class="defaultTimeline">
      <TableLoader/>
      <template v-for="timeline in patientTimeline" :key="timeline.id">
        <a-timeline-item color="blue">
          <template #dot>
            <BellOutlined class="yellowIcon" v-if="timeline.type==1"/>
            <ClockCircleOutlined class="orangeIcon" v-if="timeline.type==2"/>
            <HeatMapOutlined class="brownIcon" v-if="timeline.type==3"/>
            <FolderOpenOutlined class="mustardIcon" v-if="timeline.type==4"/>
            <FilePdfOutlined class="tealIcon" v-if="timeline.type==5"/>
            <FileTextOutlined class="blueIcon" v-if="timeline.type==6"/>
            <FlagOutlined class="redIcon" v-if="timeline.type==7"/>
            <PushpinOutlined class="greenIcon" v-if="timeline.type==8"/>
          </template>
          <div class="timelineInner">
            <div class="timelineHeader">
              <div class="title">
                <h4>{{ timeline.heading }}</h4>
                <span class="time">{{ moment(dateFormat(timeline.createdAt)).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY') ? moment(dateFormat(timeline.createdAt)).format('hh:mm A') : moment(dateFormat(timeline.createdAt)).format('MMM DD,yyyy hh:mm A')}}</span>
              </div>
              <div class="userImg">
                <img v-if="timeline.profileImage" :src="timeline.profileImage" alt="image"/>
                <img v-else src="@/assets/images/userAvatar.png" alt="image"/>
              </div>
            </div>
            <div class="timelineBody">
              <div class="content">
                <p class="timeline-float timeline-title">{{ timeline.title }}</p>
                <!-- <a class="timeline-float more-link" href="javascript:void(0)">more</a> -->
              </div>
              <!-- <MailOutlined /> -->
            </div>
          </div>
        </a-timeline-item>
        
      </template>
    </a-timeline>
  </div>
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
  FlagOutlined,
  //MailOutlined,
} from "@ant-design/icons-vue";
import {
  dateFormat,
  // dateOnlyFormat,
  // dateTimeFormat,
  // dobFormat2,
  // timeFormatSimple
  
  // createDynamicColumns,
} from '@/commonMethods/commonMethod';
import { computed, ref, onMounted, reactive, toRefs} from 'vue-demi';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
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
  FlagOutlined,
    //MailOutlined,
    TableLoader
  },
  props: {
    className: {
      type: String
    }
  },
  setup() {
    const custom = ref(false);
    const store = useStore();
    const route = useRoute();
    const tabvalue = reactive({
      tab:[]
    });
    onMounted(() => {
      if(route.name == 'PatientSummary') {
        store.dispatch('timeLineType')
        store.dispatch('patientTimeline', {id:route.params.udid,type:''});
      }
    })
    const patientTimeline = computed(() => {
      return store.state.patients.patientTimeline;
    })
    
    const showModalCustom = () => {
      custom.value = true;
    };
function chnageTab(){
  store.commit('loadingTableStatus', true)
  
  store.dispatch('patientTimeline', {id:route.params.udid,type:tabvalue.tab.length == 0 ? '' :tabvalue.tab.join(",")}).then(()=>{
    store.commit('loadingTableStatus', false)
  })
}

    return {
      showModalCustom,
      custom,
      patientTimeline,
      timeLineType:store.getters.timeLineType,
      chnageTab,
      //tabvalue,
     ...toRefs(tabvalue),
      moment,
      dateFormat
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
</style>