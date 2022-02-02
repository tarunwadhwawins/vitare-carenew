<template>
<a-form :model="program" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="programs" @finishFailed="onFinishFailed">
    <a-row :gutter="24">
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.programs.program')" name="program" :rules="[{ required: true, message: $t('patient.programs.program')+' '+$t('global.validation') }]">
                    <a-select ref="select" v-model:value="program.program" style="width: 100%" size="large" @change="handleChange">
                        <a-select-option value="" disabled>{{'Select Program'}}</a-select-option>
                        <a-select-option v-for="program in patients.programList" :key="program.id" :value="program.id">{{program.description}}</a-select-option>
                    </a-select>
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.program?errorMsg.program[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="6" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.programs.onboardinScheduledDate')" name="onboardingScheduleDate" :rules="[{ required: true, message: $t('patient.programs.onboardinScheduledDate')+' '+$t('global.validation') }]">
                    <a-date-picker v-model:value="program.onboardingScheduleDate" format="MMM DD, YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.onboardingScheduleDate?errorMsg.onboardingScheduleDate[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="6" :xs="24">
            <div class="form-group">
                <a-form-item :label="$t('patient.programs.dischargeDate')" name="dischargeDate" :rules="[{ required: true, message: $t('patient.programs.dischargeDate')+' '+$t('global.validation') }]">
                    <a-date-picker v-model:value="program.dischargeDate" format="MMM DD, YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
                    <ErrorMessage v-if="errorMsg" :name="errorMsg.dischargeDate?errorMsg.dischargeDate[0]:''" />
                </a-form-item>
            </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
            <div class="form-group">
                <label>{{$t('global.status')}}</label>
                <a-radio-group v-model:value="program.status">
                    <a-radio :value="1">{{$t('global.active')}}</a-radio>
                    <a-radio :value="0">{{$t('global.inactive')}}</a-radio>
                </a-radio-group>
            </div>
        </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
        <a-col :span="24">
            <a-button class="btn primaryBtn" html-type="submit">{{$t('global.add')}}</a-button>
        </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
        <a-col :span="24">
            <a-table :columns="columns" :data-source="programsData" :pagination="false" :scroll="{ x: 900 }">
                <template #action="text">
                    <a-tooltip placement="bottom">
                        <a class="icons" @click="deleteProgram(text.record.id)">
                            <DeleteOutlined />
                        </a>
                    </a-tooltip>
                </template>
            </a-table>
            <Loader />
        </a-col>
    </a-row>
</a-form>
</template>

<script>
import { defineComponent, reactive, computed } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import Loader from "../../loader/Loader"
import {deleteSwal} from "../../../commonMethods/commonMethod"
export default defineComponent({
  components: {
    DeleteOutlined,
    Loader
  },
  setup() {
    const store = useStore();
    const program = reactive({
      program: "",
      onboardingScheduleDate: "",
      dischargeDate: "",
      status: 1,
    });
    const programs = () => {
      store.dispatch("addProgram", {
        data: program,
        id: patients.value.addDemographic.id,
      });
      setTimeout(() => {
        store.dispatch("program", patients.value.addDemographic.id);
      }, 2000);
    };
    const patients = computed(() => {
      return store.state.patients;
    });
    const columns = computed(() => {
      return store.state.patients.columns;
    });

    const programsData = computed(() => {
      return store.state.patients.program;
    });

    function deleteProgram(id) {
     deleteSwal().then((response)=>{
       if(response==true){
       store.dispatch('deleteProgram',{
         id:patients.value.addDemographic.id,
         programID:id
       })
      setTimeout(() => {
        store.dispatch("program",patients.value.addDemographic.id);
      }, 2000);
       }
     })
      
    }
    return {
      deleteProgram,
      columns,
      programsData,
      patients,
      program,
      programs,
    };
  },
});
</script>
