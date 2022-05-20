<template>
<div class="patientTable">
    <a-table rowKey="id" :columns="columnData" :data-source="escalationList" style="width:100%" :pagination="false" @change="handleTableChange">
        <template #escalationType="{ record }">
            <span v-for="esc,i in record.escalationType.data" :key="esc.id" >
                {{i==0?' ':','}} {{ esc.escalationType }}
            </span>
        </template>
        <template #action >
            <a-tooltip placement="bottom" >
                <template #title>
                    <span>{{ $t('global.edit') }}</span>
                </template>
                <a class="icons">
                    <EyeOutlined /></a>
            </a-tooltip>
        </template>
         <template #flag="{ record }">
            <Flags :flag="record.flagColor" />
        </template>
    </a-table>
</div>
</template>
<script>
import { EyeOutlined } from "@ant-design/icons-vue";
import { onMounted,computed } from "vue";
import { useStore } from "vuex";
import Flags from "@/components/common/flags/Flags";
const columnData = [
    {
    title: "Escalation Type",
    dataIndex: "escalationType",
    slots:{
        customRender: "escalationType",
    },
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
    EyeOutlined,
    Flags
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