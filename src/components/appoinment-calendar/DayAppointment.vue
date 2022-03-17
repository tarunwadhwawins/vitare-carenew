<template>
  <a-row :gutter="16">
    <!-- <a-col :span="12">
      <div class="calenderLeftRightBtn">
        <a-button type="primary">
          <template #icon>
            <LeftOutlined />
          </template>
        </a-button>
        <a-button type="primary">
          <template #icon>
            <RightOutlined />
          </template>
        </a-button>
      </div>
    </a-col> -->
    <!-- <a-col :span="12">
      <h3>March 02, 2022</h3>
    </a-col> -->
    <a-col :span="24">
      <div class="dayCalendar">
       
        <table class="table table-bordered" v-if="appointmentSearch">
          <tbody v-for="(timeHeding, k) in appointmentSearch" :key="k">
            <tr>
              <th>{{ timeHeding.time }}</th>

              <td v-if="appointmentSearch">
                <AppointmentCardList
                  v-for="(appointment, i) in timeHeding.data"
                  :key="i"
                  :cardData="appointment"
                  :count="i"
                  :length="timeHeding.data.length"
                  tabName="day"
                  :data="timeHeding.data"
                ></AppointmentCardList>
              </td>
              <td v-else></td>
            </tr>
          </tbody>
        </table>
      </div>
    </a-col>
  </a-row>
</template>
<script>
import AppointmentCardList from "./AppointmentCardList";
import { timeStampToTime } from "../../commonMethods/commonMethod";

import { computed } from "vue";
import { useStore } from "vuex";
//import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    AppointmentCardList,
 
   // LeftOutlined,
   // RightOutlined,
  },
  props: {},
  setup() {
    const store = useStore();
    const officeTime = computed(() => {
      return store.state.appointment.officeTime;
    });

    //console.log(appointment)
    const linkTo = "patients-summary";
    const appointmentSearch = computed(() => {
      return store.state.appointment.searchAppointmentRecords;
    });
    return {
      officeTime,
      timeStampToTime,
      linkTo,
      appointmentSearch,
    };
  },
};
</script>
<style>
.dayCalendar {
  min-height: 150px;
}

</style>