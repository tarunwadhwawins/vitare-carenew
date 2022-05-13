<template>
    <a-modal max-width="1000px" width="30%" title="Action Group" centered :footer="false" :maskClosable="false" @cancel="closeModal()">
    <a-form :model="groupActions" ref="formRef" name="groupActions" autocomplete="off" scrollToFirstError=true layout="vertical" @finish="update?updateForm():submitForm()" @finishFailed="onFinishFailed">
        <a-row :gutter="24">
            <a-col :sm="18" :xs="24">
                <div class="form-group">
                    <a-form-item label="Action Group Name" name="title" :rules="[{ required: true, message: 'Action group name'+' '+$t('global.validation')  }]">
                         <a-input v-model:value="groupActions.title" size="large" style="width: 100%"/>
                    </a-form-item>
                </div>
            </a-col>

            <a-col :span="24">
                <div class="steps-action" v-if="update==true">
                    <a-button type="primary" html-type="submit">{{$t('global.update')}}</a-button>
                </div>
                <div class="steps-action" v-else>
                   <a-button html-type="reset"  style="margin-right: 8px" @click="reset()">{{$t('global.clear')}}</a-button>
                    <a-button type="primary" html-type="submit">{{$t('global.save')}}</a-button>
                </div>
            </a-col>
        </a-row>
    </a-form>
    <Loader/>
</a-modal>
</template>
<script>
import { reactive, ref, watchEffect,computed } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"
import {
  warningSwal
} from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import Loader from "@/components/loader/Loader.vue";
export default {
  name: "WorkFlowGroupAction",
  components: { Loader },
  props: {
    update: Boolean,
  },
  setup(props,{emit}) {
    const store = useStore()
    const route = useRoute()
    const groupActions = reactive({
      title: "",
    });
    const formRef = ref();
    function reset() {
      formRef.value.resetFields();
    }
    function submitForm() {
        store.dispatch('addGroupAction',{id:route.params.udid,data:groupActions}).then((response)=>{
         if (response == true) {
          store.dispatch("groupActionList",route.params.udid);
          emit("saveModal", false);
        }
        })
    }
    function updateForm() {
        store.dispatch('updateGroupAction',{eventId:route.params.udid,id:editGroupAction.value.id,data:groupActions}).then((response)=>{
         if (response == true) {
          store.dispatch("groupActionList",route.params.udid);
          emit("saveModal", false);
        }
        })
    }
    const editGroupAction =computed(()=>{
      return store.state.workflow.editGroupAction
    })
    watchEffect(()=>{
      if (editGroupAction.value) {
        Object.assign(groupActions, editGroupAction.value);
      } else if(props.update==false) {
        Object.assign(groupActions, form);
      }
    })

    const form = reactive({
      ...groupActions,
    });
    const checkFieldsData = computed(() => {
      return store.state.common.checkChangeInput;
    });
    function closeModal() {
      if (checkFieldsData.value) {
        warningSwal(messages.modalWarning).then((response) => {
          if (response == true) {
            emit("saveModal", false);
            Object.assign(groupActions, form);
            store.state.common.checkChangeInput = false;
          } else {
            emit("saveModal", true);
          }
        });
      } else {
        formRef.value.resetFields();
      }
    }
    return {
      updateForm,
      form,
      checkFieldsData,
      closeModal,
      submitForm,
      formRef,
      reset,
      groupActions,
      size: ref(),
    };
  },
};
</script>