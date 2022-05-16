<template>
<div>
    <a-row :gutter="24">
        <a-col :sm="24" :xs="24">
            <PatientInfoTop :patientDetails="patientDetails" />
        </a-col>
    </a-row>
    <a-layout-content>
        <div class="common-bg">
            <a-row>
                <a-col :span="24">
                    <h2 class="pageTittle">
                        Escalation Details
                    </h2>
                </a-col>
                <!-- stepper -->
                <a-col :span="24">
                    <a-steps v-model:current="current">
                        <a-step v-for="item in steps" :key="item.title" :title="item.title?item.title:''" />
                    </a-steps>
                    <div class="steps-content" v-if="steps[current].title == 'Escalation Info'">
                        <a-form layout="vertical" ref="formRef" :model="escalationDetails" @finish="submitForm">
                            <a-row :gutter="24">
                                <a-col :sm="12" :xs="24">
                                    <div class="form-group">{{globalCode.ecalationType}}
                                        <a-form-item label="Escalation Type" name="scalationType" :rules="[{ required: true, message: 'Escalation Type'+' '+$t('global.validation')  }]">
                                            <GlobalCodeDropDown @change="changedValue" v-model:value="escalationDetails.scalationType" :globalCode="globalCode.escalationType" />
                                        </a-form-item>
                                    </div>
                                </a-col>

                                <a-col :sm="12" :xs="24">
                                    <div class="form-group">
                                        <a-form-item label="Description" name="type" :rules="[{ required: true, message: 'Description'+' '+$t('global.validation')  }]">
                                           <a-textarea v-model:value="escalationDetails.description" />
                                        </a-form-item>
                                    </div>
                                </a-col>

                                <a-col :sm="12" :xs="24">
                                    <div class="form-group">
                                        <a-form-item label="Flag" name="flag" :rules="[{ required: true, message: $t('common.flag')+' '+$t('global.validation')  }]">
                                            <GlobalCodeDropDown v-model:value="escalationDetails.flag" :globalCode="flagsList" />
                                        </a-form-item>
                                    </div>
                                </a-col>

                                <a-col :sm="12" :xs="24">
                                    <div class="form-group">
                                        <a-form-item label="Due Date" name="startDate" :rules="[{ required: true, message: 'Due Date'+' '+$t('global.validation')  }]">
                                          <a-date-picker  :disabledDate="d => !d || d.isBefore(moment().subtract(1,'days'))" v-model:value="escalationDetails.dueDate" :format="globalDateFormat" :value-format="globalDateFormat" :size="size" style="width: 100%" @change="checkChangeInput(); changeDate()" />
                                        </a-form-item>
                                    </div>
                                </a-col>

                                <a-col :sm="24" :span="24">

                                </a-col>

                            </a-row>
                        </a-form>
                    </div>
                    <div class="steps-content" v-if="steps[current].title == 'Notes'">
                        <a-form layout="vertical" ref="formRef" :model="addNoteForm" @finish="submitForm">
                            <a-row :gutter="24">
                                <a-col :sm="12" :xs="24">
                                    <div class="form-group">
                                        <a-form-item :label="$t('notes.date')" name="date" :rules="[{ required: true, message: $t('notes.date')+' '+$t('global.validation')  }]">
                                            <a-date-picker @change="changedValue" v-model:value="addNoteForm.date" :size="size" style="width: 100%" :format="globalDateFormat" disabled />
                                        </a-form-item>
                                    </div>
                                </a-col>

                                <a-col :sm="12" :xs="24">
                                    <div class="form-group">
                                        <a-form-item :label="$t('notes.category')" name="category" :rules="[{ required: true, message: $t('notes.category')+' '+$t('global.validation')  }]">
                                            <GlobalCodeDropDown @change="changedValue" v-model:value="addNoteForm.category" :globalCode="noteCategories" />
                                        </a-form-item>
                                    </div>
                                </a-col>

                                <a-col :sm="12" :xs="24">
                                    <div class="form-group">
                                        <a-form-item :label="$t('notes.type')" name="type" :rules="[{ required: true, message: $t('notes.type')+' '+$t('global.validation')  }]">
                                            <GlobalCodeDropDown @change="changedValue" v-model:value="addNoteForm.type" :globalCode="noteTypes" />
                                        </a-form-item>
                                    </div>
                                </a-col>

                                <a-col :sm="12" :xs="24">
                                    <div class="form-group">
                                        <a-form-item :label="$t('common.flag')" name="flag" :rules="[{ required: true, message: $t('common.flag')+' '+$t('global.validation')  }]">
                                            <GlobalCodeDropDown v-model:value="addNoteForm.flag" :globalCode="flagsList" />
                                        </a-form-item>
                                    </div>
                                </a-col>

                                <a-col :sm="12" :xs="24">
                                    <div class="form-group">
                                        <a-form-item :label="$t('notes.note')" name="note" :rules="[{ required: true, message: $t('notes.note')+' '+$t('global.validation')  }]">
                                            <a-input @change="changedValue" v-model:value="addNoteForm.note" size="large" />
                                        </a-form-item>
                                    </div>
                                </a-col>

                                <a-col :sm="24" :span="24">
                                </a-col>

                            </a-row>
                        </a-form>
                    </div>
                    <div class="steps-content" v-if="steps[current].title == 'Vitals'">
                        <h3>Vitals</h3>
                    </div>
                </a-col>
            </a-row>
        </div>
    </a-layout-content>
</div>
</template>
<script>
import PatientInfoTop from "@/components/patients/patientSummary/PatientInfoTop";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch";
import {
    computed, reactive,ref
} from 'vue';
import {
    useStore
} from 'vuex';
import moment from "moment"
import {
  globalDateFormat,
} from "@/commonMethods/commonMethod"
export default {
    components: {
        PatientInfoTop,
        GlobalCodeDropDown
    },
    setup() {
        const store = useStore();
        const escalationDetails = reactive({
          scalationType:'',
          description:'',
          flag:'',
          dueDate:'',
          staffId:''
        })

         const addNoteForm = reactive({
      date: moment().format(globalDateFormat),
      category: "",
      type: "",
      flag: "",
      note: "",
      entityType: "patient",
    })
        const patientDetails = computed(() => {
            return store.state.patients.patientDetails;
        })
        const globalCode = computed(() => {
            return store.state.common;
        })
        const flagsList = computed(() => {
          return store.state.flags.flagsList
        })
        const current = computed({
            get: () => store.state.patients.escalationCounter,
            set: (value) => {
                store.state.patients.escalationCounter = value;
            },
        });
        const next = () => {
            store.commit("counterPlus");
        };
        const prev = () => {
            store.commit("counterMinus");
        };
        return {
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
                    title: "Notes",
                    content: "Second-content",
                },
                {
                    title: "Vitals",
                    content: "Second-content",
                },
            ],
        }
    }
}
</script>

<style lang="scss">
.dangerValue {
    padding: 5px;
    background-color: #f03131f3;
    color: #fff;
}
</style>
