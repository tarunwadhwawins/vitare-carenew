
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
                        <a-col :sm="24" :xs="24" v-show="!paramId">
                            <div class="form-group">
                                <a-form-item label="Patient" name="referenceId" :rules="[{ required: true, message: 'Patient'+' '+$t('global.validation')  }]">
                                    <PatientDropDown :editDataPatient="editDataPatient" v-model:value="escalation.referenceId" @handlePatientChange="handlePatientChange($event);checkChangeInput()" :close="closeValue" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
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
                                    <StaffDropDown :editDataStaff="editDataStaff" mode="multiple" v-model:value="escalation.staffIds" @handleStaffChange="handleStaffChange($event);checkChangeInput()" :close="closeValue" />
                                </a-form-item>
                            </div>
                        </a-col>

                        <a-col :sm="12" :xs="24">
                            <div class="form-group">
                                <a-form-item label="Due Date" name="dueBy" :rules="[{ required: true, message: 'Due Date'+' '+$t('global.validation')  }]">
                                    <a-date-picker :disabledDate="d => !d || d.isBefore(moment().subtract(1,'days'))" v-model:value="escalation.dueBy" :format="globalDateFormat" :value-format="globalDateFormat" :size="size" style="width: 100%" @change="checkChangeInput();" />
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
                                <DateFilter :Buttons="Buttons" @clickButtons="showButton($event);checkChangeInput()" :custom="true" commit="timelineSuccess" />
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24" v-if="button ==126">
                            <div class="form-group">
                                <a-form-item label="Summary Start" name="summaryStart" :rules="[{ required: false, message: 'Due Date'+' '+$t('global.validation')  }]">
                                    <a-date-picker :disabledDate="d => !d || d.isSameOrAfter(dateSelect)" v-model:value="escalationDetails.summaryStart" :format="globalDateFormat" :value-format="globalDateFormat" :size="size" style="width: 100%" @change="checkChangeInput(); changeDate();" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="12" :xs="24" v-if="button ==126">
                            <div class="form-group">
                                <a-form-item label="Summary End" name="summaryEnd" :rules="[{ required: false, message: 'Due Date'+' '+$t('global.validation')  }]">
                                    <a-date-picker :disabledDate="d => !d || d.isSameOrBefore(escalationDetails.summaryStart)" v-model:value="escalationDetails.summaryEnd" :format="globalDateFormat" :value-format="globalDateFormat" :size="size" style="width: 100%" @change="checkChangeInput(); changeDate();dateChange();" />
                                </a-form-item>
                            </div>
                        </a-col>
                        
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :md="24" :sm="24" :xs="24" v-for="errMsg in errorMsg" :key="errMsg.id">
                            <ul>
                                <li class="errorMsg">{{errMsg}}</li>
                            </ul>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-collapse v-model:activeKey="activeKey" accordion style="width:100%">
                            <a-collapse-panel key="1" header="Notes" v-if="escalation.escalationType.includes(260)">
                                <a-col :md="24" :sm="24" :xs="24">
                                    <div class="form-group ">
                                        <a-form-item name="notesId" :rules="[{ required: false, message:'Notes'+' '+$t('global.validation') }]">
                                            <a-table rowKey="id" :row-selection="noteSelection" :columns="notesColumns" :data-source="notesList" :pagination="false">
                                                 <!-- <template #addedBy="{ record }">
                                                    <a @click="showModal(record.addedById)">{{ record.addedBy }}</a>
                                                  </template> -->
                                                <template #color="{ record }">
                                                    <a-tooltip placement="bottom">
                                                        <template #title>
                                                            <span>{{ record.flag }}</span>
                                                        </template>
                                                        <a class="icons">
                                                            <Flags :flag="record.color" /></a>
                                                    </a-tooltip>
                                                </template>
                                            </a-table>
                                        </a-form-item>
                                    </div>
                                </a-col>
                            </a-collapse-panel>
                            <a-collapse-panel key="2" header="Vitals" v-if="escalation.escalationType.includes(259)">
                                <a-col :md="24" :sm="24" :xs="24">
                                    <div class="form-group ">
                                        <a-form-item name="vitalId" :rules="[{ required: false, message:'Vital'+' '+$t('global.validation') }]">
                                            <a-table rowKey="id" :row-selection="vitalSelection" :columns="vitalColumns" :data-source="patientVitalList" :pagination="false">
                                                <template #color="{ record }">
                                                    <a-tooltip placement="bottom">
                                                        <template #title>
                                                            <span>{{ record.flagName }}</span>
                                                        </template>
                                                        <a class="icons">
                                                            <Flags :flag="record.color" /></a>
                                                    </a-tooltip>
                                                </template>
                                            </a-table>
                                        </a-form-item>
                                    </div>
                                </a-col>
                            </a-collapse-panel>
                            <a-collapse-panel key="3" header="Care Plan" v-if="escalation.escalationType.includes(262)">
                                <a-col :md="24" :sm="24" :xs="24">
                                    <div class="form-group ">
                                        <a-form-item name="carePlan" :rules="[{ required: false, message:'Care Plan'+' '+$t('global.validation') }]">
                                            <a-table rowKey="id" :row-selection="carePlanSelection" :columns="carePlanColumns" :data-source="carePlanList" :pagination="false">
                                            </a-table>
                                        </a-form-item>
                                    </div>
                                </a-col>
                            </a-collapse-panel>
                            <a-collapse-panel key="4" header="Flags" v-if="escalation.escalationType.includes(261)">
                                <a-col :md="24" :sm="24" :xs="24">
                                    <div class="form-group ">
                                        <a-form-item name="flagIds" :rules="[{ required: false, message:'Flag'+' '+$t('global.validation') }]">
                                            <a-table rowKey="id" :row-selection="flagSelection" :columns="flagColumns" :data-source="patientFlagList" :pagination="false">
                                                <template #name="{ record }">
                                                    <span>{{record.flagName}}</span>
                                                </template>
                                                <template #color="{ record }">
                                                    <!-- <Flags :flag="record.color" /> -->
                                                    <a-tooltip placement="bottom">
                                                        <template #title>
                                                            <span>{{ record.flagName }}</span>
                                                        </template>
                                                        <a class="icons">
                                                            <Flags :flag="record.color" /></a>
                                                    </a-tooltip>
                                                </template>
                                            </a-table>
                                        </a-form-item>
                                    </div>
                                </a-col>
                            </a-collapse-panel>
                        </a-collapse>
                        <a-col :sm="24" :span="24" style="padding:15px">
                            <div class="steps-action">
                                <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
                                <a-button v-if="current < steps.length - 1" type="primary" @click="next">{{$t('global.next')}}</a-button>
                                <a-button v-if="current == steps.length - 1" type="primary" html-type="submit">
                                    {{$t('global.save')}}
                                </a-button>
                            </div>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </a-col>
    </a-row>
    <Loader />
</a-modal>
</template>
<script>
import { computed,onMounted,reactive, ref } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import {
  globalDateFormat,
  timeStamp,
  endTimeAdd,
  warningSwal,
  errorSwal,
  successSwal,
  startimeAdd,
} from "@/commonMethods/commonMethod";
import DateFilter from "@/components/common/DateFilter.vue";
import { messages } from "@/config/messages";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch";
import StaffDropDown from "@/components/modals/search/StaffDropdownSearch.vue";
import PatientDropDown from "@/components/modals/search/PatientDropdownSearch.vue";
import Flags from "@/components/common/flags/Flags";
import { useRoute } from "vue-router";
import Loader from "@/components/loader/Loader.vue";
const notesColumns = [
  {
    title: "Select All",
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
    slots: {
      customRender: "addedBy",
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

const vitalColumns = [
  {
    title: "Select All",
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
    dataIndex: "startTime",
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
    title: "Select All",
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
    title: "Vital Type",
    dataIndex: "vitalField",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
  },
  {
    title: "End Date",
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
    title: "Select All",
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
    dataIndex: "createdAt",
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
    PatientDropDown,
    Loader,
    DateFilter,
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const activeKey = ref([]);
    const errorMsg = ref([]);
    const button = ref(2);
    const status = ref(false);
    const formRef = ref();
    const paramId = ref(route.params.udid);
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

    onMounted(()=>{
      store.dispatch('flagsList')
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
      get: () => store.state.escalations.escalationCounter,
      set: (value) => {
        if (addEscalation.value && !value ==1) {
          store.state.escalations.escalationCounter = value;
        } else {
          if (Object.values(escalation).filter((item) => item != "").length >= 7 || addEscalation.value) {
            submitEscalationForm();
          } else {
            errorSwal(messages.fieldsRequired);
            store.state.escalations.escalationCounter = 0;
          }
        }
      },
    });
    const next = () => {
      store.commit("escalationCounterPlus");
    };
    const prev = () => {
      store.commit("escalationCounterMinus");
    };
    const handleStaffChange = (val) => {
      escalation.staffIds = val;
      // console.log(val);
    };

    const notesList = computed(() => {
      return store.state.escalations.escalationNotesList;
    });
    const patientVitalList = computed(() => {
      return store.state.escalations.escalationVitalList;
    });

    const addEscalation = computed(() => {
      return store.state.escalations.addBasicEscalation;
    });

    const formEscalationDetails = reactive({
      ...escalationDetails,
    });

    function submitEscalationForm() {
      if (addEscalation.value == null) {
        store
          .dispatch("addBasicEscalation", {
            escalationType: escalation.escalationType,
            escalationDescription: escalation.escalationDescription,
            flagId: escalation.flagId,
            dueBy: timeStamp(endTimeAdd(moment(escalation.dueBy))),
            staffIds: escalation.staffIds,
            referenceId: escalation.referenceId
              ? escalation.referenceId
              : route.params.udid,
            entityType: "patient",
          })
          .then((response) => {
            if (response == true) {
              store
                .dispatch("timeLine", {
                  id: 123,
                  commit: "timelineSuccess",
                })
                .then(() => {
                  button.value = 123
                  apiCall(timeLineButton.value);
                });
            }
          });
      } else {
        store
          .dispatch("updateBasicEscalation", {
            escalationType: escalation.escalationType,
            escalationDescription: escalation.escalationDescription,
            flagId: escalation.flagId,
            dueBy: timeStamp(endTimeAdd(moment(escalation.dueBy))),
            staffIds: escalation.staffIds,
            referenceId: escalation.referenceId
              ? escalation.referenceId
              : route.params.udid,
            entityType: "patient",
            escalationId: addEscalation.value.id,
          })
          .then((response) => {
            if (response == true) {
              store
                .dispatch("timeLine", {
                  id: 123,
                  commit: "timelineSuccess",
                })
                .then(() => {
                  button.value = 123
                  apiCall(timeLineButton.value);
                });
            }
          });
        Object.assign(escalationDetails, formEscalationDetails);
      }
    }

    const form = reactive({
      ...escalation,
    });

    function submitDetailsForm() {
      var filter = route.query.filter ? "?filter=" + route.query.filter : "?filter="
     var dateFilter = route.query.fromDate && route.query.toDate ? "&fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate : "&fromDate=&toDate="
      errorMsg.value = [];
      let check = true;
      if (
        escalationDetails.notesId.length == 0 &&
        escalation.escalationType.includes(260)
      ) {
        check = false;
        errorMsg.value.push("Notes Required.");
      }
      if (
        escalationDetails.vitalId.length == 0 &&
        escalation.escalationType.includes(259)
      ) {
        check = false;
        errorMsg.value.push("Vitals Required.");
      }
      if (
        escalationDetails.carePlan.length == 0 &&
        escalation.escalationType.includes(262)
      ) {
        check = false;
        errorMsg.value.push("Care plan Required.");
      }
      if (
        escalationDetails.flagIds.length == 0 &&
        escalation.escalationType.includes(261)
      ) {
        check = false;
        errorMsg.value.push("Flags Required.");
      } else if (check) {
        store
          .dispatch("addEscalationDetails", {
            escalationDetails: escalationDetails,
            escalationId: addEscalation.value.id,
          })
          .then((response) => {
            if (response == true) {
              successSwal("Data saved Successfully!");
              emit("saveModal", false);
              status.value = false;
              if (route.name == "PatientSummary") {
                store.dispatch("escalation", {
                  referenceId: escalation.referenceId
                    ? escalation.referenceId
                    : route.params.udid,
                  entityType: "patient",
                });
              } else {
                store.dispatch("escalation" ,filter+dateFilter);
              }
              Object.assign(escalation, form);
              store.commit("resetEscalationCounter");
              store.commit("checkChangeInput", false);
              store.state.escalations.addBasicEscalation = null;
              Object.assign(escalationDetails, formEscalationDetails);
              store
                .dispatch("timeLine", {
                  id: 122,
                  commit: "timelineSuccess",
                })
                .then(() => {
                  apiCall(timeLineButton.value);
                });
            }
          });
      }

    }

    function checkChangeInput() {
      store.commit("checkChangeInput", true);
    }
    const checkFieldsData = computed(() => {
      return store.state.common.checkChangeInput;
    });

    const closeModal = () => {
      emit("saveModal", true)
      if (checkFieldsData.value) {
        if (addEscalation.value) {
          warningSwal(messages.modalWarning).then((response) => {
            if (response == true) {
              emit("saveModal", false);
              Object.assign(escalation, form);
              Object.assign(escalationDetails, formEscalationDetails);
              store.commit("resetEscalationCounter");
              store.commit("checkChangeInput", false);
              store.dispatch("escalationDelete", addEscalation.value.id);
              store.state.escalations.addBasicEscalation = null;
              errorMsg.value = [];
            } else {
              emit("saveModal", true);
            }
          });
        } else if (addEscalation.value == null) {
          warningSwal(messages.modalWarning).then((response) => {
            if (response == true) {
              emit("saveModal", false);
              Object.assign(escalation, form);
              Object.assign(escalationDetails, formEscalationDetails);
              store.commit("resetEscalationCounter");
              store.commit("checkChangeInput", false);
              store.state.escalations.addBasicEscalation = null;
              errorMsg.value = [];
            } else {
              emit("saveModal", true);
            }
          });
        }
      } else {
        formRef.value.resetFields();
        emit("saveModal", false)
      }
    };

    // function escalationType(e) {
    //   console.log("value", e);
    // }
    const carePlanList = computed(() => {
      return store.state.escalations.esacalationCarePlansList;
    });
    const patientFlagList = computed(() => {
      return store.state.escalations.esacalationFlagList;
    });

    const timeLineButton = store.getters.dashboardTimeLineButton;

    function showButton(id) {
      // console.log("gdfg", id);
      button.value = id;
      if (id != 126) {
        apiCall(timeLineButton.value);
      }
    }

    const handlePatientChange = (val) => {
      escalation.referenceId = val;
    };

    let from = moment();
    let to = moment();
    const dateSelect = ref(null)
    function dateChange() {
            dateSelect.value = moment(escalationDetails.summaryEnd).add(1, 'day')
        }
function changeDate (){
  // console.log("check",escalationDetails.summaryStart)
  if(escalationDetails.summaryStart && escalationDetails.summaryEnd){
let dateFormate = {
          fromDate: timeStamp(startimeAdd(moment(escalationDetails.summaryStart))),
          toDate: timeStamp(endTimeAdd(moment(escalationDetails.summaryEnd))),
        };

        if (route.params.udid && route.name == "PatientSummary") {
        store.dispatch("escalationNotesList", {
          id: route.params.udid,
          date: dateFormate,
        });
        store.dispatch("escalationVitalList", {
          id: route.params.udid,
          date: dateFormate,
        });
        store.dispatch("esacalationCarePlansList", {
          id: route.params.udid,
          date: dateFormate,
        });
        store.dispatch("esacalationFlagList", {
          id: route.params.udid,
          date: dateFormate,
        });
      } else if (escalation.referenceId) {
        store.dispatch("escalationNotesList", {
          id: escalation.referenceId,
          date: dateFormate,
        });
        store.dispatch("escalationVitalList", {
          id: escalation.referenceId,
          date: dateFormate,
        });
        store.dispatch("esacalationCarePlansList", {
          id: escalation.referenceId,
          date: dateFormate,
        });
        store.dispatch("esacalationFlagList", {
          id: escalation.referenceId,
          date: dateFormate,
        });
      }
  }
}
    function apiCall(data) {
      let dateFormate = "";
      if (data.globalCodeId == 122) {
        from = moment();
        to = moment().subtract(data.number, data.intervalType);
      } else if (data.globalCodeId == 123) {
        from = moment();

        to = moment().subtract(data.number, data.intervalType);
      } else if (data.globalCodeId == 124) {
        from = moment();
        to = moment().subtract(data.number, data.intervalType);
      } else {
        from = moment();
        to = moment().subtract(data.number, data.intervalType);
      }

      if (data.globalCodeId == 122) {
        dateFormate = {
          fromDate: from ? timeStamp(startimeAdd(from)) : "",
          toDate: to ? timeStamp(endTimeAdd(to)) : "",
        };
      } else {
        dateFormate = {
          fromDate: timeStamp(startimeAdd(to)),
          toDate: timeStamp(endTimeAdd(from)),
        };
      }
      if (route.params.udid && route.name == "PatientSummary") {
        store.dispatch("escalationNotesList", {
          id: route.params.udid,
          date: dateFormate,
        });
        store.dispatch("escalationVitalList", {
          id: route.params.udid,
          date: dateFormate,
        });
        store.dispatch("esacalationCarePlansList", {
          id: route.params.udid,
          date: dateFormate,
        });
        store.dispatch("esacalationFlagList", {
          id: route.params.udid,
          date: dateFormate,
        });
      } else if (escalation.referenceId) {
        store.dispatch("escalationNotesList", {
          id: escalation.referenceId,
          date: dateFormate,
        });
        store.dispatch("escalationVitalList", {
          id: escalation.referenceId,
          date: dateFormate,
        });
        store.dispatch("esacalationCarePlansList", {
          id: escalation.referenceId,
          date: dateFormate,
        });
        store.dispatch("esacalationFlagList", {
          id: escalation.referenceId,
          date: dateFormate,
        });
      }
    
    }

    const noteSelection = {
      onChange: (selectedRowKeys) => {
        escalationDetails.notesId = selectedRowKeys;
      },
    };
    const vitalSelection = {
      onChange: (selectedRowKeys) => {
        escalationDetails.vitalId = selectedRowKeys;
      },
    };

    const carePlanSelection = {
      onChange: (selectedRowKeys) => {
        escalationDetails.carePlan = selectedRowKeys;
      },
    };

    const flagSelection = {
      onChange: (selectedRowKeys) => {
        escalationDetails.flagIds = selectedRowKeys;
      },
    };

    const editDataStaff = computed(() => {
      return store.state.escalations.editEscalationStaff;
    });

    const editDataPatient = computed(() => {
      return store.state.escalations.editEscalationPatient;
    });

    // function showModal(id){
    //   store.dispatch("staffSummary", id)
    //   store.commit('showDetailsModal')
    // }

    return {
      // showModal,
      editDataPatient,
      editDataStaff,
      formRef,
      errorMsg,
      formEscalationDetails,
      paramId,
      handlePatientChange,
      timeline: store.getters.timeline,
      Buttons: store.getters.dashboardTimeLineButton,
      flagSelection,
      carePlanSelection,
      vitalSelection,
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
      // escalationType,
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
      changeDate,
      dateSelect,
      dateChange,
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
  }
}
</script>

<style lang="scss">
.dangerValue {
  padding: 5px;
  background-color: #f03131f3;
  color: #fff;
}

.errorMsg {
  color: #f03131f3;
}
</style>
