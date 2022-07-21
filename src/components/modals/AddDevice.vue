<template>
  <a-modal width="60%" title="Add Device" centered @cancel="onCloseModal()" :maskClosable="false"  :footer="false">
    <a-form ref="formRef" :model="inventoryForm" name="basic" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :md="12" :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('patient.devices.deviceType')" name="deviceType" :rules="[{ required: true, message: $t('patient.devices.deviceType')+' '+$t('global.validation') }]">
              <GlobalCodeDropDown v-model:value="inventoryForm.deviceType" :dataId="22" @handleGlobalChange="handleGlobalChange($event,'inventoryForm.deviceType'); handleInventory($event)"/>
              <ErrorMessage v-if="errorMsg && errorMsg.message" :name="errorMsg.message ? errorMsg.message : ''" />
              <ErrorMessage v-if="errorMsg && errorMsg.deviceType" :name="errorMsg.deviceType?errorMsg.deviceType[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item  :label="$t('patient.devices.inventory')" name="inventory" :rules="[{ required: true, message: $t('patient.devices.inventory')+' '+$t('global.validation') }]">
              <InventoryDropDownSearch :disabled="dropdownListing == null || dropdownListing?.length<=0" v-model:value="inventoryForm.inventory" :deviceTypeId="deviceTypeId" :options="dropdownListing" @handleInventoryChange="handleChange($event)"/>
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
    <Loader />
  </a-modal>
</template>

<script>
import { defineComponent, reactive, computed, ref, onUnmounted, watchEffect } from "vue";
import { useStore } from "vuex";
import { warningSwal} from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import ModalButtons from "@/components/common/button/ModalButtons";
import { useRoute } from "vue-router";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
import InventoryDropDownSearch from "@/components/modals/search/InventoryDropDownSearch"
import Loader from "@/components/loader/Loader";
import Services from "@/services/serviceMethod";

export default defineComponent({
  components: {
    ErrorMessage,
    ModalButtons,
    GlobalCodeDropDown,
    Loader,
    InventoryDropDownSearch
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
      macAddress: "",
    });

    const form = reactive({ ...inventoryForm })

    const changedValue = () => {
      isValueChanged.value = true;
    }

    const formRef = ref();

    const submitForm = () => {
      const inventoryFormData = {
        data: {
          inventory: inventoryForm.inventory,
          deviceType: inventoryForm.deviceType,
          modelNumber: inventoryForm.modelNumber,
          macAddress: inventoryForm.macAddress,
        },
        id: route.params.udid,
      }
      
      store.dispatch("addDevice", inventoryFormData).then(() => {
        if(route.name == 'PatientSummary') {
          if(errorMsg.value == null || errorMsg.value.length == 0) {
            formRef.value.resetFields();
            Object.assign(inventoryForm, form)
            store.dispatch('latestDevice', route.params.udid)
            store.dispatch('patientTimeline', {id:route.params.udid,type:''});
            store.dispatch('devices', route.params.udid)
            isValueChanged.value = false;
            emit("closeModal", {
              modal: 'addInventory',
              value: false
            });
          }
        }
      });
    };

    const globalCode = computed(() => {
      return store.state.common;
    });

    const dropdownListing = computed(() => {
      return store.state.common.dropdownListing;
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

    watchEffect(() => {
      store.commit('dropdownListing', null)
    })

    const deviceTypeId = ref(null)
    function handleInventory(id) {
      store.commit('dropdownListing', null)
      store.commit('loadingStatus', true)
      if(id) {
        deviceTypeId.value = id
        Services.singleDropdownSearch(
          "",
          (d) => (store.commit('dropdownListing', d)),
          "inventory",
          id,
          '1',
          'macAddress',
          'ASC',
        );
        inventoryForm.inventory = null;
        inventoryForm.modelNumber = null,
        inventoryForm.macAddress = null
        store.commit('errorMsg', null)
        isValueChanged.value = true;
      }
      store.commit('loadingStatus', false)
    }

    function handleChange(id){
      inventoryForm.inventory = id;
      // console.log('element id', id)
      isValueChanged.value = true;
      dropdownListing.value.forEach(element => {
        // console.log('element element', element)
        if(element.value == id) {
          inventoryForm.modelNumber = element.modelNumber,
          inventoryForm.macAddress = element.macAddress
        }
      });
    }
    const handleCancel = () => {
      formRef.value.resetFields();
      Object.assign(inventoryForm, form)
    };
    const errorMsg = computed(() => {
      return store.state.patients.errorMsg
    })

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
            store.commit('errorMsg', null)
					}
					else {
						emit("closeModal", {
							modal: 'addInventory',
							value: true
						});
					}
				})
			}else{
        isValueChanged.value = false;
        formRef.value.resetFields();
      }
      store.commit('errorMsg', null)
    }

    onUnmounted(() => {
      store.commit('errorMsg', null)
    })
    
    const handleInventoryChange = (val) => {
      inventoryForm.inventory = val;
    };

    const handleGlobalChange = (data) =>{
      inventoryForm.deviceType = data
    }

    return {
      handleGlobalChange,
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
      dropdownListing,
      deviceTypeId,
      handleInventoryChange,
    };
  },
});
</script>
