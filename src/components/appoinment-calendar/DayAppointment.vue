<template>

  <a-row>
    <a-col :span="24">

      <div class="dayCalendar">
        <Loader />
        <table class="table table-bordered" v-if="appointmentSearch">
          <tbody v-for="timeHeding,k in officeTime" :key="k">
            <tr>
              <th>{{timeHeding}}</th>
              <div v-if="appointmentSearch" :text="count=0">
                
                <td v-for="(appointment,i) in appointmentSearch" :key="i" >
                  
                  <div v-if="timeHeding === timeStampToTime(appointment.time,'hh:00 A')" >
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
  import AppointmentCardList from "./AppointmentCardList"
  import { timeStampToTime } from "../../commonMethods/commonMethod"
  import Loader from "../loader/Loader"
  import { computed, ref } from "vue";
  import { useStore } from "vuex"
  export default {
    components: {
      AppointmentCardList,
      Loader
    },
    props: {

    },
    setup() {
      const store = useStore()
      const count = ref(0)
      const officeTime = computed(() => {
        return store.state.appointment.officeTime
      })

      //console.log(appointment)
      const linkTo = "patients-summary"
      const appointmentSearch = computed(() => {
        return store.state.appointment.searchAppointmentRecords
      })
      return {
        officeTime,
        timeStampToTime,
        linkTo,
        appointmentSearch,
        count
      }
    }
  }
</script>
<style>
  .dayCalendar {
    min-height: 150px;
  }
</style>