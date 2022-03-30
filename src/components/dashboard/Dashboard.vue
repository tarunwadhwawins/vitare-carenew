<template>
<a-layout-content>
    <a-row>
        <a-col :span="24">
            <h2 class="pageTittle">
                {{$t('global.dashboard')}}

                <div class="filter" v-if="timeline && Buttons">
                    <a-button v-for="item in timeline" :key="item.id" @click="showButton(item.id)" :class="Buttons.globalCodeId== item.id ? 'active' : ''"> {{item.name}}</a-button>
                </div>
            </h2>
        </a-col>

        <a-col :span="24">

            <a-row :gutter="24" v-if="arrayToObjact(permission.dashboardPermissions,1) && grid">

                <Card v-for="item in totalPatients" :key="item.count" :count="item.total" :text='item.text' link="manage-patients" :xl="grid.xlGrid" :color="item.color" :sm="grid.smGrid" :textColor="item.textColor">
                </Card>

            </a-row>
        </a-col>
    </a-row>
    <a-row :gutter="24">
        <!-- <Appointement  :appointment="todayAppointment" :columns="columns4" :title="$t('dashboard.todayAppointment')">
        </Appointement> -->
        <a-col :sm="12" :xs="24" v-if="arrayToObjact(permission.dashboardPermissions,2) && todayAppointment">
          <a-card :title="$t('dashboard.todayAppointment')" class="common-card">
            <div class="apptNumber">
              <h3>Total Appointments</h3>
              <h2>{{todayAppointment.length}}</h2>
            </div>
          </a-card>
      </a-col>
        <a-col :sm="12" :xs="24" v-if="arrayToObjact(permission.dashboardPermissions,3) && callStatus">
            <ApexChart :title="$t('global.callQueue')" type="bar" :height="250" :options="callStatus.calloption" :series="callStatus.callseries" linkTo="communications" />
        </a-col>

        <a-col :sm="12" :xs="24" v-if="arrayToObjact(permission.dashboardPermissions,4) &&  patientsCondition">

            <ApexChart title="Patients Stats" type="bar" :height="412" :options="patientsCondition.option1" :series="patientsCondition.series1" linkTo="manage-patients">
            </ApexChart>

        </a-col>
        <a-col :sm="12" :xs="24" v-if="arrayToObjact(permission.dashboardPermissions,5) &&  specialization">
            <a-card :title="$t('dashboard.careCoordinatorStats') " class="common-card">
                <a-tabs default-active-key="activeKey1">
                    <a-tab-pane key="1" tab="Specialization" v-if="specialization">
                        <ApexChart type="bar" :height="350" :options="specialization.wellness" :series="specialization.behavior" linkTo="manage-care-coordinator"></ApexChart>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="Network " force-render v-if="network">
                        <ApexChart type="bar" :height="350" v-if="network" :options="network.In" :series="network.Out" linkTo="manage-care-coordinator">
                        </ApexChart>
                    </a-tab-pane>
                </a-tabs>
            </a-card>
        </a-col>

        <a-col :sm="12" :xs="24" v-if="arrayToObjact(permission.dashboardPermissions,6) &&  cptCodeValue">

            <ApexChart :title="$t('dashboard.cPTCodeBillingSummary')" type="bar" :height="350" :options="cptCodeValue.code" :series="cptCodeValue.value" linkTo="cpt-codes"></ApexChart>

        </a-col>
        <a-col :sm="12" :xs="24" v-if="arrayToObjact(permission.dashboardPermissions,7) && financialValue">

            <!-- <div class="list-group">
                  <div class="list-group-item">
                    <div class="name">Billed</div>
                    <div class="value">4567 $</div>
                  </div>
                </div> -->
            <ApexChart :title="$t('dashboard.financialStats')" type="pie" :height="360" :options="financialValue.billed" :series="financialValue.due" linkTo="time-tracking-report"></ApexChart>
        </a-col>

        <a-col :sm="12" :xs="24" v-if="arrayToObjact(permission.dashboardPermissions,8) && totalPatientsChartValue">

            <ApexChart :title="$t('dashboard.newPatientsChart')" type="area" :height="350" :options="totalPatientsChartValue.chartOptions" :series="totalPatientsChartValue.series" linkTo="manage-patients"></ApexChart>

        </a-col>
        <a-col :sm="12" :xs="24" v-if="arrayToObjact(permission.dashboardPermissions,9) && appointmentChartValue">
            <ApexChart :title="$t('dashboard.appointmentSummary')" type="area" :height="350" :options="appointmentChartValue.chartOptions" :series="appointmentChartValue.series" linkTo="appointment-calendar"></ApexChart>
        </a-col>
    </a-row>
    <Loader />
</a-layout-content>

<!---->
</template>

<script>
  import { ref,watchEffect } from 'vue'
  import Card from "@/components/common/cards/Card"
  import ApexChart from "@/components/common/charts/ApexChart"
  import { startimeAdd, endTimeAdd, timeStamp ,arrayToObjact} from '@/commonMethods/commonMethod'
  import { useStore } from 'vuex'
  import Loader from "@/components/loader/Loader";
  import moment from "moment"
  
export default {
    components: {
        Card,
        ApexChart,
        Loader
    },

    setup() {
        const store = useStore()
        const fromDate = ref(moment())
        const toDate = ref(moment())
        
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
            if (data.globalCodeId == 122) {
                dateFormate = {
                    fromDate: timeStamp(startimeAdd(from)),
                    toDate: timeStamp(endTimeAdd(to))
                }
            } else {
                dateFormate = {
                    fromDate: timeStamp(startimeAdd(to)),
                    toDate: timeStamp(endTimeAdd(from))
                }
            }
            store.dispatch("permissions")
            store.dispatch("counterCard", dateFormate)
            store.dispatch("searchAppointment", {
                fromDate: fromDate.value,
                toDate: toDate.value,
                tabId: "today"
            })
            store.dispatch("callStatus", dateFormate)
            store.dispatch("specialization", dateFormate)
            store.dispatch("network", dateFormate)
            store.dispatch("cptCode", dateFormate)
            store.dispatch("financial", dateFormate)
            store.dispatch("totalPatientsChart", dateFormate)
            store.dispatch("appointmentChart", dateFormate)

        }
        const permission = store.getters.permissionRecords.value

        watchEffect(() => {
          
          if(!timeLineButton.value){
            store.dispatch("timeLine", 122)
                
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
            totalPatients:store.getters.totalPatientcount,
            callStatus:store.getters.callStatus,
            patientsCondition:store.getters.patientsCondition,
            specialization:store.getters.specialization,
            network:store.getters.network,
            cptCodeValue:store.getters.cptCodeValue,
            financialValue:store.getters.financialValue,
            totalPatientsChartValue:store.getters.totalPatientsChartValue,
            appointmentChartValue:store.getters.appointmentChartValue,
            logout,
            todayAppointment:store.getters.todayAppointmentState,
            Buttons:store.getters.dashboardTimeLineButton,
            showButton,
            timeline:store.getters.timeline,
            permission,

            arrayToObjact,
        };
    },
};
</script>
