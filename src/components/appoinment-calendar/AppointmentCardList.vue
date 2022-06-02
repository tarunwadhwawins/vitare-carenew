
<template>
<a-dropdown v-if="count <= 3" :trigger="['click']" overlayClassName="valueItem">
    <a class="ant-dropdown-link one" @click.prevent>
        <div class="dropdown">
            <p>
                <strong><span>{{cardRecords.appointmentType}}</span></strong>
                <span>{{cardRecords.patient}} </span>
            </p>
            <img src="../../assets/images/profile-1.jpg" alt="image" />
        </div>
    </a>
    <template #overlay>
        <a-menu>
            <a-menu-item key="1">
                <div class="calendarDropdown">
                    <div class="itemWrapper">
                        <div class="leftWrapper">Appointment Type</div>
                        <div class="rightWrapper">{{cardRecords.appointmentType}}</div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Date Time</div>
                        <div class="rightWrapper">
                            {{ dateAndTimeFormate(cardRecords.date,'MMM DD, yyyy hh:mm A')}}

                        </div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Coordinator</div>
                        <div class="rightWrapper" v-if="arrayToObjact(screensPermissions,38)">
                            <router-link :to="{ name: 'CoordinatorSummary', params: { udid:cardRecords.staff_id}}">{{cardRecords.staff}}</router-link>
                        </div>
                        <div class="rightWrapper" v-else>
                            <span >{{cardRecords.staff}}</span>
                        </div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Patient</div>
                        <div class="rightWrapper" v-if="arrayToObjact(screensPermissions,63)">
                            <router-link :to="{ name: 'PatientSummary', params: { udid:cardRecords.patient_id}}">{{cardRecords.patient}}</router-link>
                        </div>
                        <div class="rightWrapper" v-else>
                            <span >{{cardRecords.patient}}</span>
                        </div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Start Time</div>
                        <div class="rightWrapper">{{ dateAndTimeFormate(cardRecords.date,'hh:mm A') }}</div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Time Zone</div>
                        <div class="rightWrapper">{{ cardRecords.timezone?cardRecords.timezone.data.UTCOffset:''}}</div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Duration</div>
                        <div class="rightWrapper">{{ cardRecords.duration }}</div>
                    </div>
                    <div class="itemWrapper">
                      <div class="leftWrapper">Flags</div>
                      <div class="rightWrapper"><span class="box" :title="cardRecords.flagName" :style="{ 'background-color': cardRecords.flags }"></span></div>
                  </div>
                    <div class="notesWrapper">
                        <span>Notes</span>
                        <p>
                            {{cardRecords.notes}}
                        </p>
                    </div>
                    <div class="createTask">
                        <a-tooltip placement="left">
                            <template #title>
                                <span>Add Task</span>
                            </template>
                            <router-link to="tasks">
                                <FileAddOutlined />
                            </router-link>
                        </a-tooltip>
                    </div>
                </div>
            </a-menu-item>
        </a-menu>
    </template>
</a-dropdown>
<div v-else-if="count==4">
    <a-button class="loadMore" type="primary" @click="showModal(allRecord)">{{length-4}}+</a-button>
</div>
<div v-else></div>
<a-modal width="1100px" centered v-model:visible="visible" title="Appointment" @ok="handleOk" maskClosable="true" @cancel="closeModal()">
    <a-table rowKey="id" :columns="columns" :data-source="getMoreAppointment">
      <template #staff="{text,record}" >
        <router-link :to="{ name: 'CoordinatorSummary', params: { udid:record.staff_id  }}">{{ text }}</router-link>
    </template>
    <template #patient="{ text, record }" v-if="arrayToObjact(screensPermissions, 63)">
            <router-link :to="{ name: 'PatientSummary', params: { udid: record.patient_id } }">{{ text }}</router-link>

        </template>
      <template #flags="{ record }">
        
         <a-tooltip placement="bottom">
                <template #title>
                    <span>{{ record.flagName }}</span>
                </template>
                <a class="icons">
                    <Flags :flag="record.flags"/></a>
            </a-tooltip>
        <!-- <span class="box" :class="(text = text.match(/yellowBgColor/g))" v-if="text.match(/yellowBgColor/g)"></span> -->
      </template>
    </a-table>
</a-modal>
</template>
<script>
import { ref, reactive, computed } from "vue";
import { FileAddOutlined } from "@ant-design/icons-vue";
import { dateAndTimeFormate,arrayToObjact } from "@/commonMethods/commonMethod";
import Flags from "@/components/common/flags/Flags";
import { useStore } from "vuex";
const columns = [
  {
    title: "Appointment Type",
    dataIndex: "appointmentType",
    key: "appointmentType",
  },
  {
    title: "Care Coordinator",
    dataIndex: "staff",
    key: "staff",
    slots: {
      customRender: "staff",
    },
  },
  {
    title: "Patient",
    dataIndex: "patient",
    key: "patient",
    slots: {
      customRender: "patient",
    },
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    customRender: ({ record }) => {
      return dateAndTimeFormate(record.date, "MMM DD, yyyy");
    },
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Start Time",
    dataIndex: "date",
    customRender: ({ record }) => {
      return dateAndTimeFormate(record.date, "hh:mm A");
    },
  },
  {
    title: "Notes",
    dataIndex: "notes",
    key: "notes",
    ellipsis: true,
  },
  {
    title: "Flags",
    dataIndex: "flags",
    key: "flags",
    slots: {
      customRender: "flags",
    },
  },
];
export default {
  components: {
    FileAddOutlined,
    Flags
  },
  props: {
    cardData: {
      type: Object,
    },
    count: {
      type: Number,
    },
    length: {
      type: Number,
    },
    tabName: {
      type: String,
    },
    data: {
      type: Array,
    },
  },
  setup(props) {
    const visible = ref(false);
    const store = useStore();
    const allRecord = reactive(props.data);
    const cardRecords = reactive(props.cardData);
    const tab = reactive(props.tabName);

    function showModal(appointmentRecord) {
      //appointment show after 4 records
      store.dispatch("showMoreRecords", {
        data: appointmentRecord,
        to: 4,
      });
      visible.value = true;
    }
    const getMoreAppointment = computed(() => {
      return store.state.appointment.showMoreRecords;
    });

    function closeModal() {
      store.state.appointment.showMoreRecords = "";
    }
    return {
      screensPermissions: store.getters.screensPermissions,
      arrayToObjact,
      visible,
      getMoreAppointment,
      allRecord,
      tab,
      showModal,
      cardRecords,
      columns,
      closeModal,
      dateAndTimeFormate,
    };
  },
};
</script>
