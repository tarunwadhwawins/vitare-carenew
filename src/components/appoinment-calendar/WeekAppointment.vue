<template>
  <a-row>

    <a-col :span="24">
      <div class="dayCalendar">
        <Loader />
        <table class="table table-bordered" v-if="appointmentSearch">
          <tbody v-for="week,k in weekName" :key="k">
            <tr>
              <th>{{week}}</th>
              <div v-if="appointmentSearch" v-bind="count=0">
                
                <td v-for="(appointment,i) in appointmentSearch" :key="i" >
                  
                  <div v-if="week === (moment(dateFormat(appointment.date))).format('dddd')" >
                   <AppointmentCardList 
                     :cardData="appointment" :count="count=count+1"></AppointmentCardList>
                   </div>
                 </td>
              </div>

              <div v-else>
                <td></td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </a-col>
  </a-row>
</template>

<script>
  import { computed } from "vue"
  import { useStore } from "vuex"
  import AppointmentCardList from "./AppointmentCardList"
  import Loader from "../loader/Loader"
  import moment from "moment"
  import { dateFormat } from "../../commonMethods/commonMethod"
  export default {
    components: {
      AppointmentCardList,
      Loader
    },
    setup() {
      const store = useStore()
      const appointmentSearch = computed(() => {
        return store.state.appointment.searchAppointmentRecords
      })
      const weekName = computed(() => {
        return store.state.appointment.weekName
      })

      return {
        weekName,
        appointmentSearch,
        moment,
        dateFormat,
      }
    }
  }
</script>
<style>
  .dayCalendar {
    min-height: 150px;
  }
</style>