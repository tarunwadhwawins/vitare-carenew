<template>
<a-form :model="device" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="addDevice" @finishFailed="deviceFailed">
    <a-row :gutter="24">
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.devices.deviceType')" name="deviceType" :rules="[{ required: true, message: $t('patient.devices.deviceType')+' '+$t('global.validation') }]">
                    <a-select ref="select" v-model:value="device.deviceType" style="width: 100%" size="large" @change="handleInventory">
                        <a-select-option value="" disabled>{{'Select Device Type'}}</a-select-option>
                        <a-select-option v-for="device in globalCode.deviceType.globalCode" :key="device.id" :value="device.id">{{device.name}}</a-select-option>
                    </a-select>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.deviceType?errorMsg.deviceType[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.devices.inventory')" name="inventory" :rules="[{ required: true, message: $t('patient.devices.inventory')+' '+$t('global.validation') }]">
                    <!-- <a-select ref="select" v-model:value="device.inventory" style="width: 100%" size="large" @change="handleChange">
                        <a-select-option value="" disabled>{{'Select Inventory'}}</a-select-option>
                        <a-select-option v-for="device in globalCode.deviceType.globalCode" :key="device.id" :value="device.id">{{device.name}}</a-select-option>
                    </a-select> -->
                    <a-select v-show="patients.inventoryList.length!=0" v-model:value="device.inventory"  placeholder="Select a Inventory" style="width: 200px" :options="patients.inventoryList.map((item) => ({ label: item.modelNumber, value: item.id }))"  :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange"></a-select>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.deviceType?errorMsg.deviceType[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.devices.modelNo')" name="modelNumber" :rules="[{ required: false, message: $t('patient.devices.modelNo')+' '+$t('global.validation') }]">
                    <!-- <a-input v-model:value="device.modelNumber" size="large" /> -->
                    <div v-for="inventory in patients.inventoryList" :key="inventory.id">
                        <a-input size="large"    :name="device.modelNumber" :value="device.inventory==inventory.id?device.modelNumber=inventory.modelNumber:''" disabled />
                    </div>
                    
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.modelNumber?errorMsg.modelNumber[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.devices.serialNo')" name="serialNumber" :rules="[{ required: false, message: $t('patient.devices.serialNo')+' '+$t('global.validation') }]">
                    <!-- <a-input v-model:value="device.serialNumber" size="large" /> -->
                    <div v-for="inventory in patients.inventoryList" :key="inventory.id">
                        <a-input size="large"   :name="device.serialNumber" :value="device.inventory==inventory.id?device.serialNumber=inventory.serialNumber:''" disabled />
                    </div>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.serialNumber?errorMsg.serialNumber[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.devices.MACAddress')" name="macAddress" :rules="[{ required: false, message: $t('patient.devices.MACAddress')+' '+$t('global.validation') }]">
                    <!-- <a-input v-model:value="device.macAddress" size="large" /> -->
                    <div v-for="inventory in patients.inventoryList" :key="inventory.id">
                        <a-input size="large"   :name="device.macAddress" :value="device.inventory==inventory.id?device.macAddress=inventory.macAddress:''" disabled />
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
    <a-row :gutter="24" class="mb-24">
        <a-col :span="24">
            <a-table :columns="deviceColumns" :data-source="deviceData" :pagination="false" :scroll="{ x: 900 }">
                <template #active="text">
                    <a-switch @click="changeStatus(text.record.id,text.record.status)"   v-model:checked="text.record.status"   />
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
</a-form>
</template>

<script>
import {
    defineComponent,
    reactive,
    computed,
    ref
} from "vue"
import {
    DeleteOutlined,
} from "@ant-design/icons-vue"
import {
    useStore
} from "vuex"
import Loader from "../../loader/Loader"
import {
    warningSwal, errorSwal
} from "../../../commonMethods/commonMethod"
import { messages } from "../../../config/messages"
export default defineComponent({
    components: {
        DeleteOutlined,
        Loader
    },
    setup() {
        const store = useStore()
        const status = ref([])
        const device = reactive({
            inventory: '',
            deviceType: "",
            modelNumber: "",
            serialNumber: "",
            macAddress: "",
            // deviceTime: "",
            // serverTime: "",
        });
        const addDevice = () => {
            store.dispatch("addDevice", {
                data: device,
                id: patients.value.addDemographic.id,
            });
            setTimeout(() => {
                store.dispatch("devices", patients.value.addDemographic.id);
            }, 2000);
        };

        const globalCode = computed(() => {
            return store.state.common;
        })
        const deviceData = computed(() => {
            return store.state.patients.devices;
        })

        const deviceColumns = computed(() => {
            return store.state.patients.devicesColumns;
        })
        const patients = computed(() => {
            return store.state.patients;
        })

        function deleteDevice(id) {
            warningSwal(messages.deleteWarning).then((response) => {
                if (response == true) {
                    store.dispatch('deleteDevice', {
                        id: patients.value.addDemographic.id,
                        deviceId: id
                    })
                    setTimeout(() => {
                        store.dispatch("devices", patients.value.addDemographic.id);
                    }, 2000);
                }
            })
        }

        function changeStatus(id, status) {
            console.log(status)
            store.dispatch('changeStatus', {
                id: patients.value.addDemographic.id,
                statusId: id,
                status: {
                    status: status //== true ? 1 : 0
                }
            })
        }

        function handleInventory(id){
            store.dispatch('inventoryList',{isAvailable:1,deviceType:id})
        }
        // const deviceFailed = () => {
        //     errorSwal(messages.fieldsRequired)
        // };
        
        return {
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
            deviceColumns
        };
    },
});
</script>
