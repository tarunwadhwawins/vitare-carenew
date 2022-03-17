<template>
<a-modal max-width="1140px" width="50%" :title="title" centered :footer="null"  :maskClosable="false" @cancel="closeModal()">
<a-form :model="notes" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="addCriticalNote" @finishFailed="notesFailed">
    <a-row :gutter="24">
        <a-col :sm="24" :xs="24">
            <div class="form-group">
              <a-form-item label="Note" name="criticalNote" :rules="[{ required: true, message: 'Note'+' '+$t('global.validation') }]">
              <a-textarea v-model:value="notes.criticalNote"  :rows="4" @change="checkChangeInput()"/>
              </a-form-item>
            </div>
        </a-col>
    </a-row>
    <a-row :gutter="24" class="mb-24">
        <a-col :span="24" >
        <a-button  style="margin-right: 8px" @click="reset()">{{$t('global.clear')}}</a-button>
        <a-button type="primary" html-type="submit">{{$t('global.save')}}</a-button>
        </a-col>
    </a-row>
</a-form>
</a-modal>
</template>

<script>
import { defineComponent, reactive, computed,ref } from "vue";
import { useStore } from "vuex";
import {warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import {useRoute} from "vue-router"
export default defineComponent({

  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const notes = reactive({
      criticalNote:"",
    });

    function addCriticalNote() {
      store.dispatch("addCriticalNote", {udid:route.params.udid,criticalNote:notes});
      setTimeout(() => {
        if(patient.value){
        reset();
        store.dispatch('criticalNotesList', route.params.udid);
        emit("saveModal", false);
      }
      }, 2000);
    }

    const patient = computed(() => {
      return store.state.patients.closeModal;
    });

    const form = reactive({
      ...notes,
    });
    function reset() {
      Object.assign(notes, form);
    }

    function checkChangeInput(){
      store.commit('checkChangeInput',true)
    }

    const checkFieldsData = computed(()=>{
      return store.state.common.checkChangeInput;
    })
    function closeModal() {
      if(checkFieldsData.value){
        warningSwal(messages.modalWarning).then((response) => {
          if (response == true) {
            emit("saveModal", false);
            Object.assign(notes, form);
            store.commit('checkChangeInput',false)
          } else {
            emit("saveModal", true);
          }
        });
      }
    }
    return {
      notes,
      patient,
      reset,
      checkChangeInput,
      addCriticalNote,
      closeModal,
      size: ref("large"),
    };
  },
});
</script>
