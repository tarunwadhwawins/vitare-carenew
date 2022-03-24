<template>
  <a-form ref="formRef" scrollToFirstError=true :model="device" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="addDevice" @finishFailed="deviceFailed">
    <a-row :gutter="24">
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.devices.deviceType')" name="deviceType" :rules="[{ required: true, message: $t('patient.devices.deviceType')+' '+$t('global.validation') }]">
                    <!-- <a-select ref="select" v-model:value="device.deviceType" style="width: 100%" size="large" @change="handleInventory">
                        <a-select-option value="" disabled>{{'Select Device Type'}}</a-select-option>
                        <a-select-option v-for="device in globalCode.deviceType.globalCode" :key="device.id" :value="device.id">{{device.name}}</a-select-option>
                    </a-select> -->
                    <GlobalCodeDropDown @change="handleInventory" v-model:value="device.deviceType" :globalCode="globalCode.deviceType"/>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.deviceType?errorMsg.deviceType[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item  :label="$t('patient.devices.inventory')" name="inventory" :rules="[{ required: true, message: $t('patient.devices.inventory')+' '+$t('global.validation') }]">
                    <a-select :disabled="patients.inventoryList.length==0 || device.deviceType==''" ref="select" v-model:value="device.inventory" style="width: 100%" size="large" @change="handleChange(device.inventory)">
                        <a-select-option value="" disabled>{{'Select Inventory'}}</a-select-option>
                        <a-select-option v-for="device in patients.inventoryList" :key="device.id" :value="device.id">{{device.modelNumber +' ('+device.macAddress+')'}}</a-select-option>
                    </a-select>
                    <!-- <a-select v-show="patients.inventoryList.length!=0" v-model:value="device.inventory" show-search  placeholder="Select a Inventory" style="width: 200px" :options="patients.inventoryList.map((item) => ({ label: item.modelNumber, value: item.id }))"  :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="()"></a-select> -->
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.deviceType?errorMsg.deviceType[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.devices.modelNo')" name="modelNumber" :rules="[{ required: false, message: $t('patient.devices.modelNo')+' '+$t('global.validation') }]">
                    <!-- <a-input v-model:value="device.modelNumber" size="large" /> -->
                    <div >
                        <a-input size="large"   v-model:value="device.modelNumber"  disabled />
                    </div>
                    
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.modelNumber?errorMsg.modelNumber[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.devices.serialNo')" name="serialNumber" :rules="[{ required: false, message: $t('patient.devices.serialNo')+' '+$t('global.validation') }]">
                    <!-- <a-input v-model:value="device.serialNumber" size="large" /> -->
                    <div >
                        <a-input size="large"    v-model:value="device.serialNumber"  disabled />
                    </div>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.serialNumber?errorMsg.serialNumber[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.devices.MACAddress')" name="macAddress" :rules="[{ required: false, message: $t('patient.devices.MACAddress')+' '+$t('global.validation') }]">
                    <!-- <a-input v-model:value="device.macAddress" size="large" /> -->
                    <div >
                        <a-input size="large"   v-model:value="device.macAddress"  disabled />
                    </div>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.macAddress?errorMsg.macAddress[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <!-- <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.devices.deviceTime')" name="deviceTime" :rules="[{ required: true, message: $t('patient.devices.deviceTime')+' '+$t('global.validation') }]">
                    <a-input v-model:value="device.deviceTime" size="large" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.deviceTime?errorMsg.deviceTime[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.devices.ServerTime')" name="serverTime" :rules="[{ required: true, message: $t('patient.devices.ServerTime')+' '+$t('global.validation') }]">
                    <a-input v-model:value="device.serverTime" size="large" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.serverTime?errorMsg.serverTime[0]:''" />
                </a-form-item>
            </div>
        </a-col> -->
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
        <template #active="{record}">
          <a-switch v-model:checked="record.status" @change="changeStatus(record.id, $event)" />
        </template>
        <template #action="text">
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
export default defineComponent({
  components: {
    DeleteOutlined,
    Loader,
    ErrorMessage,
    GlobalCodeDropDown
  },
  props: {
    idPatient: {
      type: Number
    }
  },
  setup(props) {
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

    function handleChange(id){
      let temp = arrayToObjact(patients.value.inventoryList,id)
        device.modelNumber = temp.modelNumber,
        device.serialNumber =temp.serialNumber,
        device.macAddress = temp.macAddress
    }

    onUnmounted(()=>{
      store.commit('errorMsg',null)
    })

    return {
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
    };
  },
});
</script>
