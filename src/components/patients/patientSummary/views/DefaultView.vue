<template>
  <div>
    <a-row :gutter="24">
      <a-col :xl="8" :lg="24">
        <div class="patientInfo">
          <div class="patientImg" @click="showModalCustom">
            <img
              src="@/assets//images/profile-4.jpg"
              alt="image"
            />
            <div class="info">
              <p>Jane Doe</p>
              <p>DOB : June 25, 1995</p>
              <p>
                <a href="mailto:jane@gmail.com"
                  ><MailOutlined /> jane@gmail.com</a
                >
              </p>
              <p>
                <a href="tel:1234567890"
                  ><PhoneOutlined :rotate="90" /> +343-3563-767</a
                >
              </p>
              <p>132, My Street, Kingston, New York 12401.</p>
            </div>
            <EditOutlined class="editIcon" @click="addPatient" />
          </div>

          <div class="pat-profile">
            <div class="pat-profile-inner">
              <div class="thumb-head">Flag</div>
              <div class="thumb-desc">
                <span class="box redBgColor"></span>
                <span class="box yellowBgColor"></span>
              </div>
            </div>
            <div class="pat-profile-inner">
              <div class="thumb-head">Non Compliance</div>
              <div class="thumb-desc">
                <WarningOutlined />
              </div>
            </div>
            <div class="pat-profile-inner">
              <div class="thumb-head">
                Appointments
                <PlusOutlined
                  @click="showAddAppointmentModal"
                /><br />
              </div>
              <div class="thumb-desc">
                <router-link to="appointment-calendar">
                  John Deer 20th 2021 (+1 more)
                </router-link>
              </div>
            </div>

            <div class="pat-profile-inner">
              <div class="thumb-head">
                Task
                <PlusOutlined @click="AddTaskModal" /><br />
              </div>
              <div class="thumb-desc">
                <router-link to="tasks"> Task 1 </router-link>
              </div>
            </div>
            <div class="pat-profile-inner">
              <div class="thumb-head">
                Vital Summary <PlusOutlined @click="showModal3" />
              </div>
              <div class="thumb-desc">
                <a href="javascript:void(0)"
                  ><span @click="showBloodPressureDetailModal"
                    >BP 120 / 78 Dec 15 6 PM</span
                  ></a
                >
              </div>
            </div>
            <div class="pat-profile-inner">
              <div class="thumb-head">
                Notes
                <PlusOutlined @click="showAddNoteModal" />
              </div>
              <div class="thumb-desc">
                <a
                  href="javascript:void(0)"
                  @click="showNoteModal"
                  >John Clinical Dec 15 2021</a
                >
              </div>
            </div>
            <div class="pat-profile-inner">
              <div class="thumb-head">
                Documents <PlusOutlined @click="showModal" />
              </div>
              <div class="thumb-desc">
                <a
                  href="javascript:void(0)"
                  @click="showDocumentModal"
                  >Program 1</a
                >
              </div>
            </div>
            <div class="pat-profile-inner">
              <div class="thumb-head">
                Care Team <PlusOutlined @click="showModal8" />
              </div>
              <div class="thumb-desc">
                <router-link to="corrdinator-summary"
                  >John Smith (P) HT </router-link
                ><br />
              </div>
            </div>
            <div class="pat-profile-inner">
              <div class="thumb-head">
                TimeLogs <PlusOutlined @click="showModal1" />
              </div>
              <div class="thumb-desc">
                <a
                  href="javascript:void(0)"
                  @click="showTimeLogDetailModal"
                  >Daily monitoring of vitals (Oct 25, 2021)</a
                >
              </div>
            </div>
            <div class="pat-profile-inner">
              <div class="thumb-head">
                Devices <PlusOutlined @click="showModal2" />
              </div>
              <div class="thumb-desc">
                <a
                  href="javascript:void(0)"
                  @click="showDeviceModal"
                  >Blood Pressure(M-101)</a
                >
              </div>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :xl="16" :lg="24">
        <div class="thumbDesc patientTimeline">
          <a-checkbox-group v-model:value="value10">
            <a-checkbox value="Notifications1"
              >Notifications</a-checkbox
            >
            <a-checkbox value="Visits1">Visits</a-checkbox>
            <a-checkbox value="Notes1">Notes</a-checkbox>
            <a-checkbox value="Appointments1"
              >Appointments</a-checkbox
            >
            <a-checkbox value="Documents1">Documents</a-checkbox>
            <a-checkbox value="Additional11"
              >Additional 1</a-checkbox
            >
            <a-checkbox value="Additional21"
              >Additional 2</a-checkbox
            >
          </a-checkbox-group>
          <a-timeline class="defaultTimeline">
            <a-timeline-item color="blue">
              <template #dot
                ><FolderOpenOutlined class="yellowIcon"
              /></template>
              <div class="timelineInner">
                <div class="timelineHeader">
                  <div class="title">
                    <h4>Lorem Ipsum</h4>
                    <a-typography-text mark
                      >Read</a-typography-text
                    >
                    <span class="time">12:00 PM</span>
                  </div>
                  <div class="userImg">
                    <img
                      src="@/assets//images/profile-4.jpg"
                      alt="image"
                    />
                  </div>
                </div>
                <div class="timelineBody">
                  <div class="content">
                    Lorem ipsum dolor sit amet consectetur
                    adipisicing elit....
                    <a href="#">more</a>
                  </div>
                  <MailOutlined />
                </div>
              </div>
            </a-timeline-item>
            <a-timeline-item color="red">
              <template #dot
                ><HeatMapOutlined class="redIcon"
              /></template>
              Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Sit culpa assumenda quidem magnam
            </a-timeline-item>
            <a-timeline-item color="red">
              <template #dot
                ><ClockCircleOutlined class="orangeIcon"
              /></template>
              <div class="timelineInner">
                <div class="timelineHeader">
                  <div class="title">
                    <h4>Lorem Ipsum</h4>
                    <a-typography-text mark
                      >Read</a-typography-text
                    >
                    <span class="time">12:00 PM</span>
                  </div>
                  <div class="userImg">
                    <img
                      src="@/assets//images/profile-4.jpg"
                      alt="image"
                    />
                  </div>
                </div>
                <div class="timelineBody">
                  <div class="content">
                    Lorem ipsum dolor sit amet consectetur
                    adipisicing elit....
                    <a href="#">more</a>
                  </div>
                  <MailOutlined />
                </div>
              </div>
            </a-timeline-item>
            <a-timeline-item color="red">
              <template #dot
                ><BellOutlined class="yellowIcon"
              /></template>
              <div class="timelineInner">
                <div class="timelineHeader">
                  <div class="title">
                    <h4>Lorem Ipsum</h4>
                    <a-typography-text mark
                      >Read</a-typography-text
                    >
                    <span class="time">12:00 PM</span>
                  </div>
                  <div class="userImg">
                    <img
                      src="@/assets//images/profile-4.jpg"
                      alt="image"
                    />
                  </div>
                </div>
                <div class="timelineBody">
                  <div class="content">
                    Lorem ipsum dolor sit amet consectetur
                    adipisicing elit....
                    <a href="#">more</a>
                  </div>
                  <MailOutlined />
                </div>
              </div>
            </a-timeline-item>
            <a-timeline-item class="dateOuter"
              ><template #dot
                ><ClockCircleOutlined class="orangeIcon"
              /></template>
              <div class="date">
                <span>Dec 12, 2021</span>
              </div></a-timeline-item
            >
            <a-timeline-item color="blue">
              <template #dot
                ><FilePdfOutlined class="yellowIcon" /></template
              >Lorem ipsum
              <div class="timelineInner">
                <div class="timelineHeader">
                  <div class="title">
                    <h4>Lorem Ipsum</h4>
                    <a-typography-text mark
                      >Read</a-typography-text
                    >
                    <span class="time">12:00 PM</span>
                  </div>
                  <div class="userImg">
                    <img
                      src="@/assets//images/profile-4.jpg"
                      alt="image"
                    />
                  </div>
                </div>
                <div class="timelineBody">
                  <div class="content">
                    Lorem ipsum dolor sit amet consectetur
                    adipisicing elit....
                    <a href="#">more</a>
                  </div>
                  <MailOutlined />
                </div></div
            ></a-timeline-item>
            <a-timeline-item color="red">
              <template #dot
                ><HeatMapOutlined class="redIcon"
              /></template>
              Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Sit culpa assumenda quidem magnam fuga quaerat
              pariatur labore exercitationem voluptate iusto,
              repellat debitis quis itaque nulla numquam, fugiat
              quas ullam. Minus.
            </a-timeline-item>
            <a-timeline-item color="red">
              <template #dot
                ><ClockCircleOutlined class="orangeIcon"
              /></template>
              <div class="timelineInner">
                <div class="timelineHeader">
                  <div class="title">
                    <h4>Lorem Ipsum</h4>
                    <a-typography-text mark
                      >Read</a-typography-text
                    >
                    <span class="time">12:00 PM</span>
                  </div>
                  <div class="userImg">
                    <img
                      src="@/assets//images/profile-4.jpg"
                      alt="image"
                    />
                  </div>
                </div>
                <div class="timelineBody">
                  <div class="content">
                    Lorem ipsum dolor sit amet consectetur
                    adipisicing elit....
                    <a href="#">more</a>
                  </div>
                  <MailOutlined />
                </div>
              </div>
            </a-timeline-item>
            <a-timeline-item color="red">
              <template #dot
                ><BellOutlined class="yellowIcon"
              /></template>
              Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Sit culpa assumenda quidem magnam fuga quaerat
              pariatur labore exercitationem voluptate iusto,
              repellat debitis quis itaque nulla numquam, fugiat
              quas ullam. Minus.
            </a-timeline-item>
          </a-timeline>
        </div>
      </a-col>
    </a-row>
  </div>
  <PatientsModal v-model:visible="PatientsModal" @ok="handleOk" />
</template>

<script>
import {
  WarningOutlined,
  FolderOpenOutlined,
  FilePdfOutlined,
  BellOutlined,
  HeatMapOutlined,
  ClockCircleOutlined,
  MailOutlined,
  PlusOutlined,
  EditOutlined,
  PhoneOutlined,
} from "@ant-design/icons-vue";
import { ref } from 'vue-demi';
import PatientsModal from "@/components/modals/PatientsModal";
export default {
  components: {
    WarningOutlined,
    FolderOpenOutlined,
    FilePdfOutlined,
    BellOutlined,
    HeatMapOutlined,
    ClockCircleOutlined,
    MailOutlined,
    PlusOutlined,
    EditOutlined,
    PhoneOutlined,
    PatientsModal,
  },
  setup() {
    const custom = ref(false);

    const PatientsModal = ref(false);
    const addPatient = () => {
      PatientsModal.value = true;
    };
    
    const showModalCustom = () => {
      custom.value = true;
    };

    return {
      PatientsModal,
      addPatient,
      showModalCustom,
      custom,
      selectedTimeline: ref([]),
      value10: ref([]),
    }
  }
}
</script>

<style lang="scss">
.timer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 1199px) {
    margin: 0 0 20px;
  }
  h3 {
    margin: 0 10px 0 0;
  }
}
.dangerValue {
  padding: 5px;
  background-color: #f03131f3;
  color: #fff;
}
.ant-alert-error {
  background-color: #f8d7da;
  border-color: #f5c2c7;
  .ant-alert-message {
    color: #842029;
  }
}
</style>