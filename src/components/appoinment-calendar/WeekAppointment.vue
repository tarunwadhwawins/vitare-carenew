<template>
  <a-row>
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
    </a-col>
    <a-col :span="12">
      <h3>March 02, 2022</h3>
    </a-col> -->
    <a-col :span="24">
      <div class="dayCalendar">
        <Loader />
        <table class="table table-bordered" v-if="appointmentSearch">
         
          <tbody v-for="(week, k) in appointmentSearch" :key="k">
            <tr>
              <th>{{ week.time }}</th>
              <td v-if="appointmentSearch">
                <AppointmentCardList
                  v-for="(appointment, i) in week.data"
                  :key="i"
                  :cardData="appointment"
                  :count="i"
                  :length="week.data.length"
                  @is-showrecordByday="showrecordByday($event)"
                  tabName="week"
                  :data="week.data"
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
import { computed } from "vue";
import { useStore } from "vuex";
import AppointmentCardList from "./AppointmentCardList";
import Loader from "../loader/Loader";
import { dateFormat } from "../../commonMethods/commonMethod";
//import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    AppointmentCardList,
    Loader,
   // LeftOutlined,
    //RightOutlined,
  },
  props: {},
  setup(props, { emit }) {
    const store = useStore();
    const appointmentSearch = computed(() => {
      return store.state.appointment.searchAppointmentRecords;
    });
    const weekName = computed(() => {
      return store.state.appointment.weekName;
    });
    function showrecordByday(event) {
      emit("is-dateClick", event);
    }

    return {
      weekName,
      appointmentSearch,
      dateFormat,
      showrecordByday,
    };
  },
};
</script>
<style>
.dayCalendar {
  min-height: 150px;
}
</style>