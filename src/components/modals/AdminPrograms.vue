<template>
  <a-modal width="800px" title="Add New Program"  centered :footer="null" :maskClosable="false" @cancel="closeModal()">
    <a-form ref="formRef" :model="program" name="basic"  autocomplete="off" layout="vertical" @finish="programs" @finishFailed="programFailed">
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <!-- <div class="form-group">
          <a-input v-model="program.program" size="large" />
        </div> -->
        <div class="form-group">
        
          <a-form-item :label="$t('programs.createProgram')" name="name" :rules="[{ required: true, message: $t('programs.createProgram')+' '+$t('global.validation') }]">
            <a-input v-model:value="program.name" size="large" />
            <ErrorMessage v-if="errorMsg" :name="errorMsg.program?errorMsg.program[0]:''" />
          </a-form-item>
      </div>
      </a-col>
      <a-col :md="12" :sm="12" :xs="24">
        <div class="form-group">
            <a-form-item :label="$t('global.type')" name="typeId" :rules="[{required: true,message: $t('global.type') + ' ' + $t('global.validation'),},]">
                <a-select v-if="globalCode.programCategories.globalCode" ref="select" v-model:value="program.typeId" style="width: 100%" size="large" :disabled="programId ? true : false" placeholder="Select Device Type" @change="handleDevice">
                    <a-select-option value hidden disabled>
                        {{ "Select Program Type" }}
                    </a-select-option>
                    <a-select-option v-for="programType in globalCode.programCategories.globalCode" :key="programType.id" :value="programType.id">{{ programType.name }}</a-select-option>
                </a-select>
                <ErrorMessage v-if="errorMsg" :name="errorMsg.deviceType ? errorMsg.deviceType[0] : ''" />
            </a-form-item>
        </div>
    </a-col>
      <a-col :sm="24" :xs="24">
        <!-- <div class="form-group">
          <label>Description</label>
          <a-textarea v-model:value="value2" placeholder="Message" allow-clear />
        </div> -->
        <div class="form-group">
          <a-form-item :label="$t('program.description')" name="description" :rules="[{ required: true, message: $t('program.description')+' '+$t('global.validation') }]">
            <a-input v-model:value="program.description" size="large" />
            <ErrorMessage v-if="errorMsg" :name="errorMsg.program?errorMsg.program[0]:''" />
          </a-form-item>
      </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Active/Inactive</label>
          <a-switch v-model:checked="program.isActive" @change="UpdateProgramStatus($event)"/>
        </div>
      </a-col>
      <a-col :span="24">
        <div class="steps-action">
          <ModalButtons @is_click="handleCancel" :Id="programId"/>   
        </div>
      </a-col>
    </a-row>
    </a-form>
    <Loader v-if="programId" />
  </a-modal>
</template>
<script>
import { ref,  reactive, watchEffect, computed } from "vue";

import { useStore } from "vuex";
import Loader from "./../loader/Loader"
import {warningSwal} from "./../../commonMethods/commonMethod"
import { messages } from "./../../config/messages";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import ModalButtons from "@/components/common/button/ModalButtons";
export default {
  components: {
    ModalButtons,
    Loader,
    ErrorMessage
  },
  props: {
    idProgram: {
      type: Number
    }
  },
  setup(props,{emit}) {
    const store = useStore();
    const formRef = ref();
    const programId = reactive(props.idProgram);
    const program = reactive({
      name: "",
      description: "",
      typeId:"",
      isActive: "",
    });

    // const patients = computed(() => {
    //   return store.state.patients;
    // });
    const programEdit = store.getters.programsRecord
    watchEffect(() => {
     
      store.commit('loadingStatus', true)
      if(programId != null) {
        if (programEdit.value.editProgram) {
          console.log("test",programEdit.value.editProgram[0])
                    Object.assign(program, programEdit.value.editProgram[0]);
                    setTimeout(() => {
                        store.commit('loadingStatus', false)
                    }, 2000)

                }
      }
    })
    function UpdateProgramStatus(event){
      program.isActive=event
    }
    const programs = () => {
     
      if(programId != null) {
        store.dispatch("updateProgram", {
          data: {
            name: program.name,
            description: program.description,
            typeId:program.typeId,
            isActive: program.isActive ? 1 : 0,
          },
          id: programId,
        })
      }
      else {
       
        store.dispatch("addProgram", {
          data: {
            name: program.name,  
            description:program.description,
            typeId:program.typeId,
            isActive: program.isActive ? 1 : 0,
          }
        });   
      }
      store.state.programs.programList=''
        setTimeout(() => {
          reset()
          store.dispatch("programList");
        }, 1000);
    };
 
    const form = reactive({
      ...program,
    });
    function reset(){
      formRef.value.resetFields();
      Object.assign(program,form)
      emit("is-visible", false);
    }
    const globalCode = computed(() => {
            return store.state.common;
        });
    function closeModal() {
            if (program.name != "" || program.description != "") {
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {
                      reset()
                    } else {

                        emit("is-visible", true);
                    }
                });
            }
        }
    return {
      form,
      program,
      programs,
      closeModal,
      formRef,
      programId,
      globalCode,
      programEdit,
      UpdateProgramStatus,
    };
  },
};
</script>
