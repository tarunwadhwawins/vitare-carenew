
<template>
<a-modal max-width="1140px" width="90%" title="Escalation Details" centered :footer="false" :maskClosable="false" @cancel="closeModal()">
    <a-row :gutter="24">
        <a-col :span="24">
            <a-steps v-model:current="current">
                <a-step v-for="item in steps" :key="item.title" :title="item.title?item.title:''" />
            </a-steps>
            <div class="steps-content" v-if="steps[current].title == 'Escalation Info'">
                <a-form layout="vertical" ref="formRef" :model="escalation" @finish="submitEscalationForm">
                    <a-row :gutter="24">
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">{{globalCode.ecalationType}}
                                <a-form-item label="Escalation Type" name="escalationType" :rules="[{ required: true, message: 'Escalation Type'+' '+$t('global.validation')  }]">
                                    <GlobalCodeDropDown @change="checkChangeInput()" mode="multiple" v-model:value="escalation.escalationType" :globalCode="globalCode.escalationType" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item label="Flag" name="flagId" :rules="[{ required: true, message: $t('common.flag')+' '+$t('global.validation')  }]">
                                    <GlobalCodeDropDown @change="checkChangeInput()" v-model:value="escalation.flagId" :globalCode="flagsList" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item label="Assign To" name="staffIds" :rules="[{ required: true, message: 'Staff'+' '+$t('global.validation')  }]">
                                    <StaffDropDown @change="checkChangeInput()" mode="multiple" v-model:value="escalation.staffIds" @handleStaffChange="handleStaffChange($event)" :close="closeValue" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item label="Due Date" name="dueBy" :rules="[{ required: true, message: 'Due Date'+' '+$t('global.validation')  }]">
                                    <a-date-picker  :disabledDate="d => !d || d.isBefore(moment().subtract(1,'days'))" v-model:value="escalation.dueBy" :format="globalDateFormat" :value-format="globalDateFormat" :size="size" style="width: 100%" @change="checkChangeInput();" />
                                </a-form-item>
                            </div>
                        </a-col>
                         <a-col :sm="24" :xs="24">
                            <div class="form-group">
                                <a-form-item label="Description" name="escalationDescription" :rules="[{ required: true, message: 'Description'+' '+$t('global.validation')  }]">
                                    <a-textarea @change="checkChangeInput()" v-model:value="escalation.escalationDescription" />
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
                <a-form layout="vertical" ref="formRef" :model="escalationDetails" @finish="submitDetailsForm">
                    <a-row :gutter="24">
                        <a-col :xl="24" :xs="24" style="padding:20px;">
                            <div class="pageTittle">
                                <div class="filter">
                                    <a-button @click="showButton(1) " :class="button == 1 ? 'active' : ''">Day</a-button>
                                    <a-button @click="showButton(2) " :class="button == 2 ? 'active' : ''">Week</a-button>
                                    <a-button @click="showButton(3) " :class="button == 3 ? 'active' : ''">Month</a-button>
                                    <a-button @click="showButton(4) " :class="button == 4 ? 'active' : ''">Custom</a-button>
                                </div>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24" v-if="button ==4">
                            <div class="form-group">
                                <a-form-item label="Summary Start" name="summaryStart" :rules="[{ required: false, message: 'Due Date'+' '+$t('global.validation')  }]">
                                    <a-date-picker :disabledDate="d => !d || d.isAfter(moment().subtract(0,'days'))" v-model:value="escalationDetails.summaryStart" :format="globalDateFormat" :value-format="globalDateFormat" :size="size" style="width: 100%" @change="checkChangeInput(); changeDate()" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24" v-if="button ==4">
                            <div class="form-group">
                                <a-form-item label="Summary end" name="summaryEnd" :rules="[{ required: false, message: 'Due Date'+' '+$t('global.validation')  }]">
                                    <a-date-picker :disabledDate="d => !d || d.isAfter(moment().subtract(0,'days'))" v-model:value="escalationDetails.summaryEnd" :format="globalDateFormat" :value-format="globalDateFormat" :size="size" style="width: 100%" @change="checkChangeInput(); changeDate()" />
                                </a-form-item>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-collapse v-model:activeKey="activeKey" accordion style="width:100%">
                            <a-collapse-panel key="1" header="Notes" v-if="escalation.escalationType.includes(259)">
                                <a-col :md="24" :sm="24" :xs="24">
                                    <div class="form-group ">
                                        <a-form-item name="notesId" :rules="[{ required: false, message:'Notes'+' '+$t('global.validation') }]">
                                            <!-- <a-checkbox-group v-model:value="escalationDetails.notesId" style="width:100%"> -->
                                                <a-table  rowKey="id" :row-selection="noteSelection" :columns="notesColumns" :data-source="notesList" :pagination="false">
                                                    <template #select="{ record }">
                                                        <a-checkbox @change="checkChangeInput()" :value="record.id" name="notes"></a-checkbox>
                                                    </template>
                                                </a-table>
                                            <!-- </a-checkbox-group> -->
                                        </a-form-item>
                                    </div>
                                </a-col>
                            </a-collapse-panel>
                            <a-collapse-panel key="2" header="Vitals" v-if="escalation.escalationType.includes(260)">
                                <a-col :md="24" :sm="24" :xs="24">
                                    <div class="form-group ">
                                        <a-form-item name="vitalId" :rules="[{ required: false, message:'Vital'+' '+$t('global.validation') }]">
                                            <a-checkbox-group v-model:value="escalationDetails.vitalId" style="width:100%">
                                                <a-table  rowKey="id" :columns="vitalColumns" :data-source="patientVitalList" :pagination="false">
                                                    <template #select="{ record }">
                                                        <a-checkbox @change="checkChangeInput()" :value="record.id" name="vital"></a-checkbox>
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
                            <a-collapse-panel key="3" header="Care Plan" v-if="escalation.escalationType.includes(262)">
                                <a-col :md="24" :sm="24" :xs="24">
                                    <div class="form-group ">
                                        <a-form-item name="carePlan" :rules="[{ required: false, message:'Care Plan'+' '+$t('global.validation') }]">
                                            <a-checkbox-group v-model:value="escalationDetails.carePlan" style="width:100%">
                                                <a-table  rowKey="id" :columns="carePlanColumns" :data-source="carePlanList" :pagination="false">
                                                    <template #select="{ record }">
                                                        <a-checkbox @change="checkChangeInput()" :value="record.id" name="carePlan"></a-checkbox>
                                                    </template>
                                                </a-table>
                                            </a-checkbox-group>
                                        </a-form-item>
                                    </div>
                                </a-col>
                            </a-collapse-panel>
                            <a-collapse-panel key="4" header="Flags" v-if="escalation.escalationType.includes(261)">
                                <a-col :md="24" :sm="24" :xs="24">
                                    <div class="form-group ">
                                        <a-form-item name="flagIds" :rules="[{ required: false, message:'Flag'+' '+$t('global.validation') }]">
                                            <a-checkbox-group v-model:value="escalationDetails.flagIds" style="width:100%">
                                                <a-table  rowKey="id" :columns="flagColumns" :data-source="patientFlagList" :pagination="false">
                                                    <template #select="{ record }">
                                                        <a-checkbox @change="checkChangeInput()" :value="record.id" name="flag"></a-checkbox>
                                                    </template>
                                                    <template #name="{ record }">
                                                        <span>{{record.flagName}}</span>
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
                                <a-button v-if="current == steps.length - 1" type="primary" html-type="submit" >
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
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import {
  globalDateFormat,
  timeStamp,
  endTimeAdd,
  warningSwal,
  errorSwal,
  successSwal
} from "@/commonMethods/commonMethod";
import {
    messages
} from "@/config/messages";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch";
import StaffDropDown from "@/components/modals/search/StaffDropdownSearch.vue";
import Flags from "@/components/common/flags/Flags";
import { useRoute } from "vue-router";
const notesColumns = [
  {
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

const vitalColumns = [
  {
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
    className: "vital-vitalField",
  },
  {
    title: "Device Type",
    dataIndex: "deviceType",
    key: "deviceType",
    className: "vital-deviceType",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
    className: "vital-value",
  },
  {
    title: "Date",
    dataIndex: "startDate",
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
    },
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
    title: "Date",
    dataIndex: "startDate",
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
    Flags,
  },
  setup(props,{emit}) {
    const store = useStore();
    const route = useRoute();
    const activeKey = ref([]);
    const button = ref(2);
    const status = ref(false)
    const escalation = reactive({
      escalationType: [],
      escalationDescription: "",
      flagId: "",
      dueBy: "",
      staffIds: [],
      referenceId: route.params.udid,
      entityType: "patient",
    });

    const escalationDetails = reactive({
      notesId: [],
      vitalId: [],
      carePlan: [],
      flagIds: [],
      summaryStart: "",
      summaryEnd: "",
    });

    const patientDetails = computed(() => {
      return store.state.patients.patientDetails;
    });
    const globalCode = computed(() => {
      return store.state.common;
    });
    const flagsList = computed(() => {
      return store.state.flags.flagsList;
    });
    // const current = computed({
    //   get: () => store.state.patients.escalationCounter,
    //   set: (value) => {
    //     store.state.patients.escalationCounter = value;
    //   },
    // });
    const current = computed({
            get: () =>
                store.state.patients.escalationCounter,
            set: (value) => {
                if (addEscalation.value) {
                    store.state.patients.escalationCounter = value;
                } else {
                    if (Object.values(escalation).filter(item => item != '').length >= 7) {
                        submitEscalationForm();
                    } else {
                        errorSwal('All fields(*) are required!')
                        store.state.patients.escalationCounter  = 0;
                    }
                }

            },
        })
    const next = () => {
      store.commit("escalationCounterPlus");
    };
    const prev = () => {
      store.commit("escalationCounterMinus");
    };
    const handleStaffChange = (val) => {
      escalation.staffIds = val;
      console.log(val);
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
      store.dispatch("addBasicEscalation", {
      escalationType: escalation.escalationType,
      escalationDescription: escalation.escalationDescription,
      flagId: escalation.flagId,
      dueBy: timeStamp(endTimeAdd(moment(escalation.dueBy))),
      staffIds: escalation.staffIds,
      referenceId: route.params.udid,
      entityType: "patient",
          });
    }

    function submitDetailsForm() {
      if (escalationDetails.notesId.length > 0 && addEscalation.value.id) {
        store.dispatch("addEscalationNote", {
          data: {
            notesId: escalationDetails.notesId,
            escalationType: 259,
          },
          escalationId: addEscalation.value.id,
        }).then((response)=>{
            if(response==true){
                status.value=true
            }
        })
      }
      if (escalationDetails.vitalId.length > 0 && addEscalation.value.id) {
        store.dispatch("addEscalationVital", {
          data: {
            vitalId: escalationDetails.vitalId,
            escalationType: 260,
          },
          escalationId: addEscalation.value.id,
        }).then((response)=>{
            if(response==true){
                status.value=true
            }
        })
      }
      if (escalationDetails.carePlan.length > 0 && addEscalation.value.id) {
        store.dispatch("addEscalationCarePlan", {
          data: {
            carePlan: escalationDetails.carePlan,
            escalationType: 262,
          },
          escalationId: addEscalation.value.id,
        }).then((response)=>{
            if(response==true){
                status.value=true
            }
        })
      }
      if (escalationDetails.flagIds.length > 0 && addEscalation.value.id) {
        store.dispatch("addEscalationFlag", {
          data: {
            flagIds: escalationDetails.flagIds,
            escalationType: 261,
          },
          escalationId: addEscalation.value.id,
        }).then((response)=>{
            if(response==true){
                status.value=true
            }
        })
      }

    setTimeout(() => { 
        if(status.value==true){
            successSwal('Data saved Successfully!')
            emit("saveModal", false)
            status.value =false
            store.dispatch('escalationList', {referenceId:route.params.udid,entityType:'patient'})
        }
    }, 5000);
    }

    function checkChangeInput() {
        store.commit('checkChangeInput', true)
    }
    const checkFieldsData = computed(() => {
        return store.state.common.checkChangeInput;
    })

    const form = reactive({
        ...escalation,
        });

    const closeModal = () => {
      if (checkFieldsData.value) {
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {
                        emit("saveModal", false)
                        Object.assign(escalation, form);
                        store.commit("resetCounter")
                        store.commit('checkChangeInput', false)
                        store.state.patients.addBasicEscalation = null
                    } else {
                        emit("saveModal", true);
                    }
                });
            }else{
                // 
            }
    };

    function escalationType(e) {
      console.log("value", e);
    }
    const carePlanList = computed(() => {
      return store.state.carePlan.carePlansList;
    });
    const patientFlagList = computed(() => {
      return store.state.patients.patientFlagList;
    });

    function showButton(value) {
      button.value = value;
    }

    const noteSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    };
    return {
      noteSelection,
      status,
      form,
      checkFieldsData,
      checkChangeInput,
      button,
      showButton,
      addEscalation,
      escalation,
      flagColumns,
      patientFlagList,
      carePlanColumns,
      carePlanList,
      activeKey,
      escalationType,
      submitDetailsForm,
      submitEscalationForm,
      vitalColumns,
      patientVitalList,
      notesColumns,
      closeModal,
      notesList,
      handleStaffChange,
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
      steps: [
        {
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
