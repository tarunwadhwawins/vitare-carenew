<template>
    <a-modal max-width="1000px" width="50%" title="Actions" centered :footer="false" :maskClosable="false" >
    <a-form :model="groupEditActions" ref="formRef" name="groupEditActions" scrollToFirstError=true layout="vertical" @finish="submitForm" @finishFailed="onFinishFailed">
        <a-row :gutter="24">
            <a-col :sm="18" :xs="24">
                <div class="form-group">
                    <a-form-item label="Action" name="groupName" :rules="[{ required: true, message: 'Action'+' '+$t('global.validation')  }]">
                        <a-select  v-model:value="groupEditActions.groupName" style="width: 100%" size="large" @focus="focus" @change="handleChange" placeholder="Choose Value">
                            <a-select-option value="Yimiernghe">Action1</a-select-option>
                            <a-select-option value="Yiminerghe">Action2</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
            </a-col>

            <a-col :span="24">
                <div class="steps-action">
                   <a-button html-type="reset"  style="margin-right: 8px" @click="reset()">{{$t('global.clear')}}</a-button>
                    <a-button type="primary" html-type="submit">{{$t('global.save')}}</a-button>
                </div>
            </a-col>
        </a-row>
    </a-form>

    <!-- Table -->
    <div class="table">
        <WorkFlowEditActionTable :columns="columns" :data-source="data" @showEditModal="showEditModal($event)"/>
    </div>

</a-modal>
</template>
<script>
import { reactive, ref } from "vue";
import WorkFlowEditActionTable from "@/components/workFlow-details/tables/WorkFlowActionEditGroupTable"
const columns = [
  {
    title: "Workflow Action",
    dataIndex: "workflowAction",
  },
  {
    title: "Action Date",
    dataIndex: "actionDate",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
  },
  {
    title: "Task/Subject",
    dataIndex: "taskSubject",
  },
  
  {
    title: "Configure Action",
    dataIndex: "configureAction",
    slots: {
      customRender: "configureAction",
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "actions",
    },
  },
];
const data = [
    {
        "workflowAction":"Send Mail",
        "actionDate":"12",
        "taskSubject":"",
        "configureAction":"Configure",
    },
];
export default {
    name:'WorkFlowGroupAction',
    components: {
        WorkFlowEditActionTable
  },
  setup() {
      const groupEditActions = reactive({
          groupName:""
      })
      const formRef = ref()
      function reset(){
          formRef.value.resetFields();
      }
    return {
      columns,
      data,
      formRef,
      reset,
      groupEditActions,
      size: ref(),
    };
  },
};
</script>
<style scoped>
.table{
    margin-top: 20px;
}
</style>