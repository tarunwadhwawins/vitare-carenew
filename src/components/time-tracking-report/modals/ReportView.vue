<template>
<a-modal max-width="1140px" width="70%" :title="`${devicesList?.entity.charAt(0).toUpperCase() + devicesList?.entity.slice(1)}`+' '+`Details`" centered :footer="false" :maskClosable="false" @cancel="closeModal()">
    <a-row :gutter="24" class="row" v-if="devicesList?.entity == 'device'">
        <a-col :sm="24" :xs="24">
            <a-table rowKey="id" :columns="devicesColumns" :data-source="devicesList?.device" :pagination="false" @change="onChange">
            </a-table>
            <TableLoader />
        </a-col>
    </a-row>
    <a-row :gutter="24" v-else>
        <a-col :sm="24" :xs="24" class="mb-24" v-if="patients.bloodPressure?.length>0">
            <a-card title="Blood Pressure">
                <VitalsTable :columns="patients.bloodPressureColumns" :data="patients.bloodPressure" />
            </a-card>
        </a-col>
        <a-col :sm="24" :xs="24" class="mb-24" v-if="patients.bloodOxygen?.length>0">
            <a-card title="Blood Oxygen Saturation">
                <VitalsTable :columns="patients.bloodOxygenColumns" :data="patients.bloodOxygen" />
            </a-card>
        </a-col>
        <a-col :sm="24" :xs="24" class="mb-24" v-if="patients.bloodGlucose?.length>0">
            <a-card title="Blood Glucose">
                <VitalsTable :columns="patients.bloodGlucoseColumns" :data="patients.bloodGlucose" />
            </a-card>
        </a-col>

        <TableLoader />
    </a-row>
</a-modal>
</template>

<script>
import {
    computed,
    defineComponent,
    watchEffect
} from "vue";
import TableLoader from "@/components/loader/TableLoader";
import // DeleteOutlined
"@ant-design/icons-vue";
import {
    useStore
} from "vuex";
import {
    warningSwal,
    actionTrack,
    arrayToObjact,
} from "@/commonMethods/commonMethod";
import {
    messages
} from "@/config/messages";
import {
    useRoute
} from "vue-router";
import VitalsTable from "@/components/patients/patientSummary/common/VitalsTable";
// import Loader from "@/components/loader/Loader";
export default defineComponent({
    components: {
        // DeleteOutlined,
        TableLoader,
        VitalsTable,
    },

    setup(props, {
        emit
    }) {
        const store = useStore();
        const route = useRoute();
        watchEffect(() => {});
        const devicesList = computed(() => {
            return store.state.reports.reportDetailList;
        });
        const devicesColumns = [{
                title: "Home Unit Type",
                dataIndex: "deviceType",
                sorter: true,
            },
            {
                title: "Model No",
                dataIndex: "modelNumber",
                sorter: true,
            },
            {
                title: "Serial No",
                dataIndex: "serialNumber",
                sorter: true,
            },
            {
                title: "MAC Address",
                dataIndex: "macAddress",
            },
            //   {
            //     title: "Action",
            //     dataIndex: "action",
            //     slots: {
            //       customRender: "action",
            //     },
            //   },
        ];

        const deleteDevice = (id) => {
            warningSwal(messages.deleteWarning).then((response) => {
                if (response == true) {
                    store
                        .dispatch("deleteDevice", {
                            id: id,
                            deviceId: id,
                        })
                        .then(() => {
                            if (devicesList.value.length <= 1) {
                                emit("closeModal", {
                                    modal: "devicesListing",
                                    value: false,
                                });
                            }
                            store.dispatch("devices", route.params.udid);
                            if (route.name == "PatientSummary") {
                                store.dispatch("latestDevice", route.params.udid);
                                store.dispatch("patientTimeline", {
                                    id: route.params.udid,
                                    type: "",
                                });
                            }
                        });
                }
            });
        };

        const patients = computed(() => {
            return store.state.patients
        })

       function closeModal(){
        store.state.patients.bloodPressure =null
        store.state.patients.bloodOxygen =null
        store.state.patients.bloodGlucose = null
       }

        return {
            closeModal,
            patients,
            arrayToObjact,
            screensPermissions: store.getters.screensPermissions,
            actionTrack,
            paramsId: route.params.udid,
            devicesColumns,
            devicesList,
            deleteDevice,
        };
    },
});
</script>

<style>
</style>
