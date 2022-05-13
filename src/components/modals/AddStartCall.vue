<template>
<a-modal width="1000px" title="Start Call" centered :footer="false" :maskClosable="false" @cancel="onCloseModal()">
<a-tabs v-model:activeKey="activeKey">
  <a-tab-pane :key="1" tab="Scheduled Call">
    <PopulateWaitingRoomTable  :colomnsRecord="columns" :dataRecord="newRequestsData" :pagination="false" />
  </a-tab-pane>
  <a-tab-pane :key="2" tab="New Call" >
    <a-form :model="startCall" ref="formRef" name="basic" autocomplete="off" layout="vertical" @finish="videoCall" @finishFailed="videoCallFailed">
        <a-row :gutter="24">
            <a-col :sm="24" :xs="24">
                <div class="form-group">
                    <a-form-item label="Patient List" name="patientId" :rules="[{ required: true, message: 'Patient'+' '+$t('global.validation') }]">
                        <PatientDropDown v-model:value="startCall.patientId" @handlePatientChange="handlePatientChange($event)" @change="checkChangeInput()" />
                      </a-form-item>
                </div>
            </a-col>
            <!-- <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <a-form-item :label="$t('common.flag')" name="flag" :rules="[{ required: true, message: $t('common.flag')+' '+$t('global.validation')  }]">
                        <GlobalCodeDropDown v-model:value="startCall.flag" :globalCode="flagsList" @change="checkChangeInput()" />
                    </a-form-item>
                </div>
            </a-col> -->
            <!-- <a-col :span="24">
					<div class="form-group">
						<a-form-item :label="$t('appointmentCalendar.addAppointment.note')" name="note" :rules="[{ required: true, message: $t('appointmentCalendar.addAppointment.note')+' '+$t('global.validation') }]">
							<a-textarea v-model:value="startCall.note" allow-clear @change="checkChangeInput()" />
						</a-form-item>
					</div> 
				</a-col>-->
          <a-col :sm="24" :xs="24">
              <div class="text-right mt-28">
                  <a-button class="blueBtn" html-type="submit">Start Call</a-button>
              </div>
          </a-col>
        </a-row>
    </a-form>
  </a-tab-pane>
  
</a-tabs>
</a-modal>
</template>

<script>
import { computed, onUnmounted, reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";
import {
  dateOnlyFormat,
  meridiemFormatFromTimestamp,
  deCodeString,
  enCodeString,
} from "@/commonMethods/commonMethod";
import PatientDropDown from "@/components/modals/search/PatientDropdownSearch.vue";
import { useRouter } from "vue-router";
// import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue";
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "../../config/messages";
import PopulateWaitingRoomTable from "@/components/communications/tables/PopulateWaitingRoomTable";
const columns =[
        {
          title: "Patient Name",
          dataIndex: "patient",
          slots: {
            customRender: "patient",
          },
        },
        {
          title: "Appointment Type",
          dataIndex: "appointmentType",
        },
        {
          title: "Time",
          dataIndex: "startTime",
        },
        {
          title: "Action",
          dataIndex: "action",
          slots: {
            customRender: "action",
          },
        },
      ];
export default {
  components: {
    PatientDropDown,
    // GlobalCodeDropDown,
    PopulateWaitingRoomTable
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const formRef = ref();
    const isChangeInput = ref(false);
    const activeKey = ref(1)
    const startCall = reactive({
      patientId: "",
      flag: "d76ad323-cd1b-4bcf-ae3d-2300daa1ea17",
      note: "Call",
    });
    const dropdownData = computed(() => {
      return store.state.appointment;
    });
    onMounted(() => {
      store.dispatch("flagsList");
    });
    const flagsList = computed(() => {
      return store.state.flags.flagsList;
    });

    function videoCall() {
      store.dispatch("appointmentCalls", {
        patientId: startCall.patientId,
        flag: startCall.flag,
        note: startCall.note,
      });
      setTimeout(() => {
        if (conferenceId.value) {
          router.push({
            name: "videoCall",
            params: {
              id: enCodeString(conferenceId.value),
            },
          });
        }
        emit("is-visibale", false);
      }, 2000);
    }

    onUnmounted(() => {
      store.dispatch("getVideoDetails", conferenceId.value);
    });

    function videoCallFailed(value) {
      console.log(value);
    }

    const form = reactive({
      ...startCall,
    });

    function closeModal() {
      formRef.value.resetFields();
    }
    const onCloseModal = () => {
      if (isChangeInput.value) {
        warningSwal(messages.modalWarning).then((response) => {
          if (response == true) {
            emit("is-visibale", false);
            formRef.value.resetFields();
            Object.assign(startCall, form);
            isChangeInput.value = false;
          } else {
            emit("is-visibale", true);
          }
        });
      } else {
        emit("is-visibale", false);
        formRef.value.resetFields();
      }
    };
    const handlePatientChange = (val) => {
      startCall.patientId = val;
    };

    const conferenceId = computed(() => {
      return store.state.videoCall.conferenceId;
    });
    const checkChangeInput = () => {
      isChangeInput.value = true;
    };
    const newRequestsData = computed(() => {
      return store.state.communications.newRequests
    })
    return {
      newRequestsData,
      columns,
      activeKey,
      conferenceId,
      handlePatientChange,
      closeModal,
      formRef,
      form,
      videoCallFailed,
      enCodeString,
      deCodeString,
      videoCall,
      dateOnlyFormat,
      meridiemFormatFromTimestamp,
      startCall,
      dropdownData,
      flagsList,
      onCloseModal,
      checkChangeInput,
    };
  },
};
</script>
