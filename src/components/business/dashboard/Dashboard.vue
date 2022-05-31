<template>
<a-layout-content>
    <a-row>
        <a-col :span="24">
            <h2 class="pageTittle">
                Business Dashboard
                <div class="filter" v-if="timeline && Buttons">
                    <a-button v-for="item in timeline" :key="item.id" @click="showButton(item.id)" :class="Buttons.globalCodeId== item.id ? 'active' : ''"> {{item.name}}</a-button>
                </div>
            </h2>
        </a-col>
        
    </a-row>
    <a-row :gutter="24">
    
       
      <a-col :sm="12" :xs="24" v-if="arrayToObjact(widgetsPermissions,3) && callStatus">
            <ApexChart title="Call Stats" type="bar" :height="386" :options="callStatus.calloption" :series="callStatus.callseries" linkTo="Communications" />
        </a-col>
        <a-col :sm="12" :xs="24" v-if="arrayToObjact(widgetsPermissions,8) &&  cptCodeValue">
            <ApexChart title="Timelog Summary" type="bar" :height="386" :options="cptCodeValue.code" :series="cptCodeValue.value" linkTo="TimeLogReport"></ApexChart>
        </a-col>
        
        <a-col :sm="12" :xs="24" v-if="arrayToObjact(widgetsPermissions,9) &&  referalCount">
            <ApexChart title="Referrals" type="bar" :height="386" :options="referalCount.code" :series="referalCount.value" linkTo="Referral" :data="referalCountRecord"></ApexChart>
        </a-col>
        <a-col :sm="12" :xs="24" v-if="arrayToObjact(widgetsPermissions,7) && financialValue">
            <ApexChart :title="$t('dashboard.financialStats')" type="pie" :height="385" :options="financialValue.billed" :series="financialValue.due" linkTo="time-log-report"></ApexChart>
        </a-col>
     
    </a-row>
    <Loader />
</a-layout-content>
</template>

<script>
  import { onMounted } from 'vue'
 
  import ApexChart from "@/components/common/charts/ApexChart"
  import { startimeAdd, endTimeAdd, timeStamp ,arrayToObjact} from '@/commonMethods/commonMethod'
  import { useStore } from 'vuex'
  import Loader from "@/components/loader/Loader";
  import moment from "moment"
  
export default {
    components: {

        ApexChart,
        Loader
    },

    setup() {
        const store = useStore()
       
        const timeLineButton = store.getters.dashboardTimeLineButton

        function apiCall(data) {
            let from = moment()
            let to = moment()
            if (data.globalCodeId == 122) {

                from = moment()
                to = moment().subtract(data.number, data.intervalType);
            } else if (data.globalCodeId == 123) {
                from = moment();

                to = moment().subtract(data.number, data.intervalType);
            } else if (data.globalCodeId == 124) {
                from = moment();
                to = moment().subtract(data.number, data.intervalType);
            } else {
                from = moment();
                to = moment().subtract(data.number, data.intervalType);
            }
            let dateFormate = ''
            let cptDateFormate = ''
           
            if (data.globalCodeId == 122) {
                dateFormate = {
                    fromDate: from ? timeStamp(startimeAdd(from)) : '',
                    toDate: to ? timeStamp(endTimeAdd(to)) : ''
                }
                cptDateFormate = {
                    fromDate: from.format("YYYY-MM-DD"),
                    toDate: to.format("YYYY-MM-DD")
                }
            } else {
                dateFormate = {
                    fromDate: timeStamp(startimeAdd(to)),
                    toDate: timeStamp(endTimeAdd(from))
                }
                cptDateFormate = {
                    fromDate: to.format("YYYY-MM-DD"),
                    toDate: from.format("YYYY-MM-DD")
                }
            }
            store.commit("dateFilter",dateFormate)
            store.dispatch("permissions")
            store.dispatch("callStatus", dateFormate)
            store.dispatch("cptCode", cptDateFormate)
            store.dispatch("referalCount", dateFormate)
            store.dispatch("financial", dateFormate)
            store.dispatch("escalation")
        }
        

        onMounted(() => {
          
          if(timeLineButton.value==null){
             
            store.dispatch("timeLine", 122).then(()=>{
                apiCall(timeLineButton.value)
            })
                
          }else{
              
            apiCall(timeLineButton.value)
          }
         
        })

        function logout() {
            localStorage.removeItem("auth");
            localStorage.clear();
        }

        function showButton(id) {
            store.dispatch("timeLine", id).then(() => {
                apiCall(timeLineButton.value)
            })

        }

        return {
            grid:store.getters.grid,
            
            cptCodeValue:store.getters.cptCodeValue,
            financialValue:store.getters.financialValue,
           referalCount:store.getters.referalCount,
            logout,
            
            Buttons:store.getters.dashboardTimeLineButton,
            showButton,
            timeline:store.getters.timeline,
            widgetsPermissions:store.getters.widgetsPermissions,
referalCountRecord:store.getters.referalCountRecord,
callStatus:store.getters.callStatus,
            arrayToObjact,
         
        };
    },
};
</script>
