<template>
<div>
    <a-layout-content>
        <Title :title="$t('appointmentCalendar.appointmentCalendar')" @calenderToggle="calenderView($event)" :isActive="toggle" :button="{
            fullCalendarView: $t('appointmentCalendar.fullCalendarView'),
            hideCalendarView:$t('appointmentCalendar.hideCalendarView')
          }" />
        <a-row :gutter="24">
            <a-col :xl="6" :sm="10" :xs="24" v-show="toggle">
                <div class="apptBtn" v-if="arrayToObjact(screensPermissions,112)">
                    <a-button class="btn primaryBtn" @click="showModal(true)">
                        {{$t('appointmentCalendar.newAppointment')}}</a-button>
                </div>
                <Calendar @is-click="selectDate($event)" />
                <Physicians @staff-select="staffSelect($event)" :physiciansId="physiciansId" v-if="arrayToObjact(screensPermissions,37)" />
            </a-col>
            <a-col :xl="toggle == false ? 24 : 18" :sm="toggle == false ? 24 : 14" :xs="24">
                <Loader v-if="!showLoaderMain" />
                <a-tabs v-model:activeKey="activeKey" @change="tabClick(activeKey,moment())">
                    <a-tab-pane key="1" tab="Day">
                        <DayAppointment />
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="Tomorrow">
                        <DayAppointment />
                    </a-tab-pane>
                    <a-tab-pane key="3" tab="Week">
                        <WeekAppointment @is-dateClick="selectDate($event)" @week-select="weekChange($event)" tabName="week"></WeekAppointment>
                    </a-tab-pane>
                    <a-tab-pane key="4" tab="Month">
                        <MonthAppointment v-if="monthRecord" :appointment="appointmentSearch" @is-dateClick="selectDate($event)" @is-month="monthDate($event)" :seclectDate="month"></MonthAppointment>
                    </a-tab-pane>
                </a-tabs>
            </a-col>
        </a-row>
        <Loader v-if="showLoaderMain" />
    </a-layout-content>
    <!--modal-->
    <AddAppointment  :maskClosable="maskebale" v-model:visible="appointmentModal" @ok="handleOk" @is-visible="showModal($event)" :staff="staffList" :patient="patientsList" />
    <!---->
</div>
</template>
<script>
import AddAppointment from "@/components/modals/AddAppointment";
import Title from "./Title"
import Calendar from "./Calendar"
import Physicians from "./Physicians"
import DayAppointment from "./DayAppointment"
import MonthAppointment from "./MonthAppointment"
import WeekAppointment from "./WeekAppointment"
import {ref,watchEffect,computed,onUnmounted} from "vue";
import { useStore} from "vuex"
import moment from "moment"
import Loader from "@/components/loader/Loader"
import {arrayToObjact} from "@/commonMethods/commonMethod"
export default {
    components: {
        AddAppointment,
        Title,
        Calendar,
        Physicians,
        DayAppointment,
        MonthAppointment,
        WeekAppointment,
        Loader
    },
    props: {
        headerData: {
            type: String
        }
    },
    setup(props) {
        const toggle = ref(true);
        const maskebale = ref(false)
        const activeKey = ref('1');
        const store = useStore()
        const month = ref(moment())
        const fromDate = ref(moment())
        const toDate = ref(moment())
        let datePick = moment()
        const physiciansId = ref([])
        const showLoaderMain = ref(true)
        const monthRecord = ref(false)
        ///This fuction is working for date select in calendar and view appointment according select date
        function selectDate(event) {
            showLoaderMain.value = false
            activeKey.value = ref('1')
            store.state.appointment.searchAppointmentRecords = ""
            fromDate.value = moment(event)
            toDate.value = moment(event)
            datePick = moment(event)
            searchApi()
        }

        function weekChange(event) {
            datePick = moment(event).startOf('week')
            fromDate.value = moment(datePick).startOf('week')
            toDate.value = moment(datePick).endOf('week')
        }

        function tabClick(value, tabDate) {
            showLoaderMain.value = false
            store.state.appointment.searchAppointmentRecords = ""
            if (value == 1) {
                activeKey.value = ref('1')
                datePick = tabDate
                fromDate.value = tabDate
                toDate.value = tabDate
            } else if (value == 2) {
                datePick = moment().add(1, 'days')
                fromDate.value = moment().add(1, 'days')
                toDate.value = moment().add(1, 'days')
            } else if (value == 3) {

                datePick = moment(tabDate).startOf('week')

                store.dispatch("weekName", {
                    from: moment(tabDate).startOf('week'),
                    to: moment(tabDate).endOf('week')
                })
                fromDate.value = moment(tabDate).startOf('week')
                toDate.value = moment(tabDate).endOf('week')
            } else if (value == 4) {
                monthRecord.value = false
                datePick = moment(tabDate).startOf('month')
                month.value = moment()
                fromDate.value = moment(tabDate).startOf('month')
                toDate.value = moment(tabDate).endOf('month')
            } else {
                datePick = tabDate
                fromDate.value = tabDate
                toDate.value = tabDate.add(1, 'days')
            }
            searchApi()
        }

        function monthDate(event) {
            monthRecord.value = false
            showLoaderMain.value = false
            activeKey.value = ref('4')
            month.value = moment(event)
            datePick = moment(event)
            fromDate.value = moment(event).startOf('month')
            toDate.value = moment(event).endOf('month')
            store.dispatch("searchAppointment", {
                fromDate: fromDate.value,
                toDate: toDate.value,
                tabId: 4,
                physiciansId: physiciansId.value.length == 0 ? '' : physiciansId.value.join(",")
            }).then(() => {
                monthRecord.value = true
            })
        }

        watchEffect(() => {
            store.dispatch("getStaffs").then(() => {

            })
            store.dispatch("allPatientsList")
            store.dispatch("allStaffList")
            if (props.headerData) {
                console.log("check", props.headerData)
                selectDate(props.headerData)
            }
            searchApi()
        })

        function searchApi() {
            let staffId = []
            store.getters.appointmentRecords.value.getStaff ? store.getters.appointmentRecords.value.getStaff.map((item) => {
                staffId.push(item.id)
            }) : ''
            physiciansId.value = staffId;
            store.state.appointment.searchAppointmentRecords = ''
            store.state.appointment.calendarDate = ''

            store.dispatch("calendarDateSelect", datePick)
            store.dispatch("searchAppointment", {
                fromDate: fromDate.value,
                toDate: toDate.value,
                tabId: activeKey.value,
                physiciansId: physiciansId.value.length == 0 ? '' : physiciansId.value.join(",")
            }).then(() => {
                monthRecord.value = true
            })
        }
        const patientsList = computed(() => {
            return store.state.common.allPatientsList
        })
        const staffList = computed(() => {
            return store.state.common.allStaffList
        })

        function calenderView(event) {
            toggle.value = event
        }
        const appointmentModal = ref(false);
        const showModal = (event) => {

            if (event.date) {
                selectDate(event.date)
                appointmentModal.value = event.check;
            } else {
                appointmentModal.value = event;
            }

        };
        const handleOk = (e) => {
            console.log(e);
            appointmentModal.value = false;
        };

        function staffSelect() {
            showLoaderMain.value = false
        }

        onUnmounted(() => {
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
            store.commit("filter", '')
            store.commit("dataFilter",'')
        })
        return {
            screensPermissions:store.getters.screensPermissions,
            arrayToObjact,
            month,
            appointmentSearch: store.getters.searchAppointmentRecords,
            maskebale,
            activeKey,
            selectDate,
            fromDate,
            toDate,
            patientsList,
            staffList,
            calenderView,
            value1: ref(),
            toggle,
            tabClick,
            appointmentModal,
            handleOk,
            showModal,
            searchApi,
            datePick,
            monthDate,
            staffSelect,
            physiciansId,
            showLoaderMain,
            moment,
            weekChange,
            monthRecord
        };
    },
};
</script>

<style scoped>
.apptBtn {
    text-align: center;
    margin: 0 0 25px 0;
}
</style>
