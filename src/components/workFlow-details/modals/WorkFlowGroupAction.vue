<template>
    <a-modal max-width="1000px" width="30%" title="Action Group" centered :footer="false" :maskClosable="false" >
    <a-form :model="groupActions" ref="formRef" name="groupActions" scrollToFirstError=true layout="vertical" @finish="submitForm" @finishFailed="onFinishFailed">
        <a-row :gutter="24">

            <a-col :sm="18" :xs="24">
                <div class="form-group">
                    <a-form-item label="Action Group Name" name="groupName" :rules="[{ required: true, message: 'Action Group Name'+' '+$t('global.validation')  }]">
                         <a-input-number v-model:value="groupActions.groupName" size="large" style="width: 100%"/>
                    </a-form-item>
                </div>
            </a-col>

            <a-col :span="24">
                <div class="steps-action">
                   <div class="steps-action" v-if="update==true">
                    <a-button type="primary" html-type="submit">{{$t('global.update')}}</a-button>
                </div>
                <div class="steps-action" v-else>
                   <a-button html-type="reset"  style="margin-right: 8px" @click="reset()">{{$t('global.clear')}}</a-button>
                    <a-button type="primary" html-type="submit">{{$t('global.save')}}</a-button>
                </div>
                </div>
            </a-col>
        </a-row>
    </a-form>
</a-modal>
</template>
<script>
import { reactive, ref } from "vue";

export default {
name:'WorkFlowGroupAction',
components: {
},
props:{
    update:Boolean
},
  setup() {
      const groupActions = reactive({
          groupName:""
      })
      const formRef = ref()
      function reset(){
          formRef.value.resetFields();
      }
    return {
      formRef,
      reset,
      groupActions,
      size: ref(),
    };
  },
};
</script>