<template>
  <a-row>

    <a-col :span="24">
      <div class="dayCalendar">
        <Loader />
        <table class="table table-bordered" v-if="appointmentSearch">
          <tbody v-for="week,k in appointmentSearch" :key="k">
            <tr>
              <th>{{week.time}}</th>
              <div v-if="appointmentSearch" >
                
                <td v-for="appointment,i in week.data" :key="i" >
                 
                   
                   <AppointmentCardList 
                     :cardData="appointment" :count="i" :length="week.data.length" @is-showrecordByday="showrecordByday($event)" tabName="week" :data="week.data"></AppointmentCardList>
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
  import { dateFormat } from "../../commonMethods/commonMethod"
  export default {
    components: {
      AppointmentCardList,
      Loader
    },
    props:{
    },
    setup(props,{emit}) {
      const store = useStore()
      const appointmentSearch = computed(() => {
        return store.state.appointment.searchAppointmentRecords
      })
      const weekName = computed(() => {
        return store.state.appointment.weekName
      })
      function showrecordByday(event){
       emit('is-dateClick',event)
      }
      
      return {
        weekName,
        appointmentSearch,
        dateFormat,
        showrecordByday,
      }
    }
  }
</script>
<style>
  .dayCalendar {
    min-height: 150px;
  }
</style>