<template>
<div class="patientTable">
    <a-table rowKey="id" :columns="columnData" :data-source="escalationList" :scroll="{ y: tableYScrollerCounterPage, x: 1500 }" :pagination="false" @change="handleTableChange"> 
        <template #action >
            <a-tooltip placement="bottom" >
                <template #title>
                    <span>{{ $t('global.edit') }}</span>
                </template>
                <a class="icons">
                    <EyeOutlined /></a>
            </a-tooltip>
        </template>
    </a-table>
</div>
</template>
<script>
import { EyeOutlined } from "@ant-design/icons-vue";
import { onMounted,computed } from "vue";
import { useStore } from "vuex";
const columnData = [
    {
    title: "Name",
    dataIndex: "escalationType",
  },
  { 
    title: "Description",
    dataIndex: "escalationDescription",
  },
  {
    title: "Flag",
    dataIndex: "flag",
    slots:{
        customRender: "flag",
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    slots:{
        customRender: "action",
    },
    
  },
  
]


export default {
  name: "EscalationTable",
  components: {
    EyeOutlined
  },
  props: {},
  setup() {
    const store = useStore();

    const escalationList = computed(() => {
      return store.state.patients.escalationList;
    });
    onMounted(() => {

    })
    
    return {
      escalationList,
      columnData,
      screensPermissions: store.getters.screensPermissions,
    };
  },
};
</script>