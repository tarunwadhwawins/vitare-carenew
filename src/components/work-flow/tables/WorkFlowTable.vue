<template>
<a-table rowKey="id"  :columns="columns" :data-source="data" :scroll="{ x: 900 }" :pagination="false">
    <template #workflowDescription="text">
        <span>{{ text.text }}</span>
    </template>
     <template #settings="text">
        <router-link :to="{ name: 'workflowDetails', params: { udid: text.record.id } }">
        <SettingOutlined />
        </router-link>
    </template>
    <template #actions="{record}">
        <a-tooltip placement="bottom" @click="showModal(record.id)" >
            <template #title>
                <span>Edit</span>
            </template>
            <a class="icons">
                <EditOutlined /></a>
        </a-tooltip>
        <a-tooltip placement="bottom" @click="cloneData(record.id)">
            <template #title>
                <span>Clone</span>
            </template>
            <a class="icons">
                <CopyOutlined /></a>
        </a-tooltip>
        <a-tooltip placement="bottom" @click="deleteData()">
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
import {DeleteOutlined,EditOutlined,CopyOutlined,SettingOutlined} from "@ant-design/icons-vue";
import { warningSwal} from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import {useStore} from "vuex"
export default defineComponent({
  name:"WorkFlowTable",
  components: {
    DeleteOutlined,
    EditOutlined,
    CopyOutlined,
    SettingOutlined
  },
  props:{
    columns:Array,
    data:Array
  },
  setup(props,{emit}) {
    const store = useStore()

    const showModal = (id) => {
      emit("showEditModal",true)
      emit("cloneData",false)
      emit("updateData",true)
      store.dispatch('editWorkflow',id)
    }
     const handleOk = () => {
      // 
    }

    function cloneData(id){
      warningSwal("Clone the data!").then((response) => {
        if (response == true) {
         store.dispatch('editWorkflow',id)
          emit("showEditModal",true)
         emit("cloneData",true)
         emit("updateData",false)
        }
      })
    }

    function deleteData(){
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          // 
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
