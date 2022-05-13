<template>
<a-table rowKey="id"  :columns="columns" :data-source="data" :scroll="{ x: 900 }" :pagination="false">
    <template #settings="{record}">
        <a @click="showModal(record.id)">
        <SettingOutlined />
        </a>
    </template>
    <template #actions="{record}">
        <a-tooltip placement="bottom" @click="groupEditModal(record.id)" >
            <template #title>
                <span>Edit</span>
            </template>
            <a class="icons">
                <EditOutlined /></a>
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
import {EditOutlined,DeleteOutlined,SettingOutlined} from "@ant-design/icons-vue"
import { warningSwal} from "@/commonMethods/commonMethod"
import { messages } from "@/config/messages"
import {useStore} from "vuex"
import { useRoute } from "vue-router"
export default defineComponent({
  name:"WorkFlowTable",
  components: {
    EditOutlined,
    DeleteOutlined,
    SettingOutlined
  },
  props:{
    columns:Array,
    data:Array
  },
  setup(props,{emit}) {
    const store = useStore()
    const route = useRoute()

    const showModal = (id) => {
      emit("showEditModal",{type:true,id:id})
      store.dispatch("actionsOffset",route.params.udid)//workflowID(route.params.udid)
      // store.dispatch("eventActions",route.params.udid)
      store.state.workflow.editActions =null
      store.state.workflow.actionsField =null
    }
    const groupEditModal = (id) => {
      emit("groupEditModal",true)
      store.dispatch("editGroupAction",{eventId:route.params.udid,id:id})
    }
    
     const handleOk = () => {
      // 
    }

   

    function deleteData(id){
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch('deleteGroupAction',{eventId:route.params.udid,id:id}).then((response)=>{
            if (response == true) {
            store.dispatch("groupActionList",route.params.udid);
          }
          })
        }
      })
    }
    return {
      groupEditModal,
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
