<template>
    <a-row>
        <a-col :span="24">
          <div class="dayCalendar">
            <table class="table table-bordered">
              <tbody v-for="time,i in appointmentsRecord" :key="i">
                
                <tr>
                  <th>{{time.time}}</th>
                  <td >
                  <AppointmentCardList  v-for="appointment,i in time.data" :key="i" :cardData="appointment"></AppointmentCardList>
                </td>
                </tr>
              </tbody>
            </table>
          </div>
        </a-col>
      </a-row>
</template>
<script>
    import {  reactive } from "vue";
    
    import AppointmentCardList from "./AppointmentCardList"
    export default{
        components: {
    AppointmentCardList,
  },
  props:{
    todayRcord:{
      type:Array
    }
  },
        setup(props) {
          const appointmentsRecord = reactive(props.todayRcord)
          //console.log(appointment)
          const linkTo = "patients-summary"
          return {
            linkTo,
            appointmentsRecord
          }
        }
    }
</script>