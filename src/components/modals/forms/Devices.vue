<template>
  <a-form ref="formRef" scrollToFirstError=true :model="device" name="basic" autocomplete="off" layout="vertical" @finish="addDevice" @finishFailed="deviceFailed">
    <a-row :gutter="24">
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.devices.deviceType')" name="deviceType" :rules="[{ required: true, message: $t('patient.devices.deviceType')+' '+$t('global.validation') }]">
                    <GlobalCodeDropDown @change="handleInventory($event); onChange()" v-model:value="device.deviceType" :globalCode="globalCode.deviceType"/>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.deviceType?errorMsg.deviceType[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item  :label="$t('patient.devices.inventory')" name="inventory" :rules="[{ required: true, message: $t('patient.devices.inventory')+' '+$t('global.validation') }]">
                    <InventoryGlobalCodeDropDown :disabled="patients.inventoryList.length==0 || device.deviceType==''" v-model:value="device.inventory" :globalCode="patients.inventoryList" @change="handleChange(device.inventory); onChange()"/>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.deviceType?errorMsg.deviceType[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.devices.modelNo')" name="modelNumber" :rules="[{ required: false, message: $t('patient.devices.modelNo')+' '+$t('global.validation') }]">
                    <div >
                        <a-input size="large" @change="onChange()"  v-model:value="device.modelNumber"  disabled />
                    </div>
                    
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.modelNumber?errorMsg.modelNumber[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.devices.MACAddress')" name="macAddress" :rules="[{ required: false, message: $t('patient.devices.MACAddress')+' '+$t('global.validation') }]">
                    <div >
                        <a-input size="large" @change="onChange()" v-model:value="device.macAddress"  disabled />
                    </div>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.macAddress?errorMsg.macAddress[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.devices.serialNo')" name="serialNumber" :rules="[{ required: false, message: $t('patient.devices.serialNo')+' '+$t('global.validation') }]">
                    <div >
                        <a-input size="large" @change="onChange()" v-model:value="device.serialNumber"  disabled />
                    </div>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.serialNumber?errorMsg.serialNumber[0]:''" />
                </a-form-item>
            </div>
        </a-col>
    
    </a-row>
    <a-row :gutter="24" class="mb-24">
      <a-col :span="24">
        <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
      </a-col>
    </a-row>
  </a-form>
  <a-row :gutter="24" class="mb-24">
    <a-col :span="24">
      <a-table  rowKey="id" :columns="deviceColumns" :data-source="deviceData" :pagination="false" :scroll="{ x: 900 }">
        <template #active="{record}" >
          <a-switch v-model:checked="record.status" @change="changeStatus(record.id, $event)" :disabled="!arrayToObjact(screensPermissions,102)"/>
        </template>
        <template #action="text" v-if="arrayToObjact(screensPermissions,73)">
          <a class="icons" @click="deleteDevice(text.record.id)">
            <DeleteOutlined />
          </a>
        </template>
      </a-table>
      <Loader />
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent, reactive, computed, ref, watchEffect,onUnmounted } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import Loader from "../../loader/Loader";
import { warningSwal, arrayToObjact} from "../../../commonMethods/commonMethod";
import { messages } from "../../../config/messages";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
import InventoryGlobalCodeDropDown from "@/components/modals/search/InventoryGlobalCodeSearch.vue"
export default defineComponent({
  components: {
    DeleteOutlined,
    Loader,
    ErrorMessage,
    GlobalCodeDropDown,
    InventoryGlobalCodeDropDown
  },
  props: {
    idPatient: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const patientId = reactive(props.idPatient);
    const status = ref([]);
    const device = reactive({
      inventory: "",
      deviceType: "",
      modelNumber: "",
      serialNumber: "",
      macAddress: "",
      // deviceTime: "",
      // serverTime: "",
    });
    const form = reactive({ ...device })
    const formRef = ref();

    watchEffect(() => {
      if(patientId != null) {
        store.dispatch("devices", patientId);
      }
    })

    const addDevice = () => {
      if(patientId != null) {
        store.dispatch("addDevice", {
          data: device,
          id: patientId,
        }).then(() => {
          formRef.value.resetFields();
          Object.assign(device, form)
          store.dispatch("devices", patientId);
        });
      }
      else {
        store.dispatch("addDevice", {
          data: device,
          id: patients.value.addDemographic.id,
        });
        formRef.value.resetFields();
        Object.assign(device, form)
        setTimeout(() => {
          store.dispatch("devices", patients.value.addDemographic.id);
        }, 2000);
      }
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
          if(patientId != null) {
            store.dispatch("deleteDevice", {
              id: patientId,
              deviceId: id,
            }).then(() => {
              store.dispatch("devices", patientId);
            });
          }
          else {
            store.dispatch("deleteDevice", {
              id: patients.value.addDemographic.id,
              deviceId: id,
            }).then(() => {
              store.dispatch("devices", patients.value.addDemographic.id);
            });
          }
        }
      });
    }

    const changeStatus = (id, status) => {
      
      store.dispatch("changeStatus", {
        id: patientId,
        inventoryId: id,
        status: status
      });
    }

    function handleInventory(id) {
      store.dispatch("inventoryList", { isAvailable: 1, deviceType: id });
      device.inventory = null;
      device.modelNumber = null,
      device.serialNumber =null,
      device.macAddress = null
    }
    // const deviceFailed = () => {
    //     errorSwal(messages.fieldsRequired)
    // };

    function handleChange(id) {
      let temp = arrayToObjact(patients.value.inventoryList,id)
      device.modelNumber = temp.modelNumber,
      device.serialNumber =temp.serialNumber,
      device.macAddress = temp.macAddress
    }

    onUnmounted(()=>{
      store.commit('errorMsg',null)
    })

    const onChange = () => {
      emit('onChange')
    }

    return {
      screensPermissions: store.getters.screensPermissions,
      arrayToObjact,
      handleChange,
      // deviceFailed,
      handleInventory,
      changeStatus,
      status,
      warningSwal,
      deleteDevice,
      patients,
      device,
      addDevice,
      globalCode,
      deviceData,
      deviceColumns,
      errorMsg:patients.value.errorMsg,
      formRef,
      onChange,
    };
  },
});
</script>
