<template>
<a-table rowKey="id"  :columns="columns" :data-source="data" :scroll="{ x: 800 }" :pagination="false">
     <template #executionOffsetDays="{record}">
        <span >{{ record.executionOffsetDays+' '}}{{record.executionOffsetType=='+'?'Days After':'Days Before'}}</span>
    </template>
    <template #actions="{record}">
      <a-tooltip placement="bottom" @click="showModal(record.id)" >
            <template #title>
                <span>Edit</span>
            </template>
            <a class="icons">
                <EditOutlined /></a>
        </a-tooltip>
        <a-tooltip placement="bottom" @click="cloneData(record.id)" >
            <template #title>
                <span>Clone</span>
            </template>
            <a class="icons">
                <CopyOutlined /></a>
        </a-tooltip>
        <a-tooltip placement="bottom" @click="deleteData(record.id)">
            <template #title>
                <span>Delete</span>
            </template>
            <a class="icons">
                <DeleteOutlined /></a>
        </a-tooltip>
    </template>
</a-table>

</template>
<script>
import {  defineComponent, } from "vue";
import {CopyOutlined,DeleteOutlined,EditOutlined} from "@ant-design/icons-vue";
import { warningSwal} from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import { useRoute } from "vue-router"
import {useStore} from "vuex"
export default defineComponent({
  name:"WorkFlowTable",
  components: {
    CopyOutlined,
    DeleteOutlined,
    EditOutlined
  },
  props:{
    columns:Array,
    data:Array,
    actionId:String
  },
  setup(props,{emit}) {
    const store = useStore()
    const route = useRoute()
    const showModal = (id) => {
      store.dispatch('editActions',{eventId:route.params.udid,actionId:props.actionId,id:id})
      emit("cloneData",false)
      emit("updateData",true)
    }
     const handleOk = () => {
      // 
    }

   function cloneData(id){
      warningSwal("Clone the data!").then((response) => {
        if (response == true) {
         store.dispatch('editActions',{eventId:route.params.udid,actionId:props.actionId,id:id})
         emit("cloneData",true)
         emit("updateData",false)
        }
      })
    }

    function deleteData(id){
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
           store.dispatch('deleteActions',{eventId:route.params.udid,actionId:props.actionId,id:id}).then((response)=>{
            if (response == true) {
            store.dispatch("actionsList",{eventId:route.params.udid,actionId:props.actionId});
            store.state.workflow.actionsField =null,
            store.state.workflow.editActions =null
          }
          })
        }
      })
    }
    return {
      cloneData,
      deleteData,
      showModal,
      handleOk
    };
  },
});
</script>

<style scoped>
.search {
  padding-bottom: 15px;
}
</style>
