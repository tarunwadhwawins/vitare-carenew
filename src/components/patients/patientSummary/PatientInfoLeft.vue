<template>
  <div class="patientInfo">
    <div class="patientImg" @click="showModalCustom">
      <img src="@/assets//images/profile-4.jpg" alt="image"/>
      <div class="info">
        <p>Jane Doe</p>
        <p>DOB : June 25, 1995</p>
        <p><a href="mailto:jane@gmail.com"><MailOutlined /> jane@gmail.com</a>
        </p>
        <p><a href="tel:1234567890"><PhoneOutlined :rotate="90" /> +343-3563-767</a>
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
          <PlusOutlined @click="showAddAppointmentModal"/><br />
        </div>
        <div class="thumb-desc">
          <router-link to="appointment-calendar">
            John Deer 20th 2021 (+1 more)
          </router-link>
        </div>
      </div>

      <div class="pat-profile-inner">
        <div class="thumb-head">
          Task <PlusOutlined @click="AddTaskModal" /><br />
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
          <a href="javascript:void(0)">
            <span @click="showBloodPressureDetailModal">BP 120 / 78 Dec 15 6 PM</span>
          </a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Notes <PlusOutlined @click="showAddNoteModal" />
        </div>
        <div class="thumb-desc">
          <a href="javascript:void(0)" @click="showNoteModal" >John Clinical Dec 15 2021</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Documents <PlusOutlined @click="showModal" />
        </div>
        <div class="thumb-desc">
          <a href="javascript:void(0)" @click="showDocumentModal" >Program 1</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Care Team <PlusOutlined @click="showModal8" />
        </div>
        <div class="thumb-desc">
          <router-link to="corrdinator-summary">John Smith (P) HT </router-link><br />
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          TimeLogs <PlusOutlined @click="showModal1" />
        </div>
        <div class="thumb-desc">
          <a href="javascript:void(0)" @click="showTimeLogDetailModal" >Daily monitoring of vitals (Oct 25, 2021)</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Devices <PlusOutlined @click="showModal2" />
        </div>
        <div class="thumb-desc">
          <a href="javascript:void(0)" @click="showDeviceModal" >Blood Pressure(M-101)</a>
        </div>
      </div>
    </div>
  </div>
  <PatientsModal v-model:visible="PatientsModal" @ok="handleOk" />
</template>

<script>
import {
  WarningOutlined,
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
