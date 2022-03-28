<template>
  <a-modal width="1000px" title="Communications" centered :footer="null" :maskClosable="false" @cancel="closeModal()">
    <a-form ref="formRef" :model="messageForm" layout="vertical" @finish="sendMessage" @finishFailed="sendMessageFailed">
      <a-row :gutter="24">
        <!-- <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.from')" name="from">
              <a-input v-model:value="messageForm.from" size="large" readonly />
            </a-form-item>
          </div>
        </a-col> -->
        <a-col :sm="12" :xs="24">
          <div class="form-group">
        
            <a-form-item :label="$t('communications.communicationsModal.from')" name="from" :rules="[{ required: true, message: $t('communications.communicationsModal.from')+' '+$t('global.validation')  }]">
              <!-- <a-select
                ref="select"
                v-model:value="messageForm.from"
                style="width: 100%"
                :disabled="arrayToObjact(staffPermissions,37) ? false : true"
                :show-search="true"
                placeholder="input search text"
                :show-arrow="true"
                :filter-option="false"
                :not-found-content="loadingStatus ? undefined : null"
                :options="staffData"
                @search="handleStaffSearch"
                @change="handleStaffChange"
                size="large">  
                <template  v-if="loadingStatus" #notFoundContent>
                  <a-spin size="small" />
                </template>
              </a-select> -->
              <StaffDropDown :disabled="arrayToObjact(staffPermissions,37) ? false : true" v-model:value="messageForm.from" @handleStaffChange="handleStaffChange($event)"/>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24" @click="referenceId">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.to')" name="to">
              <div class="btn toggleButton" :class="toggleTo ? 'active' : ''" @click="toggleTo = !toggleTo">
                <span class="btn-content">{{ $t('communications.communicationsModal.patient') }}</span>
              </div>
              <div class="btn toggleButton" :class="toggleTo ? '' : 'active'" @click="toggleTo = !toggleTo">
                <span class="btn-content">{{ $t('communications.communicationsModal.staff') }}</span>
              </div>
              <a-input type="hidden" id="entityType" v-model="messageForm.entityType" :value="toggleTo ? 'patient' : 'staff'" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24" v-show="toggleTo">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.patient')" name="referenceId" :rules="[{ required: true, message: $t('communications.communicationsModal.patient')+' '+$t('global.validation')  }]">
              <!-- <a-select
                ref="select"
                v-if="patientsList"
                v-model:value="messageForm.referenceId"
                style="width: 100%"
                size="large">
                <a-select-option value="" disabled>{{'Select Patient'}}</a-select-option>
                <a-select-option v-for="patient in patientsList" :key="patient.id" :value="patient.id" :disabled="messageForm.from==patient.id ? true : false">{{ patient.name+' '+patient.middleName+' '+patient.lastName }}</a-select-option>
              </a-select> -->
              <!-- <a-select
                ref="select"
                v-model:value="messageForm.referenceId"
                style="width: 100%"
                :show-search="true"
                placeholder="input search text"
                :show-arrow="true"
                :filter-option="false"
                :not-found-content="loadingStatus ? undefined : null"
                :options="patientData"
                @search="handlePatientSearch"
                @change="handlePatientChange"
                size="large">
                <template  v-if="loadingStatus" #notFoundContent>
                  <a-spin size="small" />
                </template>
              </a-select> -->
              <PatientDropDown v-if="patientsList"  v-model:value="messageForm.referenceId" @handlePatientChange="handlePatientChange($event)"/>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24" v-show="!toggleTo">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.staff')" name="referenceId" :rules="[{ required: true, message: $t('communications.communicationsModal.staff')+' '+$t('global.validation')  }]">
              <!-- <a-select
                ref="select"
                v-if="staffList"
                v-model:value="messageForm.referenceId"
                style="width: 100%"
                size="large">
                <a-select-option value="" disabled>{{'Select Staff'}}</a-select-option>
                <a-select-option v-for="staff in staffList" :key="staff.id" :value="staff.id" :disabled="messageForm.from==staff.id ? true : false">{{ staff.fullName }}</a-select-option>
              </a-select> -->
              <!-- <a-select
                ref="select"
                v-model:value="messageForm.referenceId"
                style="width: 100%"
                :show-search="true"
                placeholder="input search text"
                :show-arrow="true"
                :filter-option="false"
                :not-found-content="loadingStatus ? undefined : null"
                :options="staffData"
                @search="handleStaffSearch"
                @change="handlePatientChange"
                size="large">
                <template  v-if="loadingStatus" #notFoundContent>
                  <a-spin size="small" />
                </template>
              </a-select> -->
              <StaffDropDown v-if="staffList" :checkSameAsStaff="true" v-model:value="messageForm.referenceId" @handlePatientChange="handlePatientChange($event)"/>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.messageCategory')" name="messageCategoryId" :rules="[{ required: true, message: $t('communications.communicationsModal.messageCategory')+' '+$t('global.validation')  }]">
              <!-- <a-select
                v-if="messageCategories"
                ref="select"
                v-model:value="messageForm.messageCategoryId"
                style="width: 100%"
                size="large">
                <a-select-option value="" disabled>{{'Select Message Category'}}</a-select-option>
                <a-select-option v-for="messageCategory in messageCategories.globalCode" :key="messageCategory.id" :value="messageCategory.id">{{ messageCategory.name }}
                </a-select-option>
              </a-select> -->
              <GlobalCodeDropDown v-model:value="messageForm.messageCategoryId"  :globalCode="messageCategories" @change="checkChangeInput()"/>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.priority')" name="priorityId" :rules="[{ required: true, message: $t('communications.communicationsModal.priority')+' '+$t('global.validation')  }]">
              <!-- <a-select
                v-if="taskPriority"
                ref="select"
                v-model:value="messageForm.priorityId"
                style="width: 100%"
                size="large">
                <a-select-option value="" disabled>{{'Select Priority'}}</a-select-option>
                <a-select-option v-for="priority in taskPriority.globalCode" :key="priority.id" :value="priority.id">{{ priority.name }}</a-select-option>
              </a-select> -->
              <GlobalCodeDropDown v-model:value="messageForm.taskPriority"  :globalCode="taskPriority" @change="checkChangeInput()"/>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.messageType')" name="messageTypeId" :rules="[{ required: true, message: $t('communications.communicationsModal.messageType')+' '+$t('global.validation')  }]">
              <!-- <a-select
                ref="select"
                v-model:value="messageForm.messageTypeId"
                style="width: 100%"
                size="large">
                  <a-select-option value="" disabled>{{'Select Message Type'}}</a-select-option>
                  <template v-for="type in messageType.globalCode">
                    <a-select-option v-if="type.name == 'SMS' || type.name == 'Email'" :key="type.id" :value="type.id">{{ type.name }}</a-select-option>
                  </template>
              </a-select> -->
              <GlobalCodeDropDown v-if="type.name == 'SMS' || type.name == 'Email'" :key="type.id" :value="type.id" v-model:value="messageForm.messageTypeId"  :globalCode="messageType" @change="checkChangeInput()"/>
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.subject')" name="subject" :rules="[{ required: true, message: $t('communications.communicationsModal.subject')+' '+$t('global.validation')  }]">
              <a-input v-model:value="messageForm.subject" size="large" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.message')" name="message" :rules="[{ required: true, message: $t('communications.communicationsModal.message')+' '+$t('global.validation')  }]">
              <a-textarea v-model:value="messageForm.message" allow-clear />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="24">
          <ModalButtons name="communication"/>
          
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>
import { ref, reactive, watchEffect, computed, onMounted, defineComponent,defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import ModalButtons from "@/components/common/button/ModalButtons";
import { arrayToObjact, warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "../../config/messages";
// import Services from "@/services/serviceMethod"
// import PatientDropDown from "@/components/modals/search/PatientDropdownSearch.vue"
// import StaffDropDown from "@/components/modals/search/StaffDropdownSearch.vue"
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue";
export default defineComponent({
  components: {
    ModalButtons,
    GlobalCodeDropDown,
    PatientDropDown:defineAsyncComponent(()=>import("@/components/modals/search/PatientDropdownSearch.vue")),
    StaffDropDown:defineAsyncComponent(()=>import("@/components/modals/search/StaffDropdownSearch.vue"))
  },
  setup(props, { emit }) {
    const store = useStore();
    const toggleTo = ref(true);
    const staffData = ref([]);
    const patientData = ref([]);
    const value = ref();
    // const loadingStatus = ref()
    const auth = JSON.parse(localStorage.getItem("auth"));
    const messageForm = reactive({
      from: "",
      entityType: "",
      referenceId: "",
      subject: "",
      messageCategoryId: "",
      priorityId: "",
      messageTypeId: "",
      message: "",
    });

    watchEffect(() => {
      store.dispatch("globalCodes");
      store.dispatch("allPatientsList");
      store.dispatch("allStaffList");
    });

    const sendMessageFailed = (value)=>{
      console.log('sendMessageFailed',value);
    }

     onMounted(()=>{
      //  Services.singleDropdownSearch('', (d) => (staffData.value = d), 'staff');
      //  setTimeout(()=>{
      //    Services.singleDropdownSearch('', (d) => (patientData.value = d), 'patient')
      // },300) 
    })

    // const handleStaffSearch = (val) => {
    //   store.commit('loadingStatus', true)
    //   staffData.value=[];
    //   Services.singleDropdownSearch(val, (d) => (staffData.value = d), 'staff')
    // };

    const handleStaffChange = (val) => {
      messageForm.from = val;
    };

    // const handlePatientSearch = (val) => {
    //   store.commit('loadingStatus', true)
    //   patientData.value=[];
    //   Services.singleDropdownSearch(val, (d) => (patientData.value = d), 'patient')
    // };

    const handlePatientChange = (val) => {
      messageForm.referenceId = val;
    };

    const taskPriority = computed(() => {
      return store.state.common.taskPriority;
    });
    const messageCategories = computed(() => {
      return store.state.common.messageCategories;
    });
    const messageType = computed(() => {
      return store.state.common.messageType;
    });

    const patientsList = computed(() => {
      return store.state.common.allPatientsList;
    });
    const staffList = computed(() => {
      return store.state.common.allStaffList;
    });

   
    const formRef = ref();
    const form = reactive({ ...messageForm });
    const sendMessage = () => {
      messageForm.entityType = document.getElementById("entityType").value;
      store.getters.communicationRecord.value.communicationsList = "";
      store.dispatch("addCommunication", messageForm).then(() => {
        store.dispatch("communicationsList");
        store.dispatch("communicationTypes");
      });
      emit("is-visible", false);
      formRef.value.resetFields();
      Object.assign(messageForm, form);
    };

    const handleCancel = () => {
      formRef.value.resetFields();
      Object.assign(messageForm, form);
    };
    function closeModal() {
      if (
        messageForm.entityType != "" ||
        messageForm.referenceId != "" ||
        messageForm.subject != "" ||
        messageForm.messageCategoryId != "" ||
        messageForm.priorityId != "" ||
        messageForm.message != "" ||
        messageForm.messageTypeId != ""
      ) {
        warningSwal(messages.modalWarning).then((response) => {
          if (response == true) {
            ///console.log("check2")
            handleCancel();
            emit("is-visible", false);
          } else {
            emit("is-visible", true);
          }
        });
      }
    }
    const patientChange = (value) => {
      store.dispatch("patientDetails", value);
    };
    function referenceId() {
      messageForm.referenceId = "";
    }
    const staffPermissions = computed(() => {
      return store.state.screenPermissions.staffPermissions;
    });
    
    return {
      loadingStatus:store.getters.loadingStatus,
      staffData,
      patientData,
      value,
      sendMessageFailed,
      toggleTo,
      patientChange,
      handleCancel,
      sendMessage,
      patientsList,
      staffList,
      taskPriority,
      messageCategories,
      messageType,
      messageForm,
      formRef,
      auth,
      closeModal,
      referenceId,
      staffPermissions,
      arrayToObjact,
      // handleStaffSearch,
      handleStaffChange,
      // handlePatientSearch,
      handlePatientChange,
    };
  },
});
</script>

<style>
.ant-modal-footer {
  display: none;
}
.toggleButton {
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 6px 16px;
  display: inline-block;
  cursor: pointer;
  width: 100px;
}
.toggleButton.active {
  background-color: #777;
  color: #fff;
}
</style>
