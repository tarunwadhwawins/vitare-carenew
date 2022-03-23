<template>
  <a-modal width="1000px" title="Communications" centered :footer="null" :maskClosable="false" @cancel="closeModal()">
    <a-form ref="formRef" :model="messageForm" layout="vertical" @finish="sendMessage">
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
              <a-select
                ref="select"
                v-if="staffList"
                v-model:value="messageForm.from"
                style="width: 100%"
                :disabled="arrayToObjact(staffPermissions,37) ? false : true"
                show-search
                :default-active-first-option="true"
                :show-arrow="true"
                :filter-option="true"
                :not-found-content="null"
                :options="data"
                @search="handleSearch"
                @change="handleChange"
                placeholder="input search text"
                size="large">
                <!-- <a-select-option value="" disabled>{{'Select Staff'}}</a-select-option>
                <a-select-option v-for="staff in staffList" :key="staff.id" :value="staff.id">{{ staff.fullName }}</a-select-option> -->
              </a-select>
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
              <a-select
                ref="select"
                v-if="patientsList"
                v-model:value="messageForm.referenceId"
                style="width: 100%"
                size="large">
                <a-select-option value="" disabled>{{'Select Patient'}}</a-select-option>
                <a-select-option v-for="patient in patientsList" :key="patient.id" :value="patient.id" :disabled="messageForm.from==patient.id ? true : false">{{ patient.name+' '+patient.middleName+' '+patient.lastName }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24" v-show="!toggleTo">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.staff')" name="referenceId" :rules="[{ required: true, message: $t('communications.communicationsModal.staff')+' '+$t('global.validation')  }]">
              <a-select
                ref="select"
                v-if="staffList"
                v-model:value="messageForm.referenceId"
                style="width: 100%"
                size="large">
                <a-select-option value="" disabled>{{'Select Staff'}}</a-select-option>
                <a-select-option v-for="staff in staffList" :key="staff.id" :value="staff.id" :disabled="messageForm.from==staff.id ? true : false">{{ staff.fullName }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.messageCategory')" name="messageCategoryId" :rules="[{ required: true, message: $t('communications.communicationsModal.messageCategory')+' '+$t('global.validation')  }]">
              <a-select
                v-if="messageCategories"
                ref="select"
                v-model:value="messageForm.messageCategoryId"
                style="width: 100%"
                size="large">
                <a-select-option value="" disabled>{{'Select Message Category'}}</a-select-option>
                <a-select-option v-for="messageCategory in messageCategories.globalCode" :key="messageCategory.id" :value="messageCategory.id">{{ messageCategory.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.priority')" name="priorityId" :rules="[{ required: true, message: $t('communications.communicationsModal.priority')+' '+$t('global.validation')  }]">
              <a-select
                v-if="taskPriority"
                ref="select"
                v-model:value="messageForm.priorityId"
                style="width: 100%"
                size="large">
                <a-select-option value="" disabled>{{'Select Priority'}}</a-select-option>
                <a-select-option v-for="priority in taskPriority.globalCode" :key="priority.id" :value="priority.id">{{ priority.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.messageType')" name="messageTypeId" :rules="[{ required: true, message: $t('communications.communicationsModal.messageType')+' '+$t('global.validation')  }]">
              <a-select
                ref="select"
                v-model:value="messageForm.messageTypeId"
                style="width: 100%"
                size="large">
                  <a-select-option value="" disabled>{{'Select Message Type'}}</a-select-option>
                  <template v-for="type in messageType.globalCode">
                    <a-select-option v-if="type.name == 'SMS' || type.name == 'Email'" :key="type.id" :value="type.id">{{ type.name }}</a-select-option>
                  </template>
              </a-select>
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
  import { ref, reactive, watchEffect, computed } from "vue";
  import { useStore } from "vuex"
  import jsonp from 'fetch-jsonp';
  import qs from 'qs';
  import ModalButtons from "@/components/common/button/ModalButtons";
  import {arrayToObjact,
    warningSwal
} from "@/commonMethods/commonMethod";
import {
    messages
} from "../../config/messages";

  let timeout;
let currentValue = '';

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }

  currentValue = value;

  function fake() {
    const str = qs.stringify({
      code: 'utf-8',
      q: value,
    });
    jsonp(`https://suggest.taobao.com/sug?${str}`).then(response => response.json()).then(d => {
      console.log("diiii",d);
      if (currentValue === value) {
        const result = d.result;
        console.log("rewwa",result);
        const data = [];
        result.forEach(r => {
          data.push({
            value: r[0],
            label: r[0],
          });
        });
        callback(data);
      }
    });
  }

  timeout = setTimeout(fake, 300);
}


  export default {
    components: {
      ModalButtons
    },
    setup(props, {emit}) {
      const store = useStore()
      const toggleTo = ref(true);

      const auth = JSON.parse(localStorage.getItem("auth"))
      watchEffect(() => {
        store.dispatch("globalCodes")
        store.dispatch("allPatientsList")
        store.dispatch("allStaffList")
      })

      const data = ref([]);
    const value = ref();

    const handleSearch = val => {
      fetch(val, d => data.value = d);
    };

    const handleChange = val => {
      console.log(val);
      value.value = val;
      fetch(val, d => data.value = d);
    };
      
      const taskPriority = computed(() => {
        return store.state.common.taskPriority;
      }) 
      const messageCategories = computed(() => {
        return store.state.common.messageCategories;
      }) 
      const messageType = computed(() => {
        return store.state.common.messageType;
      })

      const patientsList = computed(() => {
        return store.state.common.allPatientsList
      })
      const staffList = computed(() => {
        return store.state.common.allStaffList
      })

      const messageForm = reactive({
        from: auth.user.staffUdid,
        entityType: '',
        referenceId: '',
        subject: '',
        messageCategoryId: '',
        priorityId: '',
        messageTypeId: '',
        message: '',
      });

      const formRef = ref();
      const form = reactive({ ...messageForm })
      const sendMessage = () => {
        messageForm.entityType = document.getElementById("entityType").value
        store.getters.communicationRecord.value.communicationsList=""
        store.dispatch('addCommunication', messageForm).then(() => {
          store.dispatch('communicationsList')
          store.dispatch('communicationTypes')
        })
        emit('is-visible', false);
        formRef.value.resetFields();
        Object.assign(messageForm, form)
      }

      const handleCancel = () => {
        formRef.value.resetFields();
        Object.assign(messageForm, form)
      };
      function closeModal() {
           
            if (messageForm.entityType != "" || messageForm.referenceId != "" || messageForm.subject != "" || messageForm.messageCategoryId != "" || messageForm.priorityId != "" || messageForm.message != "" || messageForm.messageTypeId != "") {
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
        store.dispatch('patientDetails', value);
      };
      function referenceId(){
        messageForm.referenceId=''
      }
       const staffPermissions = computed(()=>{
            return store.state.screenPermissions.staffPermissions
        })
      return {
        data,
        value,
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
         handleSearch,
      handleChange,
      };
    },
  };
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
