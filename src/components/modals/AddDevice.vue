<template>
  <a-modal width="60%" title="Add Device" centered>
    <a-form ref="formRef" :model="inventoryForm" name="basic" layout="vertical" @finish="submitForm" @cancel="onCloseModal()">
      <a-row :gutter="24">
        <a-col :md="12" :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('patient.devices.deviceType')" name="deviceType" :rules="[{ required: true, message: $t('patient.devices.deviceType')+' '+$t('global.validation') }]">
              <GlobalCodeDropDown @change="handleInventory" v-model:value="inventoryForm.deviceType" :globalCode="globalCode.deviceType"/>
              <ErrorMessage v-if="errorMsg && errorMsg.message" :name="errorMsg.message ? errorMsg.message : ''" />
              <ErrorMessage v-if="errorMsg && errorMsg.deviceType" :name="errorMsg.deviceType?errorMsg.deviceType[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item  :label="$t('patient.devices.inventory')" name="inventory" :rules="[{ required: true, message: $t('patient.devices.inventory')+' '+$t('global.validation') }]">
              <InventoryGlobalCodeDropDown :disabled="patients.inventoryList.length==0 || inventoryForm.deviceType==''" v-model:value="inventoryForm.inventory" :globalCode="patients.inventoryList" @change="handleChange(inventoryForm.inventory)"/>
                <ErrorMessage v-if="errorMsg" :name="errorMsg.inventory?errorMsg.inventory[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('patient.devices.modelNo')" name="modelNumber" :rules="[{ required: false, message: $t('patient.devices.modelNo')+' '+$t('global.validation') }]">
              <div >
                <a-input @change="changedValue" size="large"   v-model:value="inventoryForm.modelNumber"  disabled />
              </div>
              <ErrorMessage v-if="errorMsg" :name="errorMsg.modelNumber?errorMsg.modelNumber[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('patient.devices.serialNo')" name="serialNumber" :rules="[{ required: false, message: $t('patient.devices.serialNo')+' '+$t('global.validation') }]">
              <div >
                <a-input @change="changedValue" size="large"    v-model:value="inventoryForm.serialNumber"  disabled />
              </div>
              <ErrorMessage v-if="errorMsg" :name="errorMsg.serialNumber?errorMsg.serialNumber[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('patient.devices.MACAddress')" name="macAddress" :rules="[{ required: false, message: $t('patient.devices.MACAddress')+' '+$t('global.validation') }]">
              <div >
                <a-input @change="changedValue" size="large"   v-model:value="inventoryForm.macAddress"  disabled />
              </div>
              <ErrorMessage v-if="errorMsg" :name="errorMsg.macAddress?errorMsg.macAddress[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="24" :span="24">
          <ModalButtons @is_click="handleCancel"/>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { defineComponent, reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { warningSwal} from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import ModalButtons from "@/components/common/button/ModalButtons";
import { useRoute } from "vue-router";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
import InventoryGlobalCodeDropDown from "@/components/modals/search/InventoryGlobalCodeSearch.vue"
export default defineComponent({
  components: {
    ErrorMessage,
    ModalButtons,
    GlobalCodeDropDown,
    InventoryGlobalCodeDropDown
  },
  props: {
    patientDetails: {
      type: Object
    }
  },
  setup(props, {emit}) {
    const store = useStore();
    const route = useRoute();
    const status = ref([]);
    const isValueChanged = ref(false);
    // const patientDetail = reactive(props.patientDetails);
    const inventoryForm = reactive({
      inventory: "",
      deviceType: "",
      modelNumber: "",
      serialNumber: "",
      macAddress: "",
    });

    const form = reactive({ ...inventoryForm })

    const changedValue = () => {
      isValueChanged.value = true;
    }

    function onCloseModal() {
			if(isValueChanged.value) {
				warningSwal(messages.modalWarning).then((response) => {
					if (response == true) {
						emit("closeModal", {
							modal: 'addInventory',
							value: false
						});
						Object.assign(inventoryForm, form);
						isValueChanged.value = false;
					}
					else {
						emit("closeModal", {
							modal: 'addInventory',
							value: true
						});
					}
				})
			}
    }

    const formRef = ref();

    const submitForm = () => {
      const inventoryFormData = {
        data: {
          inventory: inventoryForm.inventory,
          deviceType: inventoryForm.deviceType,
          modelNumber: inventoryForm.modelNumber,
          serialNumber: inventoryForm.serialNumber,
          macAddress: inventoryForm.macAddress,
        },
        id: route.params.udid,
      }
      
      store.dispatch("addDevice", inventoryFormData).then(() => {
        if(route.name == 'PatientSummary') {
          formRef.value.resetFields();
          Object.assign(inventoryForm, form)
          store.dispatch('latestDevice', route.params.udid)
          store.dispatch('patientTimeline', {id:route.params.udid,type:''});
          store.dispatch('devices', route.params.udid)
        }
        emit('closeModal');
      });
    };

    const globalCode = computed(() => {
      return store.state.common;
    });
    const deviceData = computed(() => {
      return store.state.patients.devices;
    });

    const deviceColumns = computed(() => {
      return store.state.patients.devicesColumns;
    });
    const patients = computed(() => {
      return store.state.patients;
    });

    function deleteDevice(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteDevice", {
            id: patients.value.addDemographic.id,
            deviceId: id,
          });
          setTimeout(() => {
            store.dispatch("devices", patients.value.addDemographic.id);
          }, 2000);
        }
      });
    }

    function changeStatus(id, status) {
      store.dispatch("changeStatus", {
        id: patients.value.addDemographic.id,
        statusId: id,
        status: {
          status: status,
        },
      });
    }

    function handleInventory(id) {
      store.dispatch("inventoryList", { isAvailable: 1, deviceType: id, active: 1 });
      inventoryForm.inventory = null;
      inventoryForm.modelNumber = null,
      inventoryForm.serialNumber =null,
      inventoryForm.macAddress = null
      store.commit('errorMsg', null)
    }

    function handleChange(id){
      patients.value.inventoryList.forEach(element => {
        if(element.id==id)
        inventoryForm.modelNumber = element.modelNumber,
        inventoryForm.serialNumber =element.serialNumber,
        inventoryForm.macAddress = element.macAddress
      });
    }
    const handleCancel = () => {
      formRef.value.resetFields();
      Object.assign(inventoryForm, form)
    };
    const errorMsg = computed(() => {
      return store.state.patients.errorMsg
    })

    return {
      formRef,
      handleCancel,
      handleChange,
      handleInventory,
      changeStatus,
      status,
      warningSwal,
      deleteDevice,
      patients,
      inventoryForm,
      submitForm,
      globalCode,
      deviceData,
      deviceColumns,
      errorMsg,
      isValueChanged,
      changedValue,
      onCloseModal,
    };
  },
});
</script>
