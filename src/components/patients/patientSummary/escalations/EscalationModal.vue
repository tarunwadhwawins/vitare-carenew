<template>
<a-modal max-width="1140px" width="90%" title="Escalation Details" centered :footer="false" :maskClosable="false" @cancel="closeModal()">
    <a-row :gutter="24">
        <a-col :span="24">
            <a-steps v-model:current="current">
                <a-step v-for="item in steps" :key="item.title" :title="item.title?item.title:''" />
            </a-steps>
            <div class="steps-content" v-if="steps[current].title == 'Escalation Info'">
                <a-form layout="vertical" ref="formRef" :model="escalationDetails" @finish="submitEscalationForm">
                    <a-row :gutter="24">
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">{{globalCode.ecalationType}}
                                <a-form-item label="Escalation Type" name="escalationType" :rules="[{ required: true, message: 'Escalation Type'+' '+$t('global.validation')  }]">
                                    <GlobalCodeDropDown @change="escalationType" mode="multiple" v-model:value="escalationDetails.escalationType" :globalCode="globalCode.escalationType" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item label="Description" name="escalationDescription" :rules="[{ required: true, message: 'Description'+' '+$t('global.validation')  }]">
                                    <a-textarea v-model:value="escalationDetails.escalationDescription" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item label="Flag" name="flagId" :rules="[{ required: true, message: $t('common.flag')+' '+$t('global.validation')  }]">
                                    <GlobalCodeDropDown v-model:value="escalationDetails.flagId" :globalCode="flagsList" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item label="Staff" name="staffIds" :rules="[{ required: true, message: 'Staff'+' '+$t('global.validation')  }]">
                                    <StaffDropDown mode="multiple" v-model:value="escalationDetails.staffIds" @handleStaffChange="handleStaffChange($event)" :close="closeValue" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item label="Summary Start" name="summaryStart" :rules="[{ required: false, message: 'Due Date'+' '+$t('global.validation')  }]">
                                    <a-date-picker :disabledDate="d => !d || d.isBefore(moment().subtract(1,'days'))" v-model:value="escalationDetails.summaryStart" :format="globalDateFormat" :value-format="globalDateFormat" :size="size" style="width: 100%" @change="checkChangeInput(); changeDate()" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item label="Summary end" name="summaryEnd" :rules="[{ required: false, message: 'Due Date'+' '+$t('global.validation')  }]">
                                    <a-date-picker :disabledDate="d => !d || d.isBefore(moment().subtract(1,'days'))" v-model:value="escalationDetails.summaryEnd" :format="globalDateFormat" :value-format="globalDateFormat" :size="size" style="width: 100%" @change="checkChangeInput(); changeDate()" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item label="Due Date" name="dueBy" :rules="[{ required: true, message: 'Due Date'+' '+$t('global.validation')  }]">
                                    <a-date-picker :disabledDate="d => !d || d.isBefore(moment().subtract(1,'days'))" v-model:value="escalationDetails.dueBy" :format="globalDateFormat" :value-format="globalDateFormat" :size="size" style="width: 100%" @change="checkChangeInput(); changeDate()" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :sm="24" :span="24">
                            <div class="steps-action">
                                <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                                <a-button v-if="current < steps.length - 1" type="primary" html-type="submit">{{$t('global.next')}}</a-button>
                            </div>
                        </a-col>

                    </a-row>
                </a-form>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Details'">
                <a-form layout="vertical" ref="formRef" :model="addVitals" @finish="submitVitalForm">
                    <a-row :gutter="24">
                        <a-collapse v-model:activeKey="activeKey" accordion style="width:100%">
                            <a-collapse-panel key="1" header="Notes" v-if="escalationDetails.escalationType.includes(259)">
                                <a-col :md="24" :sm="24" :xs="24">
                                    <div class="form-group ">
                                        <a-form-item label=" Notes" name="notesId" :rules="[{ required: true, message:'Notes'+' '+$t('global.validation') }]">
                                            <a-checkbox-group v-model:value="addNoteForm.notesId" style="width:95%">
                                                <a-table :scroll="{ y: 300 }" rowKey="id" :columns="notesColumns" :data-source="notesList" :pagination="false">
                                                    <template #select="{ record }">
                                                        <a-checkbox :value="record.id" name="notes"></a-checkbox>
                                                    </template>
                                                </a-table>
                                            </a-checkbox-group>
                                        </a-form-item>
                                    </div>
                                </a-col>
                            </a-collapse-panel>
                            <a-collapse-panel key="2" header="Vitals" v-if="escalationDetails.escalationType.includes(260)">
                                <a-col :md="24" :sm="24" :xs="24">
                                    <div class="form-group ">
                                        <a-form-item label="Vitals" name="vitalId" :rules="[{ required: true, message:'Vital'+' '+$t('global.validation') }]">
                                            <a-checkbox-group v-model:value="addVitals.vitalId" style="width:95%">
                                                <a-table :scroll="{ y: 300 }" rowKey="id" :columns="vitalColumns" :data-source="patientVitalList" :pagination="false">
                                                    <template #select="{ record }">
                                                        <a-checkbox :value="record.id" name="vital"></a-checkbox>
                                                    </template>
                                                    <template #color="{ record }">
                                                        <Flags :flag="record.color" />
                                                    </template>
                                                </a-table>
                                            </a-checkbox-group>
                                        </a-form-item>
                                    </div>
                                </a-col>
                            </a-collapse-panel>
                            <a-collapse-panel key="3" header="Care Plan" v-if="escalationDetails.escalationType.includes(262)">
                                <a-col :md="24" :sm="24" :xs="24">
                                    <div class="form-group ">
                                        <a-form-item label="Care Plan" name="carePlan" :rules="[{ required: true, message:'Care Plan'+' '+$t('global.validation') }]">
                                            <a-checkbox-group v-model:value="addVitals.carePlan" style="width:95%">
                                                <a-table :scroll="{ y: 300 }" rowKey="id" :columns="carePlanColumns" :data-source="carePlanList" :pagination="false">
                                                    <template #select="{ record }">
                                                        <a-checkbox :value="record.id" name="carePlan"></a-checkbox>
                                                    </template>
                                                </a-table>
                                            </a-checkbox-group>
                                        </a-form-item>
                                    </div>
                                </a-col>
                            </a-collapse-panel>
                            <a-collapse-panel key="4" header="Flags" v-if="escalationDetails.escalationType.includes(261)">
                                <a-col :md="24" :sm="24" :xs="24">
                                    <div class="form-group ">
                                        <a-form-item label="Flag" name="flag" :rules="[{ required: true, message:'Flag'+' '+$t('global.validation') }]">
                                            <a-checkbox-group v-model:value="addVitals.flagIds" style="width:95%">
                                                <a-table :scroll="{ y: 300 }" rowKey="id" :columns="flagColumns" :data-source="patientFlagList" :pagination="false">
                                                    <template #select="{ record }">
                                                        <a-checkbox :value="record.id" name="flag"></a-checkbox>
                                                    </template>
                                                    <template #name="{ record }">
                                                        <span>{{record.flags.data.name}}</span>
                                                    </template>
                                                    <template #color="{ record }">
                                                        <Flags :flag="record.color" />
                                                    </template>
                                                </a-table>
                                            </a-checkbox-group>
                                        </a-form-item>
                                    </div>
                                </a-col>
                            </a-collapse-panel>
                        </a-collapse>
                        <a-col :sm="24" :span="24" style="padding:15px">
                            <div class="steps-action">
                                <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                                <a-button v-if="current < steps.length - 1" type="primary" @click="next">{{$t('global.next')}}</a-button>
                                <a-button v-if="current == steps.length - 1" type="primary" html-type="submit" @click="saveModal()">
                                    {{$t('global.save')}}
                                </a-button>
                            </div>
                        </a-col>
                    </a-row>
                </a-form>

            </div>
        </a-col>
    </a-row>
</a-modal>
</template>

<script>
import {
    computed,
    reactive,
    ref
} from "vue";
import {
    useStore
} from "vuex";
import moment from "moment";
import {
    globalDateFormat
} from "@/commonMethods/commonMethod";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch";
import StaffDropDown from "@/components/modals/search/StaffDropdownSearch.vue";
import Flags from "@/components/common/flags/Flags";
import {
    useRoute
} from "vue-router";
const notesColumns = [{
        title: "Select",
        dataIndex: "select",
        key: "select",
        slots: {
            customRender: "select",
        },
        className: "note-select",
    },
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
        className: "note-date",
    },
    {
        title: "Category",
        dataIndex: "category",
        key: "category",
        className: "note-category",
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type",
        className: "note-type",
    },
    {
        title: "Note",
        dataIndex: "note",
        key: "note",
        className: "note-text",
        ellipsis: true,
    },
    {
        title: "Added By",
        dataIndex: "addedBy",
        key: "addedBy",
    },
];

const vitalColumns = [{
        title: "Select",
        dataIndex: "select",
        key: "select",
        slots: {
            customRender: "select",
        },
        className: "vital-select",
    },
    {
        title: "Vital",
        dataIndex: "vitalField",
        key: "vitalField",
        className: "vital-vitalField"
    },
    {
        title: "Device Type",
        dataIndex: "deviceType",
        key: "deviceType",
        className: "vital-deviceType"
    },
    {
        title: "Value",
        dataIndex: "value",
        key: "value",
        className: "vital-value"
    },
    {
        title: "Color",
        dataIndex: "color",
        key: "color",
        className: "vital-color",
        slots: {
            customRender: "color",
        },
    },

];

const carePlanColumns = [
        {
        title: "Select",
        dataIndex: "select",
        key: "select",
        slots: {
            customRender: "select",
        },
        },
      {
        title: "Device",
        dataIndex: "deviceType",
      },
      {
        title: "Vital type",
        dataIndex: "vitalField",
      },
      {
        title: "Start date",
        dataIndex: "startDate",
      },
      {
        title: "End date",
        dataIndex: "endDate",
      },
      {
        title: "Frequency",
        dataIndex: "frequency",
        slots: {
          customRender: "frequency",
        }
      },
      {
        title: "High Value",
        dataIndex: "highValue",
      },
      {
        title: "Low Value",
        dataIndex: "lowValue",
      },
      {
        title: "Note",
        dataIndex: "note",
      },
      
    ];
    const flagColumns = [
        {
        title: "Select",
        dataIndex: "select",
        key: "select",
        slots: {
            customRender: "select",
        },
        },
      {
        title: "Name",
        dataIndex: "name",
        slots: {
            customRender: "name",
        },
      },
      {
        title: "Color",
        dataIndex: "color",
        slots: {
            customRender: "color",
        },
      },
      
    ];
export default {
    components: {
        GlobalCodeDropDown,
        StaffDropDown,
        Flags

    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const activeKey = ref([]);
        const escalationDetails = reactive({
            escalationType: [],
            description: "",
            flagId: "",
            dueBy: "",
            staffIds: [],
            summaryStart:"",
            summaryEnd: "",
            referenceId: route.params.udid,
            entityType: "patient"
        });

        const addNoteForm = reactive({
            notesId: [],
        });
        const addVitals = reactive({
            vitalId: []
        })
        const patientDetails = computed(() => {
            return store.state.patients.patientDetails;
        });
        const globalCode = computed(() => {
            return store.state.common;
        });
        const flagsList = computed(() => {
            return store.state.flags.flagsList;
        });
        const current = computed({
            get: () => store.state.patients.escalationCounter,
            set: (value) => {
                store.state.patients.escalationCounter = value;
            },
        });
        const next = () => {
            store.commit("escalationCounterPlus");
        };
        const prev = () => {
            store.commit("escalationCounterMinus");
        };
        const handleStaffChange = (val) => {
            escalationDetails.staffIds = val;
        };
        const notesList = computed(() => {
            return store.state.notes.notesList;
        });
        const patientVitalList = computed(() => {
            return store.state.patients.patientVitalList;
        });

        const addEscalation = computed(() => {
            return store.state.patients.addBasicEscalation;
        });

        function submitEscalationForm() {
            store.dispatch("addBasicEscalation", escalationDetails)
        }

        function submitNoteForm(value) {
            store.dispatch("addEscalationNote", {
                data: addNoteForm,
                escaltionId: addEscalation.value.id
            })
            console.log('note', value);
        }

        function submitVitalForm(value) {
            store.dispatch("addEscalationVital", {
                data: addVitals,
                escaltionId: addEscalation.value.id
            })
            console.log('vital', value);
        }
        const closeModal = () => {
            // 
        }

        function escalationType(e) {
            console.log('value', e);
        }
        const carePlanList = computed(() => {
            return store.state.carePlan.carePlansList
        })
        const patientFlagList = computed(() => {
            return store.state.patients.patientFlagList;
        });
        return {
            flagColumns,
            patientFlagList,
            carePlanColumns,
            carePlanList,
            activeKey,
            escalationType,
            submitVitalForm,
            submitNoteForm,
            submitEscalationForm,
            vitalColumns,
            addVitals,
            patientVitalList,
            notesColumns,
            closeModal,
            notesList,
            handleStaffChange,
            addNoteForm,
            globalDateFormat,
            moment,
            flagsList,
            globalCode,
            escalationDetails,
            current,
            next,
            prev,
            patientDetails,
            size: ref("large"),
            steps: [{
                    title: "Escalation Info",
                    content: "First-content",
                },
                {
                    title: "Details",
                    content: "Second-content",
                },

            ],
        };
    },
};
</script>

<style lang="scss">
.dangerValue {
    padding: 5px;
    background-color: #f03131f3;
    color: #fff;
}
</style>
