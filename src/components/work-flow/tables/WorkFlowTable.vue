<template>
<a-table rowKey="id"  :columns="columns" :data-source="data" :scroll="{ x: 900 }" :pagination="false">
    <template #workflowDescription="text">
        <span>{{ text.text }}</span>
    </template>
     <template #configureWorkflow="text">
        <router-link :to="{ name: 'workflowDetails', params: { udid: text.record.id } }">{{ text.text }}</router-link>
    </template>
    <template #actions="{record}">
        <a-tooltip placement="bottom" @click="showModal(record.id)" >
            <template #title>
                <span>Edit</span>
            </template>
            <a class="icons">
                <EditOutlined /></a>
        </a-tooltip>
        <a-tooltip placement="bottom" @click="cloneData(text.record)">
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
import {DeleteOutlined,EditOutlined,CopyOutlined} from "@ant-design/icons-vue";
import { warningSwal} from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import {useStore} from "vuex"
export default defineComponent({
  name:"WorkFlowTable",
  components: {
    DeleteOutlined,
    EditOutlined,
    CopyOutlined,
  },
  props:{
    columns:Array,
    data:Array
  },
  setup(props,{emit}) {
    const store = useStore()
    const showModal = (id) => {
      emit("showEditModal",true)
      store.dispatch('editWorkflow',id)
    }
     const handleOk = () => {
      // 
    }

    function cloneData(id){
      let cloneData=[];
      warningSwal("Clone the data!").then((response) => {
        if (response == true) {
         cloneData = id;
         console.log('object',cloneData);
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
