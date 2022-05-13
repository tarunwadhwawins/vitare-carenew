<template>
<a-modal max-width="1000px" width="50%" title="Actions" centered :footer="false" :maskClosable="false">
    <a-form :model="groupEditActions" layout="vertical" ref="formRef"  autocomplete="off" name="groupEditActions" scrollToFirstError=true @finish="update?updateForm():submitForm()" @finishFailed="onFinishFailed">
        <a-row :gutter="24">
            <a-col :sm="19" :xs="24">
                <div class="form-group">
                    <a-form-item label="Action" name="workFlowActionId" :rules="[{ required: true, message: 'Action'+' '+$t('global.validation')  }]">
                        <GlobalCodeDropDown @change="checkChangeInput();action(groupEditActions.workFlowActionId)" v-model:value="groupEditActions.workFlowActionId" :globalCode="globalCode.workFlowAction" />
                    </a-form-item>
                </div>
            </a-col>

            <a-col :sm="24" :xs="24" v-if="workflow.actionsField || workflow.editActions">
                <div class="form-group">
                    <a-row :gutter="24">
                        <a-col :sm="7" :xs="24">
                            <a-form-item label="Action Type" name="workFlowEventOffsetFieldId" :rules="[{ required: true, message: 'Action type'+' '+$t('global.validation')  }]" style="width:100%">
                                <GlobalCodeDropDown @change="checkChangeInput();" v-model:value="groupEditActions.workFlowEventOffsetFieldId" :globalCode="workflow.actionsOffset" />   
                            </a-form-item>
                        </a-col>
                        <a-col :sm="7" :xs="24" >
                            <a-form-item label="Start" name="executionOffsetType" :rules="[{ required: true, message: 'Start action'+' '+$t('global.validation')  }]">
                                <!-- <GlobalCodeDropDown @change="checkChangeInput()" v-model:value="groupEditActions.workFlowEventOffsetFieldId" :globalCode="dayTypeAction" /> -->
                                <a-select ref="select"  style="width: 100%" size="large" v-model:value="groupEditActions.executionOffsetType">
                                    <a-select-option value="+">After</a-select-option>
                                    <a-select-option value="-">Before </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :sm="5" :xs="24">
                            <a-form-item label="Days" name="executionOffsetDays" :rules="[{ required: true, message: 'Days'+' '+$t('global.validation')  }]">
                                <a-input v-model:value="groupEditActions.executionOffsetDays" placeholder="Days" size="large" style="width: 100%" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                </div>
            </a-col>

            <a-col :sm="19" :xs="24" v-for="(colm,i) in workflow.actionsField" :key="i">
                <div class="form-group">
                    <a-form-item :label="colm.title" :name="['actionsField',i]" :rules="[{ required: true, message: colm.title+' '+$t('global.validation')  }]">
                        <a-textarea v-if="colm.type=='TextArea'" v-model:value="groupEditActions.actionsField[i]" />
                        <a-date-picker v-else-if="colm.type=='Date'" :disabledDate="d => !d || d.isBefore(moment().subtract(1,'days'))" v-model:value="groupEditActions.actionsField[i]" :format="globalDateFormat" :value-format="globalDateFormat" :size="size" style="width: 100%" />
                        <a-input v-else v-model:value="groupEditActions.actionsField[i]" />
                    </a-form-item>
                </div>
            </a-col>

            <a-col :span="24">
                <div class="steps-action">
                    <a-button html-type="reset" style="margin-right: 8px" @click="reset()">{{$t('global.clear')}}</a-button>
                    <a-button v-if="cloneButton" type="primary" html-type="submit">{{'Clone'}}</a-button>
                    <a-button v-else-if="update" type="primary" html-type="submit">{{$t('global.update')}}</a-button>
                    <a-button v-else type="primary" html-type="submit">{{$t('global.save')}}</a-button>
                </div>
            </a-col>
        </a-row>
    </a-form>
    <Loader/>

    <!-- Table -->
    <div class="table">
        <WorkFlowEditActionTable :columns="columns" :data-source="workflow.actionsList" @cloneData="cloneData($event)"  @updateData="updateData($event)" :actionId="actionId"/>
    </div>

</a-modal>
</template>

<script>
import { reactive, ref, computed, watchEffect } from "vue";
import WorkFlowEditActionTable from "@/components/workFlow-details/tables/WorkFlowActionEditGroupTable";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import moment from "moment";
import { timeStamp, globalDateFormat } from "@/commonMethods/commonMethod";
import Loader from "@/components/loader/Loader.vue";
const columns = [
  {
    title: "Workflow Action",
    dataIndex: "workflowActionName",
    
  },
  {
    title: "Action Date",
    dataIndex: "executionOffsetDays",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
    slots: {
      customRender: "executionOffsetDays",
    },

  },
  {
    title: "From",
    dataIndex: "workFlowEventOffsetFieldName",
  },

  
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "actions",
    },
  },
]


const dayTypeAction = [
  {
    name: "Before",
    id: 1,
  },
  {
    name: "After",
    id: 2,
  },
]
export default {
  name: "WorkFlowGroupAction",
  components: {
    WorkFlowEditActionTable,
    GlobalCodeDropDown,
    Loader
},
  props:{
    actionId:String
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const groupEditActions = reactive({
      workFlowActionId: "",
      executionOffsetDays: "",
      workFlowEventOffsetFieldId: "",
      executionOffsetType: "",
      actionsField: [],
    })
    const formRef = ref()
    const cloneButton =ref(false)
    const update = ref(false)

    function reset() {
      formRef.value.resetFields()
    }
    const globalCode = computed(() => {
      return store.state.common;
    })
    const workflow = computed(() => {
      return store.state.workflow;
    })

    function checkChangeInput() {
      store.commit("checkChangeInput", true);
    }

    function action(id) {
      store.dispatch("actionsField", {
        eventId: route.params.udid,
        actionId: id,
      })
    }

    function cloneData(value){
      cloneButton.value = value
    }

    function updateData(value){
      update.value = value
    }

    function submitForm() {
      let data = [];
      groupEditActions.actionsField.map((item, i) => {
        let valueSelected = null;
        if (workflow.value.actionsField[i].type == "Date") {
          valueSelected = timeStamp(item);
        } else {
          valueSelected = item;
        }
        data.push({
          id: workflow.value.actionsField[i].id,
          value: valueSelected,
        })
      })

      store.dispatch("addActions",{
        data:{
          workFlowActionId: groupEditActions.workFlowActionId,
          executionOffsetDays: groupEditActions.executionOffsetDays,
          workFlowEventOffsetFieldId: groupEditActions.workFlowEventOffsetFieldId,
          executionOffsetType: groupEditActions.executionOffsetType,
          actionsField: data,
        },
        eventId: route.params.udid,
        actionId:props.Id
      }).then((response)=>{
        if(response==true){
          store.dispatch("actionsList",{
          eventId: route.params.udid,
          actionId:props.actionId
        })
        formRef.value.resetFields();
        store.state.workflow.actionsField =null
        store.state.workflow.editActions =null
        }
      })
    }

    
    function updateForm() {
      let data = [];
      groupEditActions.actionsField.map((item, i) => {
        let valueSelected = null;
        if (workflow.value.actionsField[i].type == "Date") {
          valueSelected = timeStamp(item);
        } else {
          valueSelected = item;
        }
        data.push({
          id: workflow.value.actionsField[i].id,
          value: valueSelected,
        })
      })

      store.dispatch("updateActions",{
        data:{
          workFlowActionId: groupEditActions.workFlowActionId,
          executionOffsetDays: groupEditActions.executionOffsetDays,
          workFlowEventOffsetFieldId: groupEditActions.workFlowEventOffsetFieldId,
          executionOffsetType: groupEditActions.executionOffsetType,
          actionsField: data,
        },
        eventId: route.params.udid,
        actionId:props.actionId,
        id:workflow.value.editActions.id
      }).then((response)=>{
        if(response==true){
          store.dispatch("actionsList",{
          eventId: route.params.udid,
          actionId:props.actionId
        })
        formRef.value.resetFields();
        store.state.workflow.editActions =null
        store.state.workflow.actionsField =null
        }
      })
    }


    function onFinishFailed(value) {
      console.log("editGroupAction", value);
    }

    watchEffect(()=>{
      if(props.actionId){
        store.dispatch("actionsList",{
          eventId: route.params.udid,
          actionId:props.actionId
        })
      }
      if(workflow.value.editActions){
        Object.assign(groupEditActions,workflow.value.editActions)
      }
    })
    return {
      updateForm,
      updateData,
      update,
      cloneData,
      cloneButton,
      moment,
      timeStamp,
      submitForm,
      globalDateFormat,
      onFinishFailed,
      workflow,
      action,
      checkChangeInput,
      columns,
      formRef,
      reset,
      groupEditActions,
      globalCode,
      dayTypeAction,
      size: ref("large"),
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>
