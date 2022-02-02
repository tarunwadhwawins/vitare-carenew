<template>
<a-form :model="clinicals" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="clinicalHistory" @finishFailed="onFinishFailed">
    <div class="form-group">
        <a-form-item :label="$t('patient.clinicalData.medicalHistory')" name="history" :rules="[{ required: true, message: $t('patient.clinicalData.medicalHistory')+' '+$t('global.validation') }]">
            <a-input v-model:value="clinicals.history" size="large" />
            <ErrorMessage v-if="errorMsg" :name="errorMsg.history?errorMsg.history[0]:''" />
        </a-form-item>
    </div>
    <a-row :gutter="24" class="mb-24">
        <a-col :span="24">
            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
        </a-col>
    </a-row>
</a-form>
<a-row :gutter="24" class="mb-24">
    <a-col :span="24">
        <a-table :columns="clinicalHistoryColumns" :data-source="clinicalsData" :scroll="{ x: 900 }">
            <template #action="text">
                <a-tooltip placement="bottom">
                    <template #title>
                        <span>{{$t('global.delete')}}</span>
                    </template>
                    <a class="icons" @click="deleteClinicalData(text.record.id,'deleteClinicalData')">
                        <DeleteOutlined />
                    </a>
                </a-tooltip>
            </template>
        </a-table>
        <Loader />
    </a-col>
</a-row>

<a-form :model="clinicalMedication" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="clinicalMedicat" @finishFailed="onFinishFailed">
    <a-row :gutter="24">
        <a-col :span="24">
            <div class="formHeading">
                <h2>{{$t('patient.clinicalData.medication')}}</h2>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.clinicalData.medicine')" name="medicine" :rules="[{ required: true, message: $t('patient.clinicalData.medicine')+' '+$t('global.validation') }]">
                    <a-input v-model:value="clinicalMedication.medicine" size="large" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.medicine?errorMsg.medicine[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">

            <div class="form-group">
                <a-form-item :label="$t('patient.clinicalData.frequency')" name="frequency" :rules="[{ required: true, message: $t('patient.clinicalData.frequency')+' '+$t('global.validation') }]">
                    <a-input v-model:value="clinicalMedication.frequency" size="large" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.frequency?errorMsg.frequency[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.startDate')" name="startDate" :rules="[{ required: true, message: $t('global.startDate')+' '+$t('global.validation') }]">
                    <a-date-picker v-model:value="clinicalMedication.startDate" format="MMM DD, YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.startDate?errorMsg.startDate[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('global.endDate')" name="endDate" :rules="[{ required: true, message: $t('global.endDate')+' '+$t('global.validation') }]">
                    <a-date-picker v-model:value="clinicalMedication.endDate" format="MMM DD, YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.endDate?errorMsg.endDate[0]:''" />
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
        <a-table :columns="clinicalMedicatColumns" :data-source="clinicalMedicatData" :scroll="{ x: 900 }">
            <template #action="text">
                <a-tooltip placement="bottom">
                    <template #title>
                        <span>{{$t('global.delete')}}</span>
                    </template>
                    <a class="icons" @click="deleteClinicalData(text.record.id, null)">
                        <DeleteOutlined />
                    </a>
                </a-tooltip>
            </template>
        </a-table>
        <Loader />
    </a-col>
</a-row>
</template>

<script>
import {
    defineComponent,
    reactive,
    computed
} from "vue";
import {
    DeleteOutlined
} from "@ant-design/icons-vue";
import {
    useStore
} from "vuex"
import Loader from "../../loader/Loader.vue"
import {
    deleteSwal
} from "../../../commonMethods/commonMethod"
export default defineComponent({
    components: {
        DeleteOutlined,
        Loader
    },
    setup() {
        const store = useStore()
        const clinicals = reactive({
            history: "",
        });

        const clinicalMedication = reactive({
            medicine: "",
            frequency: "",
            startDate: "",
            endDate: "",
        });

        const globalCode = computed(() => {
            return store.state.common;
        })

        const clinicalHistory = () => {
            store.dispatch("addClinicalHistory", {
                data: clinicals,
                id: patients.value.addDemographic.id,
            });

            setTimeout(() => {
                store.dispatch("clinicalHistoryList", patients.value.addDemographic.id);
            }, 2000);
        };

        const clinicalMedicat = () => {
            store.dispatch("addClinicalMedicat", {
                data: clinicalMedication,
                id: patients.value.addDemographic.id,
            });
            setTimeout(() => {
                store.dispatch("clinicalMedicatList", patients.value.addDemographic.id);
            }, 2000);
        };
        const patients = computed(() => {
            return store.state.patients;
        })

        const clinicalHistoryColumns = computed(() => {
            return store.state.patients.clinicalHistoryListColumns;
        });

        const clinicalsData = computed(() => {
            return store.state.patients.clinicalHistoryList;
        });

        const clinicalMedicatData = computed(() => {
            return store.state.patients.clinicalMedicatList;
        });

        const clinicalMedicatColumns = computed(() => {
            return store.state.patients.clinicalMedicatListColumns;
        })

        function deleteClinicalData(id, name) {
            deleteSwal().then((response) => {
                if (response == true) {
                    if (name == 'deleteClinicalData') {
                        store.dispatch('deleteClinicalData', {
                            id: patients.value.addDemographic.id,
                            clinicalId: id
                        })
                        setTimeout(() => {
                            store.dispatch("clinicalHistoryList", patients.value.addDemographic.id);
                        }, 3000);
                    } else {
                      store.dispatch('deleteClinicalMedicat', {
                            id: patients.value.addDemographic.id,
                            clinicalId: id
                        })
                        setTimeout(() => {
                            store.dispatch("clinicalMedicatList", patients.value.addDemographic.id);
                        }, 3000);
                    }
                }
            })
        }
        return {
            deleteClinicalData,
            clinicalHistory,
            clinicalMedicat,
            clinicals,
            clinicalMedication,
            globalCode,
            patients,
            clinicalHistoryColumns,
            clinicalsData,
            clinicalMedicatData,
            clinicalMedicatColumns
        };
    },
});
</script>
