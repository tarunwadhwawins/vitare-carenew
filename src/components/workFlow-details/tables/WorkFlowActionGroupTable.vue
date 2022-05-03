<template>
<a-table rowKey="id"  :columns="columns" :data-source="data" :scroll="{ x: 900 }" :pagination="false">
   <template #actionGroupDescription="text">
        <a @click="groupEditModal()">{{ text.text }}</a>
    </template>
    <template #actions>
        <a-tooltip placement="bottom" @click="showModal()" >
            <template #title>
                <span>Edit</span>
            </template>
            <a class="icons">
                <EditOutlined /></a>
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
import {EditOutlined,DeleteOutlined} from "@ant-design/icons-vue";
import { warningSwal} from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
export default defineComponent({
  name:"WorkFlowTable",
  components: {
    EditOutlined,
    DeleteOutlined
  },
  props:{
    columns:Array,
    data:Array
  },
  setup(props,{emit}) {
    const showModal = () => {
      emit("showEditModal",true)
    }
    const groupEditModal = () => {
      emit("groupEditModal",true)
    }
    
     const handleOk = () => {
      // 
    }

   

    function deleteData(){
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          // 
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
